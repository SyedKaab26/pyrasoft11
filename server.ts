import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";

// Load .env first, then fallback to .env.example if values are present there
dotenv.config();
if (fs.existsSync(".env.example")) {
  try {
    const exampleConfig = dotenv.parse(fs.readFileSync(".env.example"));
    for (const [k, v] of Object.entries(exampleConfig)) {
      if (!process.env[k] && v && !v.startsWith("MY_")) {
        process.env[k] = v;
      }
    }
  } catch (err) {
    console.warn("Could not read .env.example fallback:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser Middleware
  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      mailerConfigured: Boolean(
        process.env.SMTP_HOST || (process.env.SMTP_USER && process.env.SMTP_PASS)
      ),
    });
  });

  // Mailer API endpoint
  app.post("/api/send-mail", async (req, res) => {
    try {
      const {
        fullName,
        corporateEmail,
        projectScope,
        budgetTier,
        timeline,
        technicalRequirements,
      } = req.body;

      if (!fullName || !corporateEmail || !technicalRequirements) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields (fullName, corporateEmail, technicalRequirements)",
        });
      }

      const receiverEmail =
        process.env.CONTACT_RECEIVER_EMAIL || "s.kaab2004@gmail.com";

      // Formatted Email HTML & Text
      const emailSubject = `🚀 New Project Inquiry from ${fullName} [${projectScope || "General"}]`;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0f19; color: #e2e8f0; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #374151; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #1f2937, #111827); padding: 24px; border-bottom: 2px solid #F4C852; text-align: left; }
            .brand { color: #F4C852; font-size: 20px; font-weight: 800; letter-spacing: 1px; }
            .subtitle { color: #9ca3af; font-size: 13px; margin-top: 4px; }
            .body-content { padding: 24px; }
            .field-row { margin-bottom: 16px; }
            .label { font-size: 11px; font-weight: 700; color: #F4C852; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
            .value { font-size: 15px; color: #f8fafc; font-weight: 500; }
            .message-box { background-color: #1f2937; padding: 16px; border-radius: 8px; border-left: 4px solid #F4C852; margin-top: 8px; line-height: 1.6; font-size: 14px; color: #cbd5e1; white-space: pre-wrap; }
            .badge { display: inline-block; background-color: rgba(244, 200, 82, 0.15); color: #F4C852; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
            .footer { background-color: #0d131f; padding: 16px 24px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #1f2937; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="brand">⚡ PYRASOFT — NEW PROJECT BRIEF</div>
              <div class="subtitle">Received via Website Contact Mailer</div>
            </div>
            <div class="body-content">
              <div class="field-row">
                <div class="label">Client / Sender Name</div>
                <div class="value">${fullName}</div>
              </div>
              <div class="field-row">
                <div class="label">Work Email Address</div>
                <div class="value"><a href="mailto:${corporateEmail}" style="color: #60a5fa; text-decoration: none;">${corporateEmail}</a></div>
              </div>
              <div class="field-row">
                <div class="label">Service Scope</div>
                <div class="value"><span class="badge">${projectScope || "Not Specified"}</span></div>
              </div>
              <div style="display: flex; gap: 16px; margin-bottom: 16px;">
                <div class="field-row" style="flex: 1;">
                  <div class="label">Target Budget</div>
                  <div class="value" style="color: #F4C852;">${budgetTier || "Not Specified"}</div>
                </div>
                <div class="field-row" style="flex: 1;">
                  <div class="label">Desired Timeline</div>
                  <div class="value">${timeline || "Flexible"}</div>
                </div>
              </div>
              <div class="field-row">
                <div class="label">Project Overview & Requirements</div>
                <div class="message-box">${technicalRequirements}</div>
              </div>
            </div>
            <div class="footer">
              Sent automatically from Pyrasoft Web Engine • Reply directly to this email to contact the client.
            </div>
          </div>
        </body>
        </html>
      `;

      const textContent = `
=== PYRASOFT NEW PROJECT BRIEF ===

Sender: ${fullName}
Email: ${corporateEmail}
Service Scope: ${projectScope}
Target Budget: ${budgetTier}
Timeline: ${timeline}

Technical Requirements:
${technicalRequirements}

---
Sent via Pyrasoft Contact Mailer
      `;

      let mailerStatus = "sent";
      let messageId = `local-${Date.now()}`;

      // Check if SMTP environment variables are configured
      const smtpHost = (process.env.SMTP_HOST || "").trim();
      const smtpUser = (process.env.SMTP_USER || "").trim();
      // Google App Passwords often have spaces like "abcd efgh ijkl mnop", remove all spaces
      const smtpPass = (process.env.SMTP_PASS || "").replace(/\s+/g, "").trim();
      const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
      const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

      if (smtpHost || (smtpUser && smtpPass)) {
        let transportConfig: any;

        // If using Gmail, nodemailer's built-in 'service: "gmail"' handles ports, TLS and auth perfectly
        if (smtpUser.includes("@gmail.com") || smtpHost.includes("gmail.com")) {
          transportConfig = {
            service: "gmail",
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          };
        } else {
          transportConfig = {
            host: smtpHost || "smtp.gmail.com",
            port: smtpPort,
            secure: smtpSecure,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          };
        }

        const transporter = nodemailer.createTransport(transportConfig);

        const info = await transporter.sendMail({
          from: smtpUser ? `"Pyrasoft Inquiries" <${smtpUser}>` : `"Pyrasoft" <no-reply@pyrasoft.dev>`,
          to: receiverEmail,
          replyTo: `"${fullName}" <${corporateEmail}>`,
          subject: emailSubject,
          text: textContent,
          html: htmlContent,
        });

        messageId = info.messageId;
        mailerStatus = "delivered";
        console.log(`[Mailer] Real email dispatched successfully via Gmail SMTP: ${info.messageId}`);
      } else {
        // In local/dev environment without SMTP credentials, log the email cleanly
        console.log(`[Mailer] Simulated Dispatch (SMTP credentials not yet configured in .env):`);
        console.log(`To: ${receiverEmail}`);
        console.log(`Subject: ${emailSubject}`);
        console.log(`From: ${corporateEmail}`);
        mailerStatus = "simulated_success";
      }

      return res.status(200).json({
        success: true,
        status: mailerStatus,
        messageId,
        recipient: receiverEmail,
        message: "Your project brief has been successfully processed by the mailer.",
        briefSummary: {
          fullName,
          corporateEmail,
          projectScope,
          budgetTier,
          timeline,
        },
      });
    } catch (err: any) {
      console.error("[Mailer Error]:", err);
      return res.status(500).json({
        success: false,
        error: err.message || "Failed to process email dispatch",
      });
    }
  });

  // Catch-all for API routes so they always return JSON, never HTML
  app.all("/api/*", (req, res) => {
    res.status(404).json({
      success: false,
      error: `API route ${req.method} ${req.originalUrl} not found`,
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`⚡ Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  color: string;
}

export const BackgroundShader: React.FC = () => {
  const webglCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. WebGL Aurora Fluid Energy Shader (Gold #F4C852 & White on Obsidian)
  useEffect(() => {
    const canvas = webglCanvasRef.current;
    if (!canvas) return;

    let animFrameId: number;
    const gl = canvas.getContext('webgl', { antialias: true, alpha: true }) || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const syncSize = () => {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    syncSize();
    window.addEventListener('resize', syncSize);

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amp = 0.5;
        float freq = 1.0;
        for (int i = 0; i < 4; i++) {
          value += amp * noise(p * freq);
          freq *= 2.1;
          amp *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
        vec2 mouse = (u_mouse.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
        
        // Deep Charcoal Obsidian Base
        vec3 color = vec3(0.032, 0.036, 0.045);

        float t = u_time * 0.35;
        
        // Animated Turbulence Layers
        vec2 q = vec2(
          fbm(p + vec2(t * 0.12, -t * 0.08)),
          fbm(p + vec2(-t * 0.08, t * 0.15))
        );
        
        vec2 r = vec2(
          fbm(p + 1.0 * q + vec2(1.7, 9.2) + 0.12 * t),
          fbm(p + 1.0 * q + vec2(8.3, 2.8) + 0.1 * t)
        );
        
        float f = fbm(p + r);

        // Fluid waves
        float wave1 = sin(p.x * 2.2 + q.y * 2.8 + t * 0.6) * cos(p.y * 1.8 + q.x * 2.4 - t * 0.4);
        float wave2 = cos(p.x * 2.8 - r.x * 2.5 - t * 0.5) * sin(p.y * 2.2 + r.y * 3.0 + t * 0.35);

        // Mouse reactive field
        float distToMouse = length(p - mouse);
        float mouseGlow = smoothstep(0.75, 0.0, distToMouse);
        
        // Color Palette: Primary #F4C852 (0.957, 0.784, 0.322), Champagne (0.98, 0.92, 0.65), Pure White (1.0, 1.0, 1.0)
        vec3 goldPrimary = vec3(0.957, 0.784, 0.322);
        vec3 goldWarm = vec3(0.92, 0.68, 0.18);
        vec3 pureWhite = vec3(1.0, 1.0, 1.0);

        // Wave and Turbulence Mixing
        color += goldPrimary * (max(0.0, wave1) * 0.14);
        color += goldWarm * (max(0.0, wave2) * 0.11);
        color += (f * f * 2.2) * goldPrimary * 0.10;
        color += pureWhite * (pow(f, 3.8) * 0.07);

        // Mouse Spotlight
        color += goldPrimary * (mouseGlow * 0.22);
        color += pureWhite * (pow(mouseGlow, 2.2) * 0.14);

        // Subtle Film Grain
        float grain = fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        color += (grain - 0.5) * 0.015;

        // Dark Vignette
        float vignette = smoothstep(1.9, 0.25, length(p));
        color = color * vignette;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (type: number, src: string) => {
      const s = (gl as WebGLRenderingContext).createShader(type);
      if (!s) return null;
      (gl as WebGLRenderingContext).shaderSource(s, src);
      (gl as WebGLRenderingContext).compileShader(s);
      return s;
    };

    const vertShader = compileShader((gl as WebGLRenderingContext).VERTEX_SHADER, vs);
    const fragShader = compileShader((gl as WebGLRenderingContext).FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const prog = (gl as WebGLRenderingContext).createProgram();
    if (!prog) return;
    (gl as WebGLRenderingContext).attachShader(prog, vertShader);
    (gl as WebGLRenderingContext).attachShader(prog, fragShader);
    (gl as WebGLRenderingContext).linkProgram(prog);
    (gl as WebGLRenderingContext).useProgram(prog);

    const buf = (gl as WebGLRenderingContext).createBuffer();
    (gl as WebGLRenderingContext).bindBuffer((gl as WebGLRenderingContext).ARRAY_BUFFER, buf);
    (gl as WebGLRenderingContext).bufferData(
      (gl as WebGLRenderingContext).ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      (gl as WebGLRenderingContext).STATIC_DRAW
    );

    const pos = (gl as WebGLRenderingContext).getAttribLocation(prog, 'a_position');
    (gl as WebGLRenderingContext).enableVertexAttribArray(pos);
    (gl as WebGLRenderingContext).vertexAttribPointer(pos, 2, (gl as WebGLRenderingContext).FLOAT, false, 0, 0);

    const uTime = (gl as WebGLRenderingContext).getUniformLocation(prog, 'u_time');
    const uRes = (gl as WebGLRenderingContext).getUniformLocation(prog, 'u_resolution');
    const uMouse = (gl as WebGLRenderingContext).getUniformLocation(prog, 'u_mouse');

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = window.innerHeight - event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = (t: number) => {
      syncSize();
      (gl as WebGLRenderingContext).viewport(0, 0, canvas.width, canvas.height);

      if (uTime) (gl as WebGLRenderingContext).uniform1f(uTime, t * 0.001);
      if (uRes) (gl as WebGLRenderingContext).uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) (gl as WebGLRenderingContext).uniform2f(uMouse, mouse.x, mouse.y);

      (gl as WebGLRenderingContext).drawArrays((gl as WebGLRenderingContext).TRIANGLE_STRIP, 0, 4);
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', syncSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 2. Interactive Gold & White Constellation Matrix
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const mousePos = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      mousePos.active = true;
    };

    const handleMouseLeave = () => {
      mousePos.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 22000), 75);
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const isAccent = Math.random() > 0.65;
        // High quality gold & white colors
        const color = isAccent ? 'rgba(255, 255, 255, ' : 'rgba(244, 200, 82, ';
        const baseAlpha = Math.random() * 0.45 + 0.15;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          size: Math.random() * 2.2 + 1.2,
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          color: color,
        });
      }
    };

    initParticles();

    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step++;
      const maxDistance = 130;

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        p1.alpha = p1.baseAlpha + Math.sin(step * p1.pulseSpeed) * 0.15;

        if (mousePos.active) {
          const dx = mousePos.x - p1.x;
          const dy = mousePos.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p1.x -= (dx / dist) * force * 1.5;
            p1.y -= (dy / dist) * force * 1.5;
          }
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(244, 200, 82, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${Math.max(0.05, p1.alpha)})`;
        ctx.fill();

        if (p1.size > 2.5) {
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244, 200, 82, ${p1.alpha * 0.22})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden" style={{ display: 'block' }}>
      <canvas
        ref={webglCanvasRef}
        id="shader-canvas-GOLD"
        className="w-full h-full block absolute inset-0"
      />
      <canvas
        ref={particleCanvasRef}
        id="particle-canvas-GOLD"
        className="w-full h-full block absolute inset-0 opacity-90"
      />
    </div>
  );
};

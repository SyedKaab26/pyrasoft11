import React from 'react';

interface PyrasoftLogoProps {
  className?: string;
  size?: number | string;
}

export const PyrasoftLogo: React.FC<PyrasoftLogoProps> = ({ className = "w-8 h-8", size }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="PYRASOFT Logo"
    >
      <defs>
        {/* Glow Filter for Gold & White Circuit Nodes */}
        <filter id="circuit-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feColorMatrix
            type="matrix"
            values="
              0 0 0 0 0.957
              0 0 0 0 0.784
              0 0 0 0 0.322
              0 0 0 0.85 0
            "
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Ambient Center Glow in Gold */}
        <radialGradient id="center-glow-gradient" cx="50%" cy="52%" r="40%">
          <stop offset="0%" stopColor="#F4C852" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#CA8A04" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#713F12" stopOpacity="0" />
        </radialGradient>

        {/* Gold & Champagne Gradients for Pyramid Facets */}
        {/* Top Apex Left Facet */}
        <linearGradient id="gold-top-left" x1="250" y1="70" x2="195" y2="225" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#F4C852" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>

        {/* Top Apex Right Facet */}
        <linearGradient id="gold-top-right" x1="250" y1="70" x2="305" y2="225" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FDE047" />
          <stop offset="80%" stopColor="#F4C852" />
          <stop offset="100%" stopColor="#A16207" />
        </linearGradient>

        {/* Left Wing Outer Facet */}
        <linearGradient id="gold-left-outer" x1="140" y1="240" x2="210" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4C852" />
          <stop offset="50%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#1E1908" />
        </linearGradient>

        {/* Left Wing Inner Facet */}
        <linearGradient id="gold-left-inner" x1="190" y1="240" x2="245" y2="390" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="60%" stopColor="#F4C852" />
          <stop offset="100%" stopColor="#A16207" />
        </linearGradient>

        {/* Right Wing Outer Facet */}
        <linearGradient id="gold-right-outer" x1="360" y1="240" x2="290" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#1E1908" />
        </linearGradient>

        {/* Right Wing Inner Facet */}
        <linearGradient id="gold-right-inner" x1="310" y1="240" x2="255" y2="390" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#F4C852" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>

        {/* Bottom Center Point Facet */}
        <linearGradient id="gold-bottom-facet" x1="250" y1="230" x2="250" y2="430" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A16207" />
          <stop offset="50%" stopColor="#18150B" />
          <stop offset="100%" stopColor="#F4C852" />
        </linearGradient>

        {/* Center Diamond/Prism Dark Charcoal Gradient */}
        <linearGradient id="center-prism-left" x1="200" y1="230" x2="250" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#272214" />
          <stop offset="50%" stopColor="#151410" />
          <stop offset="100%" stopColor="#08080A" />
        </linearGradient>

        <linearGradient id="center-prism-right" x1="300" y1="230" x2="250" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#352C16" />
          <stop offset="50%" stopColor="#151410" />
          <stop offset="100%" stopColor="#08080A" />
        </linearGradient>
      </defs>

      {/* Ambient Gold Glow Behind Center */}
      <circle cx="250" cy="280" r="130" fill="url(#center-glow-gradient)" />

      {/* ================= 1. TOP APEX PYRAMID ================= */}
      <polygon
        points="250,75 195,225 250,220"
        fill="url(#gold-top-left)"
      />
      <polygon
        points="250,75 250,220 305,225"
        fill="url(#gold-top-right)"
      />

      {/* ================= 2. LEFT PYRAMID WING ================= */}
      <polygon
        points="190,235 150,370 235,415"
        fill="url(#gold-left-outer)"
      />
      <polygon
        points="190,235 235,415 240,240"
        fill="url(#gold-left-inner)"
      />

      {/* ================= 3. RIGHT PYRAMID WING ================= */}
      <polygon
        points="310,235 260,240 265,415"
        fill="url(#gold-right-inner)"
      />
      <polygon
        points="310,235 265,415 350,370"
        fill="url(#gold-right-outer)"
      />

      {/* ================= 4. BOTTOM CENTER PYRAMID TIP ================= */}
      <polygon
        points="240,360 250,430 260,360"
        fill="url(#gold-bottom-facet)"
      />

      {/* ================= 5. CENTER CRYSTAL / RHOMBUS PRISM ================= */}
      <polygon
        points="250,175 195,280 250,380"
        fill="url(#center-prism-left)"
        opacity="0.95"
      />
      <polygon
        points="250,175 250,380 305,280"
        fill="url(#center-prism-right)"
        opacity="0.95"
      />

      {/* ================= 6. GLOWING GOLD & WHITE CIRCUIT TRACES ================= */}
      <g filter="url(#circuit-glow)">
        {/* Main Central Chevron Accent */}
        <polyline
          points="205,275 250,305 295,260"
          stroke="#F4C852"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Branch 1 */}
        <polyline
          points="235,215 235,245 210,265"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="235" cy="215" r="5.5" fill="#FFFFFF" />

        {/* Branch 2 */}
        <polyline
          points="265,220 265,245 285,260"
          stroke="#F4C852"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="265" cy="220" r="6" fill="#FDE047" />

        {/* Branch 3 */}
        <polyline
          points="218,275 218,320"
          stroke="#F4C852"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="218" cy="320" r="4.5" fill="#F4C852" />

        {/* Branch 4 */}
        <polyline
          points="235,300 235,340"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="235" cy="340" r="5" fill="#FFFFFF" />

        {/* Branch 5 */}
        <polyline
          points="275,280 250,335 248,360"
          stroke="#F4C852"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="250" cy="335" r="6.5" fill="#F4C852" />

        {/* Subtle Accent Node */}
        <circle cx="210" cy="265" r="4.5" fill="#FFFFFF" />
      </g>

      {/* Specular White Sparkle on Apex & Highlights */}
      <circle cx="250" cy="76" r="3.5" fill="#FFFFFF" opacity="0.95" />
      <line x1="250" y1="75" x2="250" y2="220" stroke="#FFF" strokeWidth="1.5" strokeOpacity="0.5" />
    </svg>
  );
};

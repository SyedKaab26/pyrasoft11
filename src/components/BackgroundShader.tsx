import React from 'react';

export const BackgroundShader: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#090b11]">
      {/* Whisper-quiet structural grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      
      {/* Soft top ambient depth */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-white/[0.015] rounded-full blur-[140px]"></div>
    </div>
  );
};

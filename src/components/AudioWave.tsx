import React from 'react';

interface AudioWaveProps {
  isActive: boolean;
  color?: string;
  className?: string;
}

export const AudioWave: React.FC<AudioWaveProps> = ({
  isActive,
  color = '#38BDF8',
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-1.5 h-10 ${className}`}>
      {[12, 24, 18, 32, 20, 28, 14, 26, 16].map((h, i) => (
        <span
          key={i}
          className="w-1 rounded-full transition-all duration-150"
          style={{
            height: isActive ? `${Math.max(6, (Math.sin(Date.now() / 200 + i) + 1) * (h / 2) + 4)}px` : '4px',
            backgroundColor: color,
            animation: isActive ? `waveBar 1.${(i % 5) + 2}s infinite ease-in-out` : 'none',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

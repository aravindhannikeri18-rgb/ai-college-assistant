import React from 'react';

interface RobotAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSpeaking?: boolean;
  isListening?: boolean;
  className?: string;
}

export const RobotAvatar: React.FC<RobotAvatarProps> = ({
  size = 'md',
  isSpeaking = false,
  isListening = false,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Outer glow rings for active states */}
      {isListening && (
        <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
      )}
      {isSpeaking && (
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 opacity-70 blur-sm animate-pulse" />
      )}

      {/* SVG Cartoon AI College Robot with Graduation Cap */}
      <svg
        viewBox="0 0 160 160"
        className={`w-full h-full drop-shadow-md transition-transform duration-300 ${
          isSpeaking ? 'animate-bounce' : isListening ? 'scale-105' : 'hover:scale-105'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>

          <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F0F9FF" />
            <stop offset="100%" stopColor="#DDF4FF" />
          </linearGradient>

          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B192C" />
            <stop offset="100%" stopColor="#1E3E62" />
          </linearGradient>

          <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>

          <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <filter id="eyeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Robot Ears / Headphones */}
        <circle cx="28" cy="90" r="10" fill="#0284C7" />
        <circle cx="28" cy="90" r="6" fill="#38BDF8" />
        <circle cx="132" cy="90" r="10" fill="#0284C7" />
        <circle cx="132" cy="90" r="6" fill="#38BDF8" />

        {/* Robot Head Outer Rounded Rect */}
        <rect
          x="32"
          y="56"
          width="96"
          height="68"
          rx="26"
          fill="url(#headGrad)"
          stroke="#93C5FD"
          strokeWidth="3.5"
        />

        {/* Digital Dark Visor / Screen */}
        <rect
          x="44"
          y="68"
          width="72"
          height="42"
          rx="16"
          fill="url(#visorGrad)"
        />

        {/* Cheerful Animated Eyes */}
        <ellipse
          cx="62"
          cy="87"
          rx="7"
          ry="9"
          fill="url(#eyeGrad)"
          filter="url(#eyeGlow)"
          className={isSpeaking ? 'animate-pulse' : ''}
        />
        <circle cx="64" cy="84" r="2.5" fill="#FFFFFF" />

        <ellipse
          cx="98"
          cy="87"
          rx="7"
          ry="9"
          fill="url(#eyeGrad)"
          filter="url(#eyeGlow)"
          className={isSpeaking ? 'animate-pulse' : ''}
        />
        <circle cx="100" cy="84" r="2.5" fill="#FFFFFF" />

        {/* Cute Smiling Mouth */}
        {isSpeaking ? (
          <ellipse cx="80" cy="99" rx="6" ry="4" fill="#38BDF8" />
        ) : (
          <path
            d="M 72 96 Q 80 103 88 96"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Cute Rosy Cheeks */}
        <circle cx="49" cy="95" r="3.5" fill="#F472B6" opacity="0.6" />
        <circle cx="111" cy="95" r="3.5" fill="#F472B6" opacity="0.6" />

        {/* Graduation Cap (Mortarboard) */}
        {/* Diamond top */}
        <path
          d="M 80 20 L 138 40 L 80 54 L 22 40 Z"
          fill="url(#capGrad)"
          stroke="#1E40AF"
          strokeWidth="2.5"
        />
        {/* Cap skull cap under */}
        <path
          d="M 52 48 L 52 58 Q 80 66 108 58 L 108 48 Z"
          fill="#1E3A8A"
        />
        {/* Golden Button on center of cap */}
        <circle cx="80" cy="38" r="4" fill="#FBBF24" />
        {/* Golden Tassel hanging to side */}
        <path
          d="M 80 38 Q 112 40 122 58"
          stroke="#F59E0B"
          strokeWidth="2.5"
          fill="none"
        />
        <circle cx="122" cy="62" r="3" fill="#D97706" />
        <path d="M 120 62 L 124 74 L 118 74 Z" fill="#F59E0B" />

        {/* College Badge on chest */}
        <circle cx="80" cy="132" r="6" fill="#2563EB" />
        <circle cx="80" cy="132" r="3.5" fill="#FFFFFF" />

        {/* Robot Torso hints */}
        <path
          d="M 54 124 Q 80 120 106 124 L 116 150 Q 80 156 44 150 Z"
          fill="url(#bodyGrad)"
          stroke="#93C5FD"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
};

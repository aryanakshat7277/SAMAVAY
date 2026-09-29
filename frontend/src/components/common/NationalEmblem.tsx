import React from 'react';

interface NationalEmblemProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'monochrome' | 'emerald' | 'navy';
}

export const NationalEmblem: React.FC<NationalEmblemProps> = ({
  className = '',
  size = 'md',
  variant = 'gold'
}) => {
  const sizeMap = {
    sm: 'w-6 h-8',
    md: 'w-8 h-10',
    lg: 'w-12 h-14',
    xl: 'w-16 h-20'
  };

  const colorMap = {
    gold: {
      primary: '#d97706',
      secondary: '#fbbf24',
      accent: '#92400e',
      motto: '#b45309'
    },
    monochrome: {
      primary: '#475569',
      secondary: '#94a3b8',
      accent: '#334155',
      motto: '#64748b'
    },
    emerald: {
      primary: '#166534',
      secondary: '#22c55e',
      accent: '#14532d',
      motto: '#15803d'
    },
    navy: {
      primary: '#0054a3',
      secondary: '#36a6f6',
      accent: '#062648',
      motto: '#054785'
    }
  };

  const colors = colorMap[variant];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Authentic Ashoka Lion Capital SVG Representation */}
      <svg
        viewBox="0 0 100 120"
        className={`${sizeMap[size]} filter drop-shadow-xs`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="State Emblem of India"
      >
        {/* Crown of 4 Lions (3 visible) */}
        {/* Central Lion Head */}
        <path
          d="M50 14 C44 14 40 18 40 24 C40 29 43 33 46 36 C45 39 44 43 45 48 C46 52 48 55 50 56 C52 55 54 52 55 48 C56 43 55 39 54 36 C57 33 60 29 60 24 C60 18 56 14 50 14 Z"
          fill={colors.secondary}
          stroke={colors.primary}
          strokeWidth="1.5"
        />
        {/* Central Lion Mane Details */}
        <path d="M44 26 C46 29 48 30 50 30 C52 30 54 29 56 26" stroke={colors.accent} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M45 34 C47 37 49 38 50 38 C51 38 53 37 55 34" stroke={colors.accent} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="47" cy="23" r="1.2" fill={colors.accent} />
        <circle cx="53" cy="23" r="1.2" fill={colors.accent} />
        <path d="M49 26 L51 26 L50 28 Z" fill={colors.accent} />

        {/* Left Lion Profile */}
        <path
          d="M40 22 C34 20 28 24 28 31 C28 36 31 40 35 44 C34 48 35 52 37 56 C39 54 41 51 42 47 C40 43 39 38 40 33 Z"
          fill={colors.secondary}
          stroke={colors.primary}
          strokeWidth="1.5"
        />
        <circle cx="34" cy="30" r="1" fill={colors.accent} />

        {/* Right Lion Profile */}
        <path
          d="M60 22 C66 20 72 24 72 31 C72 36 69 40 65 44 C66 48 65 52 63 56 C61 54 59 51 58 47 C60 43 61 38 60 33 Z"
          fill={colors.secondary}
          stroke={colors.primary}
          strokeWidth="1.5"
        />
        <circle cx="66" cy="30" r="1" fill={colors.accent} />

        {/* Supporting Lion Bodies */}
        <path d="M37 56 C37 68 43 72 50 72 C57 72 63 68 63 56 Z" fill={colors.primary} />
        <path d="M43 56 C43 64 46 68 50 68 C54 68 57 64 57 56 Z" fill={colors.secondary} opacity="0.9" />

        {/* Abacus / Base Platform */}
        <rect x="20" y="72" width="60" height="12" rx="2" fill={colors.accent} stroke={colors.primary} strokeWidth="1.5" />

        {/* Ashoka Dharma Chakra (Central Wheel) with 24 Spokes */}
        <circle cx="50" cy="78" r="5" fill="none" stroke="#000080" strokeWidth="1.2" />
        <circle cx="50" cy="78" r="1" fill="#000080" />
        <line x1="50" y1="73" x2="50" y2="83" stroke="#000080" strokeWidth="0.8" />
        <line x1="45" y1="78" x2="55" y2="78" stroke="#000080" strokeWidth="0.8" />
        <line x1="46.5" y1="74.5" x2="53.5" y2="81.5" stroke="#000080" strokeWidth="0.8" />
        <line x1="53.5" y1="74.5" x2="46.5" y2="81.5" stroke="#000080" strokeWidth="0.8" />

        {/* Galloping Horse (Left) & Standing Bull (Right) representations */}
        <path d="M26 78 C28 75 32 75 34 78" stroke={colors.secondary} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="30" cy="79" r="1.5" fill={colors.secondary} />

        <path d="M66 78 C68 75 72 75 74 78" stroke={colors.secondary} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="70" cy="79" r="1.5" fill={colors.secondary} />

        {/* Inverted Lotus Pedestal */}
        <path
          d="M24 84 C28 92 38 96 50 96 C62 96 72 92 76 84 Z"
          fill={colors.secondary}
          stroke={colors.primary}
          strokeWidth="1.5"
        />
        {/* Lotus Petal Grooves */}
        <path d="M35 84 C38 90 44 93 50 93 C56 93 62 90 65 84" stroke={colors.accent} strokeWidth="1" fill="none" />
        <line x1="50" y1="84" x2="50" y2="93" stroke={colors.accent} strokeWidth="1" />
        <line x1="42" y1="84" x2="44" y2="91" stroke={colors.accent} strokeWidth="1" />
        <line x1="58" y1="84" x2="56" y2="91" stroke={colors.accent} strokeWidth="1" />

        {/* Base Foundation Bar */}
        <rect x="22" y="96" width="56" height="4" rx="1" fill={colors.accent} />

        {/* Satyameva Jayate (सत्यमेव जयते) in Devanagari Script */}
        <text
          x="50"
          y="112"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="900"
          fontFamily="'Noto Serif Devanagari', 'Cinzel', serif"
          fill={colors.motto}
          letterSpacing="0.8"
        >
          सत्यमेव जयते
        </text>
      </svg>
    </div>
  );
};

import React from 'react';

interface DitherPatternDefsProps {
  idPrefix?: string;
  theme?: 'dark' | 'light';
}

export function DitherPatternDefs({ idPrefix = '', theme = 'dark' }: DitherPatternDefsProps) {
  const isDark = theme === 'dark';
  const dotColor = isDark ? '#FFFFFF' : '#171717';
  const mutedColor = isDark ? '#525252' : '#A3A3A3';

  return (
    <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
      <defs>
        {/* 1. Dot Matrix Dither Pattern */}
        <pattern
          id={`${idPrefix}dither-dot-pattern`}
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <rect width="6" height="6" fill="transparent" />
          <circle cx="2" cy="2" r="1" fill={dotColor} fillOpacity={isDark ? "0.45" : "0.55"} />
          <circle cx="5" cy="5" r="0.75" fill={mutedColor} fillOpacity={isDark ? "0.3" : "0.4"} />
        </pattern>

        {/* 2. Hatched Dither Pattern */}
        <pattern
          id={`${idPrefix}hatched-dither-pattern`}
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="8" height="8" fill="transparent" />
          <line x1="0" y1="0" x2="0" y2="8" stroke={dotColor} strokeWidth="1.5" strokeOpacity={isDark ? "0.4" : "0.5"} strokeDasharray="2,2" />
        </pattern>

        {/* 3. Duotone Dither Pattern */}
        <pattern
          id={`${idPrefix}duotone-dither-pattern`}
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect width="4" height="4" fill="transparent" />
          <rect x="0" y="0" width="2" height="2" fill={dotColor} fillOpacity={isDark ? "0.4" : "0.5"} />
          <rect x="2" y="2" width="2" height="2" fill={dotColor} fillOpacity={isDark ? "0.4" : "0.5"} />
        </pattern>

        {/* 4. Striped Dither Pattern */}
        <pattern
          id={`${idPrefix}striped-dither-pattern`}
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <rect width="6" height="6" fill="transparent" />
          <line x1="0" y1="3" x2="6" y2="3" stroke={dotColor} strokeWidth="1.2" strokeOpacity={isDark ? "0.35" : "0.45"} strokeDasharray="1,1" />
        </pattern>

        {/* 5. Stipple Dotted Dither Pattern */}
        <pattern
          id={`${idPrefix}dotted-dither-pattern`}
          x="0"
          y="0"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
        >
          <rect width="5" height="5" fill="transparent" />
          <circle cx="1.5" cy="1.5" r="0.8" fill={dotColor} fillOpacity={isDark ? "0.5" : "0.6"} />
          <circle cx="4" cy="4" r="0.6" fill={dotColor} fillOpacity={isDark ? "0.3" : "0.4"} />
        </pattern>

        {/* 6. Dither Area Gradient (Dark & Light) */}
        <linearGradient id={`${idPrefix}dither-area-gradient`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isDark ? "#FFFFFF" : "#09090B"} stopOpacity={isDark ? "0.35" : "0.25"} />
          <stop offset="60%" stopColor={isDark ? "#A1A1AA" : "#52525B"} stopOpacity="0.08" />
          <stop offset="100%" stopColor={isDark ? "#000000" : "#FFFFFF"} stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`${idPrefix}dither-primary-gradient`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={isDark ? "#FFFFFF" : "#18181B"} stopOpacity="0.9" />
          <stop offset="50%" stopColor={isDark ? "#71717A" : "#71717A"} stopOpacity="0.7" />
          <stop offset="100%" stopColor={isDark ? "#27272A" : "#E4E4E7"} stopOpacity="0.5" />
        </linearGradient>

        {/* 7. SVG Dither Noise Filter */}
        <filter id={`${idPrefix}dither-noise-filter`} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0.15 0" />
        </filter>
      </defs>
    </svg>
  );
}

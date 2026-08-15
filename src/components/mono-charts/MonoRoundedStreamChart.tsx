import React, { useId } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { DitherChartTooltipContent } from '../dither-charts/lib/recharts-tooltip';

interface StreamPoint {
  t: string;
  w1: number;
  w2: number;
}

const STREAM_DATA: StreamPoint[] = [
  { t: '01', w1: 20, w2: 15 },
  { t: '02', w1: 45, w2: 30 },
  { t: '03', w1: 30, w2: 50 },
  { t: '04', w1: 70, w2: 35 },
  { t: '05', w1: 55, w2: 60 },
  { t: '06', w1: 85, w2: 40 },
];

interface MonoRoundedStreamChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedStreamChart({ theme = 'dark', compact = false }: MonoRoundedStreamChartProps) {
  const isDark = theme === 'dark';
  const idPrefix = useId().replace(/:/g, '');

  return (
    <div
      className={`relative w-full rounded-[24px] transition-all duration-300 group flex flex-col justify-between overflow-hidden p-4 sm:p-5 ${
        compact ? 'h-[220px] sm:h-[268px]' : 'min-h-[290px]'
      } ${
        isDark
          ? 'bg-[#181818] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:bg-[#202020]'
          : 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-neutral-100 text-black hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Stream Wave
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Fluid
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            125 <span className="text-xs font-normal opacity-70">peak flow</span>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <svg className="absolute w-0 h-0 pointer-events-none">
          <defs>
            <linearGradient id={`${idPrefix}stream-g1`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? "#FFFFFF" : "#09090B"} stopOpacity="0.4" />
              <stop offset="100%" stopColor={isDark ? "#FFFFFF" : "#09090B"} stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id={`${idPrefix}stream-g2`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? "#FFFFFF" : "#09090B"} stopOpacity="0.2" />
              <stop offset="100%" stopColor={isDark ? "#FFFFFF" : "#09090B"} stopOpacity="0.0" />
            </linearGradient>
          </defs>
        </svg>
        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <AreaChart data={STREAM_DATA} margin={{ top: 12, right: 12, left: -22, bottom: 0 }}>
            <XAxis dataKey="t" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />
            <Area
              type="natural"
              dataKey="w1"
              name="Wave 1"
              stroke={isDark ? '#FFFFFF' : '#09090B'}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={`url(#${idPrefix}stream-g1)`}
              animationDuration={800}
            />
            <Area
              type="natural"
              dataKey="w2"
              name="Wave 2"
              stroke={isDark ? '#A1A1AA' : '#52525B'}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={`url(#${idPrefix}stream-g2)`}
              animationDuration={900}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded Natural Spline</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>Dual Stream Wave</span>
      </div>
    </div>
  );
}

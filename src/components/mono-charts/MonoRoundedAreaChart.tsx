import React, { useState, useId } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { DitherChartTooltipContent } from '../dither-charts/lib/recharts-tooltip';

interface AreaPoint {
  time: string;
  volume: number;
}

const MONO_AREA_DATA: AreaPoint[] = [
  { time: '02:00', volume: 18 },
  { time: '06:00', volume: 34 },
  { time: '10:00', volume: 72 },
  { time: '14:00', volume: 89 },
  { time: '18:00', volume: 64 },
  { time: '22:00', volume: 48 },
];

interface MonoRoundedAreaChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedAreaChart({ theme = 'dark', compact = false }: MonoRoundedAreaChartProps) {
  const isDark = theme === 'dark';
  const idPrefix = useId().replace(/:/g, '');
  const [curve, setCurve] = useState<'monotone' | 'natural'>('monotone');

  const latestVal = MONO_AREA_DATA[MONO_AREA_DATA.length - 1].volume;

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
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Mono Curved Wave
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Soft Gradient
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            {latestVal}% <span className="text-xs font-normal opacity-70">peak throughput</span>
          </div>
        </div>

        {/* Curve Toggle */}
        <div className={`p-0.5 rounded-full border flex items-center gap-0.5 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'
        }`}>
          {(['monotone', 'natural'] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurve(c)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize transition-all cursor-pointer ${
                curve === c
                  ? isDark
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-black text-white font-semibold shadow-sm'
                  : isDark
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Recharts Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <svg className="absolute w-0 h-0 pointer-events-none">
          <defs>
            <linearGradient id={`${idPrefix}mono-area-gradient`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? "#FFFFFF" : "#09090B"} stopOpacity={isDark ? "0.35" : "0.25"} />
              <stop offset="100%" stopColor={isDark ? "#FFFFFF" : "#09090B"} stopOpacity="0.0" />
            </linearGradient>
          </defs>
        </svg>

        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <AreaChart data={MONO_AREA_DATA} margin={{ top: 12, right: 12, left: -22, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="2 2"
              vertical={false}
              stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
            />
            <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />

            {/* Mono Rounded Area Fill */}
            <Area
              type={curve}
              dataKey="volume"
              name="Volume Flow"
              stroke={isDark ? '#FFFFFF' : '#09090B'}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={`url(#${idPrefix}mono-area-gradient)`}
              animationDuration={900}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          Minimalist Spline Shading
        </span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>
          99.9% Linear Flow
        </span>
      </div>
    </div>
  );
}

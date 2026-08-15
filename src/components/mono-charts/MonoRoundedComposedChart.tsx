import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { DitherChartTooltipContent } from '../dither-charts/lib/recharts-tooltip';

interface ComposedPoint {
  label: string;
  count: number;
  trend: number;
}

const MONO_COMPOSED_DATA: ComposedPoint[] = [
  { label: 'Q1', count: 140, trend: 120 },
  { label: 'Q2', count: 210, trend: 190 },
  { label: 'Q3', count: 280, trend: 260 },
  { label: 'Q4', count: 350, trend: 340 },
];

interface MonoRoundedComposedChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedComposedChart({ theme = 'dark', compact = false }: MonoRoundedComposedChartProps) {
  const isDark = theme === 'dark';
  const [showLine, setShowLine] = useState<boolean>(true);

  const total = MONO_COMPOSED_DATA.reduce((acc, item) => acc + item.count, 0);

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
              Mono Hybrid Spline
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Pill + Line
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            {total} <span className="text-xs font-normal opacity-70">quarterly total</span>
          </div>
        </div>

        {/* Toggle Line Layer */}
        <button
          type="button"
          onClick={() => setShowLine(!showLine)}
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all cursor-pointer ${
            showLine
              ? isDark
                ? 'bg-white/10 text-white border-white/20'
                : 'bg-neutral-100 text-black border-neutral-300'
              : isDark
              ? 'bg-transparent border-white/5 text-neutral-500'
              : 'bg-transparent border-neutral-200 text-neutral-400'
          }`}
        >
          {showLine ? 'Spline On' : 'Spline Off'}
        </button>
      </div>

      {/* Main Recharts Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <ComposedChart data={MONO_COMPOSED_DATA} margin={{ top: 12, right: 12, left: -22, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="2 2"
              vertical={false}
              stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
            />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />

            {/* Rounded Pill Bar Column */}
            <Bar
              dataKey="count"
              name="Quarter Count"
              fill={isDark ? 'rgba(255,255,255,0.18)' : 'rgba(9,9,11,0.12)'}
              stroke={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(9,9,11,0.3)'}
              strokeWidth={1}
              radius={[8, 8, 8, 8]}
              barSize={20}
              animationDuration={800}
            />

            {/* Smooth Spline Overlay */}
            {showLine && (
              <Line
                type="monotone"
                dataKey="trend"
                name="Quarter Trend"
                stroke={isDark ? '#FFFFFF' : '#09090B'}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={{
                  r: 4,
                  fill: isDark ? '#FFFFFF' : '#09090B',
                  stroke: isDark ? '#181818' : '#FFFFFF',
                  strokeWidth: 2,
                }}
                animationDuration={900}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          Minimalist Monochromatic Layers
        </span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>
          Q4 Peak Target
        </span>
      </div>
    </div>
  );
}

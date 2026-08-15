import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { DitherChartTooltipContent } from '../dither-charts/lib/recharts-tooltip';

interface WaterfallPoint {
  step: string;
  base: number;
  delta: number;
}

const WATERFALL_DATA: WaterfallPoint[] = [
  { step: 'Start', base: 0, delta: 50 },
  { step: 'Inflow', base: 50, delta: 30 },
  { step: 'Outflow', base: 60, delta: 20 },
  { step: 'Net', base: 0, delta: 80 },
];

interface MonoRoundedWaterfallChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedWaterfallChart({ theme = 'dark', compact = false }: MonoRoundedWaterfallChartProps) {
  const isDark = theme === 'dark';

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
              Waterfall Steps
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Delta
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            +80 <span className="text-xs font-normal opacity-70">net delta</span>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <BarChart data={WATERFALL_DATA} margin={{ top: 12, right: 12, left: -22, bottom: 0 }}>
            <XAxis dataKey="step" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />
            <Bar dataKey="base" stackId="a" fill="transparent" />
            <Bar
              dataKey="delta"
              name="Delta"
              stackId="a"
              fill={isDark ? '#FFFFFF' : '#09090B'}
              radius={[6, 6, 6, 6]}
              barSize={18}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded Floating Pillars</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>Sequential Deltas</span>
      </div>
    </div>
  );
}

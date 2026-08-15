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

interface FunnelPoint {
  stage: string;
  volume: number;
}

const FUNNEL_DATA: FunnelPoint[] = [
  { stage: 'Visits', volume: 100 },
  { stage: 'Signup', volume: 68 },
  { stage: 'Active', volume: 42 },
  { stage: 'Pro', volume: 24 },
];

interface MonoRoundedFunnelChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedFunnelChart({ theme = 'dark', compact = false }: MonoRoundedFunnelChartProps) {
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
              Stage Funnel
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Pipeline
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            24% <span className="text-xs font-normal opacity-70">conversion</span>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <BarChart data={FUNNEL_DATA} layout="vertical" margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis dataKey="stage" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />
            <Bar
              dataKey="volume"
              name="Volume"
              fill={isDark ? '#FFFFFF' : '#09090B'}
              radius={[0, 8, 8, 0]}
              barSize={14}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded Horizontal Pills</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>4 Funnel Stages</span>
      </div>
    </div>
  );
}

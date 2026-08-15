import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { DitherChartTooltipContent } from '../dither-charts/lib/recharts-tooltip';

interface StackedPoint {
  label: string;
  layer1: number;
  layer2: number;
  layer3: number;
}

const STACKED_DATA: StackedPoint[] = [
  { label: 'Q1', layer1: 30, layer2: 25, layer3: 20 },
  { label: 'Q2', layer1: 45, layer2: 35, layer3: 25 },
  { label: 'Q3', layer1: 60, layer2: 40, layer3: 30 },
  { label: 'Q4', layer1: 75, layer2: 50, layer3: 35 },
];

interface MonoRoundedStackedBarChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedStackedBarChart({ theme = 'dark', compact = false }: MonoRoundedStackedBarChartProps) {
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
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Stacked Tones
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Layers
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            160 <span className="text-xs font-normal opacity-70">cumulative</span>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <BarChart data={STACKED_DATA} margin={{ top: 12, right: 12, left: -22, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 2" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />
            <Bar dataKey="layer1" name="Base" stackId="a" fill={isDark ? '#FFFFFF' : '#09090B'} radius={[0, 0, 8, 8]} barSize={18} />
            <Bar dataKey="layer2" name="Mid" stackId="a" fill={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(9,9,11,0.5)'} />
            <Bar dataKey="layer3" name="Top" stackId="a" fill={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(9,9,11,0.2)'} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>3 Monochrome Layers</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>Stacked Geometry</span>
      </div>
    </div>
  );
}

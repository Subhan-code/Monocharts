import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
} from 'recharts';
import { DitherChartTooltipContent } from '../dither-charts/lib/recharts-tooltip';

interface BubblePoint {
  x: number;
  y: number;
  z: number;
  tag: string;
}

const BUBBLE_DATA: BubblePoint[] = [
  { x: 20, y: 30, z: 300, tag: 'Cluster 1' },
  { x: 45, y: 70, z: 600, tag: 'Cluster 2' },
  { x: 70, y: 40, z: 450, tag: 'Cluster 3' },
  { x: 85, y: 80, z: 750, tag: 'Cluster 4' },
];

interface MonoRoundedBubbleChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedBubbleChart({ theme = 'dark', compact = false }: MonoRoundedBubbleChartProps) {
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
              Bubble Clusters
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Scaled
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            4 Clusters <span className="text-xs font-normal opacity-70">mapped</span>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <ScatterChart margin={{ top: 12, right: 12, left: -22, bottom: 0 }}>
            <XAxis dataKey="x" type="number" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <YAxis dataKey="y" type="number" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <ZAxis dataKey="z" range={[100, 500]} />
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />
            <Scatter
              name="Clusters"
              data={BUBBLE_DATA}
              fill={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(9,9,11,0.2)'}
              stroke={isDark ? '#FFFFFF' : '#09090B'}
              strokeWidth={2}
              animationDuration={800}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded Sphere Circles</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>Z-Scaled Radii</span>
      </div>
    </div>
  );
}

import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { DitherChartTooltipContent } from '../dither-charts/lib/recharts-tooltip';

interface ScatterPoint {
  x: number;
  y: number;
  z: number;
  name: string;
}

const MONO_SCATTER_DATA: ScatterPoint[] = [
  { x: 10, y: 30, z: 200, name: 'Node A' },
  { x: 25, y: 65, z: 400, name: 'Node B' },
  { x: 40, y: 45, z: 300, name: 'Node C' },
  { x: 55, y: 80, z: 500, name: 'Node D' },
  { x: 70, y: 60, z: 350, name: 'Node E' },
  { x: 85, y: 92, z: 600, name: 'Node F' },
];

interface MonoRoundedScatterChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedScatterChart({ theme = 'dark', compact = false }: MonoRoundedScatterChartProps) {
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
              Mono Scatter Matrix
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Rounded Nodes
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            6 Nodes <span className="text-xs font-normal opacity-70">mapped</span>
          </div>
        </div>
      </div>

      {/* Main Recharts Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <ScatterChart margin={{ top: 12, right: 12, left: -22, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="2 2"
              stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
            />
            <XAxis dataKey="x" type="number" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <YAxis dataKey="y" type="number" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <ZAxis dataKey="z" range={[60, 240]} />
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} cursor={{ strokeDasharray: '3 3' }} />

            <Scatter
              name="Cluster Nodes"
              data={MONO_SCATTER_DATA}
              fill={isDark ? '#FFFFFF' : '#09090B'}
              stroke={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(9,9,11,0.5)'}
              strokeWidth={1.5}
              animationDuration={800}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          Scale-Weighted Nodes
        </span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>
          99.8% Sync
        </span>
      </div>
    </div>
  );
}

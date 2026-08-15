import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Tooltip } from 'recharts';
import { DitherChartTooltipContent } from '../dither-charts/lib/recharts-tooltip';

interface PolarPoint {
  name: string;
  count: number;
}

const POLAR_DATA: PolarPoint[] = [
  { name: 'Alpha', count: 90 },
  { name: 'Beta', count: 65 },
  { name: 'Gamma', count: 40 },
];

interface MonoRoundedPolarChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedPolarChart({ theme = 'dark', compact = false }: MonoRoundedPolarChartProps) {
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
              Polar Pillars
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Radial
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            3 Bands <span className="text-xs font-normal opacity-70">polar angle</span>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 flex items-center justify-center ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="25%"
            outerRadius="85%"
            barSize={12}
            data={POLAR_DATA}
            startAngle={90}
            endAngle={-270}
          >
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />
            <RadialBar
              background={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
              dataKey="count"
              cornerRadius={6}
              fill={isDark ? '#FFFFFF' : '#09090B'}
              animationDuration={800}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded 360° Polar Arcs</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>Radial Pillars</span>
      </div>
    </div>
  );
}

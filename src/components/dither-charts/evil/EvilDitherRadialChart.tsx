import React, { useId } from 'react';
import { RadialBarChart, RadialBar, Tooltip, ResponsiveContainer } from 'recharts';
import { DitherPatternDefs } from '../lib/ditherPatterns';
import { DitherChartTooltipContent } from '../lib/recharts-tooltip';

interface RadialItem {
  name: string;
  value: number;
  fillPattern: string;
}

const RADIAL_DATA: RadialItem[] = [
  { name: 'Network', value: 85, fillPattern: 'dither-dot-pattern' },
  { name: 'Disk', value: 68, fillPattern: 'hatched-dither-pattern' },
  { name: 'Memory', value: 52, fillPattern: 'duotone-dither-pattern' },
  { name: 'CPU', value: 41, fillPattern: 'striped-dither-pattern' },
];

interface EvilDitherRadialChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function EvilDitherRadialChart({ theme = 'dark', compact = false }: EvilDitherRadialChartProps) {
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
            <span className={`text-xs font-semibold tracking-wide uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Radial Resource Gauges
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Concentric Rings
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5">
            85% <span className="text-xs font-normal opacity-70">Max Utilization</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Radial Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 flex items-center justify-center ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <DitherPatternDefs idPrefix={idPrefix} theme={theme} />

        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="25%"
            outerRadius="95%"
            barSize={10}
            data={RADIAL_DATA}
            startAngle={180}
            endAngle={-180}
          >
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />
            {RADIAL_DATA.map((item, idx) => (
              <RadialBar
                key={idx}
                background={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                dataKey="value"
                cornerRadius={5}
                fill={`url(#${idPrefix}${item.fillPattern})`}
                stroke={isDark ? '#FFFFFF' : '#18181B'}
                strokeWidth={1}
                animationDuration={800}
              />
            ))}
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs font-bold tabular-nums">4 Core</span>
          <span className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Cluster</span>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-around mt-3 pt-1 border-t border-white/5 text-[10px]">
        {RADIAL_DATA.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <span className="font-mono font-medium">{item.name}:</span>
            <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { DitherChartTooltipContent } from '../dither-charts/lib/recharts-tooltip';

interface DonutSegment {
  name: string;
  value: number;
  shade: string;
}

const MONO_DONUT_DATA: DonutSegment[] = [
  { name: 'Core Engine', value: 45, shade: '#FFFFFF' },
  { name: 'UI Layer', value: 30, shade: '#CBD5E1' },
  { name: 'Assets', value: 15, shade: '#94A3B8' },
  { name: 'Other', value: 10, shade: '#64748B' },
];

interface MonoRoundedDonutChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedDonutChart({ theme = 'dark', compact = false }: MonoRoundedDonutChartProps) {
  const isDark = theme === 'dark';
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const total = MONO_DONUT_DATA.reduce((acc, item) => acc + item.value, 0);

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
              Mono Rounded Donut
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Soft Arc Caps
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            {total}% <span className="text-xs font-normal opacity-70">allocation</span>
          </div>
        </div>
      </div>

      {/* Main Recharts Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 flex items-center justify-center ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <PieChart>
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />
            <Pie
              data={MONO_DONUT_DATA}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={compact ? 38 : 46}
              outerRadius={compact ? 58 : 68}
              paddingAngle={6}
              cornerRadius={8}
              strokeLinecap="round"
              onMouseEnter={(_, idx) => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              animationDuration={900}
            >
              {MONO_DONUT_DATA.map((entry, index) => {
                const isHovered = hoverIndex === index;
                const fillColor = isDark
                  ? index === 0
                    ? '#FFFFFF'
                    : index === 1
                    ? 'rgba(255,255,255,0.7)'
                    : index === 2
                    ? 'rgba(255,255,255,0.4)'
                    : 'rgba(255,255,255,0.2)'
                  : index === 0
                  ? '#09090B'
                  : index === 1
                  ? 'rgba(9,9,11,0.7)'
                  : index === 2
                  ? 'rgba(9,9,11,0.4)'
                  : 'rgba(9,9,11,0.2)';

                return (
                  <Cell
                    key={`mono-cell-${index}`}
                    fill={fillColor}
                    stroke={isDark ? '#181818' : '#FFFFFF'}
                    strokeWidth={2}
                    style={{
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: 'center center',
                      transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer',
                    }}
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Stat Callout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-sm font-bold tabular-nums font-sans">
            {hoverIndex !== null ? `${MONO_DONUT_DATA[hoverIndex].value}%` : '100%'}
          </span>
          <span className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {hoverIndex !== null ? MONO_DONUT_DATA[hoverIndex].name : 'Mono Arc'}
          </span>
        </div>
      </div>

      {/* Segment Legend Footer */}
      <div className="flex items-center justify-around mt-3 pt-1 border-t border-white/5 text-[10px]">
        {MONO_DONUT_DATA.map((seg, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>{seg.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

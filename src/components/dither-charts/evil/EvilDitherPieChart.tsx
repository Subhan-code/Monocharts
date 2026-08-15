import React, { useState, useId } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { DitherPatternDefs } from '../lib/ditherPatterns';
import { DitherChartTooltipContent } from '../lib/recharts-tooltip';

interface PieSegment {
  name: string;
  value: number;
  color: string;
}

const STORAGE_SEGMENTS: PieSegment[] = [
  { name: 'System', value: 420, color: '#FFFFFF' },
  { name: 'Media', value: 310, color: '#E2E8F0' },
  { name: 'Apps', value: 180, color: '#CBD5E1' },
  { name: 'Cache', value: 90, color: '#94A3B8' },
];

interface EvilDitherPieChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function EvilDitherPieChart({ theme = 'dark', compact = false }: EvilDitherPieChartProps) {
  const isDark = theme === 'dark';
  const idPrefix = useId().replace(/:/g, '');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const totalSize = STORAGE_SEGMENTS.reduce((acc, item) => acc + item.value, 0);

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
              Storage Allocation
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Padded Donut
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5">
            {totalSize} <span className="text-xs font-normal opacity-70">GB Total</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Recharts Donut Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 flex items-center justify-center ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <DitherPatternDefs idPrefix={idPrefix} theme={theme} />

        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <PieChart>
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />
            <Pie
              data={STORAGE_SEGMENTS}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={compact ? 38 : 46}
              outerRadius={compact ? 58 : 68}
              paddingAngle={4}
              cornerRadius={6}
              onMouseEnter={(_, index) => setActiveIdx(index)}
              onMouseLeave={() => setActiveIdx(null)}
              animationDuration={800}
            >
              {STORAGE_SEGMENTS.map((entry, index) => {
                const isSelected = activeIdx === index;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isSelected ? `url(#${idPrefix}hatched-dither-pattern)` : `url(#${idPrefix}dither-dot-pattern)`}
                    stroke={isDark ? '#FFFFFF' : '#18181B'}
                    strokeWidth={isSelected ? 2 : 1}
                    style={{
                      transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                      transformOrigin: 'center center',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer',
                    }}
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Donut Ring Stat */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs font-semibold tabular-nums">
            {activeIdx !== null ? `${STORAGE_SEGMENTS[activeIdx].value} GB` : '100%'}
          </span>
          <span className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {activeIdx !== null ? STORAGE_SEGMENTS[activeIdx].name : 'Used'}
          </span>
        </div>
      </div>

      {/* Segment Legend Footer */}
      <div className="flex items-center justify-around mt-3 pt-1 border-t border-white/5 text-[10px]">
        {STORAGE_SEGMENTS.map((seg, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>{seg.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

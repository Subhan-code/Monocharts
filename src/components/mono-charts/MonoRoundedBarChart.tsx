import React, { useState } from 'react';
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

interface BarPoint {
  label: string;
  primary: number;
  secondary: number;
}

const MONO_BAR_DATA: BarPoint[] = [
  { label: 'Mon', primary: 45, secondary: 25 },
  { label: 'Tue', primary: 78, secondary: 40 },
  { label: 'Wed', primary: 62, secondary: 30 },
  { label: 'Thu', primary: 95, secondary: 55 },
  { label: 'Fri', primary: 88, secondary: 50 },
  { label: 'Sat', primary: 54, secondary: 28 },
];

interface MonoRoundedBarChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedBarChart({ theme = 'dark', compact = false }: MonoRoundedBarChartProps) {
  const isDark = theme === 'dark';
  const [layout, setLayout] = useState<'vertical' | 'horizontal'>('vertical');

  const isHorizontal = layout === 'horizontal';

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
              Mono Pill Pillars
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Full Radius
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            422 <span className="text-xs font-normal opacity-70">units built</span>
          </div>
        </div>

        {/* Layout Switcher */}
        <div className={`p-0.5 rounded-full border flex items-center gap-0.5 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'
        }`}>
          {(['vertical', 'horizontal'] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLayout(l)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize transition-all cursor-pointer ${
                layout === l
                  ? isDark
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-black text-white font-semibold shadow-sm'
                  : isDark
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              {l === 'vertical' ? 'Col' : 'Row'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Recharts Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <BarChart
            data={MONO_BAR_DATA}
            layout={isHorizontal ? 'vertical' : 'horizontal'}
            margin={{ top: 12, right: 12, left: isHorizontal ? 0 : -22, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="2 2"
              vertical={false}
              stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
            />
            {isHorizontal ? (
              <>
                <XAxis type="number" hide />
                <YAxis dataKey="label" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
              </>
            ) : (
              <>
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }} />
              </>
            )}
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />

            {/* Primary Rounded Pill Column */}
            <Bar
              dataKey="primary"
              name="Primary Output"
              fill={isDark ? '#FFFFFF' : '#09090B'}
              radius={isHorizontal ? [0, 8, 8, 0] : [8, 8, 8, 8]}
              barSize={isHorizontal ? 12 : 16}
              animationDuration={800}
            />

            {/* Muted Secondary Column */}
            <Bar
              dataKey="secondary"
              name="Secondary Output"
              fill={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}
              radius={isHorizontal ? [0, 8, 8, 0] : [8, 8, 8, 8]}
              barSize={isHorizontal ? 12 : 16}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          Corner Radius: 8px All
        </span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>
          Monochrome Fill
        </span>
      </div>
    </div>
  );
}

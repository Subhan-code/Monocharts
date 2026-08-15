import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { DitherChartTooltipContent } from '../dither-charts/lib/recharts-tooltip';

interface LinePoint {
  label: string;
  value: number;
  secondary: number;
}

const MONO_LINE_DATA: LinePoint[] = [
  { label: 'Jan', value: 24, secondary: 18 },
  { label: 'Feb', value: 45, secondary: 32 },
  { label: 'Mar', value: 38, secondary: 29 },
  { label: 'Apr', value: 65, secondary: 48 },
  { label: 'May', value: 52, secondary: 41 },
  { label: 'Jun', value: 84, secondary: 62 },
];

interface MonoRoundedLineChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedLineChart({ theme = 'dark', compact = false }: MonoRoundedLineChartProps) {
  const isDark = theme === 'dark';
  const [activeSeries, setActiveSeries] = useState<'value' | 'all'>('all');

  const latestVal = MONO_LINE_DATA[MONO_LINE_DATA.length - 1].value;

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
              Spline Dynamics
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Line
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            {latestVal}k <span className="text-xs font-normal opacity-70">nodes</span>
          </div>
        </div>

        {/* Series Filter Toggle */}
        <div className={`p-0.5 rounded-full border flex items-center gap-0.5 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'
        }`}>
          {(['all', 'value'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActiveSeries(s)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize transition-all cursor-pointer ${
                activeSeries === s
                  ? isDark
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-black text-white font-semibold shadow-sm'
                  : isDark
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              {s === 'all' ? 'Dual' : 'Single'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Minimalist Recharts Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <LineChart data={MONO_LINE_DATA} margin={{ top: 12, right: 12, left: -22, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }}
            />
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />

            {activeSeries === 'all' && (
              <Line
                type="monotone"
                dataKey="secondary"
                name="Baseline"
                stroke={isDark ? '#52525B' : '#A1A1AA'}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4 4"
                dot={false}
                animationDuration={900}
              />
            )}

            <Line
              type="monotone"
              dataKey="value"
              name="Active"
              stroke={isDark ? '#FFFFFF' : '#09090B'}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              dot={{
                r: 4,
                fill: isDark ? '#FFFFFF' : '#09090B',
                stroke: isDark ? '#181818' : '#FFFFFF',
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: isDark ? '#FFFFFF' : '#09090B',
                stroke: isDark ? '#A1A1AA' : '#52525B',
                strokeWidth: 2,
              }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          Rounded Caps
        </span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>
          84k Peak
        </span>
      </div>
    </div>
  );
}

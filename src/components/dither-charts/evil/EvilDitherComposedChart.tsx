import React, { useState, useId } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DitherPatternDefs } from '../lib/ditherPatterns';
import { DitherChartTooltipContent } from '../lib/recharts-tooltip';

interface ComposedPoint {
  month: string;
  revenue: number;
  orders: number;
  target: number;
}

const COMPOSED_DATA: ComposedPoint[] = [
  { month: 'Jan', revenue: 4200, orders: 240, target: 4000 },
  { month: 'Feb', revenue: 5800, orders: 310, target: 4500 },
  { month: 'Mar', revenue: 6400, orders: 390, target: 5000 },
  { month: 'Apr', revenue: 7800, orders: 460, target: 5500 },
  { month: 'May', revenue: 7100, orders: 410, target: 6000 },
  { month: 'Jun', revenue: 9500, orders: 580, target: 6500 },
];

interface EvilDitherComposedChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function EvilDitherComposedChart({ theme = 'dark', compact = false }: EvilDitherComposedChartProps) {
  const isDark = theme === 'dark';
  const idPrefix = useId().replace(/:/g, '');
  const [showTarget, setShowTarget] = useState<boolean>(true);

  const latestRev = COMPOSED_DATA[COMPOSED_DATA.length - 1].revenue;

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
            <span className={`text-xs font-semibold tracking-wide uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Composed Performance
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Bar + Area + Line
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5">
            ${latestRev.toLocaleString()} <span className="text-xs font-normal opacity-70">MRR</span>
          </div>
        </div>

        {/* Toggle Target Layer */}
        <button
          type="button"
          onClick={() => setShowTarget(!showTarget)}
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all cursor-pointer ${
            showTarget
              ? isDark
                ? 'bg-white/10 text-white border-white/20'
                : 'bg-neutral-100 text-black border-neutral-300'
              : isDark
              ? 'bg-transparent border-white/5 text-neutral-500'
              : 'bg-transparent border-neutral-200 text-neutral-400'
          }`}
        >
          {showTarget ? 'Target On' : 'Target Off'}
        </button>
      </div>

      {/* Main Interactive Recharts Composed Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <DitherPatternDefs idPrefix={idPrefix} theme={theme} />

        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <ComposedChart data={COMPOSED_DATA} margin={{ top: 12, right: 8, left: -22, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="2 2"
              stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: isDark ? '#A1A1AA' : '#71717A' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }}
            />
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />

            {/* Dither Area Fill */}
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue ($)"
              fill={`url(#${idPrefix}dither-area-gradient)`}
              stroke="none"
              animationDuration={800}
            />

            {/* Dither Hatched Bar Columns */}
            <Bar
              dataKey="orders"
              name="Orders Count"
              fill={`url(#${idPrefix}hatched-dither-pattern)`}
              stroke={isDark ? '#71717A' : '#A1A1AA'}
              strokeWidth={1}
              radius={[3, 3, 0, 0]}
              animationDuration={900}
            />

            {/* Target Line */}
            {showTarget && (
              <Line
                type="monotone"
                dataKey="target"
                name="Target Benchmark"
                stroke={isDark ? '#FFFFFF' : '#09090B'}
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
                animationDuration={600}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          Growth: +34% YoY
        </span>
        <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>
          Target Achieved
        </span>
      </div>
    </div>
  );
}

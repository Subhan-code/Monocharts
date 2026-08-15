import React, { useState, useId } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion, useSpring, useTransform } from 'motion/react';
import { DitherPatternDefs } from '../lib/ditherPatterns';
import { DitherChartTooltipContent } from '../lib/recharts-tooltip';

interface BarData {
  label: string;
  desktop: number;
  mobile: number;
}

const MONTHLY_DATA: BarData[] = [
  { label: 'Jan', desktop: 186, mobile: 80 },
  { label: 'Feb', desktop: 305, mobile: 200 },
  { label: 'Mar', desktop: 237, mobile: 120 },
  { label: 'Apr', desktop: 273, mobile: 190 },
  { label: 'May', desktop: 209, mobile: 130 },
  { label: 'Jun', desktop: 314, mobile: 140 },
];

const WEEKLY_DATA: BarData[] = [
  { label: 'Mon', desktop: 120, mobile: 60 },
  { label: 'Tue', desktop: 210, mobile: 110 },
  { label: 'Wed', desktop: 180, mobile: 90 },
  { label: 'Thu', desktop: 290, mobile: 160 },
  { label: 'Fri', desktop: 340, mobile: 210 },
  { label: 'Sat', desktop: 260, mobile: 150 },
  { label: 'Sun', desktop: 190, mobile: 100 },
];

type Variant = 'dither-dot' | 'hatched' | 'duotone' | 'striped';

interface EvilDitherBarChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function EvilDitherBarChart({ theme = 'dark', compact = false }: EvilDitherBarChartProps) {
  const isDark = theme === 'dark';
  const idPrefix = useId().replace(/:/g, '');
  const [period, setPeriod] = useState<'month' | 'week'>('month');
  const [variant, setVariant] = useState<Variant>('dither-dot');

  const data = period === 'month' ? MONTHLY_DATA : WEEKLY_DATA;
  const totalDesktop = data.reduce((acc, item) => acc + item.desktop, 0);

  const getFillPattern = (varType: Variant) => {
    switch (varType) {
      case 'hatched':
        return `url(#${idPrefix}hatched-dither-pattern)`;
      case 'duotone':
        return `url(#${idPrefix}duotone-dither-pattern)`;
      case 'striped':
        return `url(#${idPrefix}striped-dither-pattern)`;
      default:
        return `url(#${idPrefix}dither-dot-pattern)`;
    }
  };

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
      {/* Header controls & stats */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold tracking-wide uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Dither Bar Matrix
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              EVIL Engine
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5">
            {totalDesktop.toLocaleString()} <span className="text-xs font-normal opacity-70">req/s</span>
          </div>
        </div>

        {/* Period Selector Tabs */}
        <div className={`p-0.5 rounded-full border flex items-center gap-0.5 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'
        }`}>
          {(['month', 'week'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize transition-all cursor-pointer ${
                period === p
                  ? isDark
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-black text-white font-semibold shadow-sm'
                  : isDark
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Recharts Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <DitherPatternDefs idPrefix={idPrefix} theme={theme} />

        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <BarChart data={data} margin={{ top: 12, right: 8, left: -22, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="2 2"
              vertical={false}
              stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: isDark ? '#A1A1AA' : '#71717A' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }}
            />
            <Tooltip
              content={<DitherChartTooltipContent theme={theme} indicator="dot" />}
              cursor={{ fill: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}
            />
            <Bar
              dataKey="desktop"
              name="Desktop Traffic"
              fill={getFillPattern(variant)}
              stroke={isDark ? '#FFFFFF' : '#18181B'}
              strokeWidth={1}
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            />
            <Bar
              dataKey="mobile"
              name="Mobile Traffic"
              fill={isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}
              stroke={isDark ? '#71717A' : '#A1A1AA'}
              strokeWidth={1}
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Variant Switcher Bar */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <span className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Pattern:
          </span>
          {(['dither-dot', 'hatched', 'duotone', 'striped'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              className={`px-2 py-0.5 rounded-md text-[10px] font-mono capitalize transition-all cursor-pointer ${
                variant === v
                  ? isDark
                    ? 'bg-white/20 text-white font-medium border border-white/30'
                    : 'bg-neutral-900 text-white font-medium'
                  : isDark
                  ? 'bg-white/5 text-neutral-400 hover:text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:text-black'
              }`}
            >
              {v.replace('-pattern', '')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

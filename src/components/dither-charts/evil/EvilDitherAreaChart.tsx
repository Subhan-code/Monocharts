import React, { useState, useId } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DitherPatternDefs } from '../lib/ditherPatterns';
import { DitherChartTooltipContent } from '../lib/recharts-tooltip';

interface AreaDataPoint {
  time: string;
  load: number;
  capacity: number;
}

const DATA_24H: AreaDataPoint[] = [
  { time: '00:00', load: 32, capacity: 100 },
  { time: '04:00', load: 24, capacity: 100 },
  { time: '08:00', load: 68, capacity: 100 },
  { time: '12:00', load: 85, capacity: 100 },
  { time: '16:00', load: 74, capacity: 100 },
  { time: '20:00', load: 56, capacity: 100 },
  { time: '23:59', load: 41, capacity: 100 },
];

const DATA_7D: AreaDataPoint[] = [
  { time: 'Mon', load: 45, capacity: 100 },
  { time: 'Tue', load: 62, capacity: 100 },
  { time: 'Wed', load: 79, capacity: 100 },
  { time: 'Thu', load: 88, capacity: 100 },
  { time: 'Fri', load: 94, capacity: 100 },
  { time: 'Sat', load: 51, capacity: 100 },
  { time: 'Sun', load: 38, capacity: 100 },
];

interface EvilDitherAreaChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function EvilDitherAreaChart({ theme = 'dark', compact = false }: EvilDitherAreaChartProps) {
  const isDark = theme === 'dark';
  const idPrefix = useId().replace(/:/g, '');
  const [range, setRange] = useState<'24h' | '7d'>('24h');
  const [curveType, setCurveType] = useState<'monotone' | 'stepAfter' | 'natural'>('monotone');

  const data = range === '24h' ? DATA_24H : DATA_7D;
  const currentPeak = Math.max(...data.map((d) => d.load));

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
      {/* Header stats & curve controls */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold tracking-wide uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Dither Area Shading
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Noise Fill
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5">
            {currentPeak}% <span className="text-xs font-normal opacity-70">peak load</span>
          </div>
        </div>

        {/* Range Selector Buttons */}
        <div className={`p-0.5 rounded-full border flex items-center gap-0.5 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'
        }`}>
          {(['24h', '7d'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase transition-all cursor-pointer ${
                range === r
                  ? isDark
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-black text-white font-semibold shadow-sm'
                  : isDark
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Recharts Area Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <DitherPatternDefs idPrefix={idPrefix} theme={theme} />

        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <AreaChart data={data} margin={{ top: 12, right: 8, left: -22, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
            />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: isDark ? '#A1A1AA' : '#71717A' }}
            />
            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: isDark ? '#71717A' : '#A1A1AA' }}
            />
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />
            
            {/* Primary Dither Gradient Layer */}
            <Area
              type={curveType}
              dataKey="load"
              name="System Load"
              stroke={isDark ? '#FFFFFF' : '#18181B'}
              strokeWidth={2}
              fill={`url(#${idPrefix}dither-area-gradient)`}
              animationDuration={900}
            />

            {/* Overlay Dither Dot Pattern Layer for Texture */}
            <Area
              type={curveType}
              dataKey="load"
              stroke="transparent"
              fill={`url(#${idPrefix}dither-dot-pattern)`}
              animationDuration={900}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Curve Type Selector Bar */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px]">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Curve:</span>
        <div className="flex items-center gap-1">
          {(['monotone', 'stepAfter', 'natural'] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurveType(c)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize transition-all cursor-pointer ${
                curveType === c
                  ? isDark
                    ? 'bg-white/20 text-white font-medium'
                    : 'bg-neutral-900 text-white font-medium'
                  : isDark
                  ? 'bg-white/5 text-neutral-400 hover:text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:text-black'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

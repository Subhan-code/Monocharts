import React, { useId } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DitherPatternDefs } from '../lib/ditherPatterns';
import { DitherChartTooltipContent } from '../lib/recharts-tooltip';

interface RadarItem {
  subject: string;
  current: number;
  benchmark: number;
}

const RADAR_DATA: RadarItem[] = [
  { subject: 'Speed', current: 120, benchmark: 110 },
  { subject: 'Reliability', current: 98, benchmark: 130 },
  { subject: 'Security', current: 140, benchmark: 130 },
  { subject: 'Usability', current: 115, benchmark: 90 },
  { subject: 'Scale', current: 130, benchmark: 120 },
  { subject: 'Coverage', current: 105, benchmark: 95 },
];

interface EvilDitherRadarChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function EvilDitherRadarChart({ theme = 'dark', compact = false }: EvilDitherRadarChartProps) {
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
              System Radar Matrix
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Polygon Web
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5">
            94.8 <span className="text-xs font-normal opacity-70">/ 100 Score</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Recharts Radar Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 flex items-center justify-center ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <DitherPatternDefs idPrefix={idPrefix} theme={theme} />

        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <RadarChart cx="50%" cy="50%" outerRadius={compact ? 42 : 52} data={RADAR_DATA}>
            <PolarGrid stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 9, fill: isDark ? '#A1A1AA' : '#71717A' }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />

            {/* Benchmark Series */}
            <Radar
              name="Benchmark"
              dataKey="benchmark"
              stroke={isDark ? '#71717A' : '#A1A1AA'}
              strokeWidth={1}
              strokeDasharray="2 2"
              fill={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
              animationDuration={600}
            />

            {/* Current System Series with Dither Fill */}
            <Radar
              name="Current System"
              dataKey="current"
              stroke={isDark ? '#FFFFFF' : '#09090B'}
              strokeWidth={2}
              fill={`url(#${idPrefix}dither-dot-pattern)`}
              fillOpacity={0.8}
              animationDuration={800}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[10px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          Security & Speed Leading
        </span>
        <span className={isDark ? 'text-cyan-400' : 'text-cyan-600'}>
          Multi-Axis Sync
        </span>
      </div>
    </div>
  );
}

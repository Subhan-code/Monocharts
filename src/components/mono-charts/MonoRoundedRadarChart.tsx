import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from 'recharts';
import { DitherChartTooltipContent } from '../dither-charts/lib/recharts-tooltip';

interface RadarPoint {
  subject: string;
  metric: number;
}

const RADAR_DATA: RadarPoint[] = [
  { subject: 'Speed', metric: 90 },
  { subject: 'Memory', metric: 75 },
  { subject: 'Scale', metric: 85 },
  { subject: 'Latency', metric: 95 },
  { subject: 'IOPS', metric: 80 },
];

interface MonoRoundedRadarChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedRadarChart({ theme = 'dark', compact = false }: MonoRoundedRadarChartProps) {
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
              Polygon Web
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Radar
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            85 <span className="text-xs font-normal opacity-70">score</span>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 flex items-center justify-center ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <RadarChart cx="50%" cy="50%" outerRadius={compact ? 42 : 52} data={RADAR_DATA}>
            <PolarGrid stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: isDark ? '#71717A' : '#A1A1AA' }} />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />
            <Radar
              name="Metric"
              dataKey="metric"
              stroke={isDark ? '#FFFFFF' : '#09090B'}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(9,9,11,0.15)'}
              animationDuration={800}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>5 Multi-Axis Nodes</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>Polygon Net</span>
      </div>
    </div>
  );
}

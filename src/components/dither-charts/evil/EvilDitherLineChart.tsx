import React, { useState, useEffect, useId } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DitherPatternDefs } from '../lib/ditherPatterns';
import { DitherChartTooltipContent } from '../lib/recharts-tooltip';

interface LinePoint {
  time: string;
  latency: number;
  p99: number;
}

const INITIAL_POINTS: LinePoint[] = [
  { time: '10:00', latency: 12, p99: 28 },
  { time: '10:05', latency: 18, p99: 34 },
  { time: '10:10', latency: 15, p99: 31 },
  { time: '10:15', latency: 29, p99: 45 },
  { time: '10:20', latency: 22, p99: 38 },
  { time: '10:25', latency: 16, p99: 30 },
  { time: '10:30', latency: 14, p99: 26 },
];

interface EvilDitherLineChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function EvilDitherLineChart({ theme = 'dark', compact = false }: EvilDitherLineChartProps) {
  const isDark = theme === 'dark';
  const idPrefix = useId().replace(/:/g, '');
  const [data, setData] = useState<LinePoint[]>(INITIAL_POINTS);
  const [isLive, setIsLive] = useState<boolean>(true);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setData((prev) => {
        const last = prev[prev.length - 1];
        const nextTime = new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const nextVal = Math.floor(12 + Math.random() * 22);
        const nextP99 = Math.floor(nextVal + 10 + Math.random() * 15);
        const nextArr = [...prev.slice(1), { time: nextTime, latency: nextVal, p99: nextP99 }];
        return nextArr;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isLive]);

  const latestVal = data[data.length - 1]?.latency ?? 14;

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
      {/* Header & Live Status indicator */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold tracking-wide uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Latency Telemetry
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              Live Ping
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5">
            {latestVal} <span className="text-xs font-normal opacity-70">ms avg</span>
          </div>
        </div>

        {/* Live Stream Toggle Button */}
        <button
          type="button"
          onClick={() => setIsLive(!isLive)}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
            isLive
              ? isDark
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-emerald-100 text-emerald-700 border-emerald-300'
              : isDark
              ? 'bg-white/5 border-white/10 text-neutral-400'
              : 'bg-neutral-100 border-neutral-200 text-neutral-600'
          }`}
        >
          {isLive ? 'Pause Stream' : 'Resume'}
        </button>
      </div>

      {/* Main Interactive Recharts Line Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <DitherPatternDefs idPrefix={idPrefix} theme={theme} />

        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <LineChart data={data} margin={{ top: 12, right: 8, left: -22, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="1 3"
              stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}
            />
            <XAxis
              dataKey="time"
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

            {/* P99 Latency Line */}
            <Line
              type="monotone"
              dataKey="p99"
              name="p99 Latency"
              stroke={isDark ? '#71717A' : '#A1A1AA'}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              animationDuration={500}
            />

            {/* Avg Latency Primary Line */}
            <Line
              type="monotone"
              dataKey="latency"
              name="Avg Latency"
              stroke={isDark ? '#FFFFFF' : '#09090B'}
              strokeWidth={2.5}
              dot={{
                r: 3,
                fill: isDark ? '#FFFFFF' : '#09090B',
                stroke: isDark ? '#181818' : '#FFFFFF',
                strokeWidth: 1.5,
              }}
              activeDot={{
                r: 5,
                fill: isDark ? '#FFFFFF' : '#09090B',
                stroke: isDark ? '#10B981' : '#059669',
                strokeWidth: 2,
              }}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics Indicator Bar */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          p95: {Math.round(latestVal * 1.4)}ms
        </span>
        <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>
          ● 100% Uptime
        </span>
      </div>
    </div>
  );
}

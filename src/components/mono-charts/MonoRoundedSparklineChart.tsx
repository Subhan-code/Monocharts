import React from 'react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

interface SparkRow {
  name: string;
  val: string;
  data: { x: number; y: number }[];
}

const SPARK_ROWS: SparkRow[] = [
  {
    name: 'CPU Temp',
    val: '42°C',
    data: [{ x: 1, y: 10 }, { x: 2, y: 25 }, { x: 3, y: 18 }, { x: 4, y: 40 }, { x: 5, y: 30 }],
  },
  {
    name: 'GPU Temp',
    val: '58°C',
    data: [{ x: 1, y: 15 }, { x: 2, y: 30 }, { x: 3, y: 22 }, { x: 4, y: 55 }, { x: 5, y: 48 }],
  },
  {
    name: 'Fan Speed',
    val: '1.2k RPM',
    data: [{ x: 1, y: 40 }, { x: 2, y: 35 }, { x: 3, y: 60 }, { x: 4, y: 50 }, { x: 5, y: 80 }],
  },
];

interface MonoRoundedSparklineChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedSparklineChart({ theme = 'dark', compact = false }: MonoRoundedSparklineChartProps) {
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
              Sparklines
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Telemetry
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            3 Rows <span className="text-xs font-normal opacity-70">active</span>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-3 transition-colors duration-300 flex flex-col justify-around gap-2 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        {SPARK_ROWS.map((row, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3">
            <div className="flex flex-col w-20 shrink-0">
              <span className={`text-[11px] font-medium ${isDark ? 'text-white' : 'text-black'}`}>{row.name}</span>
              <span className={`text-[10px] font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{row.val}</span>
            </div>
            <div className="flex-1 h-7">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={row.data}>
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke={isDark ? '#FFFFFF' : '#09090B'}
                    strokeWidth={2}
                    strokeLinecap="round"
                    dot={false}
                    animationDuration={800}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded Mini Splines</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>Real-Time Telemetry</span>
      </div>
    </div>
  );
}

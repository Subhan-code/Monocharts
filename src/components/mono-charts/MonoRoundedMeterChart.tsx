import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MonoRoundedMeterChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedMeterChart({ theme = 'dark', compact = false }: MonoRoundedMeterChartProps) {
  const isDark = theme === 'dark';
  const val = 78;

  const data = [
    { name: 'Active', value: val },
    { name: 'Remaining', value: 100 - val },
  ];

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
              Arc Meter
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Speedometer
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            {val}% <span className="text-xs font-normal opacity-70">load index</span>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 flex flex-col items-center justify-center ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <ResponsiveContainer width="100%" height={compact ? 120 : 140}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="70%"
              startAngle={180}
              endAngle={0}
              innerRadius={compact ? 42 : 52}
              outerRadius={compact ? 58 : 70}
              cornerRadius={6}
              strokeLinecap="round"
              paddingAngle={4}
            >
              <Cell fill={isDark ? '#FFFFFF' : '#09090B'} />
              <Cell fill={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(9,9,11,0.1)'} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute bottom-4 flex flex-col items-center pointer-events-none">
          <span className="text-lg font-bold tabular-nums font-sans">{val}%</span>
          <span className={`text-[10px] font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Optimal Load</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded Semi-Circle Arc</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>Gauge Meter</span>
      </div>
    </div>
  );
}

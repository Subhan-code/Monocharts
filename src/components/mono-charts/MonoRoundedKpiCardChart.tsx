import React from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface MonoRoundedKpiCardChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

const KPI_LINE_DATA = [
  { v: 30 }, { v: 45 }, { v: 35 }, { v: 60 }, { v: 50 }, { v: 85 }, { v: 75 }, { v: 95 }
];

export function MonoRoundedKpiCardChart({ theme = 'dark', compact = false }: MonoRoundedKpiCardChartProps) {
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
              KPI Stat Card
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Metric
            </span>
          </div>
          <div className="text-2xl font-extrabold tracking-tight tabular-nums mt-1 font-sans">
            $48,920 <span className="text-xs font-normal text-emerald-400 font-mono">+14.2%</span>
          </div>
        </div>
      </div>

      {/* Main Stage Stage Sparkline */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 flex flex-col justify-end ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <div className="w-full h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={KPI_LINE_DATA}>
              <defs>
                <linearGradient id="kpiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isDark ? "#FFFFFF" : "#09090B"} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={isDark ? "#FFFFFF" : "#09090B"} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={isDark ? '#FFFFFF' : '#09090B'}
                strokeWidth={2.5}
                strokeLinecap="round"
                fill="url(#kpiGrad)"
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded Sparkline Wave</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>Monthly Revenue</span>
      </div>
    </div>
  );
}

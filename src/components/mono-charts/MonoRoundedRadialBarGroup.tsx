import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Tooltip } from 'recharts';
import { DitherChartTooltipContent } from '../dither-charts/lib/recharts-tooltip';

interface GroupPoint {
  name: string;
  val: number;
}

const RADIAL_GROUP_DATA: GroupPoint[] = [
  { name: 'System', val: 85 },
  { name: 'Network', val: 62 },
  { name: 'Storage', val: 45 },
  { name: 'Memory', val: 30 },
];

interface MonoRoundedRadialBarGroupProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedRadialBarGroup({ theme = 'dark', compact = false }: MonoRoundedRadialBarGroupProps) {
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
              Radial Group
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Multi-Arc
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            4 Rings <span className="text-xs font-normal opacity-70">active</span>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 flex items-center justify-center ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        <ResponsiveContainer width="100%" height={compact ? 130 : 160}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="95%"
            barSize={8}
            data={RADIAL_GROUP_DATA}
            startAngle={180}
            endAngle={0}
          >
            <Tooltip content={<DitherChartTooltipContent theme={theme} indicator="dot" />} />
            {RADIAL_GROUP_DATA.map((_, idx) => (
              <RadialBar
                key={idx}
                background={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                dataKey="val"
                cornerRadius={8}
                fill={
                  isDark
                    ? idx === 0 ? '#FFFFFF' : idx === 1 ? 'rgba(255,255,255,0.7)' : idx === 2 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'
                    : idx === 0 ? '#09090B' : idx === 1 ? 'rgba(9,9,11,0.7)' : idx === 2 ? 'rgba(9,9,11,0.4)' : 'rgba(9,9,11,0.2)'
                }
                animationDuration={800}
              />
            ))}
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded 180° Radial Caps</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>4 Gauge Arcs</span>
      </div>
    </div>
  );
}

import React from 'react';

interface HeatmapNode {
  day: string;
  hours: number[];
}

const HEATMAP_DATA: HeatmapNode[] = [
  { day: 'Mon', hours: [10, 40, 80, 50, 90, 30, 60] },
  { day: 'Tue', hours: [30, 60, 90, 70, 40, 80, 20] },
  { day: 'Wed', hours: [50, 70, 30, 80, 60, 90, 40] },
  { day: 'Thu', hours: [20, 80, 60, 40, 90, 50, 70] },
  { day: 'Fri', hours: [60, 90, 70, 90, 50, 30, 80] },
];

interface MonoRoundedHeatmapChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedHeatmapChart({ theme = 'dark', compact = false }: MonoRoundedHeatmapChartProps) {
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
              Matrix Heatmap
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Activity
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            35 Nodes <span className="text-xs font-normal opacity-70">mapped</span>
          </div>
        </div>
      </div>

      {/* Main Stage Matrix Grid */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-3 transition-colors duration-300 flex flex-col justify-center gap-1.5 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        {HEATMAP_DATA.map((row, rIdx) => (
          <div key={rIdx} className="flex items-center justify-between gap-1.5">
            <span className={`text-[10px] font-mono w-7 shrink-0 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {row.day}
            </span>
            <div className="flex-1 flex items-center justify-between gap-1.5">
              {row.hours.map((val, cIdx) => {
                const opacity = val / 100;
                return (
                  <div
                    key={cIdx}
                    title={`Activity: ${val}%`}
                    className="h-4 sm:h-5 flex-1 rounded-md transition-all hover:scale-110 cursor-pointer"
                    style={{
                      backgroundColor: isDark ? `rgba(255,255,255,${opacity})` : `rgba(9,9,11,${opacity})`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded Node Cells</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>7x5 Density Grid</span>
      </div>
    </div>
  );
}

import React from 'react';

export interface ChartLegendContentProps {
  payload?: any[];
  theme?: 'dark' | 'light';
  onToggleSeries?: (dataKey: string) => void;
  activeKeys?: string[];
}

export function DitherChartLegendContent({
  payload,
  theme = 'dark',
  onToggleSeries,
  activeKeys,
}: ChartLegendContentProps) {
  if (!payload || payload.length === 0) return null;

  const isDark = theme === 'dark';

  return (
    <div className="flex items-center justify-center flex-wrap gap-3 pt-2 text-xs font-sans">
      {payload.map((item, idx) => {
        const key = item.dataKey || item.value;
        const isActive = activeKeys ? activeKeys.includes(key) : true;
        const color = item.color || (isDark ? '#FFFFFF' : '#000000');

        return (
          <button
            key={idx}
            type="button"
            onClick={() => onToggleSeries?.(key)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
              isActive
                ? isDark
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-neutral-100 border-neutral-300 text-neutral-900'
                : isDark
                ? 'bg-transparent border-white/5 text-neutral-500 opacity-50'
                : 'bg-transparent border-neutral-200 text-neutral-400 opacity-50'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="font-medium tracking-tight">{item.value || key}</span>
          </button>
        );
      })}
    </div>
  );
}

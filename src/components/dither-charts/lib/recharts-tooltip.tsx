import React from 'react';

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  theme?: 'dark' | 'light';
  indicator?: 'dot' | 'line' | 'dashed';
  formatter?: (value: any, name: string) => React.ReactNode;
}

export function DitherChartTooltipContent({
  active,
  payload,
  label,
  theme = 'dark',
  indicator = 'dot',
  formatter,
}: ChartTooltipContentProps) {
  if (!active || !payload || payload.length === 0) return null;

  const isDark = theme === 'dark';

  return (
    <div
      className={`px-3 py-2 rounded-xl text-xs shadow-2xl backdrop-blur-md border transition-all pointer-events-none font-sans z-50 ${
        isDark
          ? 'bg-[#181818]/90 border-white/10 text-white shadow-black/80'
          : 'bg-white/95 border-neutral-200 text-neutral-900 shadow-neutral-300/50'
      }`}
    >
      {label && (
        <div className={`font-medium mb-1.5 pb-1 border-b tracking-tight ${
          isDark ? 'border-white/10 text-neutral-300' : 'border-neutral-200 text-neutral-600'
        }`}>
          {label}
        </div>
      )}
      <div className="flex flex-col gap-1">
        {payload.map((item, idx) => {
          const color = item.color || item.fill || (isDark ? '#FFFFFF' : '#000000');
          const valueDisplay = formatter
            ? formatter(item.value, item.name)
            : typeof item.value === 'number'
            ? item.value.toLocaleString()
            : item.value;

          return (
            <div key={idx} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                {indicator === 'dot' && (
                  <span
                    className="w-2 h-2 rounded-full ring-1 ring-white/20"
                    style={{ backgroundColor: color }}
                  />
                )}
                {indicator === 'line' && (
                  <span
                    className="w-2.5 h-0.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                )}
                <span className={`font-normal ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {item.name || item.dataKey}:
                </span>
              </div>
              <span className="font-semibold tabular-nums">
                {valueDisplay}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';

interface BulletItem {
  title: string;
  actual: number;
  target: number;
}

const BULLET_ITEMS: BulletItem[] = [
  { title: 'Throughput', actual: 82, target: 75 },
  { title: 'Latency', actual: 65, target: 80 },
  { title: 'Uptime', actual: 95, target: 90 },
];

interface MonoRoundedBulletChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedBulletChart({ theme = 'dark', compact = false }: MonoRoundedBulletChartProps) {
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
              Bullet Target
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Benchmark
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            3 Targets <span className="text-xs font-normal opacity-70">evaluated</span>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-3 transition-colors duration-300 flex flex-col justify-around gap-2 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        {BULLET_ITEMS.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>{item.title}</span>
              <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>{item.actual}% / {item.target}%</span>
            </div>
            <div className={`relative w-full h-3.5 rounded-full overflow-hidden ${
              isDark ? 'bg-white/10' : 'bg-black/10'
            }`}>
              {/* Actual Bar */}
              <div
                className={`h-full rounded-full transition-all ${
                  isDark ? 'bg-white' : 'bg-black'
                }`}
                style={{ width: `${item.actual}%` }}
              />
              {/* Target Marker */}
              <div
                className="absolute top-0 bottom-0 w-1 rounded-full bg-emerald-400 shadow-sm"
                style={{ left: `${item.target}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded Bullet Bars</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>Benchmark Marker</span>
      </div>
    </div>
  );
}

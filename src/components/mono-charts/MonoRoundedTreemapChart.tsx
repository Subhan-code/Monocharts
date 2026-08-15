import React from 'react';

interface TileNode {
  label: string;
  share: number;
  flex: string;
  opacity: number;
}

const TREEMAP_TILES: TileNode[] = [
  { label: 'Storage', share: 45, flex: 'col-span-2 row-span-2', opacity: 1 },
  { label: 'Compute', share: 30, flex: 'col-span-1 row-span-2', opacity: 0.6 },
  { label: 'Network', share: 15, flex: 'col-span-2 row-span-1', opacity: 0.35 },
  { label: 'Cache', share: 10, flex: 'col-span-1 row-span-1', opacity: 0.2 },
];

interface MonoRoundedTreemapChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedTreemapChart({ theme = 'dark', compact = false }: MonoRoundedTreemapChartProps) {
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
              Tile Treemap
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Allocation
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            100% <span className="text-xs font-normal opacity-70">partitioned</span>
          </div>
        </div>
      </div>

      {/* Main Stage Grid */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-2 transition-colors duration-300 grid grid-cols-3 grid-rows-3 gap-1.5 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        {TREEMAP_TILES.map((tile, idx) => (
          <div
            key={idx}
            className={`${tile.flex} rounded-xl p-2 flex flex-col justify-between transition-all hover:scale-[1.02] cursor-pointer border ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}
            style={{
              backgroundColor: isDark
                ? `rgba(255,255,255,${tile.opacity})`
                : `rgba(9,9,11,${tile.opacity})`,
              color: isDark ? (tile.opacity > 0.5 ? '#000000' : '#FFFFFF') : (tile.opacity > 0.5 ? '#FFFFFF' : '#000000'),
            }}
          >
            <span className="text-[11px] font-bold tracking-tight font-sans">{tile.label}</span>
            <span className="text-[10px] font-mono opacity-80">{tile.share}%</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded Corner Tiles</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>4 Resource Partitions</span>
      </div>
    </div>
  );
}

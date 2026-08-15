import React from 'react';

interface MonoRoundedSankeyChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedSankeyChart({ theme = 'dark', compact = false }: MonoRoundedSankeyChartProps) {
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
              Sankey Flow
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Transfer
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            100% <span className="text-xs font-normal opacity-70">flow routed</span>
          </div>
        </div>
      </div>

      {/* Main Stage Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-3 transition-colors duration-300 flex items-center justify-between gap-4 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        {/* Left Source Nodes */}
        <div className="flex flex-col justify-around h-full gap-2 z-10">
          <div className="w-12 h-9 rounded-lg bg-current opacity-90 flex items-center justify-center text-[10px] font-bold font-mono text-background">
            Source A
          </div>
          <div className="w-12 h-9 rounded-lg bg-current opacity-60 flex items-center justify-center text-[10px] font-bold font-mono text-background">
            Source B
          </div>
        </div>

        {/* SVG Flow Channels */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none p-4" preserveAspectRatio="none">
          <path
            d="M 60,35 C 130,35 150,55 220,55"
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            strokeOpacity={isDark ? "0.3" : "0.2"}
            strokeLinecap="round"
          />
          <path
            d="M 60,85 C 130,85 150,55 220,55"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeOpacity={isDark ? "0.25" : "0.15"}
            strokeLinecap="round"
          />
        </svg>

        {/* Right Sink Node */}
        <div className="flex items-center justify-center h-full z-10">
          <div className="w-14 h-14 rounded-xl bg-current flex flex-col items-center justify-center text-[10px] font-bold font-mono text-background shadow-md">
            <span>Target</span>
            <span className="text-[9px] font-normal opacity-80">Output</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded Flow Bands</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>Channel Routing</span>
      </div>
    </div>
  );
}

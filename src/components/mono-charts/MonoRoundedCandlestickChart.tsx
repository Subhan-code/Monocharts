import React from 'react';

interface CandlePoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

const CANDLE_DATA: CandlePoint[] = [
  { time: '09:30', open: 120, high: 145, low: 110, close: 140 },
  { time: '10:30', open: 140, high: 160, low: 135, close: 155 },
  { time: '11:30', open: 155, high: 158, low: 125, close: 130 },
  { time: '12:30', open: 130, high: 170, low: 128, close: 165 },
  { time: '13:30', open: 165, high: 180, low: 150, close: 175 },
];

interface MonoRoundedCandlestickChartProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
}

export function MonoRoundedCandlestickChart({ theme = 'dark', compact = false }: MonoRoundedCandlestickChartProps) {
  const isDark = theme === 'dark';
  const minVal = 100;
  const maxVal = 190;
  const range = maxVal - minVal;

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
              Financial Wicks
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
              Candlestick
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            175.00 <span className="text-xs font-normal opacity-70">close price</span>
          </div>
        </div>
      </div>

      {/* Main Stage Stage */}
      <div className={`relative w-full flex-1 rounded-[14px] overflow-hidden p-3 transition-colors duration-300 flex items-center justify-around gap-2 ${
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      }`}>
        {CANDLE_DATA.map((c, idx) => {
          const isBull = c.close >= c.open;
          const bodyTop = Math.max(c.open, c.close);
          const bodyBottom = Math.min(c.open, c.close);
          
          const bodyTopPct = ((maxVal - bodyTop) / range) * 100;
          const bodyHeightPct = Math.max(8, ((bodyTop - bodyBottom) / range) * 100);
          const highPct = ((maxVal - c.high) / range) * 100;
          const lowPct = ((maxVal - c.low) / range) * 100;

          return (
            <div key={idx} className="relative flex-1 h-full flex flex-col items-center justify-center">
              {/* Wick Line */}
              <div
                className="absolute w-0.5 rounded-full bg-current opacity-40"
                style={{
                  top: `${highPct}%`,
                  bottom: `${100 - lowPct}%`,
                }}
              />
              {/* Body Box */}
              <div
                className="absolute w-5 sm:w-6 rounded-md transition-all border"
                style={{
                  top: `${bodyTopPct}%`,
                  height: `${bodyHeightPct}%`,
                  backgroundColor: isBull
                    ? isDark ? '#FFFFFF' : '#09090B'
                    : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(9,9,11,0.15)',
                  borderColor: isDark ? '#FFFFFF' : '#09090B',
                }}
              />
              <span className={`absolute bottom-0 text-[9px] font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {c.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>Rounded Wick Endcaps</span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>5 Price Candles</span>
      </div>
    </div>
  );
}

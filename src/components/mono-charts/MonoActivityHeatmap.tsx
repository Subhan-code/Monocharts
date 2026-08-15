import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/cn';

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type Contribution = {
  date: string;
  count: number;
  level: ContributionLevel;
};

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

interface MonoActivityHeatmapProps {
  theme?: 'dark' | 'light';
  accentColor?: 'green' | 'blue' | 'purple' | 'mono';
  compact?: boolean;
}

function generateDemoContributions(weeks: number): Contribution[] {
  const today = new Date();
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (weeks * 7 - 1 - i));
    
    const rand = Math.random();
    let level: ContributionLevel = 0;
    let count = 0;

    if (rand > 0.35) {
      level = Math.floor(Math.random() * 4 + 1) as ContributionLevel;
      count = level * 3 + Math.floor(Math.random() * 4);
    }

    return {
      date: date.toISOString().slice(0, 10),
      count,
      level,
    };
  });
}

function toWeeks(contributions: Contribution[]) {
  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }
  return weeks;
}

export function MonoActivityHeatmap({
  theme = 'dark',
  accentColor = 'green',
  compact = false,
}: MonoActivityHeatmapProps) {
  const isDark = theme === 'dark';
  const [hoveredDay, setHoveredDay] = useState<Contribution | null>(null);

  const demoData = useMemo(() => generateDemoContributions(20), []);
  const weeks = useMemo(() => toWeeks(demoData), [demoData]);

  const totalContributions = useMemo(
    () => demoData.reduce((sum, d) => sum + d.count, 0),
    [demoData]
  );

  // Color config according to accentColor prop
  const colorScale = useMemo(() => {
    switch (accentColor) {
      case 'green':
        return {
          bg: '#39d353',
          badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          badgeText: 'Emerald Matrix',
        };
      case 'blue':
        return {
          bg: '#3b82f6',
          badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          badgeText: 'Sky Blue Grid',
        };
      case 'purple':
        return {
          bg: '#a855f7',
          badgeClass: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
          badgeText: 'Violet Pulse',
        };
      case 'mono':
      default:
        return {
          bg: isDark ? '#FFFFFF' : '#09090B',
          badgeClass: 'bg-white/10 text-white border-white/20',
          badgeText: 'Monochrome Heat',
        };
    }
  }, [accentColor, isDark]);

  const opacityForLevel = (lvl: ContributionLevel) => {
    switch (lvl) {
      case 0: return isDark ? 0.06 : 0.08;
      case 1: return 0.3;
      case 2: return 0.55;
      case 3: return 0.8;
      case 4: return 1;
    }
  };

  return (
    <div
      className={cn(
        'relative w-full rounded-[24px] transition-all duration-300 group flex flex-col justify-between overflow-hidden p-4 sm:p-5 font-sans',
        compact ? 'h-[220px] sm:h-[268px]' : 'min-h-[290px]',
        isDark
          ? 'bg-[#181818] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-white hover:bg-[#202020]'
          : 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-neutral-100 text-black hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Activity Heatmap
            </span>
            <span className={cn('inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono border', colorScale.badgeClass)}>
              {colorScale.badgeText}
            </span>
          </div>
          <div className="text-xl font-bold tracking-tight tabular-nums mt-0.5 font-sans">
            {totalContributions} <span className="text-xs font-normal opacity-70">contributions</span>
          </div>
        </div>
      </div>

      {/* Main Heatmap Stage Grid (No list drawer animation!) */}
      <div className={cn(
        'relative w-full flex-1 rounded-[14px] overflow-hidden p-3 transition-colors duration-300 flex flex-col justify-center items-center',
        isDark ? 'bg-[#131313]' : 'bg-[#f4f4f6]'
      )}>
        {/* Month Headers */}
        <div className="flex justify-center gap-1.5 mb-1.5 w-full">
          {MONTH_NAMES.slice(0, 5).map((m, idx) => (
            <span key={idx} className={`text-[10px] font-mono flex-1 text-center ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {m}
            </span>
          ))}
        </div>

        {/* 20-Week Heatmap Grid */}
        <div className="flex justify-center gap-1.5 w-full overflow-hidden" onMouseLeave={() => setHoveredDay(null)}>
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1.5 flex-1 items-center">
              {week.map((day, dIdx) => (
                <motion.div
                  key={`${wIdx}-${dIdx}`}
                  onMouseEnter={() => setHoveredDay(day)}
                  className="w-full h-3 sm:h-3.5 rounded-[3px] transition-all cursor-pointer hover:scale-125"
                  style={{
                    backgroundColor: colorScale.bg,
                    opacity: opacityForLevel(day.level),
                  }}
                  whileHover={{ scale: 1.25 }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Active Cell Tooltip Callout */}
        <div className="h-5 mt-2 flex items-center justify-center">
          {hoveredDay ? (
            <span className={`text-[10px] font-mono ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
              {hoveredDay.count} {hoveredDay.count === 1 ? 'item' : 'items'} on {hoveredDay.date}
            </span>
          ) : (
            <span className={`text-[10px] font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Hover tiles for metrics
            </span>
          )}
        </div>
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between mt-3 pt-1 border-t border-white/5 text-[11px] font-mono">
        <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          20 Weeks x 7 Days Grid
        </span>
        <span className={isDark ? 'text-white font-medium' : 'text-black font-medium'}>
          Subhan Activity
        </span>
      </div>
    </div>
  );
}

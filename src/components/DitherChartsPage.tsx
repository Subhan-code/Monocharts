import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EvilDitherBarChart } from './dither-charts/evil/EvilDitherBarChart';
import { EvilDitherAreaChart } from './dither-charts/evil/EvilDitherAreaChart';
import { EvilDitherLineChart } from './dither-charts/evil/EvilDitherLineChart';
import { EvilDitherPieChart } from './dither-charts/evil/EvilDitherPieChart';
import { EvilDitherComposedChart } from './dither-charts/evil/EvilDitherComposedChart';
import { EvilDitherRadarChart } from './dither-charts/evil/EvilDitherRadarChart';
import { EvilDitherRadialChart } from './dither-charts/evil/EvilDitherRadialChart';

// Legacy Dither Visualizers
import { DitherDonutChart } from './dither-charts/DitherDonutChart';
import { DitherGrowthChart } from './dither-charts/DitherGrowthChart';
import { DitherStackedChart } from './dither-charts/DitherStackedChart';
import { DitherFunnelChart } from './dither-charts/DitherFunnelChart';
import { ActivityHeatmap } from './dither-charts/ActivityHeatmap';
import { ServerGauge } from './dither-charts/ServerGauge';
import { TrafficBubble } from './dither-charts/TrafficBubble';
import { DeviceUsageChart } from './dither-charts/DeviceUsageChart';
import { StorageUsageChart } from './dither-charts/StorageUsageChart';
import { RevenueLineChart } from './dither-charts/RevenueLineChart';
import { UptimeChart } from './dither-charts/UptimeChart';

import { InViewRender } from './InViewRender';
import { Box, Sparkles, ArrowRight, Zap } from 'lucide-react';

interface DitherChartsPageProps {
  theme: 'dark' | 'light';
  showToast?: (message: string) => void;
  triggerHaptic?: (type: 'success' | 'warning' | 'error' | 'light' | 'medium' | 'heavy') => void;
  onNavigate3D?: () => void;
}

type CompCategory = 'all' | 'bar-area' | 'line-composed' | 'donut-radial' | 'radar-heatmap' | 'original-dither';

export function DitherChartsPage({ theme, showToast, triggerHaptic, onNavigate3D }: DitherChartsPageProps) {
  const [activeCategory, setActiveCategory] = useState<CompCategory>('all');

  const handleCategoryChange = useCallback((cat: CompCategory) => {
    setActiveCategory(cat);
    if (triggerHaptic) triggerHaptic('light');
  }, [triggerHaptic]);

  const CATEGORY_LABELS: { id: CompCategory; label: string }[] = [
    { id: 'all', label: 'All Visualizers' },
    { id: 'bar-area', label: 'Bar & Area Matrix' },
    { id: 'line-composed', label: 'Line & Composed' },
    { id: 'donut-radial', label: 'Donut & Radial Rings' },
    { id: 'radar-heatmap', label: 'Radar & Gauges' },
    { id: 'original-dither', label: 'Original Dither Matrix' },
  ];

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10 font-sans">

      {/* Page Hero Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${
          theme === 'dark' ? 'bg-white/10 text-neutral-300 border border-white/10' : 'bg-neutral-200 text-neutral-700 border border-neutral-300'
        }`}>
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>EVIL Engine + Dither Shaders</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
          Dither Charts
        </h1>
        <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
          State-of-the-art charting primitives powered by EvilCharts backend logic, SVG pixel dither fill matrices, spring physics, and real-time telemetry visualizers.
        </p>
      </div>

      {/* Banner: Link to 3D Page for 3D Dither Lab Book */}
      <div className={`w-full rounded-[24px] p-6 border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl transition-all ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-[#181818] via-[#1c1c1f] to-[#181818] border-white/10'
          : 'bg-gradient-to-r from-neutral-50 via-white to-neutral-50 border-neutral-200'
      }`}>
        <div className="flex items-center gap-4 text-left">
          <div className={`p-3.5 rounded-2xl ${
            theme === 'dark' ? 'bg-white/10 text-white' : 'bg-neutral-900 text-white'
          }`}>
            <Box className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold tracking-tight">
              Looking for the 3D Dither Lab Book?
            </h3>
            <p className={`text-xs sm:text-sm mt-0.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Experience interactive 3D page-flipping motion, cream paper textures, and depth controls on our dedicated 3D Showcase Page.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (onNavigate3D) {
              onNavigate3D();
            } else {
              window.location.hash = '#3d';
            }
          }}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-md hover:scale-[1.03] active:scale-[0.98] ${
            theme === 'dark'
              ? 'bg-white text-black hover:bg-neutral-200'
              : 'bg-black text-white hover:bg-neutral-800'
          }`}
        >
          <span>Explore 3D Showcase</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {CATEGORY_LABELS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleCategoryChange(item.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all cursor-pointer border ${
              activeCategory === item.id
                ? (theme === 'dark' ? 'bg-white text-black border-white font-semibold' : 'bg-black text-white border-black font-semibold')
                : (theme === 'dark' ? 'bg-white/5 border-white/10 text-neutral-400 hover:text-white' : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-black')
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Real-time Dither Charts Grid */}
      <div className={`w-full rounded-[24px] p-6 border flex flex-col gap-6 shadow-xl ${
        theme === 'dark' ? 'bg-[#181818] border-white/10' : 'bg-white border-neutral-200'
      }`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full flex flex-col gap-8"
          >
            {/* 1. NEW EVIL DITHER ENGINE SUITE */}
            {(activeCategory === 'all' || activeCategory === 'bar-area') && (
              <div>
                <div className="text-xs font-mono uppercase tracking-wider mb-4 opacity-60 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  EvilDither Bar & Area Shading Suite
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                  <InViewRender><EvilDitherBarChart theme={theme} /></InViewRender>
                  <InViewRender><EvilDitherAreaChart theme={theme} /></InViewRender>
                </div>
              </div>
            )}

            {(activeCategory === 'all' || activeCategory === 'line-composed') && (
              <div>
                <div className="text-xs font-mono uppercase tracking-wider mb-4 opacity-60 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  EvilDither Line Telemetry & Composed Charts
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                  <InViewRender><EvilDitherLineChart theme={theme} /></InViewRender>
                  <InViewRender><EvilDitherComposedChart theme={theme} /></InViewRender>
                </div>
              </div>
            )}

            {(activeCategory === 'all' || activeCategory === 'donut-radial') && (
              <div>
                <div className="text-xs font-mono uppercase tracking-wider mb-4 opacity-60 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  EvilDither Donut, Pie & Radial Progress Rings
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                  <InViewRender><EvilDitherPieChart theme={theme} /></InViewRender>
                  <InViewRender><EvilDitherRadialChart theme={theme} /></InViewRender>
                </div>
              </div>
            )}

            {(activeCategory === 'all' || activeCategory === 'radar-heatmap') && (
              <div>
                <div className="text-xs font-mono uppercase tracking-wider mb-4 opacity-60 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  EvilDither Radar Web & Polygon Matrix
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                  <InViewRender><EvilDitherRadarChart theme={theme} /></InViewRender>
                  <InViewRender><ActivityHeatmap theme={theme} /></InViewRender>
                </div>
              </div>
            )}

            {/* 2. ORIGINAL DITHER MATRIX PRESERVED SUITE */}
            {(activeCategory === 'all' || activeCategory === 'original-dither') && (
              <div>
                <div className="text-xs font-mono uppercase tracking-wider mb-4 opacity-60 flex items-center gap-2 pt-4 border-t border-white/10">
                  <span className="w-2 h-2 rounded-full bg-neutral-400" />
                  Original Canvas Dither Matrix Suite (Preserved)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                  <InViewRender><DitherDonutChart theme={theme} /></InViewRender>
                  <InViewRender><ServerGauge theme={theme} /></InViewRender>
                  <InViewRender><DeviceUsageChart theme={theme} /></InViewRender>
                  <InViewRender><DitherGrowthChart theme={theme} /></InViewRender>
                  <InViewRender><TrafficBubble theme={theme} /></InViewRender>
                  <InViewRender><RevenueLineChart theme={theme} /></InViewRender>
                  <InViewRender><DitherStackedChart theme={theme} /></InViewRender>
                  <InViewRender><DitherFunnelChart theme={theme} /></InViewRender>
                  <InViewRender><StorageUsageChart theme={theme} /></InViewRender>
                  <InViewRender><UptimeChart theme={theme} /></InViewRender>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export const SimpleCompPage = DitherChartsPage;

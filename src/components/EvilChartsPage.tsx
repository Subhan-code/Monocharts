import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Zap,
  Search,
  Grid,
  Columns,
  Layers,
  Copy,
  Check,
  Code2,
  Flame,
  ArrowUpRight,
  Sliders,
  Filter,
  RefreshCw,
  Box,
  ArrowRight,
} from 'lucide-react';

import { EvilDitherBarChart } from './dither-charts/evil/EvilDitherBarChart';
import { EvilDitherAreaChart } from './dither-charts/evil/EvilDitherAreaChart';
import { EvilDitherLineChart } from './dither-charts/evil/EvilDitherLineChart';
import { EvilDitherPieChart } from './dither-charts/evil/EvilDitherPieChart';
import { EvilDitherComposedChart } from './dither-charts/evil/EvilDitherComposedChart';
import { EvilDitherRadarChart } from './dither-charts/evil/EvilDitherRadarChart';
import { EvilDitherRadialChart } from './dither-charts/evil/EvilDitherRadialChart';

// Legacy Original Dither Charts
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
import { IconSwap, IconSwapItem } from './IconSwap';

interface EvilChartsPageProps {
  theme: 'dark' | 'light';
  showToast?: (message: string) => void;
  triggerHaptic?: (type: 'success' | 'warning' | 'error' | 'light' | 'medium' | 'heavy') => void;
  onNavigateHome?: () => void;
}

export type ChartCategory =
  | 'all'
  | 'bar'
  | 'area'
  | 'line'
  | 'pie'
  | 'composed'
  | 'radar'
  | 'radial'
  | 'legacy';

export type PatternPreset = 'all' | 'dither-dot' | 'hatched' | 'duotone' | 'striped';

interface ChartCardDef {
  id: string;
  title: string;
  category: ChartCategory;
  description: string;
  cliCommand: string;
  codeSnippet: string;
  component: React.ReactNode;
  tags: string[];
}

export function EvilChartsPage({ theme, showToast, triggerHaptic, onNavigateHome }: EvilChartsPageProps) {
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState<ChartCategory>('all');
  const [activePattern, setActivePattern] = useState<PatternPreset>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewDensity, setViewDensity] = useState<'grid' | 'compact'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    if (triggerHaptic) triggerHaptic('success');
    if (showToast) showToast(`Copied command to clipboard!`);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const CATEGORY_TABS: { id: ChartCategory; label: string; icon?: React.ReactNode }[] = [
    { id: 'all', label: 'All Charts' },
    { id: 'bar', label: 'Bar Matrix' },
    { id: 'area', label: 'Area Shading' },
    { id: 'line', label: 'Telemetry Line' },
    { id: 'pie', label: 'Donut & Pie' },
    { id: 'composed', label: 'Composed Hybrid' },
    { id: 'radar', label: 'Radar Web' },
    { id: 'radial', label: 'Radial Rings' },
    { id: 'legacy', label: 'Original Dither' },
  ];

  const CHART_ITEMS: ChartCardDef[] = useMemo(() => [
    {
      id: 'evil-dither-bar',
      title: 'Evil Dither Bar Matrix',
      category: 'bar',
      description: 'High-performance SVG dither bar chart with hatched, duotone & striped pattern matrix options.',
      cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-bar',
      codeSnippet: `import { EvilDitherBarChart } from '@/components/ui/evil-dither-bar';\n\nexport default function Demo() {\n  return <EvilDitherBarChart theme="${theme}" />;\n}`,
      component: <EvilDitherBarChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['bar', 'hatched', 'matrix', 'evil'],
    },
    {
      id: 'evil-dither-area',
      title: 'Evil Dither Area Shading',
      category: 'area',
      description: 'Bump-curve area visualizer with stipple noise dither gradient fill & curve controls.',
      cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-area',
      codeSnippet: `import { EvilDitherAreaChart } from '@/components/ui/evil-dither-area';\n\nexport default function Demo() {\n  return <EvilDitherAreaChart theme="${theme}" />;\n}`,
      component: <EvilDitherAreaChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['area', 'noise', 'bump', 'gradient'],
    },
    {
      id: 'evil-dither-line',
      title: 'Evil Dither Telemetry Line',
      category: 'line',
      description: 'Real-time telemetry line graph with live ping indicators & monospace dither gridlines.',
      cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-line',
      codeSnippet: `import { EvilDitherLineChart } from '@/components/ui/evil-dither-line';\n\nexport default function Demo() {\n  return <EvilDitherLineChart theme="${theme}" />;\n}`,
      component: <EvilDitherLineChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['line', 'telemetry', 'ping', 'monospace'],
    },
    {
      id: 'evil-dither-pie',
      title: 'Evil Dither Padded Donut',
      category: 'pie',
      description: 'Storage allocation donut chart with rounded padded wedges & dither matrix cell highlights.',
      cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-pie',
      codeSnippet: `import { EvilDitherPieChart } from '@/components/ui/evil-dither-pie';\n\nexport default function Demo() {\n  return <EvilDitherPieChart theme="${theme}" />;\n}`,
      component: <EvilDitherPieChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['pie', 'donut', 'wedges', 'padded'],
    },
    {
      id: 'evil-dither-composed',
      title: 'Evil Dither Composed Chart',
      category: 'composed',
      description: 'Hybrid performance visualizer combining dither area, hatched columns, and benchmark target line.',
      cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-composed',
      codeSnippet: `import { EvilDitherComposedChart } from '@/components/ui/evil-dither-composed';\n\nexport default function Demo() {\n  return <EvilDitherComposedChart theme="${theme}" />;\n}`,
      component: <EvilDitherComposedChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['composed', 'hybrid', 'bar', 'line', 'area'],
    },
    {
      id: 'evil-dither-radar',
      title: 'Evil Dither Radar Web',
      category: 'radar',
      description: 'Concentric multi-axis polygon radar with dithered dot matrix web overlay.',
      cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-radar',
      codeSnippet: `import { EvilDitherRadarChart } from '@/components/ui/evil-dither-radar';\n\nexport default function Demo() {\n  return <EvilDitherRadarChart theme="${theme}" />;\n}`,
      component: <EvilDitherRadarChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['radar', 'polygon', 'multi-axis'],
    },
    {
      id: 'evil-dither-radial',
      title: 'Evil Dither Radial Gauges',
      category: 'radial',
      description: 'Concentric radial progress rings with dither gradient strokes and utilization meters.',
      cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-radial',
      codeSnippet: `import { EvilDitherRadialChart } from '@/components/ui/evil-dither-radial';\n\nexport default function Demo() {\n  return <EvilDitherRadialChart theme="${theme}" />;\n}`,
      component: <EvilDitherRadialChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['radial', 'gauges', 'progress', 'rings'],
    },
    // Original Dither Items
    {
      id: 'dither-donut',
      title: 'Original Dither Donut',
      category: 'legacy',
      description: 'Canvas dithered donut graph with white particle highlights & period selectors.',
      cliCommand: 'npx @subhanhq/amicro@latest add dither-donut',
      codeSnippet: `import { DitherDonutChart } from '@/components/ui/dither-donut';\n\nexport default function Demo() {\n  return <DitherDonutChart theme="${theme}" />;\n}`,
      component: <DitherDonutChart theme={theme} />,
      tags: ['original', 'canvas', 'donut'],
    },
    {
      id: 'dither-growth',
      title: 'Original Dither Growth',
      category: 'legacy',
      description: 'Canvas area growth line graph with white dither tiles & date scrubber cursor.',
      cliCommand: 'npx @subhanhq/amicro@latest add dither-growth',
      codeSnippet: `import { DitherGrowthChart } from '@/components/ui/dither-growth';\n\nexport default function Demo() {\n  return <DitherGrowthChart theme="${theme}" />;\n}`,
      component: <DitherGrowthChart theme={theme} />,
      tags: ['original', 'growth', 'canvas'],
    },
    {
      id: 'dither-heatmap',
      title: 'Original Activity Heatmap',
      category: 'legacy',
      description: 'Activity heatmap grid with white dither intensity tiles.',
      cliCommand: 'npx @subhanhq/amicro@latest add dither-heatmap',
      codeSnippet: `import { ActivityHeatmap } from '@/components/ui/dither-heatmap';\n\nexport default function Demo() {\n  return <ActivityHeatmap theme="${theme}" />;\n}`,
      component: <ActivityHeatmap theme={theme} />,
      tags: ['original', 'heatmap', 'activity'],
    },
    {
      id: 'dither-gauge',
      title: 'Original Server Gauge',
      category: 'legacy',
      description: 'Server CPU & memory radial gauge dial with white dither dot matrix.',
      cliCommand: 'npx @subhanhq/amicro@latest add dither-gauge',
      codeSnippet: `import { ServerGauge } from '@/components/ui/dither-gauge';\n\nexport default function Demo() {\n  return <ServerGauge theme="${theme}" />;\n}`,
      component: <ServerGauge theme={theme} />,
      tags: ['original', 'gauge', 'server'],
    },
    {
      id: 'dither-traffic',
      title: 'Original Traffic Bubbles',
      category: 'legacy',
      description: 'Traffic source scatter bubble plot with floating white dither nodes.',
      cliCommand: 'npx @subhanhq/amicro@latest add dither-traffic',
      codeSnippet: `import { TrafficBubble } from '@/components/ui/dither-traffic';\n\nexport default function Demo() {\n  return <TrafficBubble theme="${theme}" />;\n}`,
      component: <TrafficBubble theme={theme} />,
      tags: ['original', 'traffic', 'bubble'],
    },
    {
      id: 'dither-stacked',
      title: 'Original Dither Stacked',
      category: 'legacy',
      description: 'Stacked canvas bar graph with regional branch hovers & white dither bands.',
      cliCommand: 'npx @subhanhq/amicro@latest add dither-stacked',
      codeSnippet: `import { DitherStackedChart } from '@/components/ui/dither-stacked';\n\nexport default function Demo() {\n  return <DitherStackedChart theme="${theme}" />;\n}`,
      component: <DitherStackedChart theme={theme} />,
      tags: ['original', 'stacked', 'canvas'],
    },
    {
      id: 'dither-funnel',
      title: 'Original Conversion Funnel',
      category: 'legacy',
      description: 'Conversion funnel with white dither progress stage bars.',
      cliCommand: 'npx @subhanhq/amicro@latest add dither-funnel',
      codeSnippet: `import { DitherFunnelChart } from '@/components/ui/dither-funnel';\n\nexport default function Demo() {\n  return <DitherFunnelChart theme="${theme}" />;\n}`,
      component: <DitherFunnelChart theme={theme} />,
      tags: ['original', 'funnel', 'conversion'],
    },
    {
      id: 'dither-device',
      title: 'Original Device Breakdown',
      category: 'legacy',
      description: 'Device usage donut chart with white dither particle segments.',
      cliCommand: 'npx @subhanhq/amicro@latest add dither-device',
      codeSnippet: `import { DeviceUsageChart } from '@/components/ui/dither-device';\n\nexport default function Demo() {\n  return <DeviceUsageChart theme="${theme}" />;\n}`,
      component: <DeviceUsageChart theme={theme} />,
      tags: ['original', 'device', 'breakdown'],
    },
    {
      id: 'dither-storage',
      title: 'Original Storage Bar',
      category: 'legacy',
      description: 'Storage capacity bar with animated white dither progress shaders.',
      cliCommand: 'npx @subhanhq/amicro@latest add dither-storage',
      codeSnippet: `import { StorageUsageChart } from '@/components/ui/dither-storage';\n\nexport default function Demo() {\n  return <StorageUsageChart theme="${theme}" />;\n}`,
      component: <StorageUsageChart theme={theme} />,
      tags: ['original', 'storage', 'bar'],
    },
    {
      id: 'dither-revenue',
      title: 'Original Revenue Line',
      category: 'legacy',
      description: 'Revenue line graph with white dither gradient fill.',
      cliCommand: 'npx @subhanhq/amicro@latest add dither-revenue',
      codeSnippet: `import { RevenueLineChart } from '@/components/ui/dither-revenue';\n\nexport default function Demo() {\n  return <RevenueLineChart theme="${theme}" />;\n}`,
      component: <RevenueLineChart theme={theme} />,
      tags: ['original', 'revenue', 'line'],
    },
    {
      id: 'dither-uptime',
      title: 'Original System Uptime',
      category: 'legacy',
      description: '90-day system uptime matrix with white dither status tiles.',
      cliCommand: 'npx @subhanhq/amicro@latest add dither-uptime',
      codeSnippet: `import { UptimeChart } from '@/components/ui/dither-uptime';\n\nexport default function Demo() {\n  return <UptimeChart theme="${theme}" />;\n}`,
      component: <UptimeChart theme={theme} />,
      tags: ['original', 'uptime', 'matrix'],
    },
  ], [theme, viewDensity]);

  // Filter items based on Category, Pattern, and Search query
  const filteredItems = useMemo(() => {
    return CHART_ITEMS.filter((item) => {
      // Category Filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [CHART_ITEMS, activeCategory, searchQuery]);

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8 font-sans">
      
      {/* Hero Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all shadow-sm ${
          isDark ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        }`}>
          <Flame className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>EvilCharts Engine v2.0 • Dither Shaders</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Evil Charts Showcase
        </h1>

        <p className={`text-sm sm:text-base max-w-xl ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
          High-performance SVG dither matrix shaders, spring-physics charts, frosted glass tooltips, and interactive telemetry visualizers.
        </p>

        {/* Hero Performance Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs font-mono">
          <div className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
            isDark ? 'bg-white/5 border-white/10 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-800'
          }`}>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>7 EVIL Engines</span>
          </div>

          <div className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
            isDark ? 'bg-white/5 border-white/10 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-800'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>5 SVG Shaders</span>
          </div>

          <div className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
            isDark ? 'bg-white/5 border-white/10 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-800'
          }`}>
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zero Config CLI</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search Input, Category Tabs & Layout Switches */}
      <div className={`w-full rounded-[24px] p-4 sm:p-5 border flex flex-col gap-4 shadow-xl ${
        isDark ? 'bg-[#181818] border-white/10' : 'bg-white border-neutral-200'
      }`}>
        
        {/* Top Controls Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Field */}
          <div className={`relative w-full md:w-[320px] rounded-full border flex items-center px-3.5 py-2 transition-all ${
            isDark ? 'bg-[#131313] border-white/10 focus-within:border-white/30' : 'bg-neutral-100 border-neutral-300 focus-within:border-neutral-400'
          }`}>
            <Search className="w-4 h-4 opacity-50 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search chart visualizers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs outline-none border-none placeholder:opacity-50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs opacity-50 hover:opacity-100 ml-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Density & Layout Toggle */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Density:
            </span>
            <div className={`p-0.5 rounded-full border flex items-center gap-0.5 ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'
            }`}>
              <button
                type="button"
                onClick={() => setViewDensity('grid')}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  viewDensity === 'grid'
                    ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                    : 'opacity-50 hover:opacity-100'
                }`}
                title="Grid Layout"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewDensity('compact')}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  viewDensity === 'compact'
                    ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                    : 'opacity-50 hover:opacity-100'
                }`}
                title="Compact Layout"
              >
                <Columns className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className={`ml-2 text-xs font-mono tabular-nums px-2.5 py-1 rounded-full border ${
              isDark ? 'bg-white/5 border-white/10 text-neutral-400' : 'bg-neutral-100 border-neutral-200 text-neutral-600'
            }`}>
              {filteredItems.length} {filteredItems.length === 1 ? 'chart' : 'charts'}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center flex-wrap gap-1.5 pt-2 border-t border-white/5">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveCategory(tab.id);
                  if (triggerHaptic) triggerHaptic('light');
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                  isActive
                    ? isDark
                      ? 'bg-white text-black border-white font-semibold shadow-md'
                      : 'bg-black text-white border-black font-semibold shadow-md'
                    : isDark
                    ? 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                    : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-black hover:bg-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Charts Showcase Grid */}
      {filteredItems.length === 0 ? (
        <div className={`w-full rounded-[24px] p-12 border text-center flex flex-col items-center gap-3 ${
          isDark ? 'bg-[#181818] border-white/10 text-neutral-400' : 'bg-white border-neutral-200 text-neutral-600'
        }`}>
          <Filter className="w-8 h-8 opacity-40" />
          <h3 className="text-lg font-semibold">No chart visualizers match your filter</h3>
          <p className="text-xs opacity-70">Try searching for another keyword or selecting "All Charts".</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-2 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className={`grid grid-cols-1 ${viewDensity === 'compact' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 w-full`}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="w-full flex justify-center"
              >
                {/* Standard Card Architecture wrapper matching amicro design system */}
                <div
                  className={`relative w-full rounded-[24px] transition-all duration-300 group flex flex-col justify-between p-4 ${
                    isDark
                      ? 'bg-[#181818] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:bg-[#202020]'
                      : 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-neutral-100 text-black hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]'
                  }`}
                >
                  {/* Live Interactive Chart Component Stage */}
                  <div className="w-full mb-3">
                    <InViewRender>{item.component}</InViewRender>
                  </div>

                  {/* Footer Action Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className={`text-[13px] font-semibold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                        {item.title}
                      </span>
                      <span className={`text-[11px] truncate max-w-[200px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {item.description}
                      </span>
                    </div>

                    {/* Copy CLI Button */}
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleCopy(item.id, item.cliCommand)}
                      title="Copy CLI install command"
                      className={`p-2 rounded-xl transition-all cursor-pointer border flex items-center justify-center ${
                        copiedId === item.id
                          ? isDark
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-emerald-100 text-emerald-600 border-emerald-300'
                          : isDark
                          ? 'bg-white/[0.08] border-transparent hover:bg-white/[0.14] text-neutral-300 hover:text-white'
                          : 'bg-neutral-100 border-transparent hover:bg-neutral-200 text-neutral-700 hover:text-black'
                      }`}
                    >
                      <IconSwap>
                        <IconSwapItem key={copiedId === item.id ? 'check' : 'copy'}>
                          {copiedId === item.id ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </IconSwapItem>
                      </IconSwap>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

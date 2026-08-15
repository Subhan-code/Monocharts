import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Grid,
  Columns,
  Copy,
  Check,
  Circle,
  Filter,
  Github,
  ExternalLink,
} from 'lucide-react';

import { MonoRoundedLineChart } from './mono-charts/MonoRoundedLineChart';
import { MonoRoundedBarChart } from './mono-charts/MonoRoundedBarChart';
import { MonoRoundedAreaChart } from './mono-charts/MonoRoundedAreaChart';
import { MonoRoundedDonutChart } from './mono-charts/MonoRoundedDonutChart';
import { MonoRoundedComposedChart } from './mono-charts/MonoRoundedComposedChart';
import { MonoRoundedScatterChart } from './mono-charts/MonoRoundedScatterChart';
import { MonoRoundedStepChart } from './mono-charts/MonoRoundedStepChart';
import { MonoRoundedStackedBarChart } from './mono-charts/MonoRoundedStackedBarChart';
import { MonoRoundedRadarChart } from './mono-charts/MonoRoundedRadarChart';
import { MonoRoundedRadialGaugeChart } from './mono-charts/MonoRoundedRadialGaugeChart';
import { MonoRoundedFunnelChart } from './mono-charts/MonoRoundedFunnelChart';
import { MonoRoundedHeatmapChart } from './mono-charts/MonoRoundedHeatmapChart';
import { MonoRoundedSparklineChart } from './mono-charts/MonoRoundedSparklineChart';
import { MonoRoundedBubbleChart } from './mono-charts/MonoRoundedBubbleChart';
import { MonoRoundedTreemapChart } from './mono-charts/MonoRoundedTreemapChart';
import { MonoRoundedStreamChart } from './mono-charts/MonoRoundedStreamChart';
import { MonoRoundedMeterChart } from './mono-charts/MonoRoundedMeterChart';
import { MonoRoundedWaterfallChart } from './mono-charts/MonoRoundedWaterfallChart';
import { MonoRoundedPolarChart } from './mono-charts/MonoRoundedPolarChart';
import { MonoRoundedRangeChart } from './mono-charts/MonoRoundedRangeChart';

import { InViewRender } from './InViewRender';
import { IconSwap, IconSwapItem } from './IconSwap';

interface MonoChartsPageProps {
  theme: 'dark' | 'light';
  showToast?: (message: string) => void;
  triggerHaptic?: (type: 'success' | 'warning' | 'error' | 'light' | 'medium' | 'heavy') => void;
  onNavigateHome?: () => void;
}

export type MonoCategory = 'all' | 'line' | 'bar' | 'area' | 'donut' | 'radial' | 'matrix' | 'composed' | 'scatter';

interface MonoCardDef {
  id: string;
  title: string;
  category: MonoCategory;
  description: string;
  cliCommand: string;
  codeSnippet: string;
  component: React.ReactNode;
  tags: string[];
}

export function MonoChartsPage({ theme, showToast, triggerHaptic }: MonoChartsPageProps) {
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState<MonoCategory>('all');
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

  const CATEGORY_TABS: { id: MonoCategory; label: string }[] = [
    { id: 'all', label: 'All 20 Mono Charts' },
    { id: 'line', label: 'Spline Lines' },
    { id: 'bar', label: 'Rounded Bars' },
    { id: 'area', label: 'Curved Waves' },
    { id: 'donut', label: 'Donuts' },
    { id: 'radial', label: 'Radials' },
    { id: 'matrix', label: 'Matrix & Tiles' },
  ];

  const CARD_ITEMS: MonoCardDef[] = useMemo(() => [
    {
      id: 'mono-rounded-line',
      title: 'Mono Rounded Spline Line',
      category: 'line',
      description: 'Minimalist monochromatic line chart with smooth rounded spline curves and rounded stroke caps.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-line',
      codeSnippet: `import { MonoRoundedLineChart } from '@/components/ui/mono-rounded-line';\n\nexport default function Demo() {\n  return <MonoRoundedLineChart theme="${theme}" />;\n}`,
      component: <MonoRoundedLineChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['line', 'spline', 'rounded', 'mono'],
    },
    {
      id: 'mono-rounded-bar',
      title: 'Mono Rounded Pill Pillars',
      category: 'bar',
      description: 'Minimalist monochromatic bar chart with full corner radii pill columns and vertical/horizontal layout switches.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-bar',
      codeSnippet: `import { MonoRoundedBarChart } from '@/components/ui/mono-rounded-bar';\n\nexport default function Demo() {\n  return <MonoRoundedBarChart theme="${theme}" />;\n}`,
      component: <MonoRoundedBarChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['bar', 'pill', 'pillars', 'radius'],
    },
    {
      id: 'mono-rounded-area',
      title: 'Mono Curved Wave Area',
      category: 'area',
      description: 'Smooth monochromatic curved area wave visualizer with rounded stroke joins and soft opacity gradient shading.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-area',
      codeSnippet: `import { MonoRoundedAreaChart } from '@/components/ui/mono-rounded-area';\n\nexport default function Demo() {\n  return <MonoRoundedAreaChart theme="${theme}" />;\n}`,
      component: <MonoRoundedAreaChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['area', 'wave', 'gradient', 'mono'],
    },
    {
      id: 'mono-rounded-donut',
      title: 'Mono Rounded Donut Ring',
      category: 'donut',
      description: 'Minimalist monochromatic donut chart with rounded segment endcaps, generous spacing, and center metric numbers.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-donut',
      codeSnippet: `import { MonoRoundedDonutChart } from '@/components/ui/mono-rounded-donut';\n\nexport default function Demo() {\n  return <MonoRoundedDonutChart theme="${theme}" />;\n}`,
      component: <MonoRoundedDonutChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['donut', 'ring', 'caps', 'mono'],
    },
    {
      id: 'mono-rounded-composed',
      title: 'Mono Hybrid Spline + Bar',
      category: 'composed',
      description: 'Minimalist hybrid visualizer pairing rounded pill columns with a smooth curved spline line overlay.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-composed',
      codeSnippet: `import { MonoRoundedComposedChart } from '@/components/ui/mono-rounded-composed';\n\nexport default function Demo() {\n  return <MonoRoundedComposedChart theme="${theme}" />;\n}`,
      component: <MonoRoundedComposedChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['composed', 'hybrid', 'spline', 'bar'],
    },
    {
      id: 'mono-rounded-scatter',
      title: 'Mono Scatter Matrix',
      category: 'scatter',
      description: 'Minimalist monochromatic scatter node matrix with rounded circle nodes and hover trace callouts.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-scatter',
      codeSnippet: `import { MonoRoundedScatterChart } from '@/components/ui/mono-rounded-scatter';\n\nexport default function Demo() {\n  return <MonoRoundedScatterChart theme="${theme}" />;\n}`,
      component: <MonoRoundedScatterChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['scatter', 'matrix', 'nodes', 'mono'],
    },
    {
      id: 'mono-rounded-step',
      title: 'Mono Step Progression',
      category: 'line',
      description: 'Monochromatic discrete staircase step chart with rounded stroke joins and level callouts.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-step',
      codeSnippet: `import { MonoRoundedStepChart } from '@/components/ui/mono-rounded-step';\n\nexport default function Demo() {\n  return <MonoRoundedStepChart theme="${theme}" />;\n}`,
      component: <MonoRoundedStepChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['step', 'staircase', 'discrete', 'line'],
    },
    {
      id: 'mono-rounded-stacked-bar',
      title: 'Mono Stacked Tones Bar',
      category: 'bar',
      description: 'Monochromatic stacked bar visualizer with rounded end pill geometry and layered opacity tones.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-stacked-bar',
      codeSnippet: `import { MonoRoundedStackedBarChart } from '@/components/ui/mono-rounded-stacked-bar';\n\nexport default function Demo() {\n  return <MonoRoundedStackedBarChart theme="${theme}" />;\n}`,
      component: <MonoRoundedStackedBarChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['stacked', 'tones', 'bar', 'pill'],
    },
    {
      id: 'mono-rounded-radar',
      title: 'Mono Polygon Web Radar',
      category: 'radial',
      description: 'Minimalist monochromatic multi-axis polygon radar web with smooth rounded stroke join geometry.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-radar',
      codeSnippet: `import { MonoRoundedRadarChart } from '@/components/ui/mono-rounded-radar';\n\nexport default function Demo() {\n  return <MonoRoundedRadarChart theme="${theme}" />;\n}`,
      component: <MonoRoundedRadarChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['radar', 'polygon', 'web', 'radial'],
    },
    {
      id: 'mono-rounded-radial-gauge',
      title: 'Mono Concentric Radial Rings',
      category: 'radial',
      description: 'Monochromatic concentric progress rings with rounded arc caps and layered utilization metrics.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-radial-gauge',
      codeSnippet: `import { MonoRoundedRadialGaugeChart } from '@/components/ui/mono-rounded-radial-gauge';\n\nexport default function Demo() {\n  return <MonoRoundedRadialGaugeChart theme="${theme}" />;\n}`,
      component: <MonoRoundedRadialGaugeChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['radial', 'rings', 'gauge', 'concentric'],
    },
    {
      id: 'mono-rounded-funnel',
      title: 'Mono Stage Funnel',
      category: 'bar',
      description: 'Horizontal funnel stage visualizer using monochromatic pill bars with rounded endcaps.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-funnel',
      codeSnippet: `import { MonoRoundedFunnelChart } from '@/components/ui/mono-rounded-funnel';\n\nexport default function Demo() {\n  return <MonoRoundedFunnelChart theme="${theme}" />;\n}`,
      component: <MonoRoundedFunnelChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['funnel', 'stage', 'pipeline', 'bar'],
    },
    {
      id: 'mono-rounded-heatmap',
      title: 'Mono Dot Matrix Heatmap',
      category: 'matrix',
      description: 'Monochromatic activity matrix with rounded corner cells and density opacity shading.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-heatmap',
      codeSnippet: `import { MonoRoundedHeatmapChart } from '@/components/ui/mono-rounded-heatmap';\n\nexport default function Demo() {\n  return <MonoRoundedHeatmapChart theme="${theme}" />;\n}`,
      component: <MonoRoundedHeatmapChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['heatmap', 'matrix', 'density', 'nodes'],
    },
    {
      id: 'mono-rounded-sparkline',
      title: 'Mono Sparkline Telemetry',
      category: 'line',
      description: 'Compact telemetry row suite featuring rounded micro splines and live metric readouts.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-sparkline',
      codeSnippet: `import { MonoRoundedSparklineChart } from '@/components/ui/mono-rounded-sparkline';\n\nexport default function Demo() {\n  return <MonoRoundedSparklineChart theme="${theme}" />;\n}`,
      component: <MonoRoundedSparklineChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['sparkline', 'telemetry', 'splines', 'rows'],
    },
    {
      id: 'mono-rounded-bubble',
      title: 'Mono Bubble Clusters',
      category: 'scatter',
      description: 'Scaled circle bubble distribution with rounded stroke outlines and monochromatic opacity fills.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-bubble',
      codeSnippet: `import { MonoRoundedBubbleChart } from '@/components/ui/mono-rounded-bubble';\n\nexport default function Demo() {\n  return <MonoRoundedBubbleChart theme="${theme}" />;\n}`,
      component: <MonoRoundedBubbleChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['bubble', 'clusters', 'z-scale', 'spheres'],
    },
    {
      id: 'mono-rounded-treemap',
      title: 'Mono Tile Treemap',
      category: 'matrix',
      description: 'Partition allocation treemap featuring rounded corner tiles and monochrome contrast shading.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-treemap',
      codeSnippet: `import { MonoRoundedTreemapChart } from '@/components/ui/mono-rounded-treemap';\n\nexport default function Demo() {\n  return <MonoRoundedTreemapChart theme="${theme}" />;\n}`,
      component: <MonoRoundedTreemapChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['treemap', 'tiles', 'partition', 'allocation'],
    },
    {
      id: 'mono-rounded-stream',
      title: 'Mono Fluid Stream Wave',
      category: 'area',
      description: 'Multi-layer fluid stream wave area visualizer with rounded stroke joins and soft monochrome gradients.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-stream',
      codeSnippet: `import { MonoRoundedStreamChart } from '@/components/ui/mono-rounded-stream';\n\nexport default function Demo() {\n  return <MonoRoundedStreamChart theme="${theme}" />;\n}`,
      component: <MonoRoundedStreamChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['stream', 'fluid', 'wave', 'area'],
    },
    {
      id: 'mono-rounded-meter',
      title: 'Mono Arc Meter Gauge',
      category: 'radial',
      description: 'Monochromatic semi-circle arc meter gauge with rounded stroke endcaps and center indicator.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-meter',
      codeSnippet: `import { MonoRoundedMeterChart } from '@/components/ui/mono-rounded-meter';\n\nexport default function Demo() {\n  return <MonoRoundedMeterChart theme="${theme}" />;\n}`,
      component: <MonoRoundedMeterChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['meter', 'gauge', 'arc', 'radial'],
    },
    {
      id: 'mono-rounded-waterfall',
      title: 'Mono Waterfall Steps',
      category: 'bar',
      description: 'Sequential delta step bar chart featuring floating pillars with rounded corner geometry.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-waterfall',
      codeSnippet: `import { MonoRoundedWaterfallChart } from '@/components/ui/mono-rounded-waterfall';\n\nexport default function Demo() {\n  return <MonoRoundedWaterfallChart theme="${theme}" />;\n}`,
      component: <MonoRoundedWaterfallChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['waterfall', 'steps', 'delta', 'pillars'],
    },
    {
      id: 'mono-rounded-polar',
      title: 'Mono Polar Radial Pillars',
      category: 'radial',
      description: 'Polar angle radial bar chart with 360-degree rounded arc pillars.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-polar',
      codeSnippet: `import { MonoRoundedPolarChart } from '@/components/ui/mono-rounded-polar';\n\nexport default function Demo() {\n  return <MonoRoundedPolarChart theme="${theme}" />;\n}`,
      component: <MonoRoundedPolarChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['polar', 'radial', 'pillars', 'arcs'],
    },
    {
      id: 'mono-rounded-range',
      title: 'Mono Range Band Area',
      category: 'area',
      description: 'Min-Max floating variance area band with smooth rounded spline boundary strokes.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-range',
      codeSnippet: `import { MonoRoundedRangeChart } from '@/components/ui/mono-rounded-range';\n\nexport default function Demo() {\n  return <MonoRoundedRangeChart theme="${theme}" />;\n}`,
      component: <MonoRoundedRangeChart theme={theme} compact={viewDensity === 'compact'} />,
      tags: ['range', 'band', 'variance', 'area'],
    },
  ], [theme, viewDensity]);

  const filteredItems = useMemo(() => {
    return CARD_ITEMS.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
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
  }, [CARD_ITEMS, activeCategory, searchQuery]);

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8 font-sans">
      
      {/* Hero Header */}
      <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase transition-all shadow-sm ${
          isDark ? 'bg-white/10 text-neutral-200 border border-white/20' : 'bg-neutral-900 text-white border border-neutral-700'
        }`}>
          <Circle className="w-3.5 h-3.5 fill-current" />
          <span>20 Minimalist Visualizers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Mono Charts
        </h1>

        <p className={`text-sm sm:text-base max-w-lg ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
          A collection of 20 monochromatic chart visualizers built with rounded corner geometry and minimalist typography.
        </p>

        {/* GitHub Repository CTA Link */}
        <a
          href="https://github.com/Subhan-code/Monocharts"
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer border ${
            isDark
              ? 'bg-white text-black border-white hover:bg-neutral-200 hover:scale-105'
              : 'bg-black text-white border-black hover:bg-neutral-800 hover:scale-105'
          }`}
        >
          <Github className="w-4 h-4 shrink-0" />
          <span>View GitHub Repository</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
        </a>
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
              placeholder="Search 20 mono charts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs outline-none border-none placeholder:opacity-50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs opacity-50 hover:opacity-100 ml-1 cursor-pointer"
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
              {filteredItems.length} / 20
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
          <h3 className="text-lg font-semibold">No mono charts match your filter</h3>
          <p className="text-xs opacity-70">Try searching for another term or select "All 20 Mono Charts".</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-2 px-4 py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-neutral-200 transition-all cursor-pointer"
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

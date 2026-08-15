import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Copy,
  Check,
  Circle,
  Github,
  ExternalLink,
} from 'lucide-react';

import { MonoActivityHeatmap } from './mono-charts/MonoActivityHeatmap';
import { MonoRoundedLineChart } from './mono-charts/MonoRoundedLineChart';
import { MonoRoundedBarChart } from './mono-charts/MonoRoundedBarChart';
import { MonoRoundedAreaChart } from './mono-charts/MonoRoundedAreaChart';
import { MonoRoundedDonutChart } from './mono-charts/MonoRoundedDonutChart';
import { MonoRoundedComposedChart } from './mono-charts/MonoRoundedComposedChart';
import { MonoRoundedScatterChart } from './mono-charts/MonoRoundedScatterChart';
import { MonoRoundedCandlestickChart } from './mono-charts/MonoRoundedCandlestickChart';
import { MonoRoundedKpiCardChart } from './mono-charts/MonoRoundedKpiCardChart';
import { MonoRoundedPyramidChart } from './mono-charts/MonoRoundedPyramidChart';
import { MonoRoundedRadialBarGroup } from './mono-charts/MonoRoundedRadialBarGroup';
import { MonoRoundedGaugeArc } from './mono-charts/MonoRoundedGaugeArc';
import { MonoRoundedBulletChart } from './mono-charts/MonoRoundedBulletChart';
import { MonoRoundedSankeyChart } from './mono-charts/MonoRoundedSankeyChart';
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

interface MonoCardDef {
  id: string;
  title: string;
  description: string;
  cliCommand: string;
  codeSnippet: string;
  component: React.ReactNode;
}

export function MonoChartsPage({ theme, showToast, triggerHaptic }: MonoChartsPageProps) {
  const isDark = theme === 'dark';
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

  const CARD_ITEMS: MonoCardDef[] = useMemo(() => [
    {
      id: 'mono-activity-green',
      title: 'Emerald Activity Heatmap',
      description: 'Ultra-clean emerald green contribution heatmap grid with 20-week activity telemetry.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-activity-green',
      codeSnippet: `import { MonoActivityHeatmap } from '@/components/ui/mono-activity-heatmap';\n\nexport default function Demo() {\n  return <MonoActivityHeatmap accentColor="green" theme="${theme}" />;\n}`,
      component: <MonoActivityHeatmap theme={theme} accentColor="green" />,
    },
    {
      id: 'mono-activity-blue',
      title: 'Sky Blue Activity Heatmap',
      description: 'Vibrant sky blue contribution activity matrix with cell tooltips and minimalist month headers.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-activity-blue',
      codeSnippet: `import { MonoActivityHeatmap } from '@/components/ui/mono-activity-heatmap';\n\nexport default function Demo() {\n  return <MonoActivityHeatmap accentColor="blue" theme="${theme}" />;\n}`,
      component: <MonoActivityHeatmap theme={theme} accentColor="blue" />,
    },
    {
      id: 'mono-activity-purple',
      title: 'Violet Activity Heatmap',
      description: 'Deep violet pulse contribution activity grid with rounded node cells and telemetry.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-activity-purple',
      codeSnippet: `import { MonoActivityHeatmap } from '@/components/ui/mono-activity-heatmap';\n\nexport default function Demo() {\n  return <MonoActivityHeatmap accentColor="purple" theme="${theme}" />;\n}`,
      component: <MonoActivityHeatmap theme={theme} accentColor="purple" />,
    },
    {
      id: 'mono-rounded-line',
      title: 'Mono Rounded Spline Line',
      description: 'Minimalist monochromatic line chart with smooth rounded spline curves and rounded stroke caps.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-line',
      codeSnippet: `import { MonoRoundedLineChart } from '@/components/ui/mono-rounded-line';\n\nexport default function Demo() {\n  return <MonoRoundedLineChart theme="${theme}" />;\n}`,
      component: <MonoRoundedLineChart theme={theme} />,
    },
    {
      id: 'mono-rounded-bar',
      title: 'Mono Rounded Pill Pillars',
      description: 'Minimalist monochromatic bar chart with full corner radii pill columns and vertical/horizontal layout switches.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-bar',
      codeSnippet: `import { MonoRoundedBarChart } from '@/components/ui/mono-rounded-bar';\n\nexport default function Demo() {\n  return <MonoRoundedBarChart theme="${theme}" />;\n}`,
      component: <MonoRoundedBarChart theme={theme} />,
    },
    {
      id: 'mono-rounded-area',
      title: 'Mono Curved Wave Area',
      description: 'Smooth monochromatic curved area wave visualizer with rounded stroke joins and soft opacity gradient shading.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-area',
      codeSnippet: `import { MonoRoundedAreaChart } from '@/components/ui/mono-rounded-area';\n\nexport default function Demo() {\n  return <MonoRoundedAreaChart theme="${theme}" />;\n}`,
      component: <MonoRoundedAreaChart theme={theme} />,
    },
    {
      id: 'mono-rounded-donut',
      title: 'Mono Rounded Donut Ring',
      description: 'Minimalist monochromatic donut chart with rounded segment endcaps, generous spacing, and center metric numbers.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-donut',
      codeSnippet: `import { MonoRoundedDonutChart } from '@/components/ui/mono-rounded-donut';\n\nexport default function Demo() {\n  return <MonoRoundedDonutChart theme="${theme}" />;\n}`,
      component: <MonoRoundedDonutChart theme={theme} />,
    },
    {
      id: 'mono-rounded-composed',
      title: 'Mono Hybrid Spline + Bar',
      description: 'Minimalist hybrid visualizer pairing rounded pill columns with a smooth curved spline line overlay.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-composed',
      codeSnippet: `import { MonoRoundedComposedChart } from '@/components/ui/mono-rounded-composed';\n\nexport default function Demo() {\n  return <MonoRoundedComposedChart theme="${theme}" />;\n}`,
      component: <MonoRoundedComposedChart theme={theme} />,
    },
    {
      id: 'mono-rounded-scatter',
      title: 'Mono Scatter Matrix',
      description: 'Minimalist monochromatic scatter node matrix with rounded circle nodes and hover trace callouts.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-scatter',
      codeSnippet: `import { MonoRoundedScatterChart } from '@/components/ui/mono-rounded-scatter';\n\nexport default function Demo() {\n  return <MonoRoundedScatterChart theme="${theme}" />;\n}`,
      component: <MonoRoundedScatterChart theme={theme} />,
    },
    {
      id: 'mono-rounded-candlestick',
      title: 'Mono Financial Candlesticks',
      description: 'Monochromatic candlestick financial price bars with rounded wick caps and solid/hollow candles.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-candlestick',
      codeSnippet: `import { MonoRoundedCandlestickChart } from '@/components/ui/mono-rounded-candlestick';\n\nexport default function Demo() {\n  return <MonoRoundedCandlestickChart theme="${theme}" />;\n}`,
      component: <MonoRoundedCandlestickChart theme={theme} />,
    },
    {
      id: 'mono-rounded-kpi',
      title: 'Mono Stat KPI Card',
      description: 'Minimalist KPI stat metric card featuring an embedded rounded spline sparkline indicator.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-kpi',
      codeSnippet: `import { MonoRoundedKpiCardChart } from '@/components/ui/mono-rounded-kpi';\n\nexport default function Demo() {\n  return <MonoRoundedKpiCardChart theme="${theme}" />;\n}`,
      component: <MonoRoundedKpiCardChart theme={theme} />,
    },
    {
      id: 'mono-rounded-pyramid',
      title: 'Mono Tier Pyramid Stack',
      description: 'Monochromatic pyramid level bar chart featuring rounded corner tier geometry.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-pyramid',
      codeSnippet: `import { MonoRoundedPyramidChart } from '@/components/ui/mono-rounded-pyramid';\n\nexport default function Demo() {\n  return <MonoRoundedPyramidChart theme="${theme}" />;\n}`,
      component: <MonoRoundedPyramidChart theme={theme} />,
    },
    {
      id: 'mono-rounded-radial-group',
      title: 'Mono Radial Bar Group',
      description: 'Multi-ring radial progress bar group with rounded arc endcaps and layered utilization metrics.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-radial-group',
      codeSnippet: `import { MonoRoundedRadialBarGroup } from '@/components/ui/mono-rounded-radial-group';\n\nexport default function Demo() {\n  return <MonoRoundedRadialBarGroup theme="${theme}" />;\n}`,
      component: <MonoRoundedRadialBarGroup theme={theme} />,
    },
    {
      id: 'mono-rounded-gauge-arc',
      title: 'Mono Speedometer Gauge Arc',
      description: 'Semi-circle arc speedometer gauge dial with rounded stroke endcaps and center score callout.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-gauge-arc',
      codeSnippet: `import { MonoRoundedGaugeArc } from '@/components/ui/mono-rounded-gauge-arc';\n\nexport default function Demo() {\n  return <MonoRoundedGaugeArc theme="${theme}" />;\n}`,
      component: <MonoRoundedGaugeArc theme={theme} />,
    },
    {
      id: 'mono-rounded-bullet',
      title: 'Mono Performance Bullet Target',
      description: 'Monochromatic performance bullet bar chart featuring target benchmark markers.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-bullet',
      codeSnippet: `import { MonoRoundedBulletChart } from '@/components/ui/mono-rounded-bullet';\n\nexport default function Demo() {\n  return <MonoRoundedBulletChart theme="${theme}" />;\n}`,
      component: <MonoRoundedBulletChart theme={theme} />,
    },
    {
      id: 'mono-rounded-sankey',
      title: 'Mono Flow Sankey Channels',
      description: 'Flow transfer channel visualizer featuring smooth curved SVG routing bands with rounded endcaps.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-sankey',
      codeSnippet: `import { MonoRoundedSankeyChart } from '@/components/ui/mono-rounded-sankey';\n\nexport default function Demo() {\n  return <MonoRoundedSankeyChart theme="${theme}" />;\n}`,
      component: <MonoRoundedSankeyChart theme={theme} />,
    },
    {
      id: 'mono-rounded-step',
      title: 'Mono Step Progression',
      description: 'Monochromatic discrete staircase step chart with rounded stroke joins and level callouts.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-step',
      codeSnippet: `import { MonoRoundedStepChart } from '@/components/ui/mono-rounded-step';\n\nexport default function Demo() {\n  return <MonoRoundedStepChart theme="${theme}" />;\n}`,
      component: <MonoRoundedStepChart theme={theme} />,
    },
    {
      id: 'mono-rounded-stacked-bar',
      title: 'Mono Stacked Tones Bar',
      description: 'Monochromatic stacked bar visualizer with rounded end pill geometry and layered opacity tones.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-stacked-bar',
      codeSnippet: `import { MonoRoundedStackedBarChart } from '@/components/ui/mono-rounded-stacked-bar';\n\nexport default function Demo() {\n  return <MonoRoundedStackedBarChart theme="${theme}" />;\n}`,
      component: <MonoRoundedStackedBarChart theme={theme} />,
    },
    {
      id: 'mono-rounded-radar',
      title: 'Mono Polygon Web Radar',
      description: 'Minimalist monochromatic multi-axis polygon radar web with smooth rounded stroke join geometry.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-radar',
      codeSnippet: `import { MonoRoundedRadarChart } from '@/components/ui/mono-rounded-radar';\n\nexport default function Demo() {\n  return <MonoRoundedRadarChart theme="${theme}" />;\n}`,
      component: <MonoRoundedRadarChart theme={theme} />,
    },
    {
      id: 'mono-rounded-radial-gauge',
      title: 'Mono Concentric Radial Rings',
      description: 'Monochromatic concentric progress rings with rounded arc caps and layered utilization metrics.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-radial-gauge',
      codeSnippet: `import { MonoRoundedRadialGaugeChart } from '@/components/ui/mono-rounded-radial-gauge';\n\nexport default function Demo() {\n  return <MonoRoundedRadialGaugeChart theme="${theme}" />;\n}`,
      component: <MonoRoundedRadialGaugeChart theme={theme} />,
    },
    {
      id: 'mono-rounded-funnel',
      title: 'Mono Stage Funnel',
      description: 'Horizontal funnel stage visualizer using monochromatic pill bars with rounded endcaps.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-funnel',
      codeSnippet: `import { MonoRoundedFunnelChart } from '@/components/ui/mono-rounded-funnel';\n\nexport default function Demo() {\n  return <MonoRoundedFunnelChart theme="${theme}" />;\n}`,
      component: <MonoRoundedFunnelChart theme={theme} />,
    },
    {
      id: 'mono-rounded-heatmap',
      title: 'Mono Dot Matrix Heatmap',
      description: 'Monochromatic activity matrix with rounded corner cells and density opacity shading.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-heatmap',
      codeSnippet: `import { MonoRoundedHeatmapChart } from '@/components/ui/mono-rounded-heatmap';\n\nexport default function Demo() {\n  return <MonoRoundedHeatmapChart theme="${theme}" />;\n}`,
      component: <MonoRoundedHeatmapChart theme={theme} />,
    },
    {
      id: 'mono-rounded-sparkline',
      title: 'Mono Sparkline Telemetry',
      description: 'Compact telemetry row suite featuring rounded micro splines and live metric readouts.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-sparkline',
      codeSnippet: `import { MonoRoundedSparklineChart } from '@/components/ui/mono-rounded-sparkline';\n\nexport default function Demo() {\n  return <MonoRoundedSparklineChart theme="${theme}" />;\n}`,
      component: <MonoRoundedSparklineChart theme={theme} />,
    },
    {
      id: 'mono-rounded-bubble',
      title: 'Mono Bubble Clusters',
      description: 'Scaled circle bubble distribution with rounded stroke outlines and monochromatic opacity fills.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-bubble',
      codeSnippet: `import { MonoRoundedBubbleChart } from '@/components/ui/mono-rounded-bubble';\n\nexport default function Demo() {\n  return <MonoRoundedBubbleChart theme="${theme}" />;\n}`,
      component: <MonoRoundedBubbleChart theme={theme} />,
    },
    {
      id: 'mono-rounded-treemap',
      title: 'Mono Tile Treemap',
      description: 'Partition allocation treemap featuring rounded corner tiles and monochrome contrast shading.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-treemap',
      codeSnippet: `import { MonoRoundedTreemapChart } from '@/components/ui/mono-rounded-treemap';\n\nexport default function Demo() {\n  return <MonoRoundedTreemapChart theme="${theme}" />;\n}`,
      component: <MonoRoundedTreemapChart theme={theme} />,
    },
    {
      id: 'mono-rounded-stream',
      title: 'Mono Fluid Stream Wave',
      description: 'Multi-layer fluid stream wave area visualizer with rounded stroke joins and soft monochrome gradients.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-stream',
      codeSnippet: `import { MonoRoundedStreamChart } from '@/components/ui/mono-rounded-stream';\n\nexport default function Demo() {\n  return <MonoRoundedStreamChart theme="${theme}" />;\n}`,
      component: <MonoRoundedStreamChart theme={theme} />,
    },
    {
      id: 'mono-rounded-meter',
      title: 'Mono Arc Meter Gauge',
      description: 'Monochromatic semi-circle arc meter gauge with rounded stroke endcaps and center indicator.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-meter',
      codeSnippet: `import { MonoRoundedMeterChart } from '@/components/ui/mono-rounded-meter';\n\nexport default function Demo() {\n  return <MonoRoundedMeterChart theme="${theme}" />;\n}`,
      component: <MonoRoundedMeterChart theme={theme} />,
    },
    {
      id: 'mono-rounded-waterfall',
      title: 'Mono Waterfall Steps',
      description: 'Sequential delta step bar chart featuring floating pillars with rounded corner geometry.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-waterfall',
      codeSnippet: `import { MonoRoundedWaterfallChart } from '@/components/ui/mono-rounded-waterfall';\n\nexport default function Demo() {\n  return <MonoRoundedWaterfallChart theme="${theme}" />;\n}`,
      component: <MonoRoundedWaterfallChart theme={theme} />,
    },
    {
      id: 'mono-rounded-polar',
      title: 'Mono Polar Radial Pillars',
      description: 'Polar angle radial bar chart with 360-degree rounded arc pillars.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-polar',
      codeSnippet: `import { MonoRoundedPolarChart } from '@/components/ui/mono-rounded-polar';\n\nexport default function Demo() {\n  return <MonoRoundedPolarChart theme="${theme}" />;\n}`,
      component: <MonoRoundedPolarChart theme={theme} />,
    },
    {
      id: 'mono-rounded-range',
      title: 'Mono Range Band Area',
      description: 'Min-Max floating variance area band with smooth rounded spline boundary strokes.',
      cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-range',
      codeSnippet: `import { MonoRoundedRangeChart } from '@/components/ui/mono-rounded-range';\n\nexport default function Demo() {\n  return <MonoRoundedRangeChart theme="${theme}" />;\n}`,
      component: <MonoRoundedRangeChart theme={theme} />,
    },
  ], [theme]);

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8 font-sans">
      
      {/* Hero Header */}
      <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase transition-all shadow-sm ${
          isDark ? 'bg-white/10 text-neutral-200 border border-white/20' : 'bg-neutral-900 text-white border border-neutral-700'
        }`}>
          <Circle className="w-3.5 h-3.5 fill-current" />
          <span>30 Minimalist Visualizers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Mono Charts
        </h1>

        <p className={`text-sm sm:text-base max-w-lg ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
          A collection of 30 monochromatic chart visualizers built with rounded corner geometry and minimalist typography.
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

      {/* Main Charts Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <AnimatePresence mode="popLayout">
          {CARD_ITEMS.map((item) => (
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
    </div>
  );
}

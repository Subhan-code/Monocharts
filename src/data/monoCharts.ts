export interface MonoChartItem {
  id: string;
  label: string;
  kebabName: string;
  category: string;
  description: string;
  cliCommand: string;
  codeSnippet: string;
}

export const monoChartsData: MonoChartItem[] = [
  {
    id: 'mono-activity-green',
    label: 'Emerald Activity Heatmap',
    kebabName: 'mono-activity-green',
    category: 'matrix',
    description: 'Ultra-clean emerald green contribution heatmap grid with 20-week activity telemetry and hover cell metrics.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-activity-green',
    codeSnippet: `import { MonoActivityHeatmap } from '@/components/ui/mono-activity-heatmap';\n\nexport default function Demo() {\n  return <MonoActivityHeatmap accentColor="green" theme="dark" />;\n}`
  },
  {
    id: 'mono-activity-blue',
    label: 'Sky Blue Activity Heatmap',
    kebabName: 'mono-activity-blue',
    category: 'matrix',
    description: 'Vibrant sky blue contribution activity matrix with cell tooltips and minimalist month headers.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-activity-blue',
    codeSnippet: `import { MonoActivityHeatmap } from '@/components/ui/mono-activity-heatmap';\n\nexport default function Demo() {\n  return <MonoActivityHeatmap accentColor="blue" theme="dark" />;\n}`
  },
  {
    id: 'mono-activity-purple',
    label: 'Violet Activity Heatmap',
    kebabName: 'mono-activity-purple',
    category: 'matrix',
    description: 'Deep violet pulse contribution activity grid with rounded node cells and interactive telemetry.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-activity-purple',
    codeSnippet: `import { MonoActivityHeatmap } from '@/components/ui/mono-activity-heatmap';\n\nexport default function Demo() {\n  return <MonoActivityHeatmap accentColor="purple" theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-line',
    label: 'Mono Rounded Spline Line',
    kebabName: 'mono-rounded-line',
    category: 'line',
    description: 'Minimalist monochromatic line chart with smooth rounded spline curves and rounded stroke caps.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-line',
    codeSnippet: `import { MonoRoundedLineChart } from '@/components/ui/mono-rounded-line';\n\nexport default function Demo() {\n  return <MonoRoundedLineChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-bar',
    label: 'Mono Rounded Pill Pillars',
    kebabName: 'mono-rounded-bar',
    category: 'bar',
    description: 'Minimalist monochromatic bar chart with full corner radii pill columns and vertical/horizontal layout switches.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-bar',
    codeSnippet: `import { MonoRoundedBarChart } from '@/components/ui/mono-rounded-bar';\n\nexport default function Demo() {\n  return <MonoRoundedBarChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-area',
    label: 'Mono Curved Wave Area',
    kebabName: 'mono-rounded-area',
    category: 'area',
    description: 'Smooth monochromatic curved area wave visualizer with rounded stroke joins and soft opacity gradient shading.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-area',
    codeSnippet: `import { MonoRoundedAreaChart } from '@/components/ui/mono-rounded-area';\n\nexport default function Demo() {\n  return <MonoRoundedAreaChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-donut',
    label: 'Mono Rounded Donut Ring',
    kebabName: 'mono-rounded-donut',
    category: 'donut',
    description: 'Minimalist monochromatic donut chart with rounded segment endcaps, generous spacing, and center metric numbers.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-donut',
    codeSnippet: `import { MonoRoundedDonutChart } from '@/components/ui/mono-rounded-donut';\n\nexport default function Demo() {\n  return <MonoRoundedDonutChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-composed',
    label: 'Mono Hybrid Spline + Bar',
    kebabName: 'mono-rounded-composed',
    category: 'composed',
    description: 'Minimalist hybrid visualizer pairing rounded pill columns with a smooth curved spline line overlay.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-composed',
    codeSnippet: `import { MonoRoundedComposedChart } from '@/components/ui/mono-rounded-composed';\n\nexport default function Demo() {\n  return <MonoRoundedComposedChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-scatter',
    label: 'Mono Scatter Matrix',
    kebabName: 'mono-rounded-scatter',
    category: 'scatter',
    description: 'Minimalist monochromatic scatter node matrix with rounded circle nodes and hover trace callouts.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-scatter',
    codeSnippet: `import { MonoRoundedScatterChart } from '@/components/ui/mono-rounded-scatter';\n\nexport default function Demo() {\n  return <MonoRoundedScatterChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-candlestick',
    label: 'Mono Financial Candlesticks',
    kebabName: 'mono-rounded-candlestick',
    category: 'bar',
    description: 'Monochromatic candlestick financial price bars with rounded wick caps and solid/hollow candles.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-candlestick',
    codeSnippet: `import { MonoRoundedCandlestickChart } from '@/components/ui/mono-rounded-candlestick';\n\nexport default function Demo() {\n  return <MonoRoundedCandlestickChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-kpi',
    label: 'Mono Stat KPI Card',
    kebabName: 'mono-rounded-kpi',
    category: 'line',
    description: 'Minimalist KPI stat metric card featuring an embedded rounded spline sparkline indicator.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-kpi',
    codeSnippet: `import { MonoRoundedKpiCardChart } from '@/components/ui/mono-rounded-kpi';\n\nexport default function Demo() {\n  return <MonoRoundedKpiCardChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-pyramid',
    label: 'Mono Tier Pyramid Stack',
    kebabName: 'mono-rounded-pyramid',
    category: 'bar',
    description: 'Monochromatic pyramid level bar chart featuring rounded corner tier geometry.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-pyramid',
    codeSnippet: `import { MonoRoundedPyramidChart } from '@/components/ui/mono-rounded-pyramid';\n\nexport default function Demo() {\n  return <MonoRoundedPyramidChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-radial-group',
    label: 'Mono Radial Bar Group',
    kebabName: 'mono-rounded-radial-group',
    category: 'radial',
    description: 'Multi-ring radial progress bar group with rounded arc endcaps and layered utilization metrics.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-radial-group',
    codeSnippet: `import { MonoRoundedRadialBarGroup } from '@/components/ui/mono-rounded-radial-group';\n\nexport default function Demo() {\n  return <MonoRoundedRadialBarGroup theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-gauge-arc',
    label: 'Mono Speedometer Gauge Arc',
    kebabName: 'mono-rounded-gauge-arc',
    category: 'radial',
    description: 'Semi-circle arc speedometer gauge dial with rounded stroke endcaps and center score callout.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-gauge-arc',
    codeSnippet: `import { MonoRoundedGaugeArc } from '@/components/ui/mono-rounded-gauge-arc';\n\nexport default function Demo() {\n  return <MonoRoundedGaugeArc theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-bullet',
    label: 'Mono Performance Bullet Target',
    kebabName: 'mono-rounded-bullet',
    category: 'bar',
    description: 'Monochromatic performance bullet bar chart featuring target benchmark markers.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-bullet',
    codeSnippet: `import { MonoRoundedBulletChart } from '@/components/ui/mono-rounded-bullet';\n\nexport default function Demo() {\n  return <MonoRoundedBulletChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-sankey',
    label: 'Mono Flow Sankey Channels',
    kebabName: 'mono-rounded-sankey',
    category: 'matrix',
    description: 'Flow transfer channel visualizer featuring smooth curved SVG routing bands with rounded endcaps.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-sankey',
    codeSnippet: `import { MonoRoundedSankeyChart } from '@/components/ui/mono-rounded-sankey';\n\nexport default function Demo() {\n  return <MonoRoundedSankeyChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-step',
    label: 'Mono Step Progression',
    kebabName: 'mono-rounded-step',
    category: 'line',
    description: 'Monochromatic discrete staircase step chart with rounded stroke joins and level callouts.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-step',
    codeSnippet: `import { MonoRoundedStepChart } from '@/components/ui/mono-rounded-step';\n\nexport default function Demo() {\n  return <MonoRoundedStepChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-stacked-bar',
    label: 'Mono Stacked Tones Bar',
    kebabName: 'mono-rounded-stacked-bar',
    category: 'bar',
    description: 'Monochromatic stacked bar visualizer with rounded end pill geometry and layered opacity tones.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-stacked-bar',
    codeSnippet: `import { MonoRoundedStackedBarChart } from '@/components/ui/mono-rounded-stacked-bar';\n\nexport default function Demo() {\n  return <MonoRoundedStackedBarChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-radar',
    label: 'Mono Polygon Web Radar',
    kebabName: 'mono-rounded-radar',
    category: 'radial',
    description: 'Minimalist monochromatic multi-axis polygon radar web with smooth rounded stroke join geometry.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-radar',
    codeSnippet: `import { MonoRoundedRadarChart } from '@/components/ui/mono-rounded-radar';\n\nexport default function Demo() {\n  return <MonoRoundedRadarChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-radial-gauge',
    label: 'Mono Concentric Radial Rings',
    kebabName: 'mono-rounded-radial-gauge',
    category: 'radial',
    description: 'Monochromatic concentric progress rings with rounded arc caps and layered utilization metrics.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-radial-gauge',
    codeSnippet: `import { MonoRoundedRadialGaugeChart } from '@/components/ui/mono-rounded-radial-gauge';\n\nexport default function Demo() {\n  return <MonoRoundedRadialGaugeChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-funnel',
    label: 'Mono Stage Funnel',
    kebabName: 'mono-rounded-funnel',
    category: 'bar',
    description: 'Horizontal funnel stage visualizer using monochromatic pill bars with rounded endcaps.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-funnel',
    codeSnippet: `import { MonoRoundedFunnelChart } from '@/components/ui/mono-rounded-funnel';\n\nexport default function Demo() {\n  return <MonoRoundedFunnelChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-heatmap',
    label: 'Mono Dot Matrix Heatmap',
    kebabName: 'mono-rounded-heatmap',
    category: 'matrix',
    description: 'Monochromatic activity matrix with rounded corner cells and density opacity shading.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-heatmap',
    codeSnippet: `import { MonoRoundedHeatmapChart } from '@/components/ui/mono-rounded-heatmap';\n\nexport default function Demo() {\n  return <MonoRoundedHeatmapChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-sparkline',
    label: 'Mono Sparkline Telemetry',
    kebabName: 'mono-rounded-sparkline',
    category: 'line',
    description: 'Compact telemetry row suite featuring rounded micro splines and live metric readouts.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-sparkline',
    codeSnippet: `import { MonoRoundedSparklineChart } from '@/components/ui/mono-rounded-sparkline';\n\nexport default function Demo() {\n  return <MonoRoundedSparklineChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-bubble',
    label: 'Mono Bubble Clusters',
    kebabName: 'mono-rounded-bubble',
    category: 'scatter',
    description: 'Scaled circle bubble distribution with rounded stroke outlines and monochromatic opacity fills.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-bubble',
    codeSnippet: `import { MonoRoundedBubbleChart } from '@/components/ui/mono-rounded-bubble';\n\nexport default function Demo() {\n  return <MonoRoundedBubbleChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-treemap',
    label: 'Mono Tile Treemap',
    kebabName: 'mono-rounded-treemap',
    category: 'matrix',
    description: 'Partition allocation treemap featuring rounded corner tiles and monochrome contrast shading.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-treemap',
    codeSnippet: `import { MonoRoundedTreemapChart } from '@/components/ui/mono-rounded-treemap';\n\nexport default function Demo() {\n  return <MonoRoundedTreemapChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-stream',
    label: 'Mono Fluid Stream Wave',
    kebabName: 'mono-rounded-stream',
    category: 'area',
    description: 'Multi-layer fluid stream wave area visualizer with rounded stroke joins and soft monochrome gradients.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-stream',
    codeSnippet: `import { MonoRoundedStreamChart } from '@/components/ui/mono-rounded-stream';\n\nexport default function Demo() {\n  return <MonoRoundedStreamChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-meter',
    label: 'Mono Arc Meter Gauge',
    kebabName: 'mono-rounded-meter',
    category: 'radial',
    description: 'Monochromatic semi-circle arc meter gauge with rounded stroke endcaps and center indicator.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-meter',
    codeSnippet: `import { MonoRoundedMeterChart } from '@/components/ui/mono-rounded-meter';\n\nexport default function Demo() {\n  return <MonoRoundedMeterChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-waterfall',
    label: 'Mono Waterfall Steps',
    kebabName: 'mono-rounded-waterfall',
    category: 'bar',
    description: 'Sequential delta step bar chart featuring floating pillars with rounded corner geometry.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-waterfall',
    codeSnippet: `import { MonoRoundedWaterfallChart } from '@/components/ui/mono-rounded-waterfall';\n\nexport default function Demo() {\n  return <MonoRoundedWaterfallChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-polar',
    label: 'Mono Polar Radial Pillars',
    kebabName: 'mono-rounded-polar',
    category: 'radial',
    description: 'Polar angle radial bar chart with 360-degree rounded arc pillars.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-polar',
    codeSnippet: `import { MonoRoundedPolarChart } from '@/components/ui/mono-rounded-polar';\n\nexport default function Demo() {\n  return <MonoRoundedPolarChart theme="dark" />;\n}`
  },
  {
    id: 'mono-rounded-range',
    label: 'Mono Range Band Area',
    kebabName: 'mono-rounded-range',
    category: 'area',
    description: 'Min-Max floating variance area band with smooth rounded spline boundary strokes.',
    cliCommand: 'npx @subhanhq/amicro@latest add mono-rounded-range',
    codeSnippet: `import { MonoRoundedRangeChart } from '@/components/ui/mono-rounded-range';\n\nexport default function Demo() {\n  return <MonoRoundedRangeChart theme="dark" />;\n}`
  }
];

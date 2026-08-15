export interface DitherChartItem {
  id: string;
  label: string;
  kebabName: string;
  category: string;
  description: string;
  cliCommand: string;
  codeSnippet: string;
}

export type SimpleCompItem = DitherChartItem;

export const ditherChartsData: DitherChartItem[] = [
  // ── EVIL DITHER ENGINE CHARTS ──────────────────────────────────────
  {
    id: 'evil-dither-bar',
    label: 'Evil Dither Bar Matrix',
    kebabName: 'evil-dither-bar',
    category: 'bar',
    description: 'High-performance SVG dither bar chart with hatched, duotone & striped pattern matrix options.',
    cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-bar',
    codeSnippet: `import { EvilDitherBarChart } from '@/components/ui/evil-dither-bar';\n\nexport default function Demo() {\n  return <EvilDitherBarChart theme="dark" />;\n}`
  },
  {
    id: 'evil-dither-area',
    label: 'Evil Dither Area Shading',
    kebabName: 'evil-dither-area',
    category: 'area',
    description: 'Bump-curve area visualizer with stipple noise dither gradient fill & curve controls.',
    cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-area',
    codeSnippet: `import { EvilDitherAreaChart } from '@/components/ui/evil-dither-area';\n\nexport default function Demo() {\n  return <EvilDitherAreaChart theme="dark" />;\n}`
  },
  {
    id: 'evil-dither-line',
    label: 'Evil Dither Telemetry Line',
    kebabName: 'evil-dither-line',
    category: 'line',
    description: 'Real-time telemetry line graph with live ping indicators & monospace dither gridlines.',
    cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-line',
    codeSnippet: `import { EvilDitherLineChart } from '@/components/ui/evil-dither-line';\n\nexport default function Demo() {\n  return <EvilDitherLineChart theme="dark" />;\n}`
  },
  {
    id: 'evil-dither-pie',
    label: 'Evil Dither Padded Donut',
    kebabName: 'evil-dither-pie',
    category: 'pie',
    description: 'Storage allocation donut chart with rounded padded wedges & dither matrix cell highlights.',
    cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-pie',
    codeSnippet: `import { EvilDitherPieChart } from '@/components/ui/evil-dither-pie';\n\nexport default function Demo() {\n  return <EvilDitherPieChart theme="dark" />;\n}`
  },
  {
    id: 'evil-dither-composed',
    label: 'Evil Dither Composed Chart',
    kebabName: 'evil-dither-composed',
    category: 'composed',
    description: 'Hybrid performance visualizer combining dither area, hatched columns, and benchmark target line.',
    cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-composed',
    codeSnippet: `import { EvilDitherComposedChart } from '@/components/ui/evil-dither-composed';\n\nexport default function Demo() {\n  return <EvilDitherComposedChart theme="dark" />;\n}`
  },
  {
    id: 'evil-dither-radar',
    label: 'Evil Dither Radar Web',
    kebabName: 'evil-dither-radar',
    category: 'radar',
    description: 'Concentric multi-axis polygon radar with dithered dot matrix web overlay.',
    cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-radar',
    codeSnippet: `import { EvilDitherRadarChart } from '@/components/ui/evil-dither-radar';\n\nexport default function Demo() {\n  return <EvilDitherRadarChart theme="dark" />;\n}`
  },
  {
    id: 'evil-dither-radial',
    label: 'Evil Dither Radial Gauges',
    kebabName: 'evil-dither-radial',
    category: 'radial',
    description: 'Concentric radial progress rings with dither gradient strokes and utilization meters.',
    cliCommand: 'npx @subhanhq/amicro@latest add evil-dither-radial',
    codeSnippet: `import { EvilDitherRadialChart } from '@/components/ui/evil-dither-radial';\n\nexport default function Demo() {\n  return <EvilDitherRadialChart theme="dark" />;\n}`
  },

  // ── ORIGINAL DITHER MATRIX CHARTS ──────────────────────────────────
  {
    id: 'dither-donut',
    label: 'Original Dither Donut',
    kebabName: 'dither-donut',
    category: 'legacy',
    description: 'Canvas dithered donut graph with white particle highlights & period selectors.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-donut',
    codeSnippet: `import { DitherDonutChart } from '@/components/ui/dither-donut';\n\nexport default function Demo() {\n  return <DitherDonutChart theme="dark" />;\n}`
  },
  {
    id: 'dither-stacked',
    label: 'Original Dither Stacked',
    kebabName: 'dither-stacked',
    category: 'legacy',
    description: 'Stacked canvas bar graph with regional branch hovers & white dither bands.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-stacked',
    codeSnippet: `import { DitherStackedChart } from '@/components/ui/dither-stacked';\n\nexport default function Demo() {\n  return <DitherStackedChart theme="dark" />;\n}`
  },
  {
    id: 'dither-growth',
    label: 'Original Dither Growth',
    kebabName: 'dither-growth',
    category: 'legacy',
    description: 'Canvas area growth line graph with white dither tiles & date scrubber cursor.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-growth',
    codeSnippet: `import { DitherGrowthChart } from '@/components/ui/dither-growth';\n\nexport default function Demo() {\n  return <DitherGrowthChart theme="dark" />;\n}`
  },
  {
    id: 'dither-heatmap',
    label: 'Original Activity Heatmap',
    kebabName: 'dither-heatmap',
    category: 'legacy',
    description: 'Activity heatmap grid with white dither intensity tiles.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-heatmap',
    codeSnippet: `import { ActivityHeatmap } from '@/components/ui/dither-heatmap';\n\nexport default function Demo() {\n  return <ActivityHeatmap theme="dark" />;\n}`
  },
  {
    id: 'dither-gauge',
    label: 'Original Server Gauge',
    kebabName: 'dither-gauge',
    category: 'legacy',
    description: 'Server CPU & memory radial gauge dial with white dither dot matrix.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-gauge',
    codeSnippet: `import { ServerGauge } from '@/components/ui/dither-gauge';\n\nexport default function Demo() {\n  return <ServerGauge theme="dark" />;\n}`
  },
  {
    id: 'dither-traffic',
    label: 'Original Traffic Bubbles',
    kebabName: 'dither-traffic',
    category: 'legacy',
    description: 'Traffic source scatter bubble plot with floating white dither nodes.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-traffic',
    codeSnippet: `import { TrafficBubble } from '@/components/ui/dither-traffic';\n\nexport default function Demo() {\n  return <TrafficBubble theme="dark" />;\n}`
  },
  {
    id: 'dither-funnel',
    label: 'Original Conversion Funnel',
    kebabName: 'dither-funnel',
    category: 'legacy',
    description: 'Conversion funnel with white dither progress stage bars.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-funnel',
    codeSnippet: `import { DitherFunnelChart } from '@/components/ui/dither-funnel';\n\nexport default function Demo() {\n  return <DitherFunnelChart theme="dark" />;\n}`
  },
  {
    id: 'dither-device',
    label: 'Original Device Breakdown',
    kebabName: 'dither-device',
    category: 'legacy',
    description: 'Device usage donut chart with white dither particle segments.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-device',
    codeSnippet: `import { DeviceUsageChart } from '@/components/ui/dither-device';\n\nexport default function Demo() {\n  return <DeviceUsageChart theme="dark" />;\n}`
  },
  {
    id: 'dither-storage',
    label: 'Original Storage Bar',
    kebabName: 'dither-storage',
    category: 'legacy',
    description: 'Storage capacity bar with animated white dither progress shaders.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-storage',
    codeSnippet: `import { StorageUsageChart } from '@/components/ui/dither-storage';\n\nexport default function Demo() {\n  return <StorageUsageChart theme="dark" />;\n}`
  },
  {
    id: 'dither-revenue',
    label: 'Original Revenue Line',
    kebabName: 'dither-revenue',
    category: 'legacy',
    description: 'Revenue line graph with white dither gradient fill.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-revenue',
    codeSnippet: `import { RevenueLineChart } from '@/components/ui/dither-revenue';\n\nexport default function Demo() {\n  return <RevenueLineChart theme="dark" />;\n}`
  },
  {
    id: 'dither-uptime',
    label: 'Original System Uptime',
    kebabName: 'dither-uptime',
    category: 'legacy',
    description: '90-day system uptime matrix with white dither status tiles.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-uptime',
    codeSnippet: `import { UptimeChart } from '@/components/ui/dither-uptime';\n\nexport default function Demo() {\n  return <UptimeChart theme="dark" />;\n}`
  }
];

export const simpleCompData = ditherChartsData;

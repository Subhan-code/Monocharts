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
  {
    id: 'dither-donut',
    label: 'Dither Donut Graph',
    kebabName: 'dither-donut',
    category: 'donut',
    description: 'Canvas dithered donut graph with white particle highlights & period selectors.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-donut',
    codeSnippet: `import { DitherDonutChart } from '@/components/ui/dither-donut';\n\nexport default function Demo() {\n  return <DitherDonutChart theme="dark" />;\n}`
  },
  {
    id: 'dither-stacked',
    label: 'Dither Stacked Bar',
    kebabName: 'dither-stacked',
    category: 'bar',
    description: 'Stacked canvas bar graph with regional branch hovers & white dither bands.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-stacked',
    codeSnippet: `import { DitherStackedChart } from '@/components/ui/dither-stacked';\n\nexport default function Demo() {\n  return <DitherStackedChart theme="dark" />;\n}`
  },
  {
    id: 'dither-growth',
    label: 'Dither Area Growth',
    kebabName: 'dither-growth',
    category: 'area',
    description: 'Canvas area growth line graph with white dither tiles & date scrubber cursor.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-growth',
    codeSnippet: `import { DitherGrowthChart } from '@/components/ui/dither-growth';\n\nexport default function Demo() {\n  return <DitherGrowthChart theme="dark" />;\n}`
  },
  {
    id: 'dither-heatmap',
    label: 'Activity Dither Heatmap',
    kebabName: 'dither-heatmap',
    category: 'matrix',
    description: 'Activity heatmap grid with white dither intensity tiles.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-heatmap',
    codeSnippet: `import { ActivityHeatmap } from '@/components/ui/dither-heatmap';\n\nexport default function Demo() {\n  return <ActivityHeatmap theme="dark" />;\n}`
  },
  {
    id: 'dither-gauge',
    label: 'Server CPU Gauge',
    kebabName: 'dither-gauge',
    category: 'radial',
    description: 'Server CPU & memory radial gauge dial with white dither dot matrix.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-gauge',
    codeSnippet: `import { ServerGauge } from '@/components/ui/dither-gauge';\n\nexport default function Demo() {\n  return <ServerGauge theme="dark" />;\n}`
  },
  {
    id: 'dither-traffic',
    label: 'Traffic Scatter Bubbles',
    kebabName: 'dither-traffic',
    category: 'scatter',
    description: 'Traffic source scatter bubble plot with floating white dither nodes.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-traffic',
    codeSnippet: `import { TrafficBubble } from '@/components/ui/dither-traffic';\n\nexport default function Demo() {\n  return <TrafficBubble theme="dark" />;\n}`
  },
  {
    id: 'dither-funnel',
    label: 'Conversion Funnel',
    kebabName: 'dither-funnel',
    category: 'bar',
    description: 'Conversion funnel with white dither progress stage bars.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-funnel',
    codeSnippet: `import { DitherFunnelChart } from '@/components/ui/dither-funnel';\n\nexport default function Demo() {\n  return <DitherFunnelChart theme="dark" />;\n}`
  },
  {
    id: 'dither-device',
    label: 'Device Usage Donut',
    kebabName: 'dither-device',
    category: 'donut',
    description: 'Device usage donut chart with white dither particle segments.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-device',
    codeSnippet: `import { DeviceUsageChart } from '@/components/ui/dither-device';\n\nexport default function Demo() {\n  return <DeviceUsageChart theme="dark" />;\n}`
  },
  {
    id: 'dither-storage',
    label: 'Storage Capacity Bar',
    kebabName: 'dither-storage',
    category: 'bar',
    description: 'Storage capacity bar with animated white dither progress shaders.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-storage',
    codeSnippet: `import { StorageUsageChart } from '@/components/ui/dither-storage';\n\nexport default function Demo() {\n  return <StorageUsageChart theme="dark" />;\n}`
  },
  {
    id: 'dither-revenue',
    label: 'Revenue Spline Line',
    kebabName: 'dither-revenue',
    category: 'line',
    description: 'Revenue line graph with white dither gradient fill.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-revenue',
    codeSnippet: `import { RevenueLineChart } from '@/components/ui/dither-revenue';\n\nexport default function Demo() {\n  return <RevenueLineChart theme="dark" />;\n}`
  },
  {
    id: 'dither-uptime',
    label: 'System Uptime Matrix',
    kebabName: 'dither-uptime',
    category: 'matrix',
    description: '90-day system uptime matrix with white dither status tiles.',
    cliCommand: 'npx @subhanhq/amicro@latest add dither-uptime',
    codeSnippet: `import { UptimeChart } from '@/components/ui/dither-uptime';\n\nexport default function Demo() {\n  return <UptimeChart theme="dark" />;\n}`
  }
];

export const simpleCompData = ditherChartsData;

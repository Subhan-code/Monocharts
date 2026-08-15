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
    id: 'mono-rounded-line',
    label: 'Mono Rounded Spline Line',
    kebabName: 'mono-rounded-line',
    category: 'line',
    description: 'Minimalist monochromatic line chart with smooth rounded spline curves, rounded stroke caps, and dot callouts.',
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
  }
];

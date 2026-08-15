import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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

interface DitherChartsPageProps {
  theme: 'dark' | 'light';
  showToast?: (message: string) => void;
  triggerHaptic?: (type: 'success' | 'warning' | 'error' | 'light' | 'medium' | 'heavy') => void;
  onNavigate3D?: () => void;
}

export function DitherChartsPage({ theme }: DitherChartsPageProps) {
  const isDark = theme === 'dark';

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <InViewRender><DitherDonutChart theme={theme} /></InViewRender>
        <InViewRender><DitherStackedChart theme={theme} /></InViewRender>
        <InViewRender><DitherGrowthChart theme={theme} /></InViewRender>
        <InViewRender><ActivityHeatmap theme={theme} /></InViewRender>
        <InViewRender><ServerGauge theme={theme} /></InViewRender>
        <InViewRender><TrafficBubble theme={theme} /></InViewRender>
        <InViewRender><DitherFunnelChart theme={theme} /></InViewRender>
        <InViewRender><DeviceUsageChart theme={theme} /></InViewRender>
        <InViewRender><StorageUsageChart theme={theme} /></InViewRender>
        <InViewRender><RevenueLineChart theme={theme} /></InViewRender>
        <InViewRender><UptimeChart theme={theme} /></InViewRender>
      </div>
    </div>
  );
}

export const SimpleCompPage = DitherChartsPage;

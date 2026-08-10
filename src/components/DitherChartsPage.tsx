import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
import { Box, Sparkles, ArrowRight, Search, Link2, Copy, Check } from 'lucide-react';

interface DitherChartsPageProps {
  theme: 'dark' | 'light';
  showToast?: (message: string) => void;
  triggerHaptic?: (type: 'success' | 'warning' | 'error' | 'light' | 'medium' | 'heavy') => void;
  onNavigate3D?: () => void;
}

type CompCategory = 'all' | 'donut' | 'growth' | 'stacked' | 'gauge' | 'heatmap' | 'analytics';

export function DitherChartsPage({ theme, showToast, triggerHaptic, onNavigate3D }: DitherChartsPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Parse URL search params from hash on mount and hashchange
  useEffect(() => {
    const parseUrlQuery = () => {
      const hash = window.location.hash || '';
      const queryIdx = hash.indexOf('?');
      if (queryIdx !== -1) {
        const queryStr = hash.substring(queryIdx + 1);
        const params = new URLSearchParams(queryStr);
        const searchParam = params.get('search');
        const catParam = params.get('category');
        if (searchParam) setSearchQuery(searchParam);
        if (catParam) setActiveCategory(catParam);
      }
    };

    parseUrlQuery();
    window.addEventListener('hashchange', parseUrlQuery);
    return () => window.removeEventListener('hashchange', parseUrlQuery);
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setSearchQuery('');
    window.location.hash = `#/dither-charts?category=${encodeURIComponent(cat)}`;
    if (triggerHaptic) triggerHaptic('light');
  }, [triggerHaptic]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim()) {
      window.location.hash = `#/dither-charts?search=${encodeURIComponent(q.trim())}`;
    } else {
      window.location.hash = `#/dither-charts`;
    }
  }, []);

  const copyDirectLink = useCallback((keyword: string) => {
    const url = `${window.location.origin}${window.location.pathname}#/dither-charts?search=${encodeURIComponent(keyword)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(keyword);
      if (triggerHaptic) triggerHaptic('success');
      if (showToast) showToast(`Copied URL for keyword "${keyword}"!`);
      setTimeout(() => setCopiedLink(null), 2000);
    });
  }, [showToast, triggerHaptic]);

  const queryTerm = useMemo(() => {
    return (searchQuery || (activeCategory !== 'all' ? activeCategory : '')).toLowerCase().trim();
  }, [searchQuery, activeCategory]);

  const matchesKeyword = useCallback((keywords: string[]) => {
    if (!queryTerm) return true;
    return keywords.some(k => k.toLowerCase().includes(queryTerm) || queryTerm.includes(k.toLowerCase()));
  }, [queryTerm]);

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10 font-sans">
      
      {/* Page Hero Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${
          theme === 'dark' ? 'bg-white/10 text-neutral-300 border border-white/10' : 'bg-neutral-200 text-neutral-700 border border-neutral-300'
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Canvas Dither Shaders</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
          Dither Charts
        </h1>
        <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
          A curated collection of canvas dither shaders, real-time data visualizers, dot matrix gauges, and interactive micro-charts.
        </p>

        {/* Live Keyword Search Input */}
        <div className="relative w-full max-w-md mt-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search components by keyword (e.g. donut, growth, uptime, gauge)..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-full text-xs transition-all outline-none border ${
              theme === 'dark'
                ? 'bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-blue-500/50'
                : 'bg-white border-neutral-300 text-black placeholder:text-neutral-400 focus:border-blue-600 shadow-sm'
            }`}
          />
        </div>
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

      {/* Filter Category Tabs with Unique URLs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {['all', 'donut', 'growth', 'stacked', 'gauge', 'heatmap', 'analytics'].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all cursor-pointer border ${
              activeCategory === cat && !searchQuery
                ? (theme === 'dark' ? 'bg-white text-black border-white font-semibold' : 'bg-black text-white border-black font-semibold')
                : (theme === 'dark' ? 'bg-white/5 border-white/10 text-neutral-400 hover:text-white' : 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:text-black')
            }`}
          >
            {cat === 'all' ? 'All Visualizers' : cat}
          </button>
        ))}
      </div>

      {/* Real-time Dither Charts Grid */}
      <div className={`w-full rounded-[24px] p-6 border flex flex-col gap-6 shadow-xl ${
        theme === 'dark' ? 'bg-[#181818] border-white/10' : 'bg-white border-neutral-200'
      }`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={queryTerm}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full flex flex-col gap-6"
          >
            {/* Donut & System Group */}
            {(matchesKeyword(['donut', 'gauge', 'device', 'distribution', 'load'])) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                {matchesKeyword(['donut', 'plan', 'distribution']) && (
                  <div className="relative group">
                    <DitherDonutChart theme={theme} />
                    <button 
                      onClick={() => copyDirectLink('donut')}
                      title="Copy keyword URL for Donut Chart"
                      className="absolute top-8 right-8 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                    >
                      {copiedLink === 'donut' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
                {matchesKeyword(['gauge', 'server', 'cpu', 'system']) && (
                  <div className="relative group">
                    <ServerGauge theme={theme} />
                    <button 
                      onClick={() => copyDirectLink('gauge')}
                      title="Copy keyword URL for Server Gauge"
                      className="absolute top-8 right-8 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                    >
                      {copiedLink === 'gauge' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
                {matchesKeyword(['device', 'mobile', 'desktop']) && (
                  <div className="relative group">
                    <DeviceUsageChart theme={theme} />
                    <button 
                      onClick={() => copyDirectLink('device')}
                      title="Copy keyword URL for Device Usage"
                      className="absolute top-8 right-8 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                    >
                      {copiedLink === 'device' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Growth & Analytics Group */}
            {(matchesKeyword(['growth', 'heatmap', 'traffic', 'revenue', 'analytics', 'uptime'])) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                {matchesKeyword(['growth', 'analytics', 'trend']) && (
                  <div className="relative group">
                    <DitherGrowthChart theme={theme} />
                    <button 
                      onClick={() => copyDirectLink('growth')}
                      title="Copy keyword URL for Growth Chart"
                      className="absolute top-8 right-8 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                    >
                      {copiedLink === 'growth' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
                {matchesKeyword(['heatmap', 'activity', 'contributions']) && (
                  <div className="relative group">
                    <ActivityHeatmap theme={theme} />
                    <button 
                      onClick={() => copyDirectLink('heatmap')}
                      title="Copy keyword URL for Heatmap"
                      className="absolute top-8 right-8 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                    >
                      {copiedLink === 'heatmap' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
                {matchesKeyword(['traffic', 'bubble', 'geo']) && (
                  <div className="relative group">
                    <TrafficBubble theme={theme} />
                    <button 
                      onClick={() => copyDirectLink('traffic')}
                      title="Copy keyword URL for Traffic Bubble"
                      className="absolute top-8 right-8 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                    >
                      {copiedLink === 'traffic' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
                {matchesKeyword(['revenue', 'finance', 'sales']) && (
                  <div className="relative group">
                    <RevenueLineChart theme={theme} />
                    <button 
                      onClick={() => copyDirectLink('revenue')}
                      title="Copy keyword URL for Revenue Chart"
                      className="absolute top-8 right-8 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                    >
                      {copiedLink === 'revenue' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Stacked, Funnel & Storage Group */}
            {(matchesKeyword(['stacked', 'funnel', 'storage', 'uptime', 'devops'])) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                {matchesKeyword(['stacked', 'bar', 'multi']) && (
                  <div className="relative group">
                    <DitherStackedChart theme={theme} />
                    <button 
                      onClick={() => copyDirectLink('stacked')}
                      title="Copy keyword URL for Stacked Chart"
                      className="absolute top-8 right-8 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                    >
                      {copiedLink === 'stacked' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
                {matchesKeyword(['funnel', 'conversion', 'leads']) && (
                  <div className="relative group">
                    <DitherFunnelChart theme={theme} />
                    <button 
                      onClick={() => copyDirectLink('funnel')}
                      title="Copy keyword URL for Funnel Chart"
                      className="absolute top-8 right-8 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                    >
                      {copiedLink === 'funnel' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
                {matchesKeyword(['uptime', 'status', 'availability']) && (
                  <div className="relative group">
                    <UptimeChart theme={theme} />
                    <button 
                      onClick={() => copyDirectLink('uptime')}
                      title="Copy keyword URL for Uptime Chart"
                      className="absolute top-8 right-8 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                    >
                      {copiedLink === 'uptime' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
                {matchesKeyword(['storage', 'disk', 'capacity']) && (
                  <div className="relative group">
                    <StorageUsageChart theme={theme} />
                    <button 
                      onClick={() => copyDirectLink('storage')}
                      title="Copy keyword URL for Storage Usage"
                      className="absolute top-8 right-8 p-1.5 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                    >
                      {copiedLink === 'storage' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export const SimpleCompPage = DitherChartsPage;

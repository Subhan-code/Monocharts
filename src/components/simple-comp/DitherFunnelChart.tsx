import React, { useEffect, useRef, useState } from 'react';

const STAGES_DATA = [
  { name: 'Q1 Funnel', stages: [{ label: 'Visitors', val: 100, color: '#FFFFFF' }, { label: 'Leads', val: 62, color: '#E2E8F0' }, { label: 'Deals', val: 38, color: '#CBD5E1' }, { label: 'Won', val: 18, color: '#94A3B8' }] },
  { name: 'Q2 Funnel', stages: [{ label: 'Visitors', val: 100, color: '#FFFFFF' }, { label: 'Leads', val: 74, color: '#E2E8F0' }, { label: 'Deals', val: 45, color: '#CBD5E1' }, { label: 'Won', val: 24, color: '#94A3B8' }] },
];

const smoothstep = (min: number, max: number, value: number) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

const hash = (x: number, y: number) => {
  let h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return h - Math.floor(h);
};

export const DitherFunnelChart = React.memo(function DitherFunnelChart({ theme = 'dark', compact = false }: { theme?: 'dark' | 'light'; compact?: boolean }) {
  const [periodIndex] = useState(0);
  const period = STAGES_DATA[periodIndex];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rectRef = useRef({ width: 0, height: 0 });
  const isInViewRef = useRef(true);

  const targetDataRef = useRef(period.stages);
  const fromDataRef = useRef(period.stages);
  const morphStartTimeRef = useRef(0);

  useEffect(() => {
    fromDataRef.current = targetDataRef.current;
    targetDataRef.current = period.stages;
    morphStartTimeRef.current = performance.now();
  }, [period]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateRect = () => {
      const r = canvas.getBoundingClientRect();
      rectRef.current = { width: r.width, height: r.height };
    };
    updateRect();

    const ro = new ResizeObserver(updateRect);
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      isInViewRef.current = entry.isIntersecting;
    }, { threshold: 0.05 });
    io.observe(canvas);

    let req: number;
    let time = 0;
    const draw = () => {
      req = requestAnimationFrame(draw);
      if (!isInViewRef.current) return;

      const rect = rectRef.current;
      if (rect.width <= 0 || rect.height <= 0) return;

      time += 0.02;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      let prog = Math.min(1, (performance.now() - morphStartTimeRef.current) / 500);
      const e = 1 - Math.pow(2, -10 * prog);

      const count = period.stages.length;
      const w = rect.width;
      const h = rect.height;
      const rowH = (h - (count - 1) * 6) / count;
      const cell = Math.max(2, Math.round(rect.width / 200));

      for (let i = 0; i < count; i++) {
        const target = targetDataRef.current[i];
        const from = fromDataRef.current[i];
        const val = from.val + (target.val - from.val) * e;
        
        const stageW = (val / 100) * w;
        const yTop = i * (rowH + 6);

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, yTop, stageW, rowH);
        ctx.clip();

        ctx.globalAlpha = 0.85;
        ctx.fillStyle = target.color;

        for (let bx = 0; bx <= Math.ceil(stageW); bx += cell) {
          for (let by = Math.floor(yTop); by <= Math.ceil(yTop + rowH); by += cell) {
            const jx = bx + cell / 2;
            const jy = by + cell / 2;
            const jit = hash(jx, jy);

            const waveRaw = Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7);
            const mod = smoothstep(-1.5, 1.5, waveRaw);

            const sz = cell * (0.35 + 0.35 * mod) * (0.8 + 0.4 * jit);
            ctx.fillRect(bx + (cell - sz)/2, by + (cell - sz)/2, sz, sz);
          }
        }
        ctx.restore();
      }

      ctx.restore();
    };

    req = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(req);
      ro.disconnect();
      io.disconnect();
    };
  }, [period]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="relative w-full h-[140px] flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
      </div>
    </div>
  );
});

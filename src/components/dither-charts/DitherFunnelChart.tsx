import React, { useEffect, useRef, useState } from 'react';
import { useCanvasSetup } from '../../hooks/useCanvasSetup';

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

export function DitherFunnelChart({ theme = 'dark', compact = false }: { theme?: 'dark' | 'light'; compact?: boolean }) {
  const [periodIndex, setPeriodIndex] = useState(0);
  const period = STAGES_DATA[periodIndex];
  const { canvasRef, rect, isVisible, reducedMotion } = useCanvasSetup();

  const targetDataRef = useRef(period.stages);
  const fromDataRef = useRef(period.stages);
  const morphStartTimeRef = useRef(0);

  useEffect(() => {
    fromDataRef.current = targetDataRef.current;
    targetDataRef.current = period.stages;
    morphStartTimeRef.current = performance.now();
  }, [period]);

  useEffect(() => {
    let req: number;
    // Throttle to 30fps — funnel bars are nearly static
    let lastFrame = 0;
    let time = 0;
    const draw = (now: number) => {
      req = requestAnimationFrame(draw);
      if (!isVisible.current) return;
      if (now - lastFrame < 33) return; // ~30fps
      lastFrame = now;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width: w, height: h } = rect.current;
      if (w === 0 || h === 0) return;

      time += reducedMotion ? 0 : 0.02;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const prog = reducedMotion ? 1 : Math.min(1, (performance.now() - morphStartTimeRef.current) / 500);
      const e = 1 - Math.pow(2, -10 * prog);

      const count = period.stages.length;
      const rowH = (h - (count - 1) * 6) / count;
      const cell = Math.max(2, Math.round(w / 200));
      const t2 = time;

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

            const waveRaw = reducedMotion ? 0 :
              Math.sin(jx * 0.05 + t2) + Math.sin(jy * 0.05 + t2 * 0.7);
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
    return () => cancelAnimationFrame(req);
  }, [period, reducedMotion]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="relative w-full h-[140px] flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState, useCallback } from 'react';

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
  const isInViewRef = useRef(false);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  const targetDataRef = useRef(period.stages);
  const fromDataRef = useRef(period.stages);
  const morphStartTimeRef = useRef(0);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  }, []);

  const handlePointerLeave = useCallback(() => {
    pointerRef.current.active = false;
  }, []);

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

    let req: number | null = null;
    let time = 0;
    let currPx = -1000;
    let currPy = -1000;

    const draw = () => {
      if (!isInViewRef.current) return;
      req = requestAnimationFrame(draw);

      const rect = rectRef.current;
      if (rect.width <= 0 || rect.height <= 0) return;

      time += 0.02;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      }
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);

      let prog = Math.min(1, (performance.now() - morphStartTimeRef.current) / 500);
      const e = 1 - Math.pow(2, -10 * prog);

      const targetP = pointerRef.current;
      if (targetP.active) {
        currPx += (targetP.x - currPx) * 0.25;
        currPy += (targetP.y - currPy) * 0.25;
      } else {
        currPx += (-1000 - currPx) * 0.1;
        currPy += (-1000 - currPy) * 0.1;
      }

      const count = period.stages.length;
      const w = rect.width;
      const h = rect.height;
      const rowH = (h - (count - 1) * 6) / count;
      const cell = 2;

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

            const pdx = jx - currPx;
            const pdy = jy - currPy;
            const pdist = Math.hypot(pdx, pdy);
            const ripple = Math.max(0, 1 - pdist / 35);

            const waveRaw = Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7);
            const mod = smoothstep(-1.5, 1.5, waveRaw);

            let sz = cell * (0.35 + 0.35 * mod) * (0.8 + 0.4 * jit);
            if (ripple > 0) {
              sz = sz * (1 + ripple * 0.8);
            }
            ctx.fillRect(bx + (cell - sz)/2, by + (cell - sz)/2, sz, sz);
          }
        }
        ctx.restore();
      }

      if (currPx > 0 && currPy > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(currPx, currPy, 14, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    };

    const io = new IntersectionObserver(([entry]) => {
      isInViewRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        if (!req) req = requestAnimationFrame(draw);
      } else {
        if (req) {
          cancelAnimationFrame(req);
          req = null;
        }
      }
    }, { threshold: 0.05 });
    io.observe(canvas);

    return () => {
      if (req) cancelAnimationFrame(req);
      ro.disconnect();
      io.disconnect();
    };
  }, [period]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="relative w-full h-[140px] flex items-center justify-center touch-none">
        <canvas 
          ref={canvasRef} 
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerLeave}
          className="w-full h-full cursor-crosshair" 
        />
      </div>
    </div>
  );
});

import React, { useEffect, useRef, useState, useCallback } from 'react';

const REVENUE_DATA = [
  { name: 'This Week', total: 12450, data: [1200, 1500, 1100, 1800, 2200, 2900, 1750] },
  { name: 'Last Week', total: 9800, data: [900, 1100, 800, 1300, 1600, 2100, 2000] },
];

const smoothstep = (min: number, max: number, value: number) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

const hash = (x: number, y: number) => {
  let h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return h - Math.floor(h);
};

export const RevenueLineChart = React.memo(function RevenueLineChart({ theme = 'dark', compact = false }: { theme?: 'dark' | 'light'; compact?: boolean }) {
  const [periodIndex] = useState(0);
  const period = REVENUE_DATA[periodIndex];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rectRef = useRef({ width: 0, height: 0 });
  const isInViewRef = useRef(true);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  const targetDataRef = useRef(period.data);
  const fromDataRef = useRef(period.data);
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
    targetDataRef.current = period.data;
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
    let currPx = -1000;
    let currPy = -1000;

    const draw = () => {
      req = requestAnimationFrame(draw);
      if (!isInViewRef.current) return;

      const rect = rectRef.current;
      if (rect.width <= 0 || rect.height <= 0) return;

      time += 0.02;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
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

      const points = period.data.length;
      const w = rect.width;
      const h = rect.height;
      const maxVal = Math.max(...period.data, ...fromDataRef.current) * 1.2;
      
      const stepX = w / (points - 1);
      const cell = Math.max(2, Math.round(rect.width / 200));
      
      ctx.beginPath();
      for (let i = 0; i < points; i++) {
        const target = targetDataRef.current[i];
        const from = fromDataRef.current[i];
        const val = from + (target - from) * e;
        
        const x = i * stepX;
        const y = h - (val / maxVal) * h;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();
      
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      
      ctx.save();
      ctx.clip();
      
      ctx.fillStyle = '#FFFFFF';
      
      for (let x = 0; x <= w; x += cell) {
        for (let y = 0; y <= h; y += cell) {
          const jx = x + cell / 2;
          const jy = y + cell / 2;
          const jit = hash(jx, jy);
          
          const pdx = jx - currPx;
          const pdy = jy - currPy;
          const pdist = Math.hypot(pdx, pdy);
          const ripple = Math.max(0, 1 - pdist / 35);

          const gradientFalloff = Math.max(0, 1 - (jy / h));
          const waveRaw = Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7);
          const mod = smoothstep(-1.5, 1.5, waveRaw);
          
          let sz = cell * (0.3 * gradientFalloff + 0.3 * mod) * (0.8 + 0.4 * jit);
          if (ripple > 0) {
            sz = sz * (1 + ripple * 0.8);
          }
          if (sz > 0) {
            ctx.fillRect(x + (cell - sz)/2, y + (cell - sz)/2, sz, sz);
          }
        }
      }
      
      ctx.restore();

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

    req = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(req);
      ro.disconnect();
      io.disconnect();
    };
  }, [period]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="relative w-full h-[120px] flex items-center justify-center touch-none">
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

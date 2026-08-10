import React, { useEffect, useRef, useState, useCallback } from 'react';

const DEVICES = [
  { name: 'Today', data: [{ label: 'Mobile', val: 65, color: '#FFFFFF' }, { label: 'Desktop', val: 25, color: '#E2E8F0' }, { label: 'Tablet', val: 10, color: '#94A3B8' }] },
  { name: 'Last 7D', data: [{ label: 'Mobile', val: 55, color: '#FFFFFF' }, { label: 'Desktop', val: 35, color: '#E2E8F0' }, { label: 'Tablet', val: 10, color: '#94A3B8' }] },
];

const smoothstep = (min: number, max: number, value: number) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

const hash = (x: number, y: number) => {
  let h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return h - Math.floor(h);
};

export const DeviceUsageChart = React.memo(function DeviceUsageChart({ theme = 'dark', compact = false }: { theme?: 'dark' | 'light'; compact?: boolean }) {
  const [periodIndex] = useState(0);
  const period = DEVICES[periodIndex];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rectRef = useRef({ width: 0, height: 0 });
  const isInViewRef = useRef(false);
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

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const r = Math.min(cx, cy) * 0.85;
      const rInner = r * 0.65;
      const cell = 2;
      
      let startAngle = -Math.PI / 2;

      for (let i = 0; i < period.data.length; i++) {
        const target = targetDataRef.current[i];
        const from = fromDataRef.current[i];
        
        const val = from.val + (target.val - from.val) * e;
        const angle = (val / 100) * Math.PI * 2;
        const endAngle = startAngle + angle;
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.arc(cx, cy, rInner, endAngle, startAngle, true);
        ctx.closePath();
        ctx.clip();
        
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = target.color;
        
        for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x += cell) {
          for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y += cell) {
            const jx = x + cell / 2;
            const jy = y + cell / 2;
            const jit = hash(jx, jy);
            
            const dx = jx - cx;
            const dy = jy - cy;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < rInner - cell || dist > r + cell) continue;
            
            const pdx = jx - currPx;
            const pdy = jy - currPy;
            const pdist = Math.hypot(pdx, pdy);
            const ripple = Math.max(0, 1 - pdist / 30);

            const waveRaw = Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7);
            const mod = smoothstep(-1.5, 1.5, waveRaw);
            
            let sz = cell * (0.4 + 0.4 * mod) * (0.8 + 0.4 * jit);
            if (ripple > 0) {
              sz = sz * (1 + ripple * 0.8);
            }
            ctx.fillRect(x + (cell - sz)/2, y + (cell - sz)/2, sz, sz);
          }
        }
        
        ctx.restore();
        startAngle = endAngle;
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
      <div className="relative w-[130px] h-[130px] flex items-center justify-center touch-none">
        <canvas 
          ref={canvasRef} 
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerLeave}
          className="absolute inset-0 w-full h-full cursor-crosshair" 
        />
      </div>
    </div>
  );
});

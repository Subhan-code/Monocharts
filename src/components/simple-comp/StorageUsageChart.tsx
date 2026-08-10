import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSpring } from 'motion/react';

const STORAGE_VIEWS = [
  { name: 'Database', total: 500, used: 340, color: '#FFFFFF' },
  { name: 'Assets', total: 1000, used: 850, color: '#E2E8F0' },
  { name: 'Backups', total: 2000, used: 450, color: '#CBD5E1' },
];

const smoothstep = (min: number, max: number, value: number) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

const hash = (x: number, y: number) => {
  let h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return h - Math.floor(h);
};

export const StorageUsageChart = React.memo(function StorageUsageChart({ theme = 'dark', compact = false }: { theme?: 'dark' | 'light'; compact?: boolean }) {
  const [viewIndex] = useState(0);
  const view = STORAGE_VIEWS[viewIndex];
  
  const percentage = (view.used / view.total) * 100;
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rectRef = useRef({ width: 0, height: 0 });
  const isInViewRef = useRef(true);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const widthSpring = useSpring(percentage, { stiffness: 150, damping: 20 });
  
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
    widthSpring.set(percentage);
  }, [percentage, widthSpring]);

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

      const targetP = pointerRef.current;
      if (targetP.active) {
        currPx += (targetP.x - currPx) * 0.25;
        currPy += (targetP.y - currPy) * 0.25;
      } else {
        currPx += (-1000 - currPx) * 0.1;
        currPy += (-1000 - currPy) * 0.1;
      }

      const w = rect.width;
      const h = rect.height;
      const fillW = (widthSpring.get() / 100) * w;
      const cell = Math.max(2, Math.round(rect.width / 200));

      // Track
      ctx.beginPath();
      ctx.rect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fill();

      if (fillW > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, fillW, h);
        ctx.clip();
        
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = '#FFFFFF';
        
        for (let tx = 0; tx <= Math.ceil(fillW); tx += cell) {
          for (let ty = 0; ty <= h; ty += cell) {
            const jx = tx + cell / 2;
            const jy = ty + cell / 2;
            const jit = hash(jx, jy);
            
            const pdx = jx - currPx;
            const pdy = jy - currPy;
            const pdist = Math.hypot(pdx, pdy);
            const ripple = Math.max(0, 1 - pdist / 30);

            const waveRaw = Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7);
            const mod = smoothstep(-1.5, 1.5, waveRaw);
            
            let sz = cell * (0.3 + 0.4 * mod) * (0.8 + 0.4 * jit);
            if (ripple > 0) {
              sz = sz * (1 + ripple * 0.8);
            }
            ctx.fillRect(tx + (cell - sz)/2, ty + (cell - sz)/2, sz, sz);
          }
        }
        
        ctx.restore();
      }

      if (currPx > 0 && currPy > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(currPx, currPy, 12, 0, Math.PI * 2);
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
  }, [view, widthSpring]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="relative w-full h-[32px] flex items-center justify-center px-4 touch-none">
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

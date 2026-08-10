import React, { useEffect, useRef, useCallback } from 'react';

const smoothstep = (min: number, max: number, value: number) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

const hash = (x: number, y: number) => {
  let h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return h - Math.floor(h);
};

const UPTIME_DATA = Array.from({ length: 90 }, (_, i) => {
  if (i === 12 || i === 45 || i === 78) return 0.8;
  if (i === 22 || i === 60) return 0;
  return 1;
});

export const UptimeChart = React.memo(function UptimeChart({ theme = 'dark', compact = false }: { theme?: 'dark' | 'light'; compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rectRef = useRef({ width: 0, height: 0 });
  const isInViewRef = useRef(true);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const r = rectRef.current;
    if (r.width <= 0) return;
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
      
      const w = rect.width;
      const days = UPTIME_DATA.length;
      
      const barW = 6;
      const gap = 2;
      const perRow = Math.max(1, Math.floor(w / (barW + gap)));
      const cell = 2;

      // Pointer interpolation
      const targetP = pointerRef.current;
      if (targetP.active) {
        currPx += (targetP.x - currPx) * 0.25;
        currPy += (targetP.y - currPy) * 0.25;
      } else {
        currPx += (-1000 - currPx) * 0.1;
        currPy += (-1000 - currPy) * 0.1;
      }

      for (let i = 0; i < days; i++) {
        const row = Math.floor(i / perRow);
        const col = i % perRow;
        
        const x = col * (barW + gap);
        const y = row * (26 + gap);
        
        const val = UPTIME_DATA[i];
        const color = val === 1 ? '#FFFFFF' : val === 0 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.6)';
        
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, barW, 26);
        ctx.clip();
        
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = color;
        
        for (let tx = x; tx <= x + barW; tx += cell) {
          for (let ty = y; ty <= y + 26; ty += cell) {
            const jx = tx + cell / 2;
            const jy = ty + cell / 2;
            const jit = hash(jx, jy);
            
            const dx = jx - currPx;
            const dy = jy - currPy;
            const dist = Math.hypot(dx, dy);
            const ripple = Math.max(0, 1 - dist / 38);
            
            const waveRaw = Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7);
            const mod = smoothstep(-1.5, 1.5, waveRaw);
            
            let sz = cell * (0.3 + 0.4 * mod) * (0.8 + 0.4 * jit);
            if (ripple > 0) {
              sz = sz * (1 + ripple * 0.8);
              ctx.fillStyle = '#FFFFFF';
            } else {
              ctx.fillStyle = color;
            }
            
            ctx.fillRect(tx + (cell - sz) / 2, ty + (cell - sz) / 2, sz, sz);
          }
        }
        ctx.restore();
      }

      // Pointer touch glow ring
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
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="relative w-full h-[60px] flex items-center justify-center px-2 touch-none">
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

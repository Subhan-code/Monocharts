import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion, useSpring, useTransform, useReducedMotion } from 'motion/react';

const PERIODS = [
  { name: 'Last 3 Months', weeks: 12 },
  { name: 'Last 6 Months', weeks: 24 },
];

const smoothstep = (min: number, max: number, value: number) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

const hash = (x: number, y: number) => {
  let h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return h - Math.floor(h);
};

function AnimatedNumber({ value }: { value: number }) {
  const prefersReducedMotion = useReducedMotion();
  const spring = useSpring(value, { stiffness: 190, damping: 27, mass: 0.7 });
  const display = useTransform(spring, (current) => 
    Math.round(current).toLocaleString('en-US')
  );
  useEffect(() => {
    if (prefersReducedMotion) spring.jump(value);
    else spring.set(value);
  }, [value, spring, prefersReducedMotion]);
  return <motion.span className="tabular-nums">{display}</motion.span>;
}

export const ActivityHeatmap = React.memo(function ActivityHeatmap({ theme = 'dark', compact = false }: { theme?: 'dark' | 'light'; compact?: boolean }) {
  const [periodIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rectRef = useRef({ width: 0, height: 0 });
  const isInViewRef = useRef(true);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  const period = PERIODS[periodIndex];

  const { data, total } = useMemo(() => {
    const weeks = period.weeks;
    const newData = [];
    let tot = 0;
    for (let w = 0; w < weeks; w++) {
      const col = [];
      for (let d = 0; d < 7; d++) {
        const val = Math.floor(Math.sin(w * 0.5 + d * 0.2) * 2 + Math.cos(w * 1.2) * 1.5 + 2);
        const clamped = Math.max(0, Math.min(4, val));
        col.push(clamped);
        tot += clamped * 10;
      }
      newData.push(col);
    }
    return { data: newData, total: tot };
  }, [periodIndex, period.weeks]);

  const targetDataRef = useRef(data);
  const fromDataRef = useRef(data);
  const morphStartTimeRef = useRef(0);
  const timeRef = useRef(0);

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
    targetDataRef.current = data;
    morphStartTimeRef.current = performance.now();
  }, [data]);

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
    let currPx = -1000;
    let currPy = -1000;

    const draw = () => {
      req = requestAnimationFrame(draw);
      if (!isInViewRef.current) return;

      const rect = rectRef.current;
      if (rect.width <= 0 || rect.height <= 0) return;

      timeRef.current += 0.02;
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
      
      const weeks = Math.max(fromDataRef.current.length, targetDataRef.current.length);
      const cellSize = 10;
      const gap = 2.5;
      const totalW = weeks * (cellSize + gap) - gap;
      const totalH = 7 * (cellSize + gap) - gap;
      
      const startX = (rect.width - totalW) / 2;
      const startY = (rect.height - totalH) / 2;
      
      const colors = ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.35)', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0.75)', '#FFFFFF'];
      const cell = Math.max(2, Math.round(rect.width / 250));

      // Smooth pointer lerp
      const targetP = pointerRef.current;
      if (targetP.active) {
        currPx += (targetP.x - currPx) * 0.25;
        currPy += (targetP.y - currPy) * 0.25;
      } else {
        currPx += (-1000 - currPx) * 0.1;
        currPy += (-1000 - currPy) * 0.1;
      }

      for (let w = 0; w < weeks; w++) {
        for (let d = 0; d < 7; d++) {
          const targetVal = targetDataRef.current[w]?.[d] || 0;
          const fromVal = fromDataRef.current[w]?.[d] || 0;
          const val = fromVal + (targetVal - fromVal) * e;
          
          const x = startX + w * (cellSize + gap);
          const y = startY + d * (cellSize + gap);
          
          const colorIdx = Math.max(0, Math.min(4, Math.round(val)));
          
          ctx.save();
          ctx.beginPath();
          ctx.rect(x, y, cellSize, cellSize);
          ctx.clip();
          
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = colors[colorIdx];
          
          for (let tx = Math.floor(x); tx <= Math.ceil(x + cellSize); tx += cell) {
            for (let ty = Math.floor(y); ty <= Math.ceil(y + cellSize); ty += cell) {
              const jx = tx + cell / 2;
              const jy = ty + cell / 2;
              const jit = hash(jx, jy);
              
              const dx = jx - currPx;
              const dy = jy - currPy;
              const dist = Math.hypot(dx, dy);
              const ripple = Math.max(0, 1 - dist / 40);

              const waveRaw = Math.sin(jx * 0.05 + timeRef.current) + Math.sin(jy * 0.05 + timeRef.current * 0.7);
              const mod = smoothstep(-1.5, 1.5, waveRaw);
              
              let sz = cell * (0.4 + 0.4 * mod) * (0.8 + 0.4 * jit);
              if (ripple > 0) {
                sz = sz * (1 + ripple * 0.7);
                ctx.fillStyle = '#FFFFFF';
              } else {
                ctx.fillStyle = colors[colorIdx];
              }

              ctx.fillRect(tx + (cell - sz)/2, ty + (cell - sz)/2, sz, sz);
            }
          }
          ctx.restore();
        }
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

    req = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(req);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="w-full flex flex-col items-center gap-2">
        {!compact && (
          <div className="flex items-center justify-between w-full px-2">
            <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              <AnimatedNumber value={total} /> contributions
            </span>
          </div>
        )}
        <div className="w-full flex justify-center touch-none">
          <canvas 
            ref={canvasRef} 
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerUp={handlePointerLeave}
            className="w-full h-[120px] cursor-crosshair" 
          />
        </div>
      </div>
    </div>
  );
});

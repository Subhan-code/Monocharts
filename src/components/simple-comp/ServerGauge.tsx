import React, { useEffect, useRef, useState } from 'react';
import { useSpring } from 'motion/react';

const METRICS = [
  { name: 'CPU Load', base: 65, color: '#FFFFFF' },
  { name: 'Memory', base: 82, color: '#E2E8F0' },
  { name: 'Network', base: 45, color: '#CBD5E1' },
];

const smoothstep = (min: number, max: number, value: number) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

const hash = (x: number, y: number) => {
  let h = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return h - Math.floor(h);
};

export const ServerGauge = React.memo(function ServerGauge({ theme = 'dark', compact = false }: { theme?: 'dark' | 'light'; compact?: boolean }) {
  const [metricIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rectRef = useRef({ width: 0, height: 0 });
  const isInViewRef = useRef(true);

  const metric = METRICS[metricIndex];
  
  const valSpring = useSpring(metric.base, { stiffness: 120, damping: 20 });
  
  useEffect(() => {
    valSpring.set(metric.base);
  }, [metricIndex, valSpring, metric.base]);

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

      time += 0.05;
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
      
      const cx = rect.width / 2;
      const cy = rect.height * 0.8;
      const rOut = Math.min(rect.width * 0.4, rect.height * 0.7);
      const rIn = rOut - 10;
      
      const jitter = Math.sin(time) * 2 + Math.cos(time * 2.3) * 1.5;
      const currentVal = valSpring.get() + jitter;
      
      const startAngle = Math.PI;
      const endAngle = Math.PI * 2;
      const valAngle = startAngle + (currentVal / 100) * Math.PI;
      
      // Track
      ctx.beginPath();
      ctx.arc(cx, cy, rOut, startAngle, endAngle);
      ctx.arc(cx, cy, rIn, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fill();
      
      // Fill
      if (currentVal > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, rOut, startAngle, valAngle);
        ctx.arc(cx, cy, rIn, valAngle, startAngle, true);
        ctx.closePath();
        ctx.clip();
        
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = '#FFFFFF';
        
        const cell = Math.max(2, Math.round(rect.width / 200));
        
        for (let x = Math.floor(cx - rOut); x <= Math.ceil(cx + rOut); x += cell) {
          for (let y = Math.floor(cy - rOut); y <= Math.ceil(cy); y += cell) {
            const jx = x + cell / 2;
            const jy = y + cell / 2;
            const jit = hash(jx, jy);
            
            const dx = jx - cx;
            const dy = jy - cy;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < rIn - cell || dist > rOut + cell) continue;
            
            const waveRaw = Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7);
            const mod = smoothstep(-1.5, 1.5, waveRaw);
            
            const sz = cell * (0.4 + 0.4 * mod) * (0.8 + 0.4 * jit);
            ctx.fillRect(x + (cell - sz)/2, y + (cell - sz)/2, sz, sz);
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
  }, [valSpring]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="relative w-full h-[120px] flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
});

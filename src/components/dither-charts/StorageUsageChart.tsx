import React, { useEffect, useRef, useState } from 'react';
import { useSpring } from 'motion/react';
import { useCanvasSetup } from '../../hooks/useCanvasSetup';

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

export function StorageUsageChart({ theme = 'dark', compact = false }: { theme?: 'dark' | 'light'; compact?: boolean }) {
  const [viewIndex, setViewIndex] = useState(0);
  const view = STORAGE_VIEWS[viewIndex];

  const percentage = (view.used / view.total) * 100;

  const { canvasRef, rect, isVisible, reducedMotion } = useCanvasSetup();
  const widthSpring = useSpring(percentage, { stiffness: 150, damping: 20 });

  useEffect(() => {
    widthSpring.set(percentage);
  }, [percentage, widthSpring]);

  useEffect(() => {
    let req: number;
    // Throttle to 30fps for this nearly-static chart
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

      const fillW = (widthSpring.get() / 100) * w;
      const cell = Math.max(2, Math.round(w / 200));

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

            const waveRaw = reducedMotion ? 0 :
              Math.sin(jx * 0.05 + time) + Math.sin(jy * 0.05 + time * 0.7);
            const mod = smoothstep(-1.5, 1.5, waveRaw);

            const sz = cell * (0.3 + 0.4 * mod) * (0.8 + 0.4 * jit);
            ctx.fillRect(tx + (cell - sz)/2, ty + (cell - sz)/2, sz, sz);
          }
        }

        ctx.restore();
      }

      ctx.restore();
    };
    req = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(req);
  }, [view, widthSpring, reducedMotion]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="relative w-full h-[32px] flex items-center justify-center px-4">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}

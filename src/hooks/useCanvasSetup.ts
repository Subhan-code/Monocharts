import { useEffect, useRef, useState, RefObject } from 'react';

interface CanvasRect {
  width: number;
  height: number;
}

interface UseCanvasSetupResult {
  canvasRef: RefObject<HTMLCanvasElement>;
  /** Cached canvas logical size — updated by ResizeObserver, never from getBoundingClientRect inside RAF */
  rect: RefObject<CanvasRect>;
  /** true when the canvas is in the viewport (IntersectionObserver) */
  isVisible: RefObject<boolean>;
  /** true when prefers-reduced-motion is active — read once on mount */
  reducedMotion: boolean;
}

/**
 * Shared canvas performance hook.
 *
 * Responsibilities:
 * - Caches logical canvas size via ResizeObserver (avoids layout reflow per frame)
 * - Pauses animation when canvas is scrolled off-screen (IntersectionObserver)
 * - Pauses animation when the browser tab is hidden (visibilitychange)
 * - Reads prefers-reduced-motion ONCE on mount (not per frame)
 */
export function useCanvasSetup(): UseCanvasSetupResult {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const rect = useRef<CanvasRect>({ width: 0, height: 0 });
  const isVisible = useRef(true);

  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- ResizeObserver: cache logical size ---
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        rect.current = { width, height };

        // Also keep canvas pixel size in sync on resize
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }
    });
    ro.observe(canvas);

    // --- IntersectionObserver: pause when off-screen ---
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { rootMargin: '100px' }
    );
    io.observe(canvas);

    // --- Tab visibility: pause when hidden ---
    const handleVisibility = () => {
      isVisible.current = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return { canvasRef, rect, isVisible, reducedMotion };
}

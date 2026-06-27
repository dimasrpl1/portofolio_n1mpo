"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 200 : 1300;
    let r1 = 0;
    let r2 = 0;
    let animRaf = 0;

    // Tunggu 2 frame agar browser paint dengan ukuran yang sudah dikoreksi
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        const start = performance.now();

        const tick = (now: number) => {
          const p = Math.min((now - start) / total, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          if (numRef.current) {
            numRef.current.textContent = String(Math.round(eased * 100));
          }
          if (p < 1) {
            animRaf = requestAnimationFrame(tick);
          } else {
            setTimeout(() => setLeaving(true), 150);
          }
        };

        animRaf = requestAnimationFrame(tick);
      });
    });

    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      cancelAnimationFrame(animRaf);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      // h-dvh = fallback CSS sebelum JS mengukur (langsung di-override oleh effect)
      className="fixed inset-x-0 top-0 z-100 flex h-svh flex-col justify-end overflow-hidden bg-bg px-6 md:px-10"
      style={{
        paddingBottom:
          "max(2.5rem, calc(env(safe-area-inset-bottom) + 1.5rem))",
      }}
      initial={{ y: 0 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (leaving) onComplete();
      }}
    >
      <div className="flex items-end justify-between">
        <span className="mb-1 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          Loading
        </span>
        <span className="font-display text-[18vw] font-semibold leading-none tabular-nums md:text-[12vw]">
          <span ref={numRef}>0</span>
          <span className="text-muted">%</span>
        </span>
      </div>
    </motion.div>
  );
}

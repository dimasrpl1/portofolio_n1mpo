"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const total = reduce ? 250 : 1300; // durasi total
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / total, 1);
      // ease-out biar angka melambat menjelang 100
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setLeaving(true), 150);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-between bg-bg px-6 pb-10 md:px-10 md:pb-12"
      initial={{ y: 0 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (leaving) onComplete();
      }}
    >
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
        Loading
      </span>
      <span className="font-display text-[18vw] leading-none font-semibold tabular-nums md:text-[12vw]">
        {count}
        <span className="text-muted">%</span>
      </span>
    </motion.div>
  );
}

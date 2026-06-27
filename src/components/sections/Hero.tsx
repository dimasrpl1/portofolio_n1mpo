"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pt-28 md:px-10"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-muted"
      >
        Frontend Developer — Berbasis di Indonesia
      </motion.p>

      <h1 className="font-display text-[13vw] font-bold leading-[0.95] tracking-tight md:text-[8vw]">
        <Reveal delay={0.35}>Halo, saya</Reveal>
        <Reveal delay={0.45}>
          <span className="italic text-muted">Nama Anda.</span>
        </Reveal>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7, ease }}
        className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
      >
        Saya membangun antarmuka web yang clean, cepat, dan punya detail
        gerak yang halus. Fokus pada React, Next.js, dan pengalaman pengguna.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.7, ease }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <a
          href="#projects"
          className="rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
        >
          Lihat Proyek
        </a>
        <a
          href="#contact"
          className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:bg-fg hover:text-bg"
        >
          Hubungi Saya
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}

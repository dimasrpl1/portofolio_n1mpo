"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const NAME = "Dimas";
const ROLE = "Fullstack Developer";
const words = ["antarmuka", "aplikasi web", "pengalaman", "produk digital"];


const stats = [
  { value: "10+", label: "Proyek Selesai" },
  { value: "2+", label: "Tahun Belajar" },
  { value: "10+", label: "Sertifikasi" },
];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [hasPointer, setHasPointer] = useState(false);

  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    requestAnimationFrame(() =>
      setHasPointer(
        window.matchMedia("(hover: hover) and (pointer: fine)").matches,
      ),
    );
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % words.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  function onMove(e: React.MouseEvent) {
    const el = headingRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }
  function onLeave() {
    mx.set(-500);
    my.set(-500);
  }

  const mask = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, #000 0%, transparent 65%)`;

  return (
    <section
      id="hero"
      className="hero-glow relative flex min-h-[100svh] flex-col items-center
        justify-center overflow-hidden px-6 py-20 md:px-10"
    >
      {/* Dot grid — CSS murni, nol JS */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Konten utama ── */}
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">

        {/* Role badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease }}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line
            bg-card px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="relative flex size-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping
                rounded-full bg-fg opacity-50" />
              <span className="relative inline-flex size-1.5 rounded-full bg-fg" />
            </span>
            {ROLE} · Indonesia
          </span>
        </motion.div>

        {/* Headline + spotlight (desktop only) */}
        <motion.h1
          ref={headingRef}
          onMouseMove={hasPointer ? onMove : undefined}
          onMouseLeave={hasPointer ? onLeave : undefined}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.85, ease }}
          className="relative mt-8 cursor-default select-none font-display font-bold leading-[0.88] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 11vw, 9.5rem)" }}
        >
          <span className={hasPointer ? "text-line" : "text-fg"}>
            Halo, saya
            <br />
            {NAME}.
          </span>

          {/* Spotlight layer — desktop only, no cost on mobile */}
          {hasPointer && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 text-fg"
              style={{ WebkitMaskImage: mask, maskImage: mask }}
            >
              Halo, saya
              <br />
              {NAME}.
            </motion.span>
          )}
        </motion.h1>

        {/* Tagline dengan rotating word */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.65, ease }}
          className="mt-8 flex flex-wrap items-baseline justify-center gap-x-2.5
            gap-y-1 text-lg text-muted md:text-2xl"
        >
          <span>Saya merancang &amp; membangun</span>
          <span className="relative inline-flex h-[1.4em] items-baseline overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[wordIndex]}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "-110%" }}
                transition={{ duration: 0.4, ease }}
                className="font-display font-medium text-fg"
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span>yang indah.</span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.65, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-fg px-8 py-3.5 text-sm font-medium text-bg
              transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            Lihat Proyek
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line bg-card px-8 py-3.5 text-sm
              font-medium transition-colors duration-200 hover:bg-fg hover:text-bg"
          >
            Hubungi Saya
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.65, ease }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-6
            border-t border-line pt-10 md:gap-x-16"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-3xl font-bold md:text-4xl">{value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — bounce pakai CSS, bukan Framer Motion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center
          gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
      >
        <div
          className="animate-scroll-dot flex h-7 w-[18px] items-start justify-center
            rounded-full border border-line p-1.5"
        >
          <div className="h-1.5 w-0.5 rounded-full bg-muted" />
        </div>
        scroll
      </motion.div>
    </section>
  );
}

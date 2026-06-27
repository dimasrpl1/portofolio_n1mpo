"use client";

import { motion } from "motion/react";

export function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 flex items-baseline gap-4 border-b border-line pb-5"
    >
      <span className="font-mono text-xs text-muted">{index}</span>
      <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
    </motion.div>
  );
}

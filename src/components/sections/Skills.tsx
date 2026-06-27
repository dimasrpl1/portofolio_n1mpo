"use client";

import { motion } from "motion/react";
import { skills, marqueeSkills } from "@/data/skills";
import { SectionHeading } from "../SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading index="01" title="Skills" />

        <div className="grid gap-10 md:grid-cols-3">
          {skills.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:bg-fg hover:text-bg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-mask mt-20 flex overflow-hidden border-y border-line py-6">
        <div className="animate-marquee flex shrink-0 gap-10 pr-10">
          {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
            <span
              key={i}
              className="font-display text-2xl font-medium text-muted md:text-4xl"
            >
              {s} <span className="text-line">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

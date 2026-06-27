"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { projects } from "@/data/projects";
import { SectionHeading } from "../SectionHeading";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading index="02" title="Projects" />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease }}
              className="group relative overflow-hidden rounded-2xl border border-line bg-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <div className="flex gap-2">
                    {p.repoUrl && (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Repository"
                        className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:bg-fg hover:text-bg"
                      >
                        <GithubIcon className="size-4" />
                      </a>
                    )}
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Live demo"
                        className="grid size-9 place-items-center rounded-full border border-line transition-colors hover:bg-fg hover:text-bg"
                      >
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

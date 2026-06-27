"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { projects, type Project } from "@/data/projects";
import { certificates, type Certificate } from "@/data/certificates";
import { SectionHeading } from "../SectionHeading";
import { ArrowUpRight, ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";
import { GithubIcon } from "../icons";

const ease = [0.22, 1, 0.36, 1] as const;
type Tab = "projects" | "certificates";

export function Projects() {
  const [tab, setTab] = useState<Tab>("projects");
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [selected, setSelected] = useState<
    { kind: "projects"; data: Project } | { kind: "certificates"; data: Certificate } | null
  >(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const currentItems = tab === "projects" ? projects : certificates;

  // Throttle dengan RAF supaya getBoundingClientRect tidak dipanggil tiap event scroll
  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (!el) return;

      const isAtEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 8;
      setAtStart(el.scrollLeft < 8);
      setAtEnd(isAtEnd);

      const articles = el.querySelectorAll("article");

      if (isAtEnd) {
        setActiveIndex(articles.length - 1);
        return;
      }

      const containerLeft = el.getBoundingClientRect().left;
      const padding = window.innerWidth >= 768 ? 40 : 24;
      let closest = 0;
      let minDist = Infinity;
      articles.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - containerLeft - padding);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    });
  }, []);

  // Cleanup RAF saat unmount
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const articles = Array.from(el.querySelectorAll("article"));
    if (!articles[i]) return;
    const containerLeft = el.getBoundingClientRect().left;
    const cardLeft = articles[i].getBoundingClientRect().left;
    const padding = window.innerWidth >= 768 ? 40 : 24;
    el.scrollTo({
      left: el.scrollLeft + cardLeft - containerLeft - padding,
      behavior: "smooth",
    });
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir === "right" ? el.offsetWidth * 0.75 : -(el.offsetWidth * 0.75),
      behavior: "smooth",
    });
  };

  const handleTabSwitch = (next: Tab) => {
    if (next === tab) return;
    setActiveIndex(0);
    setAtStart(true);
    setAtEnd(false);
    setTab(next);
    setTimeout(() => scrollRef.current?.scrollTo({ left: 0 }), 50);
  };

  return (
    <section id="projects" className="py-24 md:py-32">
      {/* Header + Tab */}
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading index="02" title="Projects" />

        <div className="mb-10 flex w-fit gap-1 rounded-xl border border-line bg-card p-1">
          {(["projects", "certificates"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => handleTabSwitch(t)}
              className="relative px-5 py-2 text-sm font-medium"
            >
              {tab === t && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-lg bg-fg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  tab === t ? "text-bg" : "text-muted"
                }`}
              >
                {t === "projects" ? "Proyek" : "Sertifikat"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Carousel — full-width dengan gradient hint */}
      <div className="relative">
        {/* Gradient fade kiri — muncul saat sudah di-scroll */}
        <div
          className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-24
            bg-linear-to-r from-bg to-transparent transition-opacity duration-400
            ${atStart ? "opacity-0" : "opacity-100"}`}
        />
        {/* Gradient fade kanan — selalu tampil sebagai hint "ada konten lagi" */}
        <div
          className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-24
            bg-linear-to-l from-bg to-transparent transition-opacity duration-400
            ${atEnd ? "opacity-0" : "opacity-100"}`}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            ref={scrollRef}
            onScroll={handleScroll}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease }}
            className="flex gap-5 overflow-x-auto scroll-smooth px-6 pb-4 pt-2 md:px-10
              scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
              snap-x snap-mandatory"
          >
            {tab === "projects"
              ? projects.map((p, i) => (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.05, ease }}
                    onClick={() => setSelected({ kind: "projects", data: p })}
                    className="group flex-none w-[78vw] cursor-pointer snap-start
                      overflow-hidden rounded-2xl border border-line bg-card
                      transition-transform duration-200
                      hover:-translate-y-1
                      sm:w-72 md:w-80 lg:w-96"
                  >
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 78vw, 384px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col p-5">
                      <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                        {p.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.slice(0, 3).map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted"
                          >
                            {tag}
                          </li>
                        ))}
                        {p.tags.length > 3 && (
                          <li className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted">
                            +{p.tags.length - 3}
                          </li>
                        )}
                      </ul>
                      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-muted transition-colors duration-200 group-hover:text-fg">
                        <span>Lihat detail</span>
                        <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </motion.article>
                ))
              : certificates.map((c, i) => (
                  <motion.article
                    key={c.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.05, ease }}
                    onClick={() => setSelected({ kind: "certificates", data: c })}
                    className="group flex-none w-[72vw] cursor-pointer snap-start
                      overflow-hidden rounded-2xl border border-line bg-card
                      transition-transform duration-200
                      hover:-translate-y-1
                      sm:w-60 md:w-68"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-muted/5">
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        sizes="(max-width: 640px) 72vw, 272px"
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-base font-semibold leading-snug">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted">
                        {c.issuer} · {c.date}
                      </p>
                      {c.description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                          {c.description}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-muted transition-colors duration-200 group-hover:text-fg">
                        <span>Lihat detail</span>
                        <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </motion.article>
                ))}

            {/* Trailing spacer */}
            <div className="w-4 shrink-0 md:w-6" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation row */}
      <div className="mx-auto mt-6 max-w-6xl px-6 md:px-10">
        <div className="flex items-center gap-4">
          {/* Arrow buttons */}
          <div className="flex shrink-0 gap-1.5">
            <button
              onClick={() => scroll("left")}
              disabled={atStart}
              aria-label="Sebelumnya"
              className="grid size-9 place-items-center rounded-full border border-line
                transition-colors hover:bg-fg hover:text-bg
                disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={atEnd}
              aria-label="Berikutnya"
              className="grid size-9 place-items-center rounded-full border border-line
                transition-colors hover:bg-fg hover:text-bg
                disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex flex-1 items-center gap-1.5">
            {currentItems.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Ke item ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-5 bg-fg"
                    : "w-1.5 bg-line hover:bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="shrink-0 font-mono text-xs text-muted">
            {String(activeIndex + 1).padStart(2, "0")}&thinsp;/&thinsp;
            {String(currentItems.length).padStart(2, "0")}
          </span>
        </div>

        {/* Mobile swipe hint */}
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted/50 md:hidden">
          <ChevronRight className="size-3" />
          Geser ke kanan untuk melihat lebih banyak
        </p>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-lg overflow-y-auto
                rounded-2xl border border-line bg-bg shadow-2xl"
            >
              {selected.kind === "projects" ? (
                <ProjectDetail
                  project={selected.data}
                  onClose={() => setSelected(null)}
                />
              ) : (
                <CertificateDetail
                  cert={selected.data}
                  onClose={() => setSelected(null)}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CloseBtn({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      aria-label="Tutup"
      className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full
        bg-black/60 text-white transition-colors hover:bg-black/80"
    >
      <X className="size-4" />
    </button>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <>
      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
        <CloseBtn onClose={onClose} />
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm
                transition-colors hover:bg-fg hover:text-bg"
            >
              <GithubIcon className="size-4" />
              Repository
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm text-bg
                transition-opacity hover:opacity-80"
            >
              <ArrowUpRight className="size-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </>
  );
}

function CertificateDetail({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  return (
    <>
      <div className="relative overflow-hidden rounded-t-2xl bg-muted/5 px-8 pb-4 pt-8">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image src={cert.image} alt={cert.title} fill className="object-contain" />
        </div>
        <CloseBtn onClose={onClose} />
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-semibold">{cert.title}</h3>
        <p className="mt-1 text-sm text-muted">
          {cert.issuer} · {cert.date}
        </p>
        {cert.description && (
          <p className="mt-3 text-sm leading-relaxed text-muted">{cert.description}</p>
        )}
        {cert.credentialUrl && (
          <div className="mt-6">
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="flex w-fit items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm text-bg
                transition-opacity hover:opacity-80"
            >
              <ArrowUpRight className="size-4" />
              Lihat Sertifikat
            </a>
          </div>
        )}
      </div>
    </>
  );
}

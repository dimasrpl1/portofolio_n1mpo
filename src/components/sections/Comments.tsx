"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { supabase, type Comment } from "@/lib/supabase/client";
import { postComment } from "@/app/actions";
import { SectionHeading } from "../SectionHeading";

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "baru saja";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  return `${d} hari lalu`;
}

export function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function load() {
    const { data } = await supabase
      .from("comments")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) setComments(data as Comment[]);
  }

  useEffect(() => {
    load();
    const channel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => setComments((c) => [payload.new as Comment, ...c]),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await postComment(fd);
    if (res.ok) {
      setStatus("ok");
      formRef.current?.reset();
      load(); // jaring pengaman bila realtime belum aktif
      setTimeout(() => setStatus("idle"), 2500);
    } else {
      setStatus("error");
      setError(res.error ?? "Terjadi kesalahan.");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-fg";

  return (
    <section id="comments" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading index="03" title="Komentar" />

        <div className="grid gap-12 md:grid-cols-2">
          {/* Form */}
          <div>
            <p className="mb-6 text-sm text-muted">
              Tinggalkan pesan atau sapaan. Komentar tampil langsung — kata
              kasar otomatis disensor.
            </p>
            <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4">
              {/* honeypot tersembunyi */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />
              <input
                name="name"
                placeholder="Nama"
                maxLength={60}
                required
                className={inputCls}
              />
              <textarea
                name="message"
                placeholder="Pesan…"
                maxLength={500}
                required
                rows={4}
                className={inputCls + " resize-none"}
              />
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {status === "sending" ? "Mengirim…" : "Kirim Komentar"}
                </button>
                {status === "ok" && (
                  <span className="text-sm text-muted">Terkirim ✓</span>
                )}
                {status === "error" && (
                  <span className="text-sm text-red-500">{error}</span>
                )}
              </div>
            </form>
          </div>

          {/* Daftar komentar */}
          <div className="flex flex-col gap-3">
            {comments.length === 0 && (
              <p className="text-sm text-muted">
                Belum ada komentar. Jadilah yang pertama.
              </p>
            )}
            <AnimatePresence initial={false}>
              {comments.map((c) => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl border border-line bg-card p-4"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-medium">{c.name}</span>
                    <span className="font-mono text-[11px] text-muted">
                      {timeAgo(c.created_at)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {c.message}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

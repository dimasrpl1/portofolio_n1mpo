"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { supabase, type Comment } from "@/lib/supabase/client";
import { postComment } from "@/app/actions";
import { SectionHeading } from "../SectionHeading";

const PER_PAGE = 5;

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

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("comments")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) setComments(data as Comment[]);
  }, []);

  useEffect(() => {
    // Fetch awal via .then() — setState ada di callback async, bukan di body effect
    supabase
      .from("comments")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => { if (data) setComments(data as Comment[]); });

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
      setPage(1);
      load();
      setTimeout(() => setStatus("idle"), 2500);
    } else {
      setStatus("error");
      setError(res.error ?? "Terjadi kesalahan.");
    }
  }

  const totalPages = Math.max(1, Math.ceil(comments.length / PER_PAGE));
  const paginated = comments.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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
                  className="flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {status === "sending" && <Spinner />}
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
            {paginated.map((c, i) => (
              <motion.div
                key={`${page}-${c.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.07,
                }}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-2 flex items-center justify-between">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-line px-4 py-2 text-sm transition-colors hover:border-fg disabled:opacity-30"
                >
                  ← Sebelumnya
                </button>
                <span className="font-mono text-xs text-muted">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border border-line px-4 py-2 text-sm transition-colors hover:border-fg disabled:opacity-30"
                >
                  Selanjutnya →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

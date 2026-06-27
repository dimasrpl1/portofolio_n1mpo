"use client";

import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons";

const socials = [
  { href: "mailto:email@anda.com", label: "Email", Icon: Mail },
  { href: "https://github.com/username", label: "GitHub", Icon: GithubIcon },
  { href: "https://linkedin.com/in/username", label: "LinkedIn", Icon: LinkedinIcon },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
            Mari terhubung
          </p>
          <a
            href="mailto:email@anda.com"
            className="mt-4 block font-display text-4xl font-semibold tracking-tight transition-colors hover:text-muted md:text-7xl"
          >
            email@anda.com
          </a>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors hover:bg-fg hover:text-bg"
              >
                <Icon className="size-4" /> {label}
              </a>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 text-xs text-muted md:flex-row md:items-center">
            <span>© {new Date().getFullYear()} Nama Anda. All rights reserved.</span>
            <span className="font-mono">Built with Next.js</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

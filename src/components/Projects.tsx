import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiGithub, FiX, FiArrowUpRight } from "react-icons/fi";
import { projects, type Project, personal } from "../data/portfolio";
import SectionHeader from "./SectionHeader";

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Selected Work"
          title="Projects I've been building."
          description="A small but growing collection of projects from my learning journey — each one taught me something new about code, design or AI."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-3xl p-6 sm:p-7 border border-soft overflow-hidden hover:border-fuchsia-400/40 transition-colors"
            >

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {p.icon && (
                    <span className="text-2xl leading-none">{p.icon}</span>
                  )}
                  <h3 className="font-display text-xl sm:text-2xl font-bold">
                    {p.title}
                  </h3>
                </div>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open GitHub"
                  className="h-10 w-10 grid place-items-center rounded-full glass border border-soft hover:bg-gradient-to-br hover:from-indigo-500 hover:to-fuchsia-500 hover:text-white transition-all"
                >
                  <FiGithub />
                </a>
              </div>

              <p className="mt-3 text-sm text-muted leading-relaxed">
                {p.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-full glass border border-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setOpen(p)}
                  className="inline-flex items-center gap-2 text-sm font-medium hover:gradient-text"
                >
                  View Details <FiArrowUpRight />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(null)}
              className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className="fixed inset-0 z-[95] grid place-items-center p-4"
              onClick={() => setOpen(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-3xl border border-soft max-w-xl w-full p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono text-muted">Project</p>
                    <h3 className="font-display text-2xl font-bold mt-1">
                      {open.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setOpen(null)}
                    aria-label="Close"
                    className="h-9 w-9 grid place-items-center rounded-full glass"
                  >
                    <FiX />
                  </button>
                </div>

                <p className="mt-4 text-sm text-muted leading-relaxed">
                  {open.description}
                </p>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-widest text-muted mb-2">
                    Highlights
                  </p>
                  <ul className="space-y-2">
                    {open.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-fuchsia-400 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-widest text-muted mb-2">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {open.stack.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-full glass border border-soft"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white text-sm font-medium"
                  >
                    <FiGithub /> View on GitHub
                  </a>
                  <button
                    onClick={() => setOpen(null)}
                    className="px-4 py-2.5 rounded-full glass text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

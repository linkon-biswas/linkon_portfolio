import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { navItems, personal } from "../data/portfolio";

interface Props {
  active: string;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function Navbar({ active, theme, toggleTheme }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500"
      />

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <nav
          className={`mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between transition-all ${
            scrolled ? "glass rounded-2xl mt-0" : ""
          }`}
          style={{ paddingTop: scrolled ? 10 : 0, paddingBottom: scrolled ? 10 : 0 }}
        >
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-2 group"
          >
            <span className="font-mono text-base sm:text-lg font-semibold tracking-tight">
              <span className="text-muted">&lt;</span>
              <span className="gradient-text">Linkon</span>
              <span className="text-muted">/&gt;</span>
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => handleNav(n.id)}
                  className={`relative px-4 py-2 rounded-full text-sm transition-colors ${
                    active === n.id
                      ? "text-white"
                      : "text-muted hover:text-current"
                  }`}
                >
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/80 to-fuchsia-500/80 -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {n.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="h-10 w-10 grid place-items-center rounded-full glass hover:scale-105 transition-transform"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="h-10 w-10 grid place-items-center rounded-full glass hover:scale-105 transition-transform"
            >
              <FiMenu size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* Side drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-[80] w-[88%] sm:w-[400px] glass border-l border-soft p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    Navigation
                  </p>
                  <p className="font-display text-2xl">
                    Menu<span className="gradient-text">.</span>
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="h-10 w-10 grid place-items-center rounded-full glass hover:scale-105"
                >
                  <FiX />
                </button>
              </div>

              <ul className="flex flex-col gap-2">
                {navItems.map((n, i) => (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <button
                      onClick={() => handleNav(n.id)}
                      className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl border border-transparent transition-all ${
                        active === n.id
                          ? "bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 border-soft"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <span className="font-display text-lg">{n.label}</span>
                      <span className="text-xs font-mono text-muted">
                        0{i + 1}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto pt-6 border-t border-soft">
                <p className="text-xs text-muted mb-2">Get in touch</p>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-sm break-all hover:gradient-text"
                >
                  {personal.email}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

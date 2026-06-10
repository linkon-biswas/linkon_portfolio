import { useEffect, useState } from "react";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import CompetitiveProgramming from "./components/CompetitiveProgramming";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { navItems } from "./data/portfolio";

export default function App() {
  const [active, setActive] = useState("home");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Theme toggle
  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  // Active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(n.id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar
        active={active}
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CompetitiveProgramming />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

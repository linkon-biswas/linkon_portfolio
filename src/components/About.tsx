import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="About Me"
          title="A short story about who I am."
        />

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left side: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group max-w-sm w-full">
              {/* Animated gradient ring */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-500 opacity-60 blur-lg group-hover:opacity-85 transition-opacity duration-300" />
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-500" />
              <div className="relative rounded-3xl overflow-hidden aspect-[3/4] w-full bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30 border border-white/10 shadow-2xl">
                <img
                  src="/images/about_linkon.jpg"
                  alt="Linkon Biswas"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{
                    filter: "contrast(1.02) saturate(1.02) brightness(1.01)",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right side: Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 glass rounded-3xl p-8 border border-soft"
          >
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted mb-4">
              <span className="gradient-text">//</span> Profile
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-muted">
              Hello! I am an undergraduate student of{" "}
              <span className="text-current font-medium">CSE</span> with a
              strong interest in{" "}
              <span className="text-current font-medium">Problem Solving</span>,{" "}
              <span className="text-current font-medium">
                Artificial Intelligence
              </span>{" "}
              and{" "}
              <span className="text-current font-medium">Machine Learning</span>
              . I love to learn about modern technologies and build practical
              projects that improve my programming skills. Currently, I am
              preparing myself for a future career as an{" "}
              <span className="gradient-text font-semibold">AI Engineer</span>.
            </p>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted">
              My goal is to grow steadily through consistent practice, clean
              fundamentals, and impactful real-world projects.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4 text-sm">
              <Info label="Name" value="Linkon Biswas" />
              <Info label="Degree" value="B.Sc. in CSE" />
              <Info label="University" value="Gopalganj Science and Technology University" />
              <Info label="Focus" value="DSA, AI/ML & RAG" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-muted w-20">{label}</span>
      <span className="text-current font-medium">: {value}</span>
    </div>
  );
}

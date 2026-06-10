import { motion } from "framer-motion";
import {
  SiC,
  SiCplusplus,
  SiPython,
  SiHtml5,
  SiCss,
  SiGithub,
} from "react-icons/si";
import { FiPlus } from "react-icons/fi";
import { skills } from "../data/portfolio";
import SectionHeader from "./SectionHeader";

const icons: Record<string, React.ReactNode> = {
  C: <SiC />,
  "C++": <SiCplusplus />,
  Python: <SiPython />,
  HTML: <SiHtml5 />,
  CSS: <SiCss />,
  GitHub: <SiGithub />,
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Skills & Tools"
          title="What I'm currently building with."
          description="A snapshot of the languages and technologies I use. I'm constantly learning — more tools and frameworks will be added as my journey continues."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.07 * i }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-2xl p-6 border border-soft overflow-hidden hover:border-indigo-400/40 transition-colors"
            >
              <div
                className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${s.color} opacity-10 group-hover:opacity-25 blur-2xl transition-opacity`}
              />
              <div className="flex items-center gap-3">
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br ${s.color} text-white text-2xl grid place-items-center shadow-lg`}
                >
                  {icons[s.name]}
                </div>
                <div>
                  <p className="font-display font-semibold text-lg">{s.name}</p>
                  <p className="text-xs font-mono text-muted">{s.level}</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                  <span>Proficiency</span>
                  <span>{s.value}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.1 + 0.07 * i, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}

          {/* "More coming" placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.07 * skills.length }}
            className="relative rounded-2xl p-6 border-2 border-dashed border-white/10 grid place-items-center text-center"
          >
            <div>
              <div className="h-12 w-12 rounded-xl glass grid place-items-center mx-auto mb-3 text-xl">
                <FiPlus />
              </div>
              <p className="font-display font-semibold">More coming soon</p>
              <p className="text-xs text-muted mt-1">
                ML frameworks, JS/TS, Git, Linux & beyond
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

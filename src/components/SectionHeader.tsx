import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ eyebrow, title, description }: Props) {
  return (
    <div className="mb-12 max-w-2xl">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="font-mono text-xs tracking-[0.25em] uppercase text-muted mb-3"
      >
        <span className="gradient-text">//</span> {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.05 }}
        className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-muted leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

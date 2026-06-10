import { motion } from "framer-motion";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiSend,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { personal } from "../data/portfolio";
import SectionHeader from "./SectionHeader";

const socials = [
  {
    name: "Email",
    href: `mailto:${personal.email}`,
    icon: <FiMail />,
    color: "from-sky-500 to-indigo-500",
    label: personal.email,
  },
  {
    name: "GitHub",
    href: personal.github,
    icon: <FiGithub />,
    color: "from-zinc-700 to-zinc-900",
    label: "github.com/linkon-biswas",
  },
  {
    name: "LinkedIn",
    href: personal.linkedin,
    icon: <FiLinkedin />,
    color: "from-blue-600 to-cyan-500",
    label: "linkedin.com/in/linkon008",
  },
  {
    name: "Facebook",
    href: personal.facebook,
    icon: <FaFacebookF />,
    color: "from-blue-500 to-indigo-600",
    label: "facebook.com/linkon.linkonbiswas",
  },
  {
    name: "WhatsApp",
    href: personal.whatsapp,
    icon: <FaWhatsapp />,
    color: "from-emerald-500 to-green-600",
    label: personal.whatsappNumber,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's build something together."
          description="I'm always open to internships, AI collaborations, or just a friendly chat about code. Drop a message — I'll get back to you."
        />

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Big email card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 glass rounded-3xl p-8 border border-soft relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-20 blur-3xl" />
            <p className="text-xs font-mono text-muted">// drop me an email</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2">
              Say hi at <span className="gradient-text">{personal.email}</span>
            </h3>
            <p className="mt-3 text-sm text-muted leading-relaxed max-w-md">
              Whether it's a project idea, an internship opportunity, or just
              advice on getting into AI — I'd love to hear from you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 transition-transform"
              >
                <FiSend /> Send Email
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass border border-soft hover:-translate-y-0.5 transition-transform"
              >
                {copied ? <FiCheck /> : <FiCopy />}{" "}
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 grid grid-cols-1 gap-3"
          >
            {socials.map((s, i) => (
              <motion.a
                key={s.name}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                whileHover={{ x: 4 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="group flex items-center gap-3 glass border border-soft rounded-2xl p-3 sm:p-4 hover:border-indigo-400/40 transition-colors"
              >
                <div
                  className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br ${s.color} text-white text-lg grid place-items-center shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {s.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm">{s.name}</p>
                  <p className="text-xs text-muted truncate">{s.label}</p>
                </div>
                <FiExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

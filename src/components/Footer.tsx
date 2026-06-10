import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { personal } from "../data/portfolio";

export default function Footer() {
  const icons = [
    {
      name: "Email",
      href: `mailto:${personal.email}`,
      icon: <FiMail />,
    },
    {
      name: "GitHub",
      href: personal.github,
      icon: <FiGithub />,
    },
    {
      name: "LinkedIn",
      href: personal.linkedin,
      icon: <FiLinkedin />,
    },
    {
      name: "Facebook",
      href: personal.facebook,
      icon: <FaFacebookF />,
    },
    {
      name: "WhatsApp",
      href: personal.whatsapp,
      icon: <FaWhatsapp />,
    },
  ];

  return (
    <footer className="relative border-t border-soft mt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 flex flex-col items-center gap-5">
        {/* Centered social icons */}
        <div className="flex items-center gap-3">
          {icons.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              aria-label={s.name}
              className="h-11 w-11 grid place-items-center rounded-full glass border border-soft hover:bg-gradient-to-br hover:from-indigo-500 hover:to-fuchsia-500 hover:text-white hover:border-transparent transition-all"
            >
              {s.icon}
            </a>
          ))}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="ml-1 h-11 w-11 grid place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 transition-transform"
          >
            <FiArrowUp />
          </button>
        </div>

        <p className="text-xs text-muted text-center">
          © {new Date().getFullYear()} {personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

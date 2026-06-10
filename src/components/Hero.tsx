// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiDownload, FiMail, FiFolder, FiArrowDown } from "react-icons/fi";
// import { personal } from "../data/portfolio";

// const titles = [
//   "AI Enthusiast",
//   "Aspiring AI Engineer",
//   "CSE Student",
//   "Problem Solver",
// ];

// function useTyping() {
//   const [text, setText] = useState("");
//   const [idx, setIdx] = useState(0);
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     const current = titles[idx];
//     const speed = deleting ? 45 : 90;
//     const t = setTimeout(() => {
//       if (!deleting) {
//         const next = current.slice(0, text.length + 1);
//         setText(next);
//         if (next === current) setTimeout(() => setDeleting(true), 1600);
//       } else {
//         const next = current.slice(0, text.length - 1);
//         setText(next);
//         if (next === "") {
//           setDeleting(false);
//           setIdx((i) => (i + 1) % titles.length);
//         }
//       }
//     }, speed);
//     return () => clearTimeout(t);
//   }, [text, deleting, idx]);

//   return text;
// }

// const scrollTo = (id: string) => {
//   document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
// };

// export default function Hero() {
//   const typed = useTyping();

//   return (
//     <section
//       id="home"
//       className="relative min-h-screen flex items-center pt-28 pb-16"
//     >
//       <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 grid lg:grid-cols-12 gap-10 items-center">
//         {/* Text side */}
//         <div className="lg:col-span-7 order-2 lg:order-1">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono mb-6"
//           >
//             <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
//             Available for internships & collaborations
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.1 }}
//             className="font-display font-bold leading-[1.05] tracking-tight"
//           >
//             <span className="block text-4xl sm:text-5xl lg:text-6xl">
//               Hi, I'm{" "}
//               <span className="gradient-text">Linkon Biswas</span>
//               <span className="gradient-text">.</span>
//             </span>
//             <span className="mt-3 block text-2xl sm:text-3xl lg:text-4xl font-medium text-muted">
//               <span className="gradient-text cursor-blink">{typed}</span>
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.25 }}
//             className="mt-6 text-base sm:text-lg text-muted max-w-2xl leading-relaxed"
//           >
//             I build intelligent systems and explore the potential of machine
//             learning to solve real-world challenges. Passionate about{" "}
//             <span className="text-current font-medium">AI Engineering</span>{" "}
//             and committed to creating future-ready, data-driven solutions.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.4 }}
//             className="mt-8 flex flex-wrap gap-3"
//           >
//             <a
//               href={personal.resumeUrl}
//               download
//               className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-fuchsia-500/40 hover:-translate-y-0.5 transition-all"
//             >
//               <FiDownload className="group-hover:animate-bounce" />
//               Download Resume
//             </a>
//             <button
//               onClick={() => scrollTo("contact")}
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass hover:-translate-y-0.5 transition-all"
//             >
//               <FiMail /> Contact Me
//             </button>
//             <button
//               onClick={() => scrollTo("projects")}
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass hover:-translate-y-0.5 transition-all"
//             >
//               <FiFolder /> View Projects
//             </button>
//           </motion.div>

//           {/* Stats removed as requested */}
//         </div>

//         {/* Image side */}
//         <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.85 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="relative"
//           >
//             {/* Animated gradient ring */}
//             <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-500 opacity-70 blur-xl animate-pulse" />
//             <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-500" />
//             <div className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-[22rem] lg:w-[22rem] rounded-full overflow-hidden float-slow ring-1 ring-white/10 bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30">
//               <img
//                 src=" images/linkon.jpg"
//                 alt="Linkon Biswas"
//                 className="h-full w-full object-cover"
//                 style={{
//                   filter: "contrast(1.05) saturate(1.05) brightness(1.02)",
//                 }}
//                 onError={(e) => {
//                   // Hide broken image and show initials fallback
//                   const t = e.currentTarget;
//                   t.style.display = "none";
//                   const parent = t.parentElement;
//                   if (parent && !parent.querySelector(".initials")) {
//                     const div = document.createElement("div");
//                     div.className =
//                       "initials h-full w-full grid place-items-center font-display text-7xl font-bold text-white/80";
//                     div.textContent = "LB";
//                     parent.appendChild(div);
//                   }
//                 }}
//               />
//             </div>

//             {/* Single floating "Open to Work" badge */}
//             <motion.div
//               animate={{ y: [0, -6, 0] }}
//               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//               className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl shadow-xl shadow-emerald-500/30 flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white border border-emerald-300/30"
//             >
//               <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
//                 <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-90 animate-ping" />
//                 <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white" />
//               </span>
//               <span className="text-[10px] sm:text-xs font-semibold tracking-wide">
//                 <span className="opacity-80">Status:</span>{" "}
//                 <span className="font-bold">Open to Work</span>
//               </span>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Scroll indicator */}
//       <motion.button
//         onClick={() => scrollTo("about")}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1, y: [0, 8, 0] }}
//         transition={{ delay: 1, duration: 2, repeat: Infinity }}
//         className="absolute bottom-6 left-1/2 -translate-x-1/2 glass h-10 w-10 rounded-full grid place-items-center"
//         aria-label="Scroll down"
//       >
//         <FiArrowDown />
//       </motion.button>
//     </section>
//   );
// }


import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiMail, FiFolder, FiArrowDown } from "react-icons/fi";
import { personal } from "../data/portfolio";


import linkonImg from "../assets/linkon.jpg";

const titles = [
  "AI Enthusiast",
  "Aspiring AI Engineer",
  "CSE Student",
  "Problem Solver",
];

function useTyping() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[idx];
    const speed = deleting ? 45 : 90;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1600);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIdx((i) => (i + 1) % titles.length);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return text;
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  const typed = useTyping();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16"
    >
      <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 grid lg:grid-cols-12 gap-10 items-center">
        {/* Text side */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for internships & collaborations
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold leading-[1.05] tracking-tight"
          >
            <span className="block text-4xl sm:text-5xl lg:text-6xl">
              Hi, I'm{" "}
              <span className="gradient-text">Linkon Biswas</span>
              <span className="gradient-text">.</span>
            </span>
            <span className="mt-3 block text-2xl sm:text-3xl lg:text-4xl font-medium text-muted">
              <span className="gradient-text cursor-blink">{typed}</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-base sm:text-lg text-muted max-w-2xl leading-relaxed"
          >
            I build intelligent systems and explore the potential of machine
            learning to solve real-world challenges. Passionate about{" "}
            <span className="text-current font-medium">AI Engineering</span>{" "}
            and committed to creating future-ready, data-driven solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={personal.resumeUrl}
              download
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-fuchsia-500/40 hover:-translate-y-0.5 transition-all"
            >
              <FiDownload className="group-hover:animate-bounce" />
              Download Resume
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass hover:-translate-y-0.5 transition-all"
            >
              <FiMail /> Contact Me
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass hover:-translate-y-0.5 transition-all"
            >
              <FiFolder /> View Projects
            </button>
          </motion.div>
        </div>

        {/* Image side */}
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Animated gradient ring */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-500 opacity-70 blur-xl animate-pulse" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-500" />
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-[22rem] lg:w-[22rem] rounded-full overflow-hidden float-slow ring-1 ring-white/10 bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30">
              <img
                src={linkonImg} // ২. এখানে আগে স্ট্রিং পাথ ছিল, এখন ভেরিয়েবলটি বসানো হয়েছে
                alt="Linkon Biswas"
                className="h-full w-full object-cover"
                style={{
                  filter: "contrast(1.05) saturate(1.05) brightness(1.02)",
                }}
                onError={(e) => {
                  const t = e.currentTarget;
                  t.style.display = "none";
                  const parent = t.parentElement;
                  if (parent && !parent.querySelector(".initials")) {
                    const div = document.createElement("div");
                    div.className =
                      "initials h-full w-full grid place-items-center font-display text-7xl font-bold text-white/80";
                    div.textContent = "LB";
                    parent.appendChild(div);
                  }
                }}
              />
            </div>

            {/* Single floating "Open to Work" badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl shadow-xl shadow-emerald-500/30 flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white border border-emerald-300/30"
            >
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-90 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white" />
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-wide">
                <span className="opacity-80">Status:</span>{" "}
                <span className="font-bold">Open to Work</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 glass h-10 w-10 rounded-full grid place-items-center"
        aria-label="Scroll down"
      >
        <FiArrowDown />
      </motion.button>
    </section>
  );
}
export const personal = {
  name: "Linkon Biswas",
  role: "CSE Student & Future AI Engineer",
  university: "Gopalganj Science and Technology University",
  goal: "Becoming an AI Engineer",
  email: "linkonbiswas2002@gmail.com",
  github: "https://github.com/linkon-biswas",
  linkedin: "https://www.linkedin.com/in/linkon008/",
  facebook: "https://www.facebook.com/linkon.linkonbiswas",
  whatsapp: "https://wa.me/8801409310233",
  whatsappNumber: "+880 1409-310233",
  codeforces: "https://codeforces.com/profile/link_on",
  leetcode: "https://leetcode.com/u/link_on/",
  cfHandle: "link_on",
  lcHandle: "link_on",
  resumeUrl: "/Linkon_Biswas_Resume.pdf",
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "cp", label: "Competitive Programming" },
  { id: "contact", label: "Contact" },
];

export const skills = [
  { name: "C", level: "Intermediate", value: 70, color: "from-sky-400 to-indigo-500" },
  { name: "C++", level: "Intermediate", value: 72, color: "from-indigo-400 to-purple-500" },
  { name: "Python", level: "Beginner", value: 55, color: "from-yellow-400 to-orange-500" },
  { name: "HTML", level: "Intermediate", value: 75, color: "from-orange-400 to-pink-500" },
  { name: "CSS", level: "Beginner", value: 60, color: "from-pink-400 to-fuchsia-500" },
  { name: "GitHub", level: "Beginner", value: 60, color: "from-zinc-400 to-zinc-700" },
];

export type Project = {
  title: string;
  icon?: string;
  description: string;
  stack: string[];
  github: string;
  demo?: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    title: "ALIAS AI",
    icon: "🎯",
    description:
      "Multimodal brand content generation platform. Upload a product image, get a full ad campaign — copy, creatives, and messaging — in seconds. Built for SMBs.",
    stack: ["Claude API", "Gemini", "React + TS", "Supabase", "Vite"],
    github: "https://github.com/linkon-biswas",
    highlights: [
      "Multimodal product understanding",
      "Generates copy + creative brief in seconds",
      "Tailored for small and medium businesses",
    ],
  },
  {
    title: "পুষ্টিবন্ধু",
    icon: "🥗",
    description:
      "Nutrition AI dashboard with budget-based meal planning, photo food scanning via Claude Vision API, and health condition-specific dietary guidance — localized for Bangladesh.",
    stack: ["Claude Vision", "React", "Supabase", "Meal AI"],
    github: "https://github.com/linkon-biswas",
    highlights: [
      "Photo-based food recognition",
      "Budget & health-aware meal plans",
      "Localized for Bangladesh",
    ],
  },
  {
    title: "MoodMap BD",
    icon: "📡",
    description:
      "Real-time social media sentiment tracking platform for Bangladesh. Live dashboards showing public mood trends with Bangla NLP processing. Built for BRAC Hackathon.",
    stack: ["Sentiment NLP", "Real-time", "Bangla NLP", "Data Viz"],
    github: "https://github.com/linkon-biswas",
    highlights: [
      "Bangla-language NLP processing",
      "Live sentiment dashboards",
      "Built during BRAC Hackathon",
    ],
  },
  {
    title: "Social Commerce App",
    icon: "🛍️",
    description:
      "Mobile app for home-based Facebook/WhatsApp sellers in Bangladesh — AI-assisted order management, inventory tracking, and customer communication in one simple interface.",
    stack: ["Claude API", "Bolt.new", "Supabase", "Vercel"],
    github: "https://github.com/linkon-biswas",
    highlights: [
      "AI-assisted order management",
      "Inventory & customer chat in one place",
      "Designed for home-based sellers",
    ],
  },
];

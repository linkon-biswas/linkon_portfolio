import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import { personal } from "../data/portfolio";
import SectionHeader from "./SectionHeader";

type CFStats = {
  rating: number | null;
  maxRating: number | null;
  rank: string | null;
  solved: number | null;
};

type LCStats = {
  totalSolved: number | null;
  ranking: number | null;
  easy: number | null;
  medium: number | null;
  hard: number | null;
};

// Static, manually maintained values that always display (your snapshot).
// Live API fetch below will only override these if a fresher value is returned.
const CF_DISPLAY: CFStats = {
  rating: null, // current rating not tracked here
  maxRating: 715,
  rank: null,
  solved: 38,
};

const LC_DISPLAY: LCStats = {
  totalSolved: 2,
  ranking: null,
  easy: null,
  medium: null,
  hard: null,
};

/**
 * Fetch JSON, trying multiple proxy strategies.
 * Returns null if all strategies fail.
 */
async function fetchJSONProxied(targetUrl: string): Promise<any | null> {
  // Strategy 1: corsproxy.io — it takes the target URL as a query string
  // and returns the response with permissive CORS headers.
  const strategies: { url: string; unwrap?: (j: any) => any }[] = [
    {
      // corsproxy.io syntax: append target as ?url= (NOT encoded) for newer docs,
      // or use ?<url> form. Use the "url=" form which is most reliable.
      url: `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`,
    },
    {
      // allorigins /raw returns the raw response body
      url: `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
    },
    {
      // allorigins /get wraps in { contents: "...string..." }
      url: `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`,
      unwrap: (j) => {
        if (j && typeof j.contents === "string") {
          try { return JSON.parse(j.contents); } catch { return null; }
        }
        return j;
      },
    },
  ];

  for (const s of strategies) {
    try {
      const res = await fetch(s.url, { method: "GET" });
      if (!res.ok) continue;
      const text = await res.text();
      let j: any;
      try {
        j = JSON.parse(text);
      } catch {
        continue;
      }
      if (s.unwrap) j = s.unwrap(j);
      if (j && typeof j === "object") return j;
    } catch {
      // try next
    }
  }
  return null;
}

async function fetchCFStats(handle: string): Promise<CFStats> {
  // 1) User info
  const userUrl = `https://codeforces.com/api/user.info?handles=${handle}`;
  const userJson = await fetchJSONProxied(userUrl);
  const user = userJson?.result?.[0];
  if (!user) {
    return { rating: null, maxRating: null, rank: null, solved: null };
  }

  // 2) Submissions (independent — failure here doesn't kill user info)
  let solved: number | null = null;
  const subUrl = `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000`;
  const subJson = await fetchJSONProxied(subUrl);
  if (subJson?.status === "OK" && Array.isArray(subJson.result)) {
    const set = new Set<string>();
    for (const s of subJson.result) {
      if (s.verdict === "OK" && s.problem) {
        set.add(`${s.problem.contestId}-${s.problem.index}`);
      }
    }
    solved = set.size;
  }

  return {
    rating: typeof user.rating === "number" ? user.rating : null,
    maxRating: typeof user.maxRating === "number" ? user.maxRating : null,
    rank: user.rank ?? null,
    solved,
  };
}

async function fetchLCStats(handle: string): Promise<LCStats> {
  // Try a few LC community stats endpoints (each is a different backend, so
  // availability varies). All are wrapped via fetchJSONProxied to bypass CORS.
  const endpoints = [
    `https://leetcode-stats-api.herokuapp.com/${handle}`,
    `https://alfa-leetcode-api.onrender.com/${handle}/solved`,
  ];

  for (const url of endpoints) {
    const j = await fetchJSONProxied(url);
    if (!j) continue;
    if (j.totalSolved !== undefined || j.solvedProblem !== undefined) {
      return {
        totalSolved: j.totalSolved ?? j.solvedProblem ?? null,
        ranking: j.ranking ?? null,
        easy: j.easySolved ?? j.easySolvedProblem ?? null,
        medium: j.mediumSolved ?? j.mediumSolvedProblem ?? null,
        hard: j.hardSolved ?? j.hardSolvedProblem ?? null,
      };
    }
  }

  return {
    totalSolved: null,
    ranking: null,
    easy: null,
    medium: null,
    hard: null,
  };
}

export default function CompetitiveProgramming() {
  // Seed state with the static display values so they appear immediately,
  // and live API results only fill in fields that are still null.
  const [cf, setCf] = useState<CFStats>(CF_DISPLAY);
  const [lc, setLc] = useState<LCStats>(LC_DISPLAY);

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchCFStats(personal.cfHandle), fetchLCStats(personal.lcHandle)])
      .then(([cfRes, lcRes]) => {
        if (!mounted) return;
        // Merge: live API values fill in nulls in the static display.
        setCf((prev) => ({
          rating: prev.rating ?? cfRes.rating,
          maxRating: prev.maxRating ?? cfRes.maxRating,
          rank: prev.rank ?? cfRes.rank,
          solved: prev.solved ?? cfRes.solved,
        }));
        setLc((prev) => ({
          totalSolved: prev.totalSolved ?? lcRes.totalSolved,
          ranking: prev.ranking ?? lcRes.ranking,
          easy: prev.easy ?? lcRes.easy,
          medium: prev.medium ?? lcRes.medium,
          hard: prev.hard ?? lcRes.hard,
        }));
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="cp" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Competitive Programming"
          title="Sharpening algorithms, one problem at a time."
          description="I solve problems regularly to build strong fundamentals in algorithms, data structures and creative thinking under pressure."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Codeforces */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="group relative glass rounded-3xl p-7 border border-soft overflow-hidden hover:border-red-400/40 transition-colors"
          >
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-red-500 to-orange-500 opacity-20 blur-3xl group-hover:opacity-40 transition-opacity" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white text-2xl grid place-items-center shadow-lg">
                  <SiCodeforces />
                </div>
                <div>
                  <p className="font-display font-bold text-lg">Codeforces</p>
                  <p className="text-xs font-mono text-muted">
                    @{personal.cfHandle}
                  </p>
                </div>
              </div>
              <a
                href={personal.codeforces}
                target="_blank"
                rel="noreferrer noopener"
                className="h-10 w-10 grid place-items-center rounded-full glass hover:bg-gradient-to-br hover:from-red-500 hover:to-orange-500 hover:text-white transition-all"
                aria-label="Open Codeforces profile"
              >
                <FiExternalLink />
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Stat
                label="Max Rating"
                value={cf.maxRating ?? "—"}
                highlight
              />
              <Stat
                label="Problems Solved"
                value={cf.solved != null ? `${cf.solved}+` : "—"}
              />
            </div>

            <a
              href={personal.codeforces}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Visit Profile <FiExternalLink />
            </a>
          </motion.div>

          {/* LeetCode */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative glass rounded-3xl p-7 border border-soft overflow-hidden hover:border-amber-400/40 transition-colors"
          >
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 opacity-20 blur-3xl group-hover:opacity-40 transition-opacity" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-white text-2xl grid place-items-center shadow-lg">
                  <SiLeetcode />
                </div>
                <div>
                  <p className="font-display font-bold text-lg">LeetCode</p>
                  <p className="text-xs font-mono text-muted">
                    @{personal.lcHandle}
                  </p>
                </div>
              </div>
              <a
                href={personal.leetcode}
                target="_blank"
                rel="noreferrer noopener"
                className="h-10 w-10 grid place-items-center rounded-full glass hover:bg-gradient-to-br hover:from-amber-400 hover:to-yellow-500 hover:text-white transition-all"
                aria-label="Open LeetCode profile"
              >
                <FiExternalLink />
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Stat
                label="Max Rating"
                value={lc.ranking ? lc.ranking : "—"}
              />
              <Stat
                label="Problems Solved"
                value={lc.totalSolved != null ? `${lc.totalSolved}+` : "—"}
                highlight
              />
            </div>

            <a
              href={personal.leetcode}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Visit Profile <FiExternalLink />
            </a>
          </motion.div>
        </div>

        <p className="mt-6 text-center text-xs text-muted font-mono">
          Stats updated from Codeforces & LeetCode profiles
        </p>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="glass border border-soft rounded-xl px-3 py-3 text-center">
      <p
        className={`font-display text-xl font-bold ${
          highlight ? "gradient-text" : ""
        }`}
      >
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-widest text-muted mt-1">
        {label}
      </p>
    </div>
  );
}

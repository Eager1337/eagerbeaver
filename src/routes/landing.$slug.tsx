import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useContent } from "../lib/content-store";

export const Route = createFileRoute("/landing/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Landing` },
      { name: "description", content: "A custom landing page." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Landing page not found</h1>
        <Link to="/" className="mt-4 inline-block text-sky-300 hover:underline">← Home</Link>
      </div>
    </div>
  ),
  component: LandingPage,
});

function LandingPage() {
  const { slug } = Route.useParams();
  const { landings } = useContent();
  const l = landings.find((x) => x.slug === slug);
  if (!l) throw notFound();

  const isExternal = /^https?:\/\//i.test(l.ctaHref);

  return (
    <div className="relative min-h-screen overflow-hidden text-white" style={{ background: l.bg }}>
      {/* animated glow */}
      <motion.div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: l.accent, opacity: 0.35 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse at top, black 30%, transparent 80%)",
      }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white">
          <ArrowLeft className="h-3.5 w-3.5" /> Home
        </Link>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            {l.kicker && (
              <div className="text-[10px] font-semibold uppercase tracking-[0.35em]" style={{ color: l.accent }}>
                {l.kicker}
              </div>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="mt-3 text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              {l.title}
            </motion.h1>
            {l.tagline && <p className="mt-5 max-w-xl text-lg text-white/80">{l.tagline}</p>}
            {l.body && <p className="mt-6 max-w-xl whitespace-pre-line text-sm leading-relaxed text-white/70">{l.body}</p>}

            <div className="mt-8 flex flex-wrap gap-3">
              {isExternal ? (
                <a href={l.ctaHref} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
                  style={{ background: l.accent }}>
                  {l.ctaLabel} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              ) : (
                <Link to={l.ctaHref as string}
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
                  style={{ background: l.accent }}>
                  {l.ctaLabel} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
              <Link to="/explore" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold hover:bg-white/10">
                Explore case studies
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/15 shadow-2xl"
            style={{ background: l.accent }}
          >
            {l.image ? (
              <img src={l.image} alt={l.title} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center text-white/70" style={{ fontFamily: "'Kanit', sans-serif" }}>
                <span className="text-3xl font-black">{l.title}</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const stories = [
  {
    category: "Ingredients",
    title: "What Makes Thrissur Vetiver the World's Finest",
    excerpt: "The ancient root that anchors perfumery — and why the red laterite soil of Thrissur produces something no other region can replicate.",
    readTime: "6 min",
    accent: "#7aab85",
  },
  {
    category: "Culture",
    title: "The Malabar Spice Route: A Fragrant History",
    excerpt: "For 3,000 years, this coastline traded pepper, cardamom, and sandalwood with Arabia, Rome, and China. The scent routes that shaped the world.",
    readTime: "9 min",
    accent: "#c8965a",
  },
  {
    category: "Rituals",
    title: "Thrissur Pooram and the Language of Scent",
    excerpt: "How Kerala's grandest festival — 30 elephants and a million marigolds — inspired our most complex fragrance.",
    readTime: "5 min",
    accent: "#8fa8c8",
  },
];

const PAPER = "#f5f0e4";
const PAPER_DARK = "#e8e0d0";

export default function StoriesPreview() {
  return (
    <section className="relative overflow-hidden border-t border-ivory/5" style={{ backgroundColor: "#0a0805" }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image src="/stories-bg.jpg" alt="Journal Background" fill className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0805] via-transparent to-[#0a0805]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 md:px-20 py-32 md:py-44">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[10px] tracking-[0.45em] text-gold font-bold block mb-5">THE JOURNAL</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-display text-ivory leading-[0.9]" style={{ fontSize: "clamp(2.8rem,5vw,6rem)", letterSpacing: "-0.03em" }}>
              Stories from<br /><em className="not-italic text-gold font-accent italic">the coast.</em>
            </motion.h2>
          </div>
          <Link href="/stories"
            className="group flex items-center gap-4 text-[10px] tracking-[0.35em] text-ivory/40 hover:text-gold transition-all duration-500 font-bold self-start md:self-end">
            ALL STORIES <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-500 inline-block" />
          </Link>
        </div>

        {/* Paper cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((s, i) => (
            <Link href="/stories" key={s.title}>
              <motion.article
                initial={{ opacity: 0, y: 40, rotate: i === 1 ? 0.5 : i === 0 ? -0.5 : 0.3 }}
              whileInView={{ opacity: 1, y: 0, rotate: i === 1 ? 0.5 : i === 0 ? -0.5 : 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, rotate: 0, transition: { duration: 0.4 } }}
              className="cursor-pointer group relative"
              style={{ transformOrigin: "bottom center" }}
            >
              {/* Paper texture card */}
              <div className="relative overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                style={{ backgroundColor: PAPER, minHeight: "420px" }}>

                {/* Paper grain overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06] grain" />

                {/* Top colour bar */}
                <div className="h-1 w-full" style={{ backgroundColor: s.accent }} />

                {/* Ruled lines (decorative) */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 31px, ${PAPER_DARK}60 31px, ${PAPER_DARK}60 32px)`,
                  backgroundPositionY: "60px",
                }}>
                </div>

                <div className="relative z-10 p-10 flex flex-col h-full gap-5">
                  {/* Category + time */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.35em] font-bold uppercase" style={{ color: s.accent }}>{s.category}</span>
                    <span className="text-[9px] tracking-[0.2em] text-teak/40 font-mono">{s.readTime} read</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-teak text-2xl leading-[1.15] group-hover:opacity-70 transition-opacity duration-500" style={{ letterSpacing: "-0.015em" }}>
                    {s.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-teak/55 text-sm leading-relaxed flex-1 font-light">{s.excerpt}</p>

                  {/* Read link */}
                  <div className="flex items-center gap-3 pt-4 border-t border-teak/10">
                    <div className="w-4 h-px bg-teak/30 group-hover:w-8 transition-all duration-500" style={{ backgroundColor: s.accent }} />
                    <span className="text-[9px] tracking-[0.3em] text-teak/40 group-hover:text-teak/70 transition-colors uppercase font-bold">Read Story</span>
                  </div>
                </div>
              </div>

              {/* Shadow under paper */}
              <div className="absolute -bottom-2 left-2 right-2 h-4 blur-md -z-10 rounded-sm opacity-40"
                style={{ backgroundColor: "#000" }} />
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

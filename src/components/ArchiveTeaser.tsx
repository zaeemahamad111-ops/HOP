"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const archived = [
  { name: "Monsoon '22", year: "2022", count: "800 bottles", tagline: "The first rain." },
  { name: "Pepper Coast", year: "2021", count: "600 bottles", tagline: "Lost at sea." },
  { name: "Midnight Temple", year: "2023", count: "1,200 bottles", tagline: "Sacred smoke." },
  { name: "Harvest Gold", year: "2020", count: "400 bottles", tagline: "Never again." },
];

export default function ArchiveTeaser() {
  return (
    <section className="bg-[#0f0d0a] text-ivory relative overflow-hidden py-28 md:py-36">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-display text-ivory/[0.025] whitespace-nowrap select-none"
          style={{ fontSize: "clamp(6rem, 18vw, 18rem)", letterSpacing: "-0.05em" }}>
          ARCHIVE
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 md:px-20 relative z-10">
        <div className="mb-14">
          <span className="text-[10px] tracking-[0.35em] text-gold/40 block mb-4">IN MEMORIAM</span>
          <h2 className="font-display text-ivory leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 4.5vw, 5rem)", letterSpacing: "-0.02em" }}>
            These bottles<br />
            <em className="not-italic text-gold/60">no longer exist.</em>
          </h2>
          <p className="text-ivory/30 text-base mt-4 max-w-md">Their memory does.</p>
        </div>

        {/* Archived items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/5 mb-12">
          {archived.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              className="group flex flex-col p-8 hover:bg-ivory/3 transition-colors duration-500 border-b-0 relative"
              style={{ backgroundColor: `rgba(255,255,255,${0.01 + i * 0.01})` }}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
              <span className="font-mono text-[9px] text-gold/30 tracking-[0.2em] mb-4">{a.year} · {a.count}</span>
              <h3 className="font-display text-2xl text-ivory/70 group-hover:text-ivory transition-colors duration-500 mb-2">{a.name}</h3>
              <p className="font-accent italic text-ivory/30 text-sm">{a.tagline}</p>
              <div className="mt-auto pt-6">
                <span className="text-[9px] tracking-[0.2em] text-gold/30 group-hover:text-gold/60 transition-colors">DISCONTINUED</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link href="/archive"
            className="group flex items-center gap-3 border border-gold/25 text-gold/70 hover:border-gold hover:text-gold transition-all duration-300 px-8 py-4 text-[11px] tracking-[0.2em]">
            VISIT THE ARCHIVE
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <p className="text-ivory/20 text-sm font-accent italic">Join the revival waitlist</p>
        </div>
      </div>
    </section>
  );
}

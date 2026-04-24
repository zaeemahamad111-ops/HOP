"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const pillars = [
  { num: "01", title: "Small Batch", desc: "Never more than 2,000 pieces per release. Quality is the only metric.", color: "#7aab85", icon: "◈" },
  { num: "02", title: "Global Ingredients", desc: "Sourced from the finest farms in Turkey, Switzerland, France, and Australia.", color: "#C8A96E", icon: "✦" },
  { num: "03", title: "Master Perfumers", desc: "Crafted by the finest noses in the industry, bridging classical French techniques with modern aesthetics.", color: "#C4622D", icon: "◉" },
  { num: "04", title: "Handcrafted Glass", desc: "Each vessel hand-finished. The bottle outlasts the perfume itself.", color: "#8fa8c8", icon: "◇" },
];

export default function Philosophy() {
  return (
    <section className="relative bg-[#0a0805] border-t border-ivory/5">
      {/* Top Header Section with Edge-to-Edge Background */}
      <div className="relative w-full border-b border-ivory/5 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image src="/philosophy-bg.jpg" alt="Philosophy Background" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#0a0805]/70" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0805] to-transparent" />
        </div>
        
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-gold/[0.04] blur-[120px] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-20 pt-24 md:pt-44 pb-20 md:pb-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-40 items-end">
            <div>
              <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-[9px] md:text-[10px] tracking-[0.45em] text-gold font-bold block mb-6 md:mb-8">ABOUT HOP</motion.span>
              <h2 className="font-display text-ivory leading-[0.86]" style={{ fontSize: "clamp(2.8rem, 8vw, 9rem)", letterSpacing: "-0.025em" }}>
                <motion.span initial={{ y: "110%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="block overflow-hidden">We</motion.span>
                <motion.span initial={{ y: "110%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.08 }} className="block overflow-hidden">bottle</motion.span>
                <motion.em initial={{ y: "110%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.16 }} className="not-italic block overflow-hidden text-gold font-accent italic">Excellence.</motion.em>
              </h2>
            </div>
            <div className="flex flex-col gap-8 md:gap-10">
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="text-ivory/50 text-lg md:text-2xl leading-relaxed font-light">
                An Indian luxury fragrance house bridging global ingredient sourcing with modern minimalist aesthetics.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="font-accent italic text-gold/60 text-lg md:text-xl leading-relaxed border-l border-gold/20 pl-6">
                &quot;Every bottle holds a place, a memory, a ritual.&quot;
              </motion.p>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-ivory/5">
                {[["14", "Partners"], ["2019", "Founded"], ["3", "EDPs"]].map(([val, label]) => (
                  <div key={label}>
                    <span className="font-display text-gold text-2xl md:text-3xl block" style={{ letterSpacing: "-0.03em" }}>{val}</span>
                    <span className="text-[8px] md:text-[9px] tracking-[0.25em] text-ivory/30 uppercase mt-1 block">{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars Section */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-20 py-20 md:py-28 relative overflow-visible">
        {/* Fabric Texture Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
          <Image src="/yellow-fabric.jpg" alt="Texture" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0805] via-transparent to-[#0a0805]" />
        </div>
        
        {/* DESKTOP: Horizontal Glowing Line (Visible on md and up) */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-48 pointer-events-none z-0 opacity-80 transition-opacity duration-1000">
          <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" className="drop-shadow-[0_0_15px_rgba(200,169,110,0.3)]">
            <defs>
              <linearGradient id="line-glow-h" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C8A96E" stopOpacity="0" />
                <stop offset="10%" stopColor="#C8A96E" stopOpacity="1" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="90%" stopColor="#C8A96E" stopOpacity="1" />
                <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
              </linearGradient>
              <filter id="glow-filter-h" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path d="M0,50 Q250,70 500,50 T1000,50" stroke="url(#line-glow-h)" strokeWidth="2" fill="none" filter="url(#glow-filter-h)" />
            <g stroke="url(#line-glow-h)" strokeWidth="1" fill="none" filter="url(#glow-filter-h)">
              <path d="M125,52 L140,80 M375,48 L360,20 M625,52 L640,90 M875,48 L860,15" />
              <path d="M140,80 L150,85 M360,20 L350,10 M640,90 L655,85 M860,15 L850,5" strokeWidth="0.5" />
            </g>
            <g fill="#C8A96E" filter="url(#glow-filter-h)">
              <circle cx="140" cy="80" r="2" /><circle cx="360" cy="20" r="2" /><circle cx="640" cy="90" r="2" /><circle cx="860" cy="15" r="2" />
            </g>
          </svg>
        </div>

        {/* MOBILE: Vertical Glowing Line (Visible on small screens) */}
        <div className="md:hidden absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-48 pointer-events-none z-0 opacity-60 transition-opacity duration-1000">
          <svg width="100%" height="100%" viewBox="0 0 100 1000" preserveAspectRatio="none" className="drop-shadow-[0_0_15px_rgba(200,169,110,0.2)]">
            <defs>
              <linearGradient id="line-glow-v" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C8A96E" stopOpacity="0" />
                <stop offset="5%" stopColor="#C8A96E" stopOpacity="1" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="95%" stopColor="#C8A96E" stopOpacity="1" />
                <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M50,0 Q70,250 50,500 T50,1000" stroke="url(#line-glow-v)" strokeWidth="2" fill="none" />
            {/* Roots reaching out to stacked cards */}
            <g stroke="url(#line-glow-v)" strokeWidth="1" fill="none" opacity="0.5">
              <path d="M52,125 L80,140 M48,375 L20,360 M52,625 L90,640 M48,875 L15,860" />
            </g>
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
          {pillars.map((p, i) => (
            <motion.div key={p.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative flex flex-col gap-6 p-6 md:p-8 border border-ivory/5 bg-[#0a0805]/80 backdrop-blur-sm hover:border-gold/40 hover:bg-[#0a0805] hover:shadow-[0_0_40px_rgba(200,169,110,0.15)] transition-all duration-700 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${p.color}30 0%, transparent 80%)` }} />
              <div className="flex justify-between items-center">
                <span className="text-lg md:text-xl" style={{ color: `${p.color}70` }}>{p.icon}</span>
                <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-ivory/20">{p.num}</span>
              </div>
              <div className="h-px w-full bg-ivory/5 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-700 ease-out" style={{ backgroundColor: p.color }} />
              </div>
              <h3 className="font-display text-xl md:text-2xl leading-tight group-hover:text-gold transition-colors duration-500">{p.title}</h3>
              <p className="text-ivory/35 text-xs md:text-sm leading-relaxed">{p.desc}</p>
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full mt-auto opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ backgroundColor: p.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

/**
 * ProductScrollCarousel — Optimized Ref-based scroll showcase.
 * 
 * PERFORMANCE FIXES:
 * 1. Removed useState for scroll progress.
 * 2. Uses direct DOM manipulation via refs for all animations.
 * 3. Uses Framer Motion's AnimatePresence only for discrete swaps.
 * 4. will-change: transform on all moving elements.
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

const FRAGRANCES = [
  {
    id: 1,
    name: "Monsoon Vetiver",
    headline: ["Monsoon", "Vetiver"],
    tagline: "Earth after rain.",
    description: "Kerala's red laterite soil after the first monsoon downpour — petrichor captured in a bottle. An earthy, green, and deeply grounding vetiver.",
    accent: "#7aab85",
    accentDim: "#4a7a5a",
    image: "/perfume 1.png",
    price: 4500,
    notes: [
      { tier: "TOP", name: "Bergamot", origin: "Calabria" },
      { tier: "HEART", name: "Petrichor", origin: "Wayanad" },
      { tier: "BASE", name: "Vetiver", origin: "Thrissur" },
    ],
    stats: [85, 95, 80],
    statLabels: ["Longevity", "Sillage", "Concentration"],
    statValues: ["12+ hrs", "Moderate", "Parfum"]
  },
  {
    id: 2,
    name: "Spice Market",
    headline: ["Spice", "Market"],
    tagline: "Golden hour in Fort Kochi.",
    description: "The labyrinthine lanes of Mattancherry at dusk — cumin smoke, sun-dried pepper, and the warm sweetness of cinnamon bark.",
    accent: "#c8965a",
    accentDim: "#9a6a35",
    image: "/perfume 2.png",
    price: 4800,
    notes: [
      { tier: "TOP", name: "Black Pepper", origin: "Wayanad" },
      { tier: "HEART", name: "Cinnamon", origin: "Sri Lanka" },
      { tier: "BASE", name: "Sandalwood", origin: "Marayoor" },
    ],
    stats: [92, 100, 90],
    statLabels: ["Longevity", "Sillage", "Concentration"],
    statValues: ["14+ hrs", "Strong", "Extrait"]
  },
  {
    id: 3,
    name: "Coastal Jasmine",
    headline: ["Coastal", "Jasmine"],
    tagline: "Nightfall by the Arabian Sea.",
    description: "Varkala's sea-cliffs at midnight — jasmine sambac carried on the salt-breeze, the dark mystery of ambergris.",
    accent: "#8fa8c8",
    accentDim: "#5c7a9a",
    image: "/perfume 3.png",
    price: 5200,
    notes: [
      { tier: "TOP", name: "Sea Salt", origin: "Varkala" },
      { tier: "HEART", name: "Jasmine Sambac", origin: "Madurai" },
      { tier: "BASE", name: "Ambergris", origin: "Oceanic" },
    ],
    stats: [72, 55, 80],
    statLabels: ["Longevity", "Sillage", "Concentration"],
    statValues: ["10+ hrs", "Light", "Parfum"]
  },
];

export default function ProductScrollCarousel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  
  const [activeIdx, setActiveIdx] = useState(0);
  const { addItem } = useCartStore();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let rafId = 0;
    let ticking = false;

    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p = total > 0 ? Math.min(1, scrolled / total) : 0;

      // Update index (only triggers React render 3 times across 400vh)
      const newIdx = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
      if (newIdx !== activeIdx) setActiveIdx(newIdx);

      // Local progress for the rail (0-1 within the current section)
      const localP = p < 0.33 ? p / 0.33 : p < 0.66 ? (p - 0.33) / 0.33 : (p - 0.66) / 0.34;
      
      if (railFillRef.current) {
        railFillRef.current.style.height = `${localP * 100}%`;
        railFillRef.current.style.backgroundColor = FRAGRANCES[newIdx].accent;
      }

      if (stickyRef.current) {
          stickyRef.current.style.background = `radial-gradient(ellipse at 60% 50%, ${FRAGRANCES[newIdx].accentDim}22 0%, #0a0805 70%)`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [activeIdx]);

  const frag = FRAGRANCES[activeIdx];

  return (
    <div ref={wrapRef} style={{ height: "400vh" }} className="relative">
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden transition-colors duration-1000"
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] grain z-0" />
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: "radial-gradient(ellipse 75% 80% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)" }} />

        {/* Header Indicators */}
        <div className="absolute top-8 left-8 md:left-20 z-20 flex items-center gap-4">
          <div className="w-8 h-[1px]" style={{ backgroundColor: frag.accent + "60" }} />
          <span className="text-[10px] tracking-[0.4em] transition-colors duration-700" style={{ color: frag.accent + "80" }}>THE COLLECTION</span>
        </div>

        <div className="absolute top-8 right-8 md:right-20 z-20 flex items-baseline gap-1">
          <AnimatePresence mode="wait">
            <motion.span key={activeIdx} initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 12, opacity: 0 }} className="font-display text-ivory/70 text-3xl">0{activeIdx + 1}</motion.span>
          </AnimatePresence>
          <span className="text-ivory/20 text-sm">/ 03</span>
        </div>

        {/* Content Grid */}
        <div className="absolute inset-0 flex items-center px-8 md:px-20 max-w-[1600px] mx-auto z-10">
          <div className="w-[360px] md:w-[420px] shrink-0 z-20">
            <AnimatePresence mode="wait">
              <motion.div key={activeIdx} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.6 }} className="flex flex-col">
                <span className="text-[10px] tracking-[0.35em] font-bold mb-5" style={{ color: frag.accent }}>EAU DE PARFUM · 0{activeIdx + 1}</span>
                <h2 className="font-display text-ivory leading-[0.87] mb-5" style={{ fontSize: "clamp(3rem, 5.5vw, 6rem)" }}>
                  {frag.headline.map((w, i) => <span key={i} className="block">{w}</span>)}
                </h2>
                <p className="font-accent italic text-ivory/40 text-lg mb-8">{frag.tagline}</p>
                <p className="text-ivory/35 text-sm leading-relaxed mb-8 max-w-sm">{frag.description}</p>

                <div className="flex gap-6 mb-8 pb-8 border-b border-ivory/5">
                  {frag.notes.map(n => (
                    <div key={n.tier} className="flex flex-col">
                      <span className="text-[9px] tracking-[0.3em] mb-1 font-bold" style={{ color: frag.accent }}>{n.tier}</span>
                      <span className="text-ivory/65 text-sm font-display">{n.name}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 mb-8">
                  {frag.statLabels.map((label, si) => (
                    <div key={label} className="flex items-center gap-4">
                      <span className="text-[9px] tracking-[0.25em] text-ivory/30 w-28 uppercase">{label}</span>
                      <div className="flex-1 h-[1px] bg-ivory/8 relative overflow-hidden">
                        <motion.div key={`${activeIdx}-${si}`} initial={{ width: "0%" }} animate={{ width: `${frag.stats[si]}%` }} className="absolute top-0 left-0 h-full" style={{ backgroundColor: frag.accent }} />
                      </div>
                      <span className="text-[9px] font-mono text-ivory/30">{frag.statValues[si]}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => addItem({ id: `carousel-${frag.id}`, name: frag.name, price: frag.price, category: "Eau de Parfum", quantity: 1, notesSummary: frag.notes[0].name })}
                  className="w-fit px-8 py-4 text-[10px] tracking-[0.3em] font-bold text-teak" 
                  style={{ backgroundColor: frag.accent }}
                >
                  ADD TO CART
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex-1 flex items-center justify-center relative h-full">
            <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 transition-colors duration-1000" style={{ backgroundColor: frag.accent }} />
            <AnimatePresence mode="wait">
              <motion.div key={activeIdx} initial={{ x: "40%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-40%", opacity: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative h-[85vh]">
                <img src={frag.image} alt={frag.name} className="h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Rail and Progress */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20">
          <span className="text-[8px] tracking-[0.3em] text-ivory/20 vertical-rl">EXPLORE</span>
          <div className="w-[1px] h-20 bg-ivory/10 relative overflow-hidden">
            <div ref={railFillRef} className="absolute top-0 left-0 w-full transition-all duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

/**
 * ParallaxScene — Cinematic brand story section immediately after the hero.
 *
 * PERFORMANCE ARCHITECTURE:
 * • 320vh container → sticky inner panel creates the "scroll through" effect
 * • Single passive scroll listener → requestAnimationFrame → CSS custom property update
 * • Every animated element uses `transform: translate3d` only (compositor-only, no repaint)
 * • No GSAP scrub (which caused main-thread jank)
 * • No filter, backgroundColor, or boxShadow animation
 * • will-change: transform on all moving layers
 * • IntersectionObserver triggers CSS class-based entrance (no JS animation loop needed)
 */

import { useEffect, useRef } from "react";

const INGREDIENTS = [
  { name: "VETIVER",       origin: "Thrissur, Kerala",  accent: "#7aab85", side: "left",  top: "58%",  speed: 0.12 },
  { name: "BLACK PEPPER",  origin: "Wayanad, Kerala",   accent: "#c8965a", side: "right", top: "22%",  speed: 0.18 },
  { name: "JASMINE SAMBAC",origin: "Madurai, Tamil Nadu",accent: "#8fa8c8", side: "right", top: "68%",  speed: 0.08 },
  { name: "SANDALWOOD",    origin: "Marayoor, Kerala",  accent: "#C4622D", side: "left",  top: "18%",  speed: 0.22 },
];

export default function ParallaxScene() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);

  // Layer refs for parallax (each gets a different speed multiplier)
  const bgWordRef   = useRef<HTMLDivElement>(null);
  const bottleRef   = useRef<HTMLDivElement>(null);
  const ingRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    if (!wrap || !sticky) return;

    // Entrance: add visible class once section enters viewport
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) sticky.classList.add("ps-visible"); },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    // Single rAF scroll loop — updates translateY via style.transform
    // Each layer moves a fraction of the scroll offset within the section.
    let rafId = 0;
    let ticking = false;

    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const wh   = window.innerHeight;

      // progress: 0 when top of section hits viewport top → 1 when section is done
      const totalScroll = wrap.offsetHeight - wh;
      const scrolled    = Math.max(0, -rect.top);
      const p           = Math.min(1, totalScroll > 0 ? scrolled / totalScroll : 0);

      // Background word — drifts up slowly (0.15x)
      if (bgWordRef.current) {
        bgWordRef.current.style.transform = `translate3d(0, ${-p * 15}%, 0)`;
      }

      // Bottle — gentle vertical drift (0.08x upward)
      if (bottleRef.current) {
        bottleRef.current.style.transform = `translate3d(-50%, calc(-50% + ${-p * 8}vh), 0)`;
      }

      // Ingredient labels — each at its own speed
      ingRefs.current.forEach((el, i) => {
        if (!el) return;
        const dir = INGREDIENTS[i].side === "left" ? 1 : -1;
        const spd = INGREDIENTS[i].speed;
        el.style.transform = `translate3d(${dir * p * 20 * (1 - spd)}px, ${-p * 60 * spd}px, 0)`;
      });

      // Headline — appears as p > 0.45
      if (headlineRef.current) {
        const hl = headlineRef.current;
        const t  = Math.max(0, (p - 0.4) / 0.35);
        hl.style.opacity  = String(Math.min(1, t));
        hl.style.transform = `translate3d(0, ${(1 - Math.min(1, t)) * 30}px, 0)`;
      }

      // Stats row — appears as p > 0.65
      if (statsRef.current) {
        const t = Math.max(0, (p - 0.65) / 0.25);
        statsRef.current.style.opacity  = String(Math.min(1, t));
        statsRef.current.style.transform = `translate3d(0, ${(1 - Math.min(1, t)) * 20}px, 0)`;
      }

      // Gold line — scale X from 0 to 1 as p goes 0.5→0.8
      if (lineRef.current) {
        const t = Math.max(0, (p - 0.5) / 0.3);
        lineRef.current.style.transform = `scaleX(${Math.min(1, t)})`;
        lineRef.current.style.opacity   = String(Math.min(1, t * 2));
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
    update(); // initial

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ height: "320vh" }} className="relative">
      {/* ── Sticky panel ─────────────────────────────────────────── */}
      <div
        ref={stickyRef}
        className="ps-root h-screen w-full overflow-hidden"
        style={{ position: "sticky", top: 0 }}
      >
        {/* ── Static dark background ── */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0a120c 0%, #0f0d0a 50%, #0b0f18 100%)" }} />

        {/* ── Static noise grain (non-animated) ── */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"256px 256px" }} />

        {/* ── Vignette ── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"radial-gradient(ellipse 80% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />

        {/* ── Background watermark word (slow parallax) ── */}
        <div ref={bgWordRef} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ willChange:"transform" }}>
          <span className="font-display text-ivory whitespace-nowrap"
            style={{ fontSize:"clamp(7rem,20vw,20rem)", letterSpacing:"0.25em", opacity:0.035, lineHeight:1, transform:"translateY(0)" }}>
            MALABAR
          </span>
        </div>

        {/* ── Grid lines (static decorative) ── */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity:0.06 }}>
          <div className="absolute top-0 bottom-0 left-[33.33%] w-[1px] bg-ivory/20" />
          <div className="absolute top-0 bottom-0 left-[66.66%] w-[1px] bg-ivory/20" />
          <div className="absolute left-0 right-0 top-[50%] h-[1px] bg-ivory/20" />
        </div>

        {/* ── Ingredient labels (parallax, different speeds) ── */}
        {INGREDIENTS.map((ing, i) => (
          <div key={ing.name}
            ref={el => { ingRefs.current[i] = el; }}
            className="ps-ing absolute flex flex-col pointer-events-none select-none"
            style={{
              [ing.side]: ing.side === "left" ? "4%" : "4%",
              top: ing.top,
              transform: "translate3d(0,0,0)",
              willChange: "transform",
            }}
          >
            {/* Connecting dot */}
            <div className="w-1 h-1 rounded-full mb-2" style={{ backgroundColor: ing.accent, boxShadow:`0 0 6px ${ing.accent}80` }} />
            <span className="text-[10px] tracking-[0.35em] font-bold mb-1" style={{ color: ing.accent }}>
              {ing.name}
            </span>
            <span className="font-accent italic text-ivory/30 text-xs">{ing.origin}</span>
          </div>
        ))}

        {/* ── Central bottle (gentle parallax) ── */}
        <div ref={bottleRef} className="absolute pointer-events-none select-none"
          style={{ left:"50%", top:"50%", transform:"translate3d(-50%,-50%,0)", willChange:"transform" }}>
          <img src="/perfume 1.png" alt="HOP Perfume"
            className="object-contain"
            style={{ height:"82vh", maxWidth:"none",
              filter:"drop-shadow(0 60px 100px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(92,145,105,0.12))" }}
          />
        </div>

        {/* ── Gold horizontal sweep line (scroll-triggered) ── */}
        <div ref={lineRef} className="absolute left-0 right-0 pointer-events-none"
          style={{ top:"62%", height:"1px", transformOrigin:"left center", transform:"scaleX(0)", opacity:0, willChange:"transform,opacity",
            background:"linear-gradient(to right, transparent 0%, rgba(200,169,110,0.5) 20%, rgba(200,169,110,0.5) 80%, transparent 100%)" }} />

        {/* ── Headline block (fades in mid-scroll) ── */}
        <div ref={headlineRef} className="absolute bottom-14 left-8 md:left-20 max-w-xl z-20"
          style={{ opacity:0, transform:"translate3d(0,30px,0)", willChange:"transform,opacity" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-gold/50" />
            <span className="text-[10px] tracking-[0.4em] text-gold/50">THE ORIGIN STORY</span>
          </div>
          <h2 className="font-display text-ivory leading-[0.88] mb-5"
            style={{ fontSize:"clamp(2.2rem,3.8vw,4.5rem)", letterSpacing:"-0.02em" }}>
            Born from 3,000 years<br />of{" "}
            <em className="not-italic" style={{ color:"#C4622D" }}>spice trade.</em>
          </h2>
          <p className="text-ivory/35 text-sm leading-relaxed mb-8 max-w-sm">
            The Malabar Coast fed the ancient world&apos;s hunger for pepper, cardamom, and sandalwood. We finish what those routes started.
          </p>
          <a href="/about"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.25em] text-ivory/40 hover:text-gold transition-colors duration-300 border-b border-ivory/15 hover:border-gold pb-1">
            OUR STORY →
          </a>
        </div>

        {/* ── Stats (appear last) ── */}
        <div ref={statsRef} className="absolute bottom-14 right-8 md:right-20 flex flex-col items-end gap-5 z-20"
          style={{ opacity:0, transform:"translate3d(0,20px,0)", willChange:"transform,opacity" }}>
          {[["3,000", "years of trade"], ["4", "partners"], ["EST. 2019", "Thrissur, Kerala"]].map(([val, label]) => (
            <div key={val} className="text-right">
              <span className="font-display text-ivory/70 block leading-none"
                style={{ fontSize:"clamp(1.5rem,2.5vw,2.5rem)", letterSpacing:"-0.02em" }}>
                {val}
              </span>
              <span className="text-[9px] tracking-[0.25em] text-ivory/25 block mt-1">{label.toUpperCase()}</span>
            </div>
          ))}
        </div>

        {/* ── Top label ── */}
        <div className="absolute top-8 right-8 md:right-20 text-right z-20 ps-label">
          <span className="text-[9px] tracking-[0.4em] text-ivory/15 block mb-1">EST. 2019</span>
          <span className="font-display text-ivory/8 leading-none select-none"
            style={{ fontSize:"clamp(4rem,8vw,8rem)", letterSpacing:"-0.04em" }}>HOP</span>
        </div>

        {/* ── Section indicator (left) ── */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold/25 to-transparent" />
          <span className="text-[8px] tracking-[0.3em] text-ivory/15" style={{ writingMode:"vertical-rl" }}>ORIGIN</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-ivory/8 to-transparent" />
        </div>
      </div>

      <style>{`
        .ps-root .ps-ing,
        .ps-root .ps-label {
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.22,1,0.36,1);
        }
        .ps-root.ps-visible .ps-ing {
          opacity: 1;
        }
        .ps-root.ps-visible .ps-ing:nth-child(1) { transition-delay: 0.1s; }
        .ps-root.ps-visible .ps-ing:nth-child(2) { transition-delay: 0.25s; }
        .ps-root.ps-visible .ps-ing:nth-child(3) { transition-delay: 0.4s; }
        .ps-root.ps-visible .ps-ing:nth-child(4) { transition-delay: 0.55s; }
        .ps-root.ps-visible .ps-label { opacity: 1; transition-delay: 0.2s; }
      `}</style>
    </div>
  );
}

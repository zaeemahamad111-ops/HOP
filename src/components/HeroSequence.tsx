"use client";

/**
 * HeroSequence — Ultrafast Canvas Scrubber.
 * 
 * OPTIMIZATIONS:
 * 1. Image pre-decoding: await img.decode() ensures frames are in GPU memory before starting.
 * 2. Optimized drawing: Only draws when the frame index actually changes.
 * 3. Smooth Lerp: Lerping the scroll position to avoid jumpiness from sparse frames (30 frames).
 * 4. Removed will-change: contents (can sometimes slow down canvas).
 * 5. Minimal DOM updates: Only touches styles when necessary.
 */

import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 77;
const FRAME_PATH = (i: number) => `/frames-77/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

const SCENES = [
  { range: [0.10, 0.40] as [number, number], eyebrow: "SCENT IN MOTION", line1: "Pure Extracts", line2: "Captured in Time.", sub: "The raw beauty of single-origin ingredients, frozen in a moment of olfactory perfection." },
  { range: [0.45, 0.70] as [number, number], eyebrow: "CRAFTED EXCELLENCE", line1: "Where Heritage", line2: "Meets Design.", sub: "Each bottle is a vessel of Malabar history, meticulously crafted for the modern minimalist." },
  { range: [0.75, 1.0] as [number, number], eyebrow: "HEVEN OF PERFUME", line1: "Experience", line2: "True Luxury.", sub: "Join the ritual of India's finest niche fragrance house. Handcrafted in Kerala." },
];

const GOLD = "#C8A96E";

function eio(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c < 0.5 ? 2 * c * c : -1 + (4 - 2 * c) * c;
}

export default function HeroSequence() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loaderBarRef = useRef<HTMLDivElement>(null);
  const loaderTextRef = useRef<HTMLSpanElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const targetPRef = useRef(0);
  const smoothPRef = useRef(0);
  const prevFrameRef = useRef(-1);
  const prevSceneRef = useRef(-1);
  const rafRef = useRef(0);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const preload = async () => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = FRAME_PATH(i + 1);
        images.push(img);
        
        img.onload = async () => {
          try {
            // Decoding JPGs is much faster than PNGs, enabling for mobile too for smoothness.
            await img.decode();
          } catch (e) {}
          
          loaded++;
          const pct = Math.round((loaded / TOTAL_FRAMES) * 100);
          if (loaderBarRef.current) loaderBarRef.current.style.width = `${pct}%`;
          if (loaderTextRef.current) loaderTextRef.current.textContent = `${pct}%`;

          if (loaded === TOTAL_FRAMES) {
            framesRef.current = images;
            if (loaderRef.current) {
              loaderRef.current.style.opacity = "0";
              setTimeout(() => { if (loaderRef.current) loaderRef.current.style.display = "none"; }, 700);
            }
            drawFrame(0);
          }
        };
      }
    };

    preload();

    const drawFrame = (idx: number) => {
      const canvas = canvasRef.current;
      const img = images[idx];
      if (!canvas || !img || !img.complete) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (cw - sw) / 2;
      const sy = (ch - sh) / 2;
      const isMobile = window.innerWidth < 768;
      // Increased mobile offset slightly to ensure the bottle remains the focal point
      const offsetX = isMobile ? (sw - cw) * 0.12 : 0; 
      ctx.drawImage(img, sx + offsetX, sy, sw, sh);
    };

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      // Slower lerp (0.06) creates that "weighty" luxury feel the user wants.
      const diff = targetPRef.current - smoothPRef.current;
      if (Math.abs(diff) > 0.0001) {
        smoothPRef.current += diff * 0.06;
      }
      const p = smoothPRef.current;

      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.round(p * (TOTAL_FRAMES - 1)));
      if (frameIdx !== prevFrameRef.current && framesRef.current.length === TOTAL_FRAMES) {
        prevFrameRef.current = frameIdx;
        drawFrame(frameIdx);
      }

      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
      if (scrollHintRef.current) scrollHintRef.current.style.opacity = String(Math.max(0, 1 - p / 0.05));

      let activeScene = -1;
      SCENES.forEach((scene, i) => {
        const el = sceneRefs.current[i];
        if (!el) return;
        const [lo, hi] = scene.range;
        const FADE = 0.08; // Slightly longer fade for smoother text transitions
        let opacity = 0;
        let ty = 0;
        if (p > lo - FADE && p < hi + FADE) {
          const inT = eio((p - (lo - FADE)) / FADE);
          const outT = eio(Math.max(0, p - hi) / FADE);
          opacity = inT * (1 - outT);
          ty = (1 - inT) * 15 - outT * 10;
        }
        el.style.opacity = String(opacity);
        el.style.transform = `translate3d(0,${ty}px,0)`;
        if (opacity > 0.5) activeScene = i;
      });

      if (activeScene !== prevSceneRef.current) {
        prevSceneRef.current = activeScene;
        dotRefs.current.forEach((dot, di) => {
          if (!dot) return;
          dot.style.width = di === activeScene ? "32px" : "5px";
          dot.style.backgroundColor = di === activeScene ? GOLD : "rgba(245,240,232,0.15)";
        });
        if (counterRef.current && activeScene >= 0) counterRef.current.textContent = `${activeScene + 1} / 3`;
      }

      if (ctaRef.current) {
        const t = Math.max(0, (p - 0.8) / 0.15);
        ctaRef.current.style.opacity = String(Math.min(1, t));
        ctaRef.current.style.transform = `translate3d(-50%, ${(1 - Math.min(1, t)) * 20}px, 0)`;
        ctaRef.current.style.pointerEvents = t > 0.5 ? "auto" : "none";
      }
    };

    const wrap = wrapRef.current;
    if (!wrap) return;

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      targetPRef.current = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      // LIMIT DPR on mobile to 1.0 for maximum performance, desktop 2.
      const isMobile = window.innerWidth < 768;
      const dpr = Math.min(isMobile ? 1.2 : 2, window.devicePixelRatio || 1);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div ref={wrapRef} style={{ height: "500vh" }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#06050a]">
        <canvas ref={canvasRef} className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#06050a]/80 via-transparent to-[#06050a]/80 md:bg-gradient-to-r md:from-[#06050a]/95 md:via-[#06050a]/50 md:to-transparent" />

        {SCENES.map((scene, i) => (
          <div key={i} ref={el => { sceneRefs.current[i] = el; }} className="absolute left-0 top-0 bottom-0 w-full md:w-1/2 flex flex-col justify-start md:justify-center pt-[18vh] md:pt-0 px-8 md:px-24 pointer-events-none" style={{ opacity: 0 }}>
            <span className="block mb-3 uppercase font-medium" style={{ color: GOLD, fontSize: 10, letterSpacing: "0.5em", fontFamily: "var(--font-body)" }}>{scene.eyebrow}</span>
            <h1 className="font-display leading-[1] mb-6 text-ivory" style={{ fontSize: "clamp(2rem, 8vw, 6.5rem)", letterSpacing: "-0.02em" }}>
              <span className="block">{scene.line1}</span>
              <em className="not-italic block" style={{ color: GOLD }}>{scene.line2}</em>
            </h1>
            <p className="font-accent italic leading-relaxed text-ivory/40 max-w-[280px] md:max-w-xl" style={{ fontSize: "clamp(0.85rem, 1.3vw, 1.1rem)" }}>{scene.sub}</p>
          </div>
        ))}

        <div ref={ctaRef} className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 opacity-0 z-30 pointer-events-none">
          <a href="/shop" className="px-8 py-4 text-[10px] tracking-[0.3em] font-bold text-teak transition-transform hover:scale-105 block" style={{ backgroundColor: GOLD, fontFamily: "var(--font-body)" }}>EXPLORE COLLECTION</a>
        </div>

        <div className="absolute left-7 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20">
          <div className="w-[1px] h-20 bg-ivory/10 relative overflow-hidden"><div ref={fillRef} className="absolute top-0 left-0 w-full h-full bg-gold origin-top" style={{ transform: "scaleY(0)" }} /></div>
          <span ref={counterRef} className="text-[8px] tracking-[0.3em] text-ivory/20 vertical-rl">— / 3</span>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {SCENES.map((_, i) => <div key={i} ref={el => { dotRefs.current[i] = el; }} className="h-[1.5px] w-[5px] bg-ivory/10 transition-all duration-500" />)}
        </div>

        <div ref={scrollHintRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-1 z-10 transition-opacity">
          <span className="text-[9px] tracking-[0.4em] text-ivory/20 uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
        </div>

        <div ref={loaderRef} className="absolute inset-0 bg-[#06050a] flex flex-col items-center justify-center z-50 transition-opacity duration-700">
          <span className="font-display text-6xl text-gold mb-8">HOP</span>
          <div className="w-40 h-px bg-ivory/10 relative"><div ref={loaderBarRef} className="absolute top-0 left-0 h-full bg-gold transition-all duration-200" style={{ width: "0%" }} /></div>
          <span ref={loaderTextRef} className="text-[9px] tracking-[0.3em] text-ivory/20 mt-4">0%</span>
        </div>
      </div>
    </div>
  );
}

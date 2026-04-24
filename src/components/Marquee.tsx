"use client";

const items = [
  "Crafted in Thrissur",
  "Kerala Spice Route",
  "Handpicked Botanicals",
  "Small Batch",
  "Malabar Heritage",
  "Cruelty Free",
  "Made in India",
  "Alcohol-Free Options",
];

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-[#0a0805] relative py-5 border-y border-gold/10 group">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0805] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0805] to-transparent z-10 pointer-events-none" />
      <div className="flex whitespace-nowrap" style={{ animation: "marquee 35s linear infinite" }}>
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4 text-[11px] tracking-[0.28em] text-ivory/40 group-hover:[animation-play-state:paused]">
            <span className="w-1 h-1 rounded-full bg-gold/50 shrink-0" />
            {item.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}

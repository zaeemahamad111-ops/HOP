"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    num: "01", title: "Pulse Points",
    desc: "Apply to wrists, inner elbow, base of throat. Never rub — let body warmth carry the scent.",
    detail: "Rubbing breaks top notes early, flattening the scent pyramid.",
  },
  {
    num: "02", title: "The Art of Layering",
    desc: "Start with an attar oil as a base, then mist EDP over it. The oil anchors the scent for 8–12 hours.",
    detail: "HOP's attar line is designed to pair with every EDP in the collection.",
  },
  {
    num: "03", title: "Distance & Presence",
    desc: "Hold the bottle 15cm from skin. Never spray on clothes — the alcohol can stain and alter the profile.",
    detail: "Perfume is a second skin. It should be discovered up close, never announced from across the room.",
  },
];

export default function Ritual() {
  return (
    <section className="bg-[#0a0805] relative overflow-hidden border-t border-ivory/5">

      {/* Decorative bg word */}
      <div className="absolute right-0 bottom-0 pointer-events-none select-none overflow-hidden opacity-[0.02]" aria-hidden>
        <span className="font-display text-ivory whitespace-nowrap" style={{ fontSize: "clamp(6rem, 18vw, 18rem)", letterSpacing: "-0.04em" }}>RITUAL</span>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 md:px-20 py-32 md:py-44 relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* Left — Lady image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <Image
                src="/lady.jpg"
                alt="The art of wearing a scent"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top scale-[1.02] hover:scale-[1.05] transition-transform duration-1000"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0805] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0805]/20 to-transparent" />

              {/* Caption on image */}
              <div className="absolute bottom-8 left-8">
                <span className="text-[9px] tracking-[0.4em] text-gold/70 font-bold uppercase block mb-2">The Art of Wearing</span>
                <p className="font-accent italic text-ivory/60 text-lg leading-snug max-w-[200px]">
                  &quot;A scent is a second skin.&quot;
                </p>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-8 -right-8 bg-[#0a0805] border border-gold/20 p-6 hidden md:block"
            >
              <span className="text-[9px] tracking-[0.3em] text-gold/60 block mb-2 uppercase">Longevity</span>
              <span className="font-display text-ivory text-4xl tracking-tighter">12 hrs</span>
              <span className="text-[9px] tracking-[0.2em] text-ivory/30 block mt-1">average wear time</span>
            </motion.div>
          </motion.div>

          {/* Right — Steps */}
          <div className="flex flex-col gap-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[10px] tracking-[0.45em] text-gold font-bold block mb-2"
            >HOW TO WEAR A SCENT</motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-display text-ivory leading-[0.9] mb-10"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 5.5rem)", letterSpacing: "-0.03em" }}
            >
              Wear it<br /><em className="not-italic text-gold font-accent italic">like memory.</em>
            </motion.h2>

            <div className="flex flex-col gap-0">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="group border-b border-ivory/5 py-8 grid grid-cols-[56px_1fr] gap-6 hover:border-gold/20 transition-all duration-500"
                >
                  <span className="font-display text-4xl text-ivory/10 group-hover:text-gold/30 transition-colors duration-500 leading-none">{s.num}</span>
                  <div>
                    <h3 className="font-display text-ivory text-xl mb-3 group-hover:text-gold transition-colors duration-500">{s.title}</h3>
                    <p className="text-ivory/45 text-sm leading-relaxed mb-4">{s.desc}</p>
                    <p className="text-[11px] text-gold/50 font-accent italic border-l border-gold/20 pl-4 leading-relaxed">{s.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

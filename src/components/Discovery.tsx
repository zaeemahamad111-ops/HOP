"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { X } from "lucide-react";
import Image from "next/image";

const quizSteps = [
  { q: "How do you want to feel?", opts: ["Grounded", "Energized", "Mysterious", "Nostalgic"] },
  { q: "Which season resonates?", opts: ["Monsoon", "Summer", "Winter", "Spring"] },
  { q: "A memory that stays with you.", opts: ["Rain on hot soil", "Spices at dawn", "Ocean at dusk", "Incense in a temple"] },
  { q: "Your preferred base note?", opts: ["Earthy · Woody", "Floral · Green", "Spicy · Resinous", "Musky · Soft"] },
  { q: "Where will you wear this?", opts: ["Daily Ritual", "Special Evening", "Intimate Moment", "Travel"] },
];

export default function Discovery() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const { addItem } = useCartStore();
  const reset = () => { setStep(0); setOpen(false); };

  return (
    <>
      {/* ── Inline CTA Section (home page) ── */}
      <section id="quiz" className="bg-[#0d0b07] border-t border-ivory/5 py-28 px-8 md:px-20 relative overflow-hidden">
        {/* Fabric Texture Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
          <Image src="/yellow-fabric.jpg" alt="Texture" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b07] via-transparent to-[#0d0b07]" />
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">

            <div>
              <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-[10px] tracking-[0.45em] text-gold font-bold block mb-6">FIND YOUR SCENT</motion.span>
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-ivory leading-[0.9] mb-8" style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)", letterSpacing: "-0.03em" }}>
                Not sure where<br /><em className="not-italic text-gold font-accent italic">to start?</em>
              </motion.h2>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="text-ivory/40 text-lg md:text-xl leading-relaxed max-w-sm mb-10 font-light">
                Kerala has a thousand fragrances. Five simple questions. We&apos;ll find yours.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                onClick={() => setOpen(true)}
                className="group relative flex items-center gap-6 bg-gold text-teak px-12 py-6 text-[10px] tracking-[0.4em] font-bold transition-all duration-500 hover:bg-ivory hover:gap-8 active:scale-95 shadow-2xl">
                TAKE THE SCENT QUIZ
                <span className="w-8 h-px bg-teak transition-all duration-500 group-hover:w-12 group-hover:bg-teak/60" />
              </motion.button>
            </div>

            {/* Quiz preview steps - Interactive List */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col">
              {quizSteps.map((s, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.4 }}
                  className="py-6 flex items-center justify-between group cursor-pointer border-b border-ivory/5 last:border-0 relative"
                  onClick={() => setOpen(true)}
                >
                  <div className="flex items-center gap-8 relative z-10">
                    <span className="text-gold/25 font-mono text-xs w-6 transition-colors duration-500 group-hover:text-gold">0{i + 1}</span>
                    <span className="text-ivory/30 text-lg tracking-wide transition-all duration-500 group-hover:text-ivory group-hover:translate-x-2 font-display">{s.q}</span>
                  </div>
                  
                  {/* Interactive Hint */}
                  <div className="relative z-10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <span className="text-[9px] tracking-[0.3em] text-gold font-bold">DISCOVER</span>
                  </div>

                  {/* Animated Background Highlight */}
                  <div className="absolute inset-x-[-20px] inset-y-0 bg-gold/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Quiz Modal ── */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={reset} className="absolute inset-0 bg-[#06050a]/90 backdrop-blur-md" />

            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative z-10 w-full max-w-xl bg-[#0f0d09] border border-gold/15 overflow-hidden shadow-2xl">

              {/* Progress bar */}
              <div className="h-[2px] bg-ivory/5 w-full">
                <div className="h-full bg-gold transition-all duration-500"
                  style={{ width: step < quizSteps.length ? `${(step / quizSteps.length) * 100}%` : "100%" }} />
              </div>

              <div className="p-10 md:p-14">
                <button onClick={reset} className="absolute top-6 right-6 text-ivory/25 hover:text-ivory transition-colors">
                  <X size={18} />
                </button>

                <AnimatePresence mode="wait">
                  {step < quizSteps.length ? (
                    <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                      <span className="text-[9px] tracking-[0.4em] text-gold font-bold block mb-6">STEP 0{step + 1} OF 0{quizSteps.length}</span>
                      <h3 className="font-display text-ivory text-3xl md:text-4xl mb-10 leading-tight">{quizSteps[step].q}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {quizSteps[step].opts.map((opt) => (
                          <button key={opt} onClick={() => step < quizSteps.length - 1 ? setStep(step + 1) : setStep(quizSteps.length)}
                            className="border border-ivory/10 py-4 px-5 text-sm text-left text-ivory/60 hover:border-gold hover:text-gold transition-all duration-200">
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                      <span className="text-[9px] tracking-[0.4em] text-gold font-bold block mb-4">YOUR SIGNATURE SCENT</span>
                      <h3 className="font-display text-ivory text-5xl mb-2 leading-tight">Monsoon<br />Vetiver</h3>
                      <p className="font-accent italic text-ivory/40 text-lg mb-8">Earth after rain — grounded, elemental, alive.</p>
                      <img src="/perfume 1.png" alt="Monsoon Vetiver" className="h-40 object-contain mx-auto mb-8" />
                      <button onClick={() => { addItem({ id: "p1", name: "Monsoon Vetiver", price: 4500, category: "Eau de Parfum", quantity: 1, notesSummary: "Bergamot · Vetiver" }); reset(); }}
                        className="w-full bg-gold text-teak py-4 text-[10px] tracking-[0.3em] font-bold hover:bg-ivory transition-colors duration-300">
                        ADD TO CART — ₹4,500
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

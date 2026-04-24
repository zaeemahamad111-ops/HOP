"use client";

import { motion } from "framer-motion";

const sources = [
  { ingredient:"Vetiver",       location:"Thrissur", coords:"10°31'N 76°13'E", desc:"Hand-harvested roots, slow-distilled over 24 hours. The earthiest note in our palette.", color:"#1d2e21" },
  { ingredient:"Jasmine Sambac",location:"Munnar",   coords:"10°05'N 77°03'E", desc:"Picked at dawn before the sun opens the petals. India's most intoxicating bloom.",        color:"#1a1828" },
  { ingredient:"Black Pepper",  location:"Wayanad",  coords:"11°41'N 76°08'E", desc:"Wild-grown on old-growth vines. Warm, woody, with a dry mineral finish.",                  color:"#261c0e" },
  { ingredient:"Sandalwood",    location:"Marayoor", coords:"10°17'N 77°09'E", desc:"The only government-protected sandalwood forest in South India. Deep, creamy, eternal.",   color:"#312011" },
];

export default function Sources() {
  return (
    <section className="bg-teak text-ivory overflow-hidden relative">
      {/* Static decorative coords — no scroll */}
      <div className="absolute top-1/2 right-[-2%] -translate-y-1/2 pointer-events-none select-none opacity-[0.025]">
        <span className="font-mono text-ivory whitespace-nowrap"
          style={{ fontSize:"clamp(2.5rem,6vw,6rem)" }}>10°31&apos;N 76°13&apos;E</span>
      </div>

      <div className="px-8 md:px-20 pt-24 pb-12 max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <motion.span initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.7}}
            className="text-[10px] tracking-[0.35em] text-gold/50 block mb-4">ORIGIN STORIES</motion.span>
          <h2 className="font-display text-ivory leading-[0.9]"
            style={{ fontSize:"clamp(2.5rem,4.5vw,5rem)", letterSpacing:"-0.02em" }}>
            Where It Comes From
          </h2>
        </div>
        <p className="text-ivory/35 text-sm max-w-xs leading-relaxed">
          Every ingredient is single-origin. We know the farm, the farmer, and the season.
        </p>
      </div>

      <div className="px-8 md:px-20 pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/5">
          {sources.map((s, i) => (
            <motion.div key={s.ingredient}
              initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{duration:0.7,delay:i*0.1}}
              className="group relative overflow-hidden flex flex-col"
              style={{ backgroundColor:s.color }}>
              <span className="absolute top-4 right-6 font-display text-[5rem] text-ivory/[0.04] leading-none select-none pointer-events-none">
                {String(i+1).padStart(2,"0")}
              </span>
              <div className="p-8 md:p-10 flex flex-col gap-6 h-full min-h-[320px] relative z-10">
                <div>
                  <span className="text-[9px] tracking-[0.3em] text-gold/55 block mb-2">INGREDIENT</span>
                  <h3 className="font-display text-3xl md:text-4xl text-ivory leading-tight">{s.ingredient}</h3>
                </div>
                <div className="flex-1" />
                <div className="flex flex-col gap-3">
                  <p className="text-ivory/45 text-sm leading-relaxed">{s.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-ivory/8">
                    <div>
                      <span className="text-[9px] tracking-[0.25em] text-gold/45 block mb-0.5">ORIGIN</span>
                      <span className="text-ivory/65 text-sm">{s.location}, Kerala</span>
                    </div>
                    <span className="font-mono text-[10px] text-ivory/20">{s.coords}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold/0 group-hover:bg-gold/35 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

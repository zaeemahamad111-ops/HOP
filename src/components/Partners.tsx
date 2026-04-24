"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "VOGUE", logo: "VOGUE" },
  { name: "GQ", logo: "GQ" },
  { name: "BAZAAR", logo: "BAZAAR" },
  { name: "ELLE", logo: "ELLE" }
];

export default function Partners() {
  return (
    <section className="bg-[#0a0805] py-20 border-t border-ivory/5">
      <div className="max-w-[1600px] mx-auto px-8 md:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 items-center justify-items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <span className="font-display text-2xl md:text-3xl tracking-[0.3em] text-ivory/50 group-hover:text-gold transition-colors duration-500">
                {p.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

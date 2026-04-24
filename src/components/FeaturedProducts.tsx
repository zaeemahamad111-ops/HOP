"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import Image from "next/image";

export default function FeaturedProducts() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { addItem } = useCartStore();
  const { products, fetchData } = useProductStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Take the first 3 products for the featured section
  const featured = products.slice(0, 3);

  return (
    <section className="bg-[#0a0805] py-32 md:py-44 px-8 md:px-20 border-t border-ivory/5 relative overflow-hidden">
      {/* Fabric Texture Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <Image src="/yellow-fabric.jpg" alt="Texture" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0805] via-transparent to-[#0a0805]" />
      </div>

      {/* Subtle Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02]" aria-hidden>
        <span className="font-display text-ivory whitespace-nowrap" style={{ fontSize: "clamp(10rem, 25vw, 25rem)", letterSpacing: "-0.04em" }}>FINEST</span>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[10px] tracking-[0.45em] text-gold font-bold block mb-5"
            >THE COLLECTION</motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-display text-ivory leading-[0.9]"
              style={{ fontSize: "clamp(2.8rem, 5vw, 6rem)", letterSpacing: "-0.03em" }}
            >
              Begin with<br /><em className="not-italic text-gold font-accent italic">one bottle.</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-ivory/35 text-lg max-w-xs leading-relaxed font-light"
          >
            Each fragrance is a geography lesson — a place, a season, a memory preserved in glass.
          </motion.p>
        </div>

        {/* Staggered Editorial Cards - Responsive Logic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {featured.length === 0 ? (
            <div className="col-span-3 py-20 text-center text-ivory/10 text-[10px] uppercase tracking-widest italic border border-ivory/5">
              Curating the collection...
            </div>
          ) : (
            featured.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ 
                  opacity: 1, 
                  y: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : (i === 0 ? 0 : i === 1 ? 60 : 120)
                }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                className="group relative flex flex-col border border-ivory/[0.06] hover:border-gold/20 transition-all duration-700 cursor-pointer h-fit shadow-[0_0_20px_rgba(200,169,110,0.05)] md:shadow-none"
              >
                {/* Image area */}
                <div className="relative aspect-[3/4] flex items-center justify-center overflow-hidden will-change-transform"
                  style={{ background: `radial-gradient(ellipse at center, ${p.accent || '#c8965a'}12 0%, #0a0805 75%)` }}>

                  {/* Accent glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 65%, ${p.accent || '#c8965a'}20 0%, transparent 70%)` }} />

                  {/* Bottle - Optimized */}
                  <div className="relative h-[72%] w-[70%] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:-translate-y-3 will-change-transform">
                    <Image 
                      src={p.image} 
                      alt={p.name} 
                      fill 
                      className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Number badge */}
                  <span className="absolute top-6 left-6 font-mono text-[10px] tracking-[0.3em] text-ivory/20">0{i + 1}</span>
                </div>

                {/* Info */}
                <div className="p-6 md:p-8 flex flex-col gap-4 border-t border-ivory/5 bg-[#0a0805]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl text-ivory tracking-tight group-hover:text-gold transition-colors duration-500">{p.name}</h3>
                      <span className="text-[9px] tracking-[0.25em] text-ivory/30 mt-1 block uppercase">{p.category} · {p.ml}</span>
                    </div>
                    <span className="font-mono text-sm text-ivory/30 mt-1">₹{p.price.toLocaleString("en-IN")}</span>
                  </div>

                  <p className="font-accent italic text-ivory/40 text-base md:text-lg leading-relaxed">{p.descriptor}</p>

                  {/* Notes row — appears on hover (and always on mobile) */}
                  <div className={`flex gap-4 transition-all duration-500 overflow-hidden ${hovered === p.id || (typeof window !== 'undefined' && window.innerWidth < 768) ? "max-h-12 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                    {Object.values(p.notes).map((n, ni) => (
                      <span key={ni} className="text-[9px] tracking-[0.2em] text-gold/70 uppercase">{n}</span>
                    ))}
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem({ id: p.id, name: p.name, price: p.price, category: p.category, quantity: 1, image: p.image, notesSummary: Object.values(p.notes).join(" · ") });
                    }}
                    className="mt-6 w-full py-5 text-[10px] tracking-[0.35em] font-bold text-[#0a0805] bg-gold hover:bg-ivory transition-all duration-500"
                  >
                    ADD TO CART
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Show More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="flex justify-center mt-32"
        >
          <Link href="/shop"
            className="group flex items-center gap-4 border border-ivory/15 hover:border-gold text-ivory/50 hover:text-gold px-12 py-5 text-[10px] tracking-[0.4em] font-bold transition-all duration-500">
            EXPLORE FULL COLLECTION
            <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-500" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

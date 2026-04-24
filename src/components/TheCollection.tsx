"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import Image from "next/image";

const tabs = ["All","Eau de Parfum","Attars","Discovery Sets"];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    gsap.to(el, { rotateY:x*10, rotateX:-y*8, transformPerspective:900, duration:0.35, ease:"power2.out", overwrite:"auto" });
  }, []);
  const handleLeave = useCallback(() => {
    const el = ref.current; if (!el) return;
    gsap.to(el, { rotateX:0, rotateY:0, duration:0.8, ease:"elastic.out(1,0.65)", overwrite:"auto" });
  }, []);

  return (
    <div ref={ref} className={className} style={{ transformStyle:"preserve-3d", willChange:"transform" }}
      onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}

export default function TheCollection() {
  const [activeTab, setActiveTab] = useState("All");
  const [hoveredId, setHoveredId] = useState<string|null>(null);
  const { addItem } = useCartStore();
  const { products, fetchData } = useProductStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = activeTab === "All" ? products : products.filter(p => p.category === activeTab);

  return (
    <section className="bg-ivory text-teak py-24 md:py-36 relative overflow-hidden">
      {/* Fabric Texture Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <Image src="/yellow-fabric.jpg" alt="Texture" fill className="object-cover" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage:"radial-gradient(circle at 85% 25%, rgba(212,197,176,0.45) 0%, transparent 45%), radial-gradient(circle at 15% 80%, rgba(196,98,45,0.05) 0%, transparent 45%)" }} />

      <div className="max-w-[1600px] mx-auto px-8 md:px-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.span initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}
              className="text-[10px] tracking-[0.35em] text-teak/35 block mb-4">OUR FRAGRANCES</motion.span>
            <h2 className="font-display text-teak leading-[0.9] overflow-hidden">
              {["The","Collection"].map((word, wi) => (
                <span key={wi} className="inline-block overflow-hidden" style={{ marginRight:"0.2em" }}>
                  <motion.span className="inline-block" initial={{y:"110%"}} whileInView={{y:"0%"}} viewport={{once:true}}
                    transition={{duration:0.75,delay:wi*0.1,ease:[0.22,1,0.36,1]}}
                    style={{fontSize:"clamp(3rem,5vw,6rem)",letterSpacing:"-0.02em"}}>
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>
          <div className="flex gap-1 bg-teak/5 p-1 rounded-full self-start md:self-end">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-[10px] tracking-[0.15em] transition-all duration-300 ${activeTab===tab?"bg-teak text-ivory":"text-teak/45 hover:text-teak"}`}>
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, index) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ 
                  opacity: 1, 
                  y: 0
                }} 
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-fit"
              >
                <div className="bg-ivory group relative flex flex-col overflow-hidden cursor-pointer h-full border border-teak/5 hover:border-gold/30 transition-colors duration-500 shadow-sm hover:shadow-2xl">
                  <div className="relative overflow-hidden flex items-center justify-center aspect-[3/4]"
                    style={{ backgroundColor: "#f0ece4" }}
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}>
                    <img src={product.image} alt={product.name}
                      className="h-[72%] object-contain transition-transform duration-700 ease-out group-hover:scale-105" />
                    
                    <div className="absolute top-5 left-5 px-3 py-1 text-[9px] tracking-[0.25em] font-bold border backdrop-blur-sm border-gold/30 text-gold bg-gold/10">
                      {product.categoryShort}
                    </div>
                    <div className="absolute top-5 right-5 text-[9px] tracking-[0.15em] text-teak/40 bg-ivory/70 backdrop-blur-sm px-2 py-1">
                      {product.ml}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 ease-out z-10 translate-y-0">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        addItem({id:product.id,name:product.name,price:product.price,category:product.category,quantity:1,image:product.image,notesSummary:`${product.notes.top} · ${product.notes.base}`});
                      }}
                        className="w-full py-4 text-[11px] tracking-[0.3em] font-bold text-[#0a0805] bg-gold">
                        ADD TO RITUAL
                      </button>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col gap-3 border-t border-teak/6 bg-ivory relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gold" />
                    <div className="flex justify-between items-start pl-2">
                      <h3 className="font-display text-xl md:text-2xl leading-tight group-hover:text-ghats transition-colors duration-400">{product.name}</h3>
                      <span className="font-mono text-sm text-teak/45 shrink-0 ml-2">₹{product.price.toLocaleString("en-IN")}</span>
                    </div>
                    <p className="font-accent italic text-teak/45 text-sm md:text-base pl-2">{product.descriptor}</p>
                    <div className={`grid grid-cols-3 gap-2 pt-4 border-t border-teak/6 overflow-hidden transition-all duration-400 pl-2 ${hoveredId===product.id ? "max-h-24 opacity-100":"max-h-0 opacity-0"}`}>
                      {Object.entries(product.notes).map(([tier,name]) => (
                        <div key={tier} className="flex flex-col">
                          <span className="text-[8px] tracking-[0.3em] text-teak/25 mb-0.5 uppercase">{tier}</span>
                          <span className="text-[10px] md:text-xs font-display text-teak/65">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

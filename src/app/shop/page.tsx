"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import Navigation from "@/components/Navigation";
import Image from "next/image";

const tabs = ["All", "Eau de Parfum", "Attars", "Discovery Sets", "Gift Sets"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];

const GOLD = "#C8A96E";

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { addItem } = useCartStore();
  const { products, fetchData } = useProductStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let filtered = activeTab === "All" ? products : products.filter(p => p.category === activeTab);
  if (sort === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <main className="min-h-screen bg-[#0a0805] text-ivory relative overflow-hidden">
      {/* Fabric Texture Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-5">
        <Image src="/yellow-fabric.jpg" alt="Texture" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0a0805]/40" />
      </div>

      <Navigation />

      {/* Hero Header */}
      <div className="relative pt-48 pb-20 px-8 md:px-20 overflow-hidden border-b border-ivory/5">
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-[1600px] mx-auto relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.45em] text-gold block mb-6 font-bold"
          >
            THE COLLECTION
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display leading-[0.9] mb-8" 
            style={{ fontSize: "clamp(3.5rem, 8vw, 9rem)", letterSpacing: "-0.03em" }}
          >
            Crafted for <br />
            <em className="not-italic text-gold">the curious.</em>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-ivory/40 text-xl max-w-lg font-accent italic leading-relaxed"
          >
            A sensory archive of the Malabar coast, distilled into high-concentration fragrances that tell the story of the soil.
          </motion.p>
        </div>
      </div>

      {/* Filter Bar - Sticky */}
      <div className="sticky top-[72px] z-40 bg-[#0a0805]/80 backdrop-blur-xl border-b border-ivory/5 px-8 md:px-20 py-5">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {tabs.map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-[10px] tracking-[0.25em] font-bold transition-all duration-500 whitespace-nowrap border ${
                    activeTab === tab 
                    ? "bg-gold border-gold text-teak" 
                    : "border-ivory/10 text-ivory/40 hover:border-gold/30 hover:text-gold"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 self-end md:self-auto">
             <span className="text-[9px] tracking-[0.3em] text-ivory/30 uppercase hidden md:block">Sort By</span>
             <select 
                value={sort} 
                onChange={e => setSort(e.target.value)}
                className="bg-transparent border-b border-ivory/10 text-ivory/70 text-[11px] tracking-[0.15em] px-2 py-1 outline-none focus:border-gold cursor-pointer transition-colors"
             >
                {sortOptions.map(o => <option key={o} className="bg-teak text-ivory">{o}</option>)}
             </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1600px] mx-auto px-8 md:px-20 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div 
                key={product.id} 
                layout 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-ivory/[0.02] rounded-sm overflow-hidden flex items-center justify-center border border-ivory/[0.05] transition-all duration-700 group-hover:border-gold/20">
                  
                  {/* Subtle Background Accent */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 70%, ${(product.accent || '#C8A96E')}15 0%, transparent 80%)` }} 
                  />

                  {/* Product Image */}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-[75%] object-contain transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:-translate-y-4" 
                  />

                  {/* Overlays */}
                  <div className="absolute top-6 left-6 px-3 py-1 text-[9px] tracking-[0.25em] font-bold border rounded-full backdrop-blur-sm"
                    style={{ color: (product.accent || '#C8A96E'), borderColor: `${(product.accent || '#C8A96E')}40`, backgroundColor: `${(product.accent || '#C8A96E')}10` }}>
                    {product.categoryShort}
                  </div>
                  
                  <div className="absolute top-6 right-6 text-[9px] tracking-[0.2em] text-ivory/40">
                    {product.ml}
                  </div>

                  {/* Quick Add Button — Always visible on mobile, hover reveal on desktop */}
                  <div className="absolute inset-x-0 bottom-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-10">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem({ 
                          id: product.id, 
                          name: product.name, 
                          price: product.price, 
                          category: product.category, 
                          quantity: 1, 
                          image: product.image,
                          notesSummary: `${product.notes.top} · ${product.notes.base}` 
                        });
                      }}
                      className="w-full py-4 md:py-5 text-[10px] md:text-[11px] tracking-[0.4em] font-bold text-teak"
                      style={{ backgroundColor: GOLD }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>

                {/* Info Area */}
                <div className="pt-6 flex flex-col gap-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-display text-2xl tracking-tight text-ivory group-hover:text-gold transition-colors duration-500">
                        {product.name}
                    </h3>
                    <span className="font-mono text-sm text-ivory/30">₹{product.price.toLocaleString("en-IN")}</span>
                  </div>
                  
                  <p className="font-accent italic text-ivory/40 text-lg">{product.descriptor}</p>

                  {/* Notes Reveal */}
                  <div className={`grid grid-cols-3 gap-4 pt-4 border-t border-ivory/5 transition-all duration-500 overflow-hidden ${hoveredId === product.id ? "max-h-20 opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-4"}`}>
                    {Object.entries(product.notes).map(([tier, name]) => (
                      <div key={tier} className="flex flex-col">
                        <span className="text-[8px] tracking-[0.3em] text-gold/60 mb-1 font-bold uppercase">{tier}</span>
                        <span className="text-xs font-display text-ivory/80">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

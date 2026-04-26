"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProductStore } from "@/store/productStore";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const tabs = ["All", "Eau de Parfum", "Attars", "Discovery Sets", "Gift Sets"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];

const GOLD = "#C8A96E";

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [sort, setSort] = useState("Featured");
  const { products, fetchData, isLoading } = useProductStore();

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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[60px] will-change-[filter]" />
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
      <div className="max-w-[1600px] mx-auto px-8 md:px-20 py-20 min-h-[40vh]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-4" />
            <p className="text-[10px] tracking-[0.3em] text-ivory/30 uppercase">Consulting the archive...</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-40 border border-ivory/5 rounded-sm bg-ivory/[0.01]"
          >
            <span className="text-gold text-2xl mb-4">✦</span>
            <p className="font-accent italic text-ivory/40 text-lg">Our olfactory archive is currently being updated.</p>
            <p className="text-[10px] tracking-[0.3em] text-ivory/20 uppercase mt-2">Please check back shortly</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  );
}

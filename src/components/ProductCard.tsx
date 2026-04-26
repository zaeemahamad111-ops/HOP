"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: any;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCartStore();
  
  const GOLD = product.accent || "#C8A96E";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/shop/${product.handle}`} className="cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-[4/5] bg-ivory/[0.02] rounded-sm overflow-hidden flex items-center justify-center border border-ivory/[0.05] transition-all duration-700 group-hover:border-gold/20 will-change-transform">
          
          {/* Subtle Background Accent */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 70%, ${GOLD}15 0%, transparent 80%)` }} 
          />

          {/* Product Image */}
          <div className="relative h-[75%] w-[80%] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:-translate-y-4 will-change-transform">
            {product.image && (
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            )}
          </div>

          {/* Overlays */}
          <div className="absolute top-6 left-6 px-3 py-1 text-[9px] tracking-[0.25em] font-bold border rounded-full backdrop-blur-sm"
            style={{ color: GOLD, borderColor: `${GOLD}40`, backgroundColor: `${GOLD}10` }}>
            {product.categoryShort || (product.category === 'Attars' ? 'Attar' : 'EDP')}
          </div>
          
          <div className="absolute top-6 right-6 text-[9px] tracking-[0.2em] text-ivory/40">
            {product.ml}
          </div>

          {/* Quick Add Button */}
          <div className="absolute inset-x-0 bottom-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-10">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem({ 
                  id: product.id, 
                  name: product.name, 
                  price: product.price, 
                  category: product.category, 
                  quantity: 1, 
                  image: product.image,
                  variantId: product.variantId,
                  notesSummary: `${product.notes.top} · ${product.notes.base}` 
                });
              }}
              className="w-full py-4 md:py-5 text-[10px] md:text-[11px] tracking-[0.4em] font-bold text-teak"
              style={{ backgroundColor: "#C8A96E" }}
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
          <div className={`grid grid-cols-3 gap-4 pt-4 border-t border-ivory/5 transition-all duration-500 overflow-hidden ${hovered ? "max-h-20 opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-4"}`}>
            {Object.entries(product.notes).map(([tier, name]) => (
              <div key={tier} className="flex flex-col">
                <span className="text-[8px] tracking-[0.3em] text-gold/60 mb-1 font-bold uppercase">{tier}</span>
                <span className="text-xs font-display text-ivory/80 capitalize">{name as string}</span>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

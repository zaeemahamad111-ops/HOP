"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import Link from "next/link";

const imageMap: Record<string, string> = {
  "Monsoon Vetiver": "/perfume 1.png",
  "Spice Market": "/perfume 2.png",
  "Coastal Jasmine": "/perfume 3.png",
  "Temple Oud": "/perfume 4.png",
  "Vetiver Attar": "/perfume 5.png",
  "Discovery Set": "/perfume 6.png"
};

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeItem, getCartTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = getCartTotal();
  const threshold = 9999; // Updated threshold for luxury prices
  const progress = Math.min((total / threshold) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-[#0a0805] shadow-2xl z-[60] flex flex-col border-l border-gold/10 text-ivory"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-ivory/10">
              <h2 className="text-2xl font-display text-gold tracking-wide">Your Ritual</h2>
              <button onClick={() => setIsOpen(false)} className="text-ivory/40 hover:text-gold transition-colors">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="p-6 pb-0">
              <p className="text-sm font-accent italic mb-2 text-ivory/60">
                {total >= threshold 
                  ? "You have unlocked complimentary shipping." 
                  : `Add ₹${(threshold - total).toLocaleString('en-IN')} more for complimentary shipping.`}
              </p>
              <div className="h-1 w-full bg-ivory/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gold transition-all duration-500 ease-out"
                  style={{ width: `${progress}%`, boxShadow: "0 0 10px rgba(200, 169, 110, 0.5)" }}
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-ivory/40 space-y-4">
                  <p className="font-accent italic text-lg">Your ritual is yet to begin.</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="border-b border-gold/50 pb-1 text-sm tracking-widest uppercase text-ivory/80 hover:text-gold hover:border-gold transition-colors"
                  >
                    Discover Fragrances
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const itemImg = item.image || imageMap[item.name] || "/perfume 1.png";
                  return (
                    <div key={item.id} className="flex space-x-4 group">
                      <div className="w-24 h-28 bg-[#12100d] border border-ivory/5 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <img src={itemImg} alt={item.name} className="h-[80%] object-contain drop-shadow-xl z-10" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-display text-lg text-ivory/90">{item.name}</h3>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-ivory/30 hover:text-gold text-[10px] uppercase tracking-widest transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="text-[10px] text-gold/60 uppercase tracking-widest mt-1">
                            {item.category}
                          </p>
                          {item.notesSummary && (
                            <p className="text-sm font-accent italic text-ivory/40 mt-2">
                              {item.notesSummary}
                            </p>
                          )}
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-ivory/15 rounded-sm px-2 py-1 bg-black/20">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-ivory/50 hover:text-gold transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm w-8 text-center text-ivory/80">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-ivory/50 hover:text-gold transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-mono text-sm text-gold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-[#0a0805] border-t border-ivory/10 space-y-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-display text-ivory/80 tracking-wide">Total</span>
                  <span className="font-mono text-gold text-xl">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <Link href="/checkout" onClick={() => setIsOpen(false)} className="block w-full bg-gold text-[#0a0805] py-4 text-center text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-ivory transition-colors duration-300">
                  Proceed to Checkout
                </Link>
                <p className="text-center text-[10px] text-ivory/40 tracking-widest uppercase">Shipping & taxes calculated at checkout</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

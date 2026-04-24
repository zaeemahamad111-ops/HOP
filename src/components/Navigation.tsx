"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, ShoppingCart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { setIsOpen, items } = useCartStore();
  const itemCount = items.reduce((t, i) => t + i.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled ? "bg-[#06050a]/85 backdrop-blur-2xl border-b border-ivory/5 h-[76px]" : "bg-transparent h-[100px]"
      }`}>
        <div className="h-full px-6 md:px-16 flex items-center justify-between max-w-[1800px] mx-auto">
          {/* Logo - Always Left */}
          <Link href="/" className="flex items-center order-1">
            <Image 
              src="/hop-logo.png" 
              alt="HOP" 
              width={140} 
              height={70} 
              className="w-[100px] md:w-[180px] object-contain brightness-[1.1]" 
              priority 
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 order-2">
            {[["Shop","/shop"],["Stories","/stories"],["About","/about"]].map(([label, href]) => (
              <Link key={label} href={href}
                className="text-[10px] tracking-[0.35em] font-bold text-ivory/80 hover:text-gold transition-all duration-400 uppercase relative group">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-400 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-7 text-ivory/80 order-3">
            <button className="hover:text-gold transition-all duration-300" aria-label="Search">
              <Search size={17} strokeWidth={1.5} />
            </button>
            <button className="relative hover:text-gold transition-all duration-300" aria-label="Cart" onClick={() => setIsOpen(true)}>
              <ShoppingCart size={17} strokeWidth={1.5} />
              {mounted && itemCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-2 bg-gold text-teak text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {itemCount}
                </motion.span>
              )}
            </button>
            <button className="md:hidden hover:text-gold transition-all duration-300" onClick={() => setMobileMenuOpen(true)} aria-label="Menu">
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#06050a] flex flex-col items-center justify-center">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8 text-ivory/40 hover:text-gold transition-colors">
              <X size={28} strokeWidth={1} />
            </button>
            <Image src="/hop-logo.png" alt="HOP" width={220} height={110} className="object-contain mb-16 opacity-80" />
            <div className="flex flex-col items-center space-y-8">
              {[["Shop","/shop"],["Stories","/stories"],["About","/about"]].map(([label, href], i) => (
                <motion.div key={label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }}>
                  <Link href={href} onClick={() => setMobileMenuOpen(false)} className="font-display text-4xl text-ivory hover:text-gold transition-colors">
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="absolute bottom-16 flex gap-10 text-gold/50 text-[9px] tracking-[0.4em] font-bold">
              <span>INSTAGRAM</span><span>TWITTER</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

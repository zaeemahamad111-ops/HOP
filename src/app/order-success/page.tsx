"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navigation from "@/components/Navigation";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") || "";

  return (
    <main className="min-h-screen bg-[#0a0805] text-ivory flex flex-col">
      <Navigation />

      <div className="flex-1 flex flex-col items-center justify-center px-8 py-32 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center max-w-xl"
        >
          {/* Checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center mb-10"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <motion.path
                d="M6 16L13 23L26 9"
                stroke="#C8A96E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          <span className="text-[10px] tracking-[0.5em] text-gold font-bold block mb-4">
            ORDER CONFIRMED
          </span>

          <h1 className="font-display text-5xl md:text-7xl tracking-tight text-ivory mb-4">
            Thank you.
          </h1>

          <p className="font-accent italic text-ivory/40 text-xl leading-relaxed mb-10">
            Your fragrance is being prepared with care. <br />
            A confirmation has been sent to your email.
          </p>

          {orderId && (
            <div className="border border-ivory/5 px-8 py-4 mb-10 text-center">
              <span className="text-[9px] tracking-[0.3em] text-ivory/30 block mb-1">ORDER REFERENCE</span>
              <span className="font-mono text-gold text-sm">{orderId}</span>
            </div>
          )}

          {/* Divider */}
          <div className="w-px h-12 bg-gold/20 mb-10" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              href="/shop"
              className="px-10 py-4 bg-gold text-teak text-[10px] tracking-[0.35em] font-bold hover:bg-ivory transition-all duration-500"
            >
              CONTINUE SHOPPING
            </Link>
            <Link
              href="/"
              className="px-10 py-4 border border-ivory/10 text-ivory/50 text-[10px] tracking-[0.35em] font-bold hover:border-gold hover:text-gold transition-all duration-500"
            >
              BACK TO HOME
            </Link>
          </div>

          {/* Ritual note */}
          <p className="text-[9px] tracking-[0.2em] text-ivory/20 uppercase mt-16">
            Handcrafted in Kerala · Ships within 3–5 business days
          </p>
        </motion.div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0805]" />}>
      <OrderSuccessContent />
    </Suspense>
  );
}

"use client";

import Navigation from "@/components/Navigation";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const { addOrder } = useProductStore();
  const [mounted, setMounted] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getCartTotal();
  const shipping = subtotal >= 9999 ? 0 : 500;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      client: `${firstName} ${lastName}` || "Guest User",
      email: email || "guest@example.com",
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: total,
      status: 'Processing' as const,
      method: 'Prepaid' as const
    };

    addOrder(newOrder);
    clearCart();
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <main className="min-h-screen bg-[#0a0805] text-ivory flex flex-col items-center justify-center p-6 text-center">
        <Navigation />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md space-y-8">
          <div className="flex justify-center">
            <CheckCircle2 size={80} className="text-gold" strokeWidth={1} />
          </div>
          <h1 className="font-display text-4xl text-gold uppercase tracking-widest">Order Received</h1>
          <p className="text-ivory/40 font-accent italic text-lg leading-relaxed">
            Your ritual is being prepared. A confirmation of your journey has been sent to your email.
          </p>
          <div className="pt-8 space-y-4">
            <Link href="/shop" className="block w-full bg-gold text-[#0a0805] py-5 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-ivory transition-all">
              Return to Collection
            </Link>
            <p className="text-[10px] tracking-[0.2em] text-ivory/20 uppercase">Order ID: #{Math.floor(Math.random() * 1000000)}</p>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0805] text-ivory flex flex-col font-sans selection:bg-gold/30">
      <Navigation />
      
      <div className="flex-1 pt-32 pb-32 px-8 md:px-20 max-w-[1400px] mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-ivory/40 uppercase mb-12">
          <Link href="/shop" className="hover:text-gold transition-colors">Cart</Link>
          <ChevronRight size={12} />
          <span className="text-gold">Information</span>
          <ChevronRight size={12} />
          <span>Shipping</span>
          <ChevronRight size={12} />
          <span>Payment</span>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_500px] gap-16 lg:gap-32">
          
          {/* Left Column - Forms */}
          <div className="space-y-12">
            <h1 className="font-display text-4xl text-ivory tracking-wide mb-8">Checkout</h1>
            
            <section className="space-y-6">
              <h2 className="text-sm tracking-[0.2em] text-gold uppercase border-b border-ivory/10 pb-4">Contact Information</h2>
              <div className="space-y-4">
                <input 
                  required type="email" placeholder="Email Address" 
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory placeholder:text-ivory/30 focus:border-gold outline-none transition-colors" 
                />
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="news" className="accent-gold bg-transparent border-ivory/20" />
                  <label htmlFor="news" className="text-xs text-ivory/50">Email me with news and offers</label>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-sm tracking-[0.2em] text-gold uppercase border-b border-ivory/10 pb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory focus:border-gold outline-none transition-colors" />
                <input required type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory focus:border-gold outline-none transition-colors" />
                <input required type="text" placeholder="Address" className="col-span-2 w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory focus:border-gold outline-none transition-colors" />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="col-span-2 w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory focus:border-gold outline-none transition-colors" />
                <input required type="text" placeholder="City" className="w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory focus:border-gold outline-none transition-colors" />
                <input required type="text" placeholder="Postal Code" className="w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory focus:border-gold outline-none transition-colors" />
                <input required type="text" placeholder="Phone" className="col-span-2 w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory focus:border-gold outline-none transition-colors" />
              </div>
            </section>

            <button type="submit" className="w-full bg-gold text-[#0a0805] py-5 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-ivory transition-colors duration-300 mt-8">
              Complete Order
            </button>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-[#12100d] border border-ivory/5 p-8 h-fit sticky top-32">
            <h2 className="font-display text-2xl text-ivory mb-8">Order Summary</h2>
            
            <div className="space-y-6 mb-8 border-b border-ivory/10 pb-8">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-20 bg-black/40 border border-ivory/5 flex items-center justify-center rounded-sm">
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-gold text-[#0a0805] text-[10px] rounded-full flex items-center justify-center font-bold z-20">
                      {item.quantity}
                    </div>
                    <img src={item.image || "/perfume 1.png"} alt={item.name} className="h-[80%] object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-display">{item.name}</h3>
                    <p className="text-[10px] text-gold/60 uppercase tracking-widest mt-1">{item.category}</p>
                  </div>
                  <div className="font-mono text-sm text-ivory/80">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
              
              {items.length === 0 && (
                <div className="text-ivory/40 text-sm font-light italic">Your cart is empty.</div>
              )}
            </div>

            <div className="space-y-4 text-sm text-ivory/60 mb-8 border-b border-ivory/10 pb-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-ivory">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-ivory">{shipping === 0 ? "Complimentary" : `₹${shipping.toLocaleString('en-IN')}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <span className="text-lg text-ivory font-display">Total</span>
              <span className="font-mono text-2xl text-gold">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

        </form>
      </div>
    </main>
  );
}

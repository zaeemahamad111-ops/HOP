import Navigation from "@/components/Navigation";
import Link from "next/link";
import HeroSequence from "@/components/HeroSequence";
import FeaturedProducts from "@/components/FeaturedProducts";
import Marquee from "@/components/Marquee";
import Philosophy from "@/components/Philosophy";
import Ritual from "@/components/Ritual";
import Discovery from "@/components/Discovery";
import StoriesPreview from "@/components/StoriesPreview";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOP | Kerala's Finest Niche Fragrance House — Luxury Perfumes",
  description: "Experience the essence of Kerala with HOP. Luxury fragrances born from Malabar heritage. Handcrafted in Thrissur, Kerala. Single-origin, small-batch, artisanal perfumes.",
  keywords: ["Kerala Perfume", "Luxury Fragrance India", "Niche Perfumery", "Malabar Spices", "Thrissur Handcrafted", "Artisanal Scent", "Indian Oud", "Sandalwood Perfume"],
  openGraph: {
    title: "HOP | Kerala's Finest Niche Fragrance House",
    description: "Luxury fragrances born from Malabar heritage.",
    images: ['/hop-logo.png'],
  }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06050a] text-ivory relative">
      <Navigation />
      <HeroSequence />
      <FeaturedProducts />
      <Marquee />
      <Philosophy />
      <Ritual />
      <Discovery />
      <StoriesPreview />

      {/* ── Footer ── */}
      <footer className="bg-[#06050a] text-ivory border-t border-ivory/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-20">

          {/* Quiz strip */}
          <div className="py-10 border-b border-ivory/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <span className="text-xl">✦</span>
              <div>
                <p className="text-ivory/70 text-sm font-display">Not sure which scent is yours?</p>
                <p className="text-ivory/30 text-xs tracking-wide mt-0.5">Take our 5-question Scent Quiz for a personal recommendation.</p>
              </div>
            </div>
            <a href="#quiz" className="shrink-0 border border-gold/30 text-gold hover:bg-gold hover:text-teak px-8 py-3 text-[10px] tracking-[0.3em] font-bold transition-all duration-300">
              TAKE THE QUIZ →
            </a>
          </div>

          {/* Main footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.5fr] gap-16 py-20 border-b border-ivory/5">
            <div className="flex flex-col gap-6">
              <Link href="/">
                <Image src="/hop-logo.png" alt="HOP" width={240} height={120} style={{ height: 'auto' }} className="object-contain brightness-110" />
              </Link>
              <p className="text-ivory/30 text-sm leading-relaxed max-w-xs mt-2">
                One of the finest perfume brands in India, crafting world-class niche fragrances with the highest quality ingredients.
              </p>
              <div className="flex gap-4 mt-2">
                <a href="#" className="text-ivory/30 hover:text-gold transition-colors p-2 border border-ivory/10 hover:border-gold/30 rounded-full flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="text-ivory/30 hover:text-gold transition-colors p-2 border border-ivory/10 hover:border-gold/30 rounded-full flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="text-ivory/30 hover:text-gold transition-colors p-2 border border-ivory/10 hover:border-gold/30 rounded-full flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.35em] text-gold/60 mb-6 font-bold">SHOP</h4>
              <ul className="space-y-4 text-sm text-ivory/70">
                {["Eau de Parfum", "Attars", "Discovery Sets", "Limited Editions", "Gift Sets"].map(l => (
                  <li key={l}><a href="/shop" className="hover:text-ivory transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.35em] text-gold/60 mb-6 font-bold">EXPLORE</h4>
              <ul className="space-y-4 text-sm text-ivory/70">
                {[["About", "/about"], ["Stories", "/stories"], ["Press", "/press"]].map(([l, h]) => (
                  <li key={l}><a href={h} className="hover:text-ivory transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] tracking-[0.35em] text-gold/60 mb-6 font-bold">NOTES FIRST</h4>
              <p className="text-ivory/30 text-sm mb-6">New launches, stories, and early access — in your inbox.</p>
              <div className="flex border-b border-ivory/15 focus-within:border-gold transition-colors">
                <input type="email" placeholder="your@email.com" className="flex-1 bg-transparent py-3 text-sm text-ivory placeholder:text-ivory/20 outline-none" />
                <button className="text-gold text-xl pb-1 hover:translate-x-1 transition-transform">→</button>
              </div>
            </div>
          </div>

          <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-ivory/20 text-[11px] tracking-[0.2em]">© 2025 HOP · MADE IN INDIA</p>
            <div className="flex gap-6 text-ivory/20 text-[11px] tracking-[0.15em]">
              {[["Privacy Policy", "/privacy"], ["Shipping", "/shipping"], ["Refunds", "/refunds"]].map(([l, h]) => (
                <a key={l} href={h} className="hover:text-ivory/50 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

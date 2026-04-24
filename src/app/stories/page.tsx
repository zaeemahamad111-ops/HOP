import Navigation from "@/components/Navigation";
import Link from "next/link";
import Image from "next/image";

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-[#0a0805] text-ivory flex flex-col relative overflow-hidden">
      {/* Fabric Texture Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-5">
        <Image src="/yellow-fabric.jpg" alt="Texture" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0a0805]/40" />
      </div>

      <Navigation />
      
      <div className="flex-1 pt-48 pb-32 px-8 md:px-20 max-w-[1200px] mx-auto w-full">
        <span className="text-[10px] tracking-[0.45em] text-gold font-bold block mb-6">THE JOURNAL</span>
        <h1 className="font-display text-5xl md:text-7xl mb-16" style={{ letterSpacing: "-0.03em" }}>
          Stories from the Coast
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mock Story 1 */}
          <article className="border border-ivory/10 p-8 hover:border-gold/30 transition-colors bg-[#0a0805]/50">
            <span className="text-[10px] tracking-widest text-gold mb-4 block">INGREDIENTS</span>
            <h2 className="text-3xl font-display mb-4">What Makes Thrissur Vetiver the World's Finest</h2>
            <p className="text-ivory/60 mb-8 font-light leading-relaxed">
              The ancient root that anchors perfumery — and why the red laterite soil of Thrissur produces something no other region can replicate.
            </p>
            <span className="text-[10px] tracking-[0.3em] uppercase border-b border-gold/30 pb-1 text-ivory/80 cursor-pointer hover:text-gold transition-colors">Read Story</span>
          </article>

          {/* Mock Story 2 */}
          <article className="border border-ivory/10 p-8 hover:border-gold/30 transition-colors bg-[#0a0805]/50">
            <span className="text-[10px] tracking-widest text-gold mb-4 block">CULTURE</span>
            <h2 className="text-3xl font-display mb-4">The Malabar Spice Route: A Fragrant History</h2>
            <p className="text-ivory/60 mb-8 font-light leading-relaxed">
              For 3,000 years, this coastline traded pepper, cardamom, and sandalwood. The scent routes that shaped the modern world.
            </p>
            <span className="text-[10px] tracking-[0.3em] uppercase border-b border-gold/30 pb-1 text-ivory/80 cursor-pointer hover:text-gold transition-colors">Read Story</span>
          </article>
        </div>
      </div>
    </main>
  );
}

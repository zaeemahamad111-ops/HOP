import Navigation from "@/components/Navigation";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0805] text-ivory flex flex-col relative overflow-hidden">
      {/* Fabric Texture Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-5">
        <Image src="/yellow-fabric.jpg" alt="Texture" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0a0805]/40" />
      </div>

      <Navigation />
      
      <div className="flex-1 pt-48 pb-32 px-8 md:px-20 max-w-[1200px] mx-auto w-full">
        <span className="text-[10px] tracking-[0.45em] text-gold font-bold block mb-6">EXPLORE</span>
        <h1 className="font-display text-5xl md:text-7xl mb-16" style={{ letterSpacing: "-0.03em" }}>
          About HOP
        </h1>
        
        <div className="prose prose-invert max-w-none text-ivory/70 leading-relaxed space-y-8 font-light">
          <p className="text-xl md:text-2xl text-ivory/90 font-accent italic border-l border-gold/30 pl-6 mb-12">
            "Every bottle holds a place, a memory, a ritual."
          </p>
          
          <h2 className="text-2xl text-ivory font-display mt-12 mb-4">Our Heritage</h2>
          <p>
            HOP was born out of a desire to bridge the rich, historical olfactory heritage of India with modern, minimalist luxury. 
            We are an Indian niche fragrance house dedicated to crafting world-class scents that evoke emotion, place, and memory.
          </p>
          
          <h2 className="text-2xl text-ivory font-display mt-12 mb-4">Our Philosophy</h2>
          <p>
            We believe in 'Excellence' above all else. This means sourcing the highest quality ingredients from the finest farms around the world—from 
            the red laterite soils of Thrissur to the jasmine fields of France and the rugged coastlines of Australia. Our batches are intentionally 
            small, ensuring that quality remains our only metric.
          </p>

          <h2 className="text-2xl text-ivory font-display mt-12 mb-4">The Craft</h2>
          <p>
            Each fragrance is developed by master perfumers blending classical French techniques with a modern aesthetic. Our heavy, hand-finished 
            glass vessels are designed to be beautiful objects in their own right, outlasting the perfume they hold.
          </p>
          
          <div className="mt-16 pt-16 border-t border-ivory/10">
            <Link href="/shop" className="text-gold hover:text-ivory transition-colors text-sm tracking-widest uppercase">
              Explore the Collection →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

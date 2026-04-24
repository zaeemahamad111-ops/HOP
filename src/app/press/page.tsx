import Navigation from "@/components/Navigation";

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[#0a0805] text-ivory flex flex-col">
      <Navigation />
      
      <div className="flex-1 pt-48 pb-32 px-8 md:px-20 max-w-[1200px] mx-auto w-full">
        <span className="text-[10px] tracking-[0.45em] text-gold font-bold block mb-6">EXPLORE</span>
        <h1 className="font-display text-5xl md:text-7xl mb-16" style={{ letterSpacing: "-0.03em" }}>
          Press & Accolades
        </h1>
        
        <div className="space-y-16">
          <div className="border-l border-gold/30 pl-8">
            <h3 className="text-3xl font-display mb-4 text-ivory">"A masterclass in modern Indian luxury."</h3>
            <p className="text-gold tracking-[0.2em] text-[10px] uppercase">— Vogue India</p>
          </div>
          <div className="border-l border-gold/30 pl-8">
            <h3 className="text-3xl font-display mb-4 text-ivory">"Bridging the gap between classical French techniques and raw Indian ingredients."</h3>
            <p className="text-gold tracking-[0.2em] text-[10px] uppercase">— GQ</p>
          </div>
          <div className="border-l border-gold/30 pl-8">
            <h3 className="text-3xl font-display mb-4 text-ivory">"The most exciting new niche house to emerge this year."</h3>
            <p className="text-gold tracking-[0.2em] text-[10px] uppercase">— Fragrantica</p>
          </div>
        </div>
      </div>
    </main>
  );
}

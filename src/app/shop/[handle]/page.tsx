import { shopify } from "@/lib/shopify";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CartButtonPDP from "@/components/CartButtonPDP";

interface Props {
  params: { handle: string };
}

export default async function ProductPage({ params }: Props) {
  const product = await shopify.getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const GOLD = product.accent || "#C8A96E";

  return (
    <main className="min-h-screen bg-[#0a0805] text-ivory selection:bg-gold selection:text-teak">
      {/* Texture Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-5">
        <Image src="/yellow-fabric.jpg" alt="Texture" fill className="object-cover" />
      </div>

      <Navigation />

      <div className="relative pt-32 pb-20 px-8 md:px-20 max-w-[1600px] mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left: Cinematic Image Gallery */}
          <div className="space-y-8">
            <div className="relative aspect-[4/5] bg-ivory/[0.02] rounded-sm overflow-hidden border border-ivory/5 group">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-contain p-12 transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${GOLD}40 0%, transparent 70%)` }}
              />
            </div>
            
            {/* Additional Images Grid */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-square bg-ivory/[0.02] rounded-sm overflow-hidden border border-ivory/5">
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-contain p-4" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col pt-4">
            <div className="mb-12">
               <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] tracking-[0.4em] font-bold text-gold uppercase">{product.category}</span>
                  <div className="h-px w-8 bg-gold/30" />
                  <span className="text-[10px] tracking-[0.2em] text-ivory/40 uppercase">{product.ml}</span>
               </div>
               
               <h1 className="font-display text-6xl md:text-8xl leading-[0.9] mb-6 tracking-tight">
                  {product.name}
               </h1>
               
               <p className="font-accent italic text-2xl text-ivory/60 mb-8 max-w-lg">
                  "{product.descriptor}"
               </p>

               <div className="text-3xl font-mono text-ivory/80 mb-12">
                  ₹{product.price.toLocaleString("en-IN")}
               </div>

               {/* Cart Action */}
               <CartButtonPDP product={product} />
            </div>

            {/* Olfactory Notes Grid */}
            <div className="grid grid-cols-3 gap-8 py-10 border-y border-ivory/5 mb-12">
               {Object.entries(product.notes).map(([tier, value]) => (
                 <div key={tier} className="space-y-3">
                    <span className="block text-[9px] tracking-[0.3em] text-gold font-bold uppercase">{tier} NOTE</span>
                    <span className="block font-display text-xl text-ivory/90 capitalize">{value as string}</span>
                 </div>
               ))}
            </div>

            {/* Editorial Content */}
            <div className="space-y-12">
               <div className="space-y-4">
                  <h4 className="text-[10px] tracking-[0.3em] font-bold text-ivory/30 uppercase">The Scent Story</h4>
                  <div className="prose prose-invert prose-ivory max-w-none">
                     <p className="text-ivory/60 leading-relaxed text-lg font-light">
                        {product.description}
                     </p>
                  </div>
               </div>

               {/* Accordions (Placeholders for now) */}
               <div className="divide-y divide-ivory/5 border-t border-ivory/5">
                  {["Ingredients", "How to Ritual", "Shipping & Returns"].map((item) => (
                    <div key={item} className="py-6 flex justify-between items-center group cursor-pointer hover:px-2 transition-all duration-300">
                       <span className="text-xs tracking-[0.2em] uppercase text-ivory/40 group-hover:text-gold transition-colors">{item}</span>
                       <span className="text-gold opacity-30 group-hover:opacity-100 transition-opacity">＋</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* Suggested Products Section - Quick implementation */}
      <div className="border-t border-ivory/5 mt-20 py-20 px-8 md:px-20 bg-ivory/[0.01]">
         <div className="max-w-[1600px] mx-auto text-center mb-16">
            <span className="text-[10px] tracking-[0.5em] text-gold uppercase font-bold block mb-4">Complete the Archive</span>
            <h2 className="font-display text-4xl md:text-5xl">You might also enjoy</h2>
         </div>
         {/* Simple back button for now */}
         <div className="flex justify-center">
            <Link href="/shop" className="px-10 py-4 border border-gold/30 text-gold text-[10px] tracking-[0.3em] font-bold hover:bg-gold hover:text-teak transition-all">
               BACK TO COLLECTION
            </Link>
         </div>
      </div>
    </main>
  );
}

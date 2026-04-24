import Navigation from "@/components/Navigation";

export default function RefundsPage() {
  return (
    <main className="min-h-screen bg-[#0a0805] text-ivory flex flex-col">
      <Navigation />
      
      <div className="flex-1 pt-48 pb-32 px-8 md:px-20 max-w-[800px] mx-auto w-full">
        <span className="text-[10px] tracking-[0.45em] text-gold font-bold block mb-6">POLICIES</span>
        <h1 className="font-display text-4xl md:text-5xl mb-12" style={{ letterSpacing: "-0.02em" }}>
          Refunds & Returns
        </h1>
        
        <div className="prose prose-invert max-w-none text-ivory/60 leading-relaxed font-light space-y-6">
          <p>
            Due to the intimate and personal nature of fragrance, we are unable to accept returns or offer refunds once a product has been opened or used.
          </p>
          
          <h2 className="text-xl text-ivory font-display mt-10 mb-4">Discovery Sets</h2>
          <p>
            We highly recommend purchasing one of our Discovery Sets before committing to a full-size bottle. This allows you to experience the fragrance on your own skin and understand how it evolves throughout the day.
          </p>
          
          <h2 className="text-xl text-ivory font-display mt-10 mb-4">Damaged Items</h2>
          <p>
            If your order arrives damaged or defective, please contact us within 48 hours of delivery at hello@hopfragrances.com with your order number and photographs of the damage. We will gladly arrange for a replacement.
          </p>

          <h2 className="text-xl text-ivory font-display mt-10 mb-4">Cancellations</h2>
          <p>
            Orders can be cancelled within 12 hours of placement. Once an order has been processed and shipped, it cannot be cancelled.
          </p>
        </div>
      </div>
    </main>
  );
}

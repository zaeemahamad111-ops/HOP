import Navigation from "@/components/Navigation";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#0a0805] text-ivory flex flex-col">
      <Navigation />
      
      <div className="flex-1 pt-48 pb-32 px-8 md:px-20 max-w-[800px] mx-auto w-full">
        <span className="text-[10px] tracking-[0.45em] text-gold font-bold block mb-6">POLICIES</span>
        <h1 className="font-display text-4xl md:text-5xl mb-12" style={{ letterSpacing: "-0.02em" }}>
          Shipping Policy
        </h1>
        
        <div className="prose prose-invert max-w-none text-ivory/60 leading-relaxed font-light space-y-6">
          <p>
            We take pride in our packaging and delivery process. Every bottle is carefully inspected and hand-wrapped before it leaves our facility to ensure it arrives in pristine condition.
          </p>
          
          <h2 className="text-xl text-ivory font-display mt-10 mb-4">Domestic Shipping (India)</h2>
          <p>
            Standard shipping is complimentary on all domestic orders. Orders are typically processed within 1-2 business days. Delivery generally takes 3-5 business days depending on your location.
          </p>
          
          <h2 className="text-xl text-ivory font-display mt-10 mb-4">International Shipping</h2>
          <p>
            We ship globally via premium courier partners. International shipping rates are calculated at checkout based on the destination. Please note that international orders may be subject to local customs duties and taxes, which are the responsibility of the recipient.
          </p>

          <h2 className="text-xl text-ivory font-display mt-10 mb-4">Order Tracking</h2>
          <p>
            Once your order has been dispatched, you will receive an email containing tracking information.
          </p>
        </div>
      </div>
    </main>
  );
}

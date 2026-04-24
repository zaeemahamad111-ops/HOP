import Navigation from "@/components/Navigation";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0805] text-ivory flex flex-col">
      <Navigation />
      
      <div className="flex-1 pt-48 pb-32 px-8 md:px-20 max-w-[800px] mx-auto w-full">
        <span className="text-[10px] tracking-[0.45em] text-gold font-bold block mb-6">POLICIES</span>
        <h1 className="font-display text-4xl md:text-5xl mb-12" style={{ letterSpacing: "-0.02em" }}>
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert max-w-none text-ivory/60 leading-relaxed font-light space-y-6">
          <p>Last updated: October 2023</p>
          <p>
            At HOP, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
          
          <h2 className="text-xl text-ivory font-display mt-10 mb-4">Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes personal data, such as your name, shipping address, email address, and telephone number, and demographic information.
          </p>
          
          <h2 className="text-xl text-ivory font-display mt-10 mb-4">Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to process your orders, send you our newsletter, and improve our services.
          </p>

          <h2 className="text-xl text-ivory font-display mt-10 mb-4">Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at hello@hopfragrances.com.
          </p>
        </div>
      </div>
    </main>
  );
}

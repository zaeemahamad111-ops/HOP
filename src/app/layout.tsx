import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Using Playfair Display as a fallback for Canela since it's a premium font
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-canela",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hop-kerala.com'),
  title: {
    default: "HOP | Kerala's Finest Niche Fragrance House",
    template: "%s | HOP Kerala"
  },
  description: "Experience the essence of Kerala with HOP. Luxury fragrances born from Malabar heritage. Handcrafted in Thrissur, Kerala.",
  keywords: ["luxury perfume India", "Kerala perfume brand", "vetiver perfume India", "premium perfume brand India", "niche fragrance India"],
  authors: [{ name: "HOP Kerala" }],
  creator: "HOP Kerala",
  publisher: "HOP Kerala",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/hop-logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://hop-kerala.com',
    siteName: 'HOP Kerala',
    images: [{
      url: '/hop-logo.png',
      width: 1200,
      height: 630,
      alt: 'HOP Kerala Luxury Perfumes'
    }]
  }
};

import CartDrawer from "@/components/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "HOP | Heaven of Perfume",
              "url": "https://hop-kerala.com",
              "logo": "https://hop-kerala.com/hop-logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-000-000-0000",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": "en"
              },
              "sameAs": [
                "https://instagram.com/hop_kerala",
                "https://twitter.com/hop_kerala"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${cormorant.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased selection:bg-gold selection:text-teak`}
      >
        <SmoothScroll>
          {children}
          <CartDrawer />
        </SmoothScroll>
      </body>
    </html>
  );
}

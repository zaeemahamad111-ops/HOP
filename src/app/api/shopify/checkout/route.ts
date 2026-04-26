import { shopify } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    console.log("[Shopify Checkout] Creating checkout for items:", items);
    
    const res = await shopify.createCheckout(items);
    
    // If shopify.createCheckout returns the raw object instead of just the URL
    // we should handle it. Let's update shopify.ts to return more info.
    return NextResponse.json({ webUrl: res });
  } catch (error: any) {
    console.error("Shopify Checkout Route Error:", error.message);
    return NextResponse.json({ error: error.message || "Failed to create checkout" }, { status: 500 });
  }
}

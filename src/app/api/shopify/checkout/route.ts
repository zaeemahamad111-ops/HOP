import { shopify } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    const webUrl = await shopify.createCheckout(items);
    return NextResponse.json({ webUrl });
  } catch (error) {
    console.error("Shopify Checkout Route Error:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}

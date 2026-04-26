import { shopify } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await shopify.getProducts();
    console.log(`[Shopify API] Successfully fetched ${products.length} products.`);
    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Shopify API Route Error:", error.message);
    return NextResponse.json({ error: error.message || "Failed to fetch products" }, { status: 500 });
  }
}

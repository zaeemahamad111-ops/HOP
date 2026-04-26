import { shopify } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await shopify.getProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Shopify API Route Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

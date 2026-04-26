import { NextResponse } from "next/server";

export async function GET() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  // Test 1: Check env vars exist
  if (!domain || !token) {
    return NextResponse.json({
      status: "❌ FAIL",
      issue: "Environment variables are MISSING in Vercel",
      domain: domain ? "✅ Set" : "❌ NOT SET",
      token: token ? "✅ Set" : "❌ NOT SET",
      fix: "Go to Vercel → Settings → Environment Variables and add SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN, then Redeploy."
    });
  }

  // Test 2: Try hitting Shopify API
  try {
    const url = `https://${domain}/api/2024-01/graphql.json`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({
        query: `{ shop { name } }`
      }),
    });

    const json = await res.json();

    if (json.errors) {
      return NextResponse.json({
        status: "❌ FAIL",
        issue: "Shopify API returned errors",
        domain: domain,
        token: token.substring(0, 6) + "...",
        shopifyErrors: json.errors,
        fix: "Check your Storefront Access Token has the correct permissions in Shopify Admin → Apps → Develop apps."
      });
    }

    // Test 3: Fetch products
    const productsRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({
        query: `{ products(first: 5) { edges { node { id title handle } } } }`
      }),
    });

    const productsJson = await productsRes.json();

    return NextResponse.json({
      status: "✅ SUCCESS",
      shopName: json.data?.shop?.name,
      domain: domain,
      token: token.substring(0, 6) + "...",
      productCount: productsJson.data?.products?.edges?.length ?? 0,
      products: productsJson.data?.products?.edges?.map((e: any) => ({ title: e.node.title, handle: e.node.handle }))
    });

  } catch (err: any) {
    return NextResponse.json({
      status: "❌ FAIL",
      issue: "Network error reaching Shopify",
      error: err.message,
      domain: domain,
      token: token.substring(0, 6) + "..."
    });
  }
}

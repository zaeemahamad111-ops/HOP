/**
 * Shopify Storefront API Client
 */

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const SHOPIFY_GRAPHQL_URL = `https://${domain}/api/2024-01/graphql.json`;

async function shopifyFetch<T>({ query, variables = {} }: { query: string; variables?: any }): Promise<{ data: T; errors?: any }> {
  try {
    const res = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken!,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    const json = await res.json();
    return json;
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    throw error;
  }
}

export const shopify = {
  /**
   * Fetch all products from Shopify
   */
  getProducts: async () => {
    const query = `
      query getProducts {
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              productType
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    sku
                    quantityAvailable
                  }
                }
              }
              # Using Metafields for our custom brand data
              # Namespace: custom
              notes_top: metafield(namespace: "custom", key: "notes_top") { value }
              top_note: metafield(namespace: "custom", key: "top_note") { value }
              
              notes_heart: metafield(namespace: "custom", key: "notes_heart") { value }
              middle_note: metafield(namespace: "custom", key: "middle_note") { value }
              
              notes_base: metafield(namespace: "custom", key: "notes_base") { value }
              base_note: metafield(namespace: "custom", key: "base_note") { value }
              
              accent: metafield(namespace: "custom", key: "accent") { value }
              ml: metafield(namespace: "custom", key: "ml") { value }
              descriptor: metafield(namespace: "custom", key: "descriptor") { value }
            }
          }
        }
      }
    `;

    const response = await shopifyFetch<any>({ query });
    
    if (response.errors) {
      console.error('Shopify GraphQL Errors:', response.errors);
      return [];
    }

    const cleanValue = (val: any) => {
      if (!val) return null;
      // Handle list types which come as '["value"]'
      try {
        const parsed = JSON.parse(val.value);
        return Array.isArray(parsed) ? parsed[0] : parsed;
      } catch {
        return val.value;
      }
    };

    return response.data.products.edges.map(({ node }: any) => ({
      id: node.id,
      handle: node.handle,
      name: node.title,
      category: node.productType || 'Eau de Parfum',
      categoryShort: node.productType === 'Attars' ? 'Attar' : 'EDP',
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      ml: cleanValue(node.ml) || '50ml',
      descriptor: cleanValue(node.descriptor) || node.description.substring(0, 100),
      stock: node.variants.edges[0]?.node.quantityAvailable || 0,
      sku: node.variants.edges[0]?.node.sku || '',
      status: 'Active',
      image: node.images.edges[0]?.node.url || '',
      accent: cleanValue(node.accent) || '#C8A96E',
      variantId: node.variants.edges[0]?.node.id || '',
      notes: {
        top: cleanValue(node.notes_top) || cleanValue(node.top_note) || 'Spices',
        heart: cleanValue(node.notes_heart) || cleanValue(node.middle_note) || 'Floral',
        base: cleanValue(node.notes_base) || cleanValue(node.base_note) || 'Woods'
      }
    }));
  },

  /**
   * Fetch a single product by its handle
   */
  getProductByHandle: async (handle: string) => {
    const query = `
      query getProductByHandle($handle: String!) {
        product(handle: $handle) {
          id
          title
          handle
          description
          productType
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                sku
                quantityAvailable
              }
            }
          }
          notes_top: metafield(namespace: "custom", key: "notes_top") { value }
          top_note: metafield(namespace: "custom", key: "top_note") { value }
          notes_heart: metafield(namespace: "custom", key: "notes_heart") { value }
          middle_note: metafield(namespace: "custom", key: "middle_note") { value }
          notes_base: metafield(namespace: "custom", key: "notes_base") { value }
          base_note: metafield(namespace: "custom", key: "base_note") { value }
          accent: metafield(namespace: "custom", key: "accent") { value }
          ml: metafield(namespace: "custom", key: "ml") { value }
          descriptor: metafield(namespace: "custom", key: "descriptor") { value }
        }
      }
    `;

    const response = await shopifyFetch<any>({ query, variables: { handle } });
    
    if (response.errors || !response.data?.product) {
      console.error('Shopify Product Detail Error:', response.errors);
      return null;
    }

    const node = response.data.product;
    const cleanValue = (val: any) => {
      if (!val) return null;
      try {
        const parsed = JSON.parse(val.value);
        return Array.isArray(parsed) ? parsed[0] : parsed;
      } catch {
        return val.value;
      }
    };

    return {
      id: node.id,
      handle: node.handle,
      name: node.title,
      description: node.description,
      category: node.productType || 'Eau de Parfum',
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      ml: cleanValue(node.ml) || '50ml',
      descriptor: cleanValue(node.descriptor) || '',
      image: node.images.edges[0]?.node.url || '',
      images: node.images.edges.map((e: any) => e.node.url),
      accent: cleanValue(node.accent) || '#C8A96E',
      variantId: node.variants.edges[0]?.node.id || '',
      notes: {
        top: cleanValue(node.notes_top) || cleanValue(node.top_note) || 'Spices',
        heart: cleanValue(node.notes_heart) || cleanValue(node.middle_note) || 'Floral',
        base: cleanValue(node.notes_base) || cleanValue(node.base_note) || 'Woods'
      }
    };
  },

  /**
   * Create a checkout URL using the modern Cart API
   */
  createCheckout: async (items: { variantId: string; quantity: number }[]) => {
    const query = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hop-inky.vercel.app";

    const variables = {
      input: {
        lines: items.map(item => ({
          merchandiseId: item.variantId,
          quantity: item.quantity
        })),
        attributes: [
          {
            key: "_return_url",
            value: `${SITE_URL}/shop`
          }
        ]
      }
    };

    const response = await shopifyFetch<any>({ query, variables });

    if (response.data?.cartCreate?.userErrors?.length > 0) {
      const errorMsg = response.data.cartCreate.userErrors[0].message;
      throw new Error(errorMsg);
    }

    if (!response.data?.cartCreate?.cart?.checkoutUrl) {
      throw new Error("Could not create cart checkout URL.");
    }

    return response.data.cartCreate.cart.checkoutUrl;
  }
};

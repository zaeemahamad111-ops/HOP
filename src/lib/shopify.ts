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

    if (!res.ok) {
      throw new Error(`Shopify API error: ${res.statusText}`);
    }

    return res.json();
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
              notes_heart: metafield(namespace: "custom", key: "notes_heart") { value }
              notes_base: metafield(namespace: "custom", key: "notes_base") { value }
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

    return response.data.products.edges.map(({ node }: any) => ({
      id: node.id,
      name: node.title,
      category: node.productType || 'Eau de Parfum',
      categoryShort: node.productType === 'Attars' ? 'Attar' : 'EDP',
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      ml: node.ml?.value || '50ml',
      descriptor: node.descriptor?.value || node.description.substring(0, 100),
      stock: node.variants.edges[0]?.node.quantityAvailable || 0,
      sku: node.variants.edges[0]?.node.sku || '',
      status: 'Active',
      image: node.images.edges[0]?.node.url || '',
      accent: node.accent?.value || '#C8A96E',
      variantId: node.variants.edges[0]?.node.id || '',
      notes: {
        top: node.notes_top?.value || 'Spices',
        heart: node.notes_heart?.value || 'Floral',
        base: node.notes_base?.value || 'Woods'
      }
    }));
  },

  /**
   * Create a checkout URL for a list of items
   */
  createCheckout: async (items: { variantId: string; quantity: number }[]) => {
    const query = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            webUrl
          }
          checkoutUserErrors {
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        lineItems: items.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity
        }))
      }
    };

    const response = await shopifyFetch<any>({ query, variables });
    return response.data.checkoutCreate.checkout.webUrl;
  }
};

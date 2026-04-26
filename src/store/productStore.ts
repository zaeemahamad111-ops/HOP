import { create } from 'zustand';

export interface Product {
  id: string;
  handle: string; // Shopify URL slug — used for /shop/[handle] routing
  name: string;
  category: string;
  categoryShort: string;
  price: number;
  ml: string;
  descriptor: string;
  stock: number;
  sku: string;
  status: string;
  image: string;
  accent?: string;
  variantId: string; // Required for Shopify checkout
  notes: {
    top: string;
    heart: string;
    base: string;
  };
}


export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  client: string;
  email: string;
  items: OrderItem[];
  total: number;
  status: 'Processing' | 'Preparing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  method: 'Prepaid' | 'COD';
}

interface ProductState {
  products: Product[];
  orders: Order[];
  isLoading: boolean;
  fetchData: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  orders: [],
  isLoading: false,

  fetchData: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/shopify/products');
      const products = await res.json();
      if (products.error) throw new Error(products.error);
      set({ products, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch data from Shopify via API:', error);
      set({ isLoading: false });
    }
  },

  addProduct: async (product) => {
    await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(product)
    });
    set((state) => ({ products: [product, ...state.products] }));
  },

  updateProduct: async (id, updatedFields) => {
    const product = get().products.find(p => p.id === id);
    if (!product) return;
    const updated = { ...product, ...updatedFields };
    await fetch('/api/products', {
      method: 'PUT',
      body: JSON.stringify(updated)
    });
    set((state) => ({
      products: state.products.map((p) => p.id === id ? updated : p)
    }));
  },

  deleteProduct: async (id) => {
    await fetch('/api/products', {
      method: 'DELETE',
      body: JSON.stringify({ id })
    });
    set((state) => ({
      products: state.products.filter((p) => p.id !== id)
    }));
  },

  addOrder: async (order) => {
    // 1. Send Order to API
    await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order)
    });

    // 2. Reduce Stock Levels
    const updatedProducts = [...get().products];
    for (const item of order.items) {
      const pIndex = updatedProducts.findIndex(p => p.id === item.id);
      if (pIndex !== -1) {
        updatedProducts[pIndex] = {
          ...updatedProducts[pIndex],
          stock: Math.max(0, updatedProducts[pIndex].stock - item.quantity)
        };
        // Update product on server
        await fetch('/api/products', {
          method: 'PUT',
          body: JSON.stringify(updatedProducts[pIndex])
        });
      }
    }

    set((state) => ({ 
      orders: [order, ...state.orders],
      products: updatedProducts
    }));

    console.log(`[Shopify Mock] Email sent to ${order.email}: Your order ${order.id} has been received.`);
  },

  updateOrderStatus: async (id, status) => {
    await fetch('/api/orders', {
      method: 'PUT',
      body: JSON.stringify({ id, status })
    });

    const order = get().orders.find(o => o.id === id);
    if (order) {
      console.log(`[Shopify Mock] Email sent to ${order.email}: Your order ${id} status updated to ${status}.`);
    }

    set((state) => ({
      orders: state.orders.map((o) => o.id === id ? { ...o, status } : o)
    }));
  },

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    return data.url;
  }
}));


"use client";

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

interface Props {
  product: any;
}

export default function CartButtonPDP({ product }: Props) {
  const { addItem } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: 1,
      image: product.image,
      variantId: product.variantId,
      notesSummary: `${product.notes.top} · ${product.notes.base}`
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const GOLD = product.accent || "#C8A96E";

  return (
    <button
      onClick={handleAdd}
      className="w-full max-w-md py-6 text-[11px] tracking-[0.5em] font-bold text-teak transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-gold/20"
      style={{ backgroundColor: GOLD }}
    >
      {isAdded ? "ADDED TO ARCHIVE ✓" : "ADD TO CART"}
    </button>
  );
}

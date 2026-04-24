"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { useProductStore, Product } from "@/store/productStore";
import { motion, AnimatePresence } from "framer-motion";

export default function InventoryPage() {
  const { products, addProduct, updateProduct, deleteProduct, uploadImage, fetchData, isLoading } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    sku: "",
    price: 0,
    stock: 0,
    category: "Eau de Parfum",
    image: "/perfume 1.png",
    notes: { top: "", heart: "", base: "" }
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        sku: `HOP-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        price: 0,
        stock: 0,
        category: "Eau de Parfum",
        image: "/perfume 1.png",
        notes: { top: "", heart: "", base: "" }
      });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      setFormData({ ...formData, image: url });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, formData);
    } else {
      const catShort = formData.category === "Eau de Parfum" ? "EDP" : 
                       formData.category === "Attars" ? "ATR" : "SET";
      const newProduct = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        status: formData.stock! > 0 ? "In Stock" : "Out of Stock",
        categoryShort: catShort,
        ml: formData.ml || "50ml",
        descriptor: formData.descriptor || "A new journey in scent.",
      } as Product;
      await addProduct(newProduct);
    }
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex justify-between items-center bg-[#0d0b07] border border-ivory/5 p-6">
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/20" size={16} />
          <input 
            type="text" 
            placeholder="Search SKUs or Product names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#12100d] border border-ivory/10 pl-12 pr-4 py-3 text-xs text-ivory placeholder:text-ivory/20 focus:border-gold outline-none transition-colors"
          />
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gold text-[#0a0805] px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-3 hover:bg-ivory transition-all"
        >
          <Plus size={16} />
          New Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#0d0b07] border border-ivory/5 overflow-hidden min-h-[400px] relative">
        {isLoading && (
          <div className="absolute inset-0 bg-[#0d0b07]/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <Loader2 className="text-gold animate-spin" size={32} />
          </div>
        )}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-ivory/5 bg-white/2">
              <th className="px-8 py-6 text-[10px] tracking-[0.2em] text-ivory/30 uppercase font-bold">Product</th>
              <th className="px-8 py-6 text-[10px] tracking-[0.2em] text-ivory/30 uppercase font-bold">SKU</th>
              <th className="px-8 py-6 text-[10px] tracking-[0.2em] text-ivory/30 uppercase font-bold">Stock</th>
              <th className="px-8 py-6 text-[10px] tracking-[0.2em] text-ivory/30 uppercase font-bold">Price</th>
              <th className="px-8 py-6 text-[10px] tracking-[0.2em] text-ivory/30 uppercase font-bold">Status</th>
              <th className="px-8 py-6 text-[10px] tracking-[0.2em] text-ivory/30 uppercase font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ivory/5">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-16 bg-[#12100d] border border-ivory/5 flex items-center justify-center relative overflow-hidden">
                      <Image src={p.image} alt={p.name} fill className="object-contain p-2 opacity-80" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ivory/90">{p.name}</p>
                      <p className="text-[10px] text-ivory/20 tracking-widest uppercase">{p.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-xs text-ivory/40 font-mono tracking-widest">{p.sku}</td>
                <td className="px-8 py-6 text-sm font-display text-ivory/80">{p.stock}</td>
                <td className="px-8 py-6 text-sm text-gold font-mono">₹{p.price.toLocaleString()}</td>
                <td className="px-8 py-6">
                  <span className={`text-[9px] tracking-widest uppercase px-3 py-1 border ${
                    p.stock > 10 ? 'text-green-500/80 border-green-500/20' : 
                    p.stock > 0 ? 'text-yellow-500/80 border-yellow-500/20' : 'text-red-500/80 border-red-500/20'
                  }`}>
                    {p.stock > 10 ? 'In Stock' : p.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(p)} className="p-2 text-ivory/30 hover:text-gold transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-2 text-ivory/30 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#0d0b07] border border-ivory/10 p-12 overflow-y-auto max-h-[90vh]"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute right-8 top-8 text-ivory/40 hover:text-white">
                <X size={24} />
              </button>
              
              <h3 className="font-display text-2xl text-gold mb-10 uppercase tracking-widest">
                {editingProduct ? "Edit Fragrance" : "New Fragrance"}
              </h3>

              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase">Product Name</label>
                    <input 
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory outline-none focus:border-gold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase">SKU</label>
                    <input 
                      value={formData.sku} readOnly
                      className="w-full bg-[#06050a] border border-ivory/10 p-4 text-sm text-ivory/40 outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase">Price (₹)</label>
                    <input 
                      type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory outline-none focus:border-gold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase">Stock Level</label>
                    <input 
                      type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                      className="w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory outline-none focus:border-gold" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase">Category</label>
                    <select 
                      value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory outline-none focus:border-gold appearance-none"
                    >
                      <option value="Eau de Parfum">Eau de Parfum</option>
                      <option value="Attars">Attars</option>
                      <option value="Discovery Sets">Discovery Sets</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase">Volume (ml)</label>
                    <input 
                      value={formData.ml || ""} onChange={(e) => setFormData({...formData, ml: e.target.value})}
                      placeholder="e.g. 50ml, 100ml"
                      className="w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory outline-none focus:border-gold" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase">Product Caption (Descriptor)</label>
                  <textarea 
                    value={formData.descriptor} onChange={(e) => setFormData({...formData, descriptor: e.target.value})}
                    placeholder="Short poetic description..."
                    className="w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory outline-none focus:border-gold min-h-[100px] resize-none" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase">Product Image</label>
                  <div className="flex gap-4">
                    <label className="flex-1 bg-[#12100d] border border-ivory/10 p-8 text-center cursor-pointer hover:border-gold transition-colors relative group">
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                      {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="animate-spin text-gold" size={24} />
                          <span className="text-[10px] tracking-widest text-gold uppercase">Uploading...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="text-ivory/20 group-hover:text-gold transition-colors" size={24} />
                          <span className="text-[10px] tracking-widest text-ivory/20 group-hover:text-gold uppercase">Click to upload image</span>
                        </div>
                      )}
                    </label>
                    <div className="w-32 h-32 bg-[#12100d] border border-ivory/10 flex items-center justify-center relative overflow-hidden">
                      {formData.image ? (
                        <Image src={formData.image} alt="Preview" fill className="object-contain p-2" />
                      ) : (
                        <span className="text-[8px] text-ivory/10 uppercase">Preview</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {["top", "heart", "base"].map((note) => (
                    <div key={note} className="space-y-2">
                      <label className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase">{note} Note</label>
                      <input 
                        value={(formData.notes as any)?.[note]} 
                        onChange={(e) => setFormData({...formData, notes: {...formData.notes, [note]: e.target.value} as any})}
                        className="w-full bg-[#12100d] border border-ivory/10 p-4 text-xs text-ivory outline-none focus:border-gold" 
                      />
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleSave}
                  className="w-full bg-gold text-[#0a0805] py-5 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-ivory transition-all mt-6 disabled:opacity-50"
                  disabled={isUploading}
                >
                  {editingProduct ? "Update Fragrance" : "Add to Collection"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

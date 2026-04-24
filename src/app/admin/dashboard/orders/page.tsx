"use client";

import { useEffect, useState } from "react";
import { Search, Eye, Download, CheckCircle2, Clock, Truck, Loader2, Package, X } from "lucide-react";
import { useProductStore, Order } from "@/store/productStore";
import { motion, AnimatePresence } from "framer-motion";

export default function OrdersPage() {
  const { orders, fetchData, isLoading, updateOrderStatus } = useProductStore();
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing": return <Clock size={14} />;
      case "Preparing": return <Package size={14} />;
      case "Dispatched": return <Truck size={14} />;
      case "Delivered": return <CheckCircle2 size={14} />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "text-green-500/80 border-green-500/20";
      case "Processing": return "text-gold/60 border-gold/20";
      case "Preparing": return "text-yellow-500/60 border-yellow-500/20";
      case "Dispatched": return "text-blue-500/80 border-blue-500/20";
      case "Cancelled": return "text-red-500/80 border-red-500/20";
      default: return "text-ivory/40 border-ivory/10";
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(search.toLowerCase()) || 
    o.client.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = async (id: string, status: Order['status']) => {
    await updateOrderStatus(id, status);
    setActiveMenu(null);
  };

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex justify-between items-center bg-[#0d0b07] border border-ivory/5 p-6">
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/20" size={16} />
          <input 
            type="text" 
            placeholder="Search Order ID, Client Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#12100d] border border-ivory/10 pl-12 pr-4 py-3 text-xs text-ivory placeholder:text-ivory/20 focus:border-gold outline-none transition-colors"
          />
        </div>
        <div className="flex gap-4">
          {isLoading && <Loader2 className="animate-spin text-gold self-center mr-4" size={16} />}
          <button className="border border-ivory/10 text-ivory/60 px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-ivory/5 transition-all">Filter</button>
          <button className="border border-ivory/10 text-ivory/60 px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-ivory/5 transition-all">Export JSON</button>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-[#0d0b07] border border-ivory/5 overflow-hidden min-h-[400px] relative">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-ivory/5 bg-white/2">
              <th className="px-8 py-6 text-[10px] tracking-[0.2em] text-ivory/30 uppercase font-bold">Order ID</th>
              <th className="px-8 py-6 text-[10px] tracking-[0.2em] text-ivory/30 uppercase font-bold">Date</th>
              <th className="px-8 py-6 text-[10px] tracking-[0.2em] text-ivory/30 uppercase font-bold">Client</th>
              <th className="px-8 py-6 text-[10px] tracking-[0.2em] text-ivory/30 uppercase font-bold">Status</th>
              <th className="px-8 py-6 text-[10px] tracking-[0.2em] text-ivory/30 uppercase font-bold">Total</th>
              <th className="px-8 py-6 text-[10px] tracking-[0.2em] text-ivory/30 uppercase font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ivory/5">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-8 py-20 text-center text-ivory/20 text-xs uppercase tracking-[0.3em]">
                  No orders found in the system
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-xs font-mono text-gold tracking-widest">{order.id}</span>
                  </td>
                  <td className="px-8 py-6 text-xs text-ivory/40">{order.date}</td>
                  <td className="px-8 py-6">
                    <p className="text-sm text-ivory/80 font-bold">{order.client}</p>
                    <p className="text-[10px] text-ivory/20 tracking-widest uppercase">{order.method}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="relative">
                      <button 
                        onClick={() => setActiveMenu(activeMenu === order.id ? null : order.id)}
                        className={`flex items-center gap-2 text-[9px] tracking-widest uppercase px-3 py-1 border transition-colors ${getStatusColor(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </button>
                      
                      <AnimatePresence>
                        {activeMenu === order.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                            className="absolute z-20 left-0 mt-2 w-40 bg-[#12100d] border border-ivory/10 shadow-2xl py-2"
                          >
                            {(['Processing', 'Preparing', 'Dispatched', 'Delivered', 'Cancelled'] as const).map((status) => (
                              <button 
                                key={status}
                                onClick={() => handleStatusChange(order.id, status)}
                                className="w-full text-left px-4 py-2 text-[10px] tracking-widest text-ivory/60 hover:text-gold hover:bg-white/5 transition-colors uppercase"
                              >
                                {status}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-ivory font-mono">₹{order.total.toLocaleString()}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-ivory/30 hover:text-gold transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-ivory/30 hover:text-white transition-colors">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#0d0b07] border border-ivory/10 p-12 overflow-y-auto max-h-[90vh]"
            >
              <button onClick={() => setSelectedOrder(null)} className="absolute right-8 top-8 text-ivory/40 hover:text-white">
                <X size={24} />
              </button>
              
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="font-display text-2xl text-gold uppercase tracking-widest mb-2">Order {selectedOrder.id}</h3>
                  <p className="text-[10px] text-ivory/40 uppercase tracking-[0.2em]">{selectedOrder.date}</p>
                </div>
                <div className={`px-4 py-2 border text-[10px] tracking-widest uppercase ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </div>
              </div>

              <div className="space-y-8">
                <section className="space-y-4">
                  <h4 className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase border-b border-ivory/5 pb-2">Customer Details</h4>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] text-ivory/20 uppercase tracking-widest mb-1">Client</p>
                      <p className="text-sm text-ivory">{selectedOrder.client}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-ivory/20 uppercase tracking-widest mb-1">Email</p>
                      <p className="text-sm text-ivory">{selectedOrder.email}</p>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase border-b border-ivory/5 pb-2">Items</h4>
                  <div className="space-y-4">
                    {Array.isArray(selectedOrder.items) ? (
                      selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-ivory font-bold">{item.name}</p>
                            <p className="text-[10px] text-ivory/30 uppercase tracking-widest">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm text-ivory font-mono">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-ivory italic opacity-40">Generic Order Item x {selectedOrder.items as unknown as number}</p>
                        <p className="text-sm text-ivory font-mono">₹{selectedOrder.total.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </section>

                <div className="pt-8 border-t border-ivory/10 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-ivory/20 uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-3xl font-display text-gold">₹{selectedOrder.total.toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="bg-ivory/5 border border-ivory/10 text-ivory/60 px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-ivory/10 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

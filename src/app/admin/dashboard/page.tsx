"use client";

import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";
import { BarChart3, TrendingUp, ShoppingBag, Package, AlertCircle } from "lucide-react";

export default function AnalyticsPage() {
  const { orders, products, fetchData } = useProductStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const activeOrders = orders.filter(o => o.status !== 'Cancelled');
  const totalRevenue = activeOrders.reduce((acc, curr) => acc + curr.total, 0);
  const totalOrders = activeOrders.length;
  const totalStock = products.reduce((acc, curr) => acc + curr.stock, 0);
  const lowStockCount = products.filter(p => p.stock < 20).length;
  const actionRequiredCount = orders.filter(o => o.status === 'Processing' || o.status === 'Preparing').length;

  const stats = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: TrendingUp, trend: "+12.5%", color: "#C8A96E" },
    { label: "Net Orders", value: totalOrders.toString(), icon: ShoppingBag, trend: "+8.2%", color: "#7aab85" },
    { label: "Inventory Units", value: totalStock.toString(), icon: Package, trend: "-2.4%", color: "#c8965a" },
    { label: "Needs Action", value: actionRequiredCount.toString(), icon: AlertCircle, trend: `${actionRequiredCount > 0 ? 'Urgent' : 'Clear'}`, color: "#c8965a" },
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#0d0b07] border border-ivory/5 p-8 flex flex-col gap-4 group hover:border-gold/20 transition-all duration-500">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 border border-ivory/5 text-gold group-hover:scale-110 transition-transform duration-500">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <span className={`text-[10px] font-bold tracking-widest ${stat.trend === 'Urgent' ? 'text-red-500/80' : 'text-green-500/80'}`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase mb-2">{stat.label}</p>
                <p className="font-display text-3xl text-ivory">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0d0b07] border border-ivory/5 p-10 h-[500px] flex flex-col">
          <h3 className="font-display text-xl text-ivory/80 mb-10 tracking-wide uppercase">Operational Ledger</h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {orders.length === 0 ? (
              <div className="h-full flex items-center justify-center text-ivory/10 text-[10px] uppercase tracking-widest italic">Awaiting first transaction...</div>
            ) : (
              orders.slice(0, 10).map(order => (
                <div key={order.id} className="flex justify-between items-center border-b border-ivory/5 pb-4">
                  <div>
                    <p className="text-sm font-bold text-ivory/80">{order.client}</p>
                    <p className="text-[10px] text-ivory/20 uppercase tracking-widest">{order.date} • {order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-gold">₹{order.total.toLocaleString()}</p>
                    <p className={`text-[9px] uppercase tracking-widest ${
                      order.status === 'Delivered' ? 'text-green-500/60' : 
                      order.status === 'Cancelled' ? 'text-red-500/60' : 'text-gold/40'
                    }`}>{order.status}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-[#0d0b07] border border-ivory/5 p-10 h-[500px] flex flex-col">
          <h3 className="font-display text-xl text-ivory/80 mb-10 tracking-wide uppercase">Stock Velocity</h3>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {products.length === 0 ? (
              <div className="h-full flex items-center justify-center text-ivory/10 text-[10px] uppercase tracking-widest italic">Inventory currently empty...</div>
            ) : (
              products.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex justify-between text-[10px] tracking-widest uppercase">
                    <span className="text-ivory/60">{item.name}</span>
                    <span className={item.stock < 20 ? "text-red-500/80" : "text-gold"}>{item.stock} Units</span>
                  </div>
                  <div className="h-[2px] w-full bg-ivory/5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${item.stock < 20 ? "bg-red-500/40" : "bg-gold/60"}`} 
                      style={{ width: `${Math.min((item.stock / 200) * 100, 100)}%` }} 
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, BarChart3, LogOut } from "lucide-react";
import Image from "next/image";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Analytics", href: "/admin/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/admin/dashboard/inventory", icon: Package },
    { name: "Orders", href: "/admin/dashboard/orders", icon: ShoppingCart },
  ];

  return (
    <div className="flex min-h-screen bg-[#06050a] text-ivory">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0d0b07] border-r border-ivory/5 flex flex-col sticky top-0 h-screen">
        <div className="p-10 border-b border-ivory/5">
          <Image src="/hop-logo.png" alt="HOP" width={140} height={70} className="object-contain brightness-110" />
          <span className="text-[9px] tracking-[0.4em] text-gold block mt-4 uppercase font-bold">Admin Panel</span>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-5 py-4 text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-300 ${
                  isActive 
                    ? "bg-gold text-[#0a0805]" 
                    : "text-ivory/40 hover:text-gold hover:bg-ivory/5"
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-ivory/5">
          <Link 
            href="/admin"
            className="flex items-center gap-4 px-5 py-4 text-[11px] tracking-[0.2em] uppercase font-bold text-ivory/30 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} strokeWidth={1.5} />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-16">
          <div>
            <h2 className="font-display text-3xl tracking-tight">
              {menuItems.find(i => i.href === pathname)?.name || "Dashboard"}
            </h2>
            <p className="text-[10px] tracking-[0.2em] text-ivory/30 uppercase mt-2">Welcome back, Administrator</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-ivory/80">HOP Main Store</p>
              <p className="text-[10px] text-gold/60 uppercase tracking-widest">Global Operations</p>
            </div>
            <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20">
              <span className="text-gold text-xs font-bold font-display">A</span>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}

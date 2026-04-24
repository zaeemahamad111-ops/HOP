"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication for demonstration
    if (password === "hopadmin123") {
      router.push("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen bg-[#06050a] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0d0b07] border border-ivory/5 p-12 shadow-2xl">
        <div className="flex flex-col items-center mb-12">
          <Image src="/hop-logo.png" alt="HOP" width={180} height={90} className="object-contain brightness-110 mb-8" />
          <h1 className="font-display text-2xl text-ivory tracking-widest uppercase">Admin Access</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] tracking-[0.3em] text-gold uppercase font-bold">Secure Access Key</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#12100d] border border-ivory/10 p-4 text-sm text-ivory placeholder:text-ivory/20 focus:border-gold outline-none transition-colors"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gold text-[#0a0805] py-4 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-ivory transition-colors duration-300"
          >
            Authenticate
          </button>
        </form>

        <p className="text-center text-[9px] text-ivory/20 tracking-widest uppercase mt-8">
          Authorized personnel only. Protected by 256-bit encryption.
        </p>
      </div>
    </main>
  );
}

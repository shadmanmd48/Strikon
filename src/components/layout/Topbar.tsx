"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, X, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export function Topbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "FIFA 2026", path: "/fifa-2026" },
    { name: "Leagues", path: "/leagues" },
    { name: "Stats", path: "/stats" },
    { name: "Fixtures", path: "/fixtures" },
    { name: "News", path: "/news" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--divider)]">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        <div className="flex items-center gap-4 md:gap-12">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#0057FF] shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-500 overflow-hidden">
               <div className="absolute inset-0 bg-white/20 mix-blend-overlay"></div>
               {/* Animated Goalpost and Football */}
               <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-4 h-4 md:w-5 md:h-5 relative z-10 overflow-visible">
                 <style>
                   {`
                     .ball-anim { transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); transform-origin: 12px 17px; }
                     .group:hover .ball-anim { transform: translate(5px, -9px) scale(0.85) rotate(180deg); }
                     .net-anim { transition: all 0.3s ease; }
                     .group:hover .net-anim { opacity: 1; stroke-width: 1; }
                   `}
                 </style>
                 {/* Goalpost */}
                 <path d="M3 22V6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v16" strokeLinecap="round" />
                 {/* Net */}
                 <path className="net-anim" d="M3 8h18M3 12h18M3 16h18M7 4v18M11 4v18M15 4v18M19 4v18" strokeWidth="0.5" opacity="0.3" />
                 {/* Football */}
                 <g className="ball-anim">
                   <circle cx="12" cy="17" r="3.5" fill="white" stroke="none" />
                   <path d="M12 14.5l1.5 2-1 1.5h-1l-1-1.5 1.5-2z" fill="#0057FF" stroke="none" />
                 </g>
               </svg>
            </div>
            <span className="text-lg md:text-xl font-black tracking-tighter text-white drop-shadow-md">
              STRIK<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#0057FF]">ON</span>
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => {
              const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
              return (
                <Link 
                  key={item.name} 
                  href={item.path} 
                  className={`text-xs font-bold tracking-wider uppercase transition-colors ${
                    isActive 
                      ? 'text-[var(--primary)] relative drop-shadow-[0_0_8px_rgba(190,255,0,0.6)] hover:brightness-110' 
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-ping"></span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <ThemeToggle />
          <button className="relative text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <Bell size={20} />
            {user && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--background)]" />}
          </button>
          
          {isLoading ? (
             <div className="w-8 h-8 rounded-full bg-[var(--divider)] animate-pulse"></div>
          ) : user ? (
            <div className="relative">
              <div 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden bg-[var(--divider)] border-2 border-transparent group-hover:border-[var(--primary)] transition-colors">
                   <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                </div>
                <span className="hidden md:block text-sm font-bold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{user.name} ▾</span>
              </div>
              
              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-[var(--card)] border border-[var(--divider)] rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-[var(--divider)] mb-2">
                    <p className="text-sm font-bold text-[var(--text-primary)] truncate">{user.name}</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="whitespace-nowrap shrink-0 bg-[var(--primary)] text-black px-3 md:px-6 py-1.5 md:py-2 rounded-full font-black text-[10px] md:text-sm uppercase tracking-wider hover:scale-105 hover:shadow-[0_0_20px_rgba(190,255,0,0.4)] transition-all">
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[var(--card)] border-b border-[var(--divider)] shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
            return (
              <Link 
                key={item.name} 
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-3 rounded-lg text-sm font-bold tracking-wider uppercase transition-colors ${
                  isActive 
                    ? 'bg-[var(--primary)]/10 text-[var(--primary)] relative' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--divider)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.name}
                {isActive && (
                   <span className="absolute top-1/2 -translate-y-1/2 right-4 w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-ping"></span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

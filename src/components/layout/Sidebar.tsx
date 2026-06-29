"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Activity, 
  CalendarDays, 
  Users, 
  Trophy, 
  Star, 
  Newspaper 
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Live", href: "/live", icon: Activity },
  { name: "Matches", href: "/matches", icon: CalendarDays },
  { name: "Teams", href: "/teams", icon: Users },
  { name: "Standings", href: "/standings", icon: Trophy },
  { name: "News", href: "/news", icon: Newspaper },
  { name: "Favorites", href: "/favorites", icon: Star },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-[var(--divider)] bg-[var(--card)] z-40">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="text-xl font-bold tracking-tight">GoalLine</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20" 
                  : "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--text-primary)]"
              )}
            >
              <item.icon size={20} className={cn(isActive ? "text-white" : "text-[var(--text-secondary)]")} />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

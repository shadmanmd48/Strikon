"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, Search, Star, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const mobileNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Matches", href: "/matches", icon: CalendarDays },
  { name: "Search", href: "/search", icon: Search },
  { name: "Favorites", href: "/favorites", icon: Star },
  { name: "Profile", href: "/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full glass border-t border-[var(--divider)] z-50 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center w-16 h-full gap-1 relative"
            >
              <item.icon 
                size={22} 
                className={cn(
                  "transition-all duration-200",
                  isActive ? "text-[var(--primary)] -translate-y-1" : "text-[var(--text-secondary)]"
                )} 
              />
              <span 
                className={cn(
                  "text-[10px] font-medium transition-all duration-200 absolute bottom-1.5",
                  isActive ? "text-[var(--primary)] opacity-100" : "text-[var(--text-secondary)] opacity-0 scale-75"
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

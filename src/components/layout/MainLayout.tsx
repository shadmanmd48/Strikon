import { Topbar } from "./Topbar";
import { BottomNav } from "./BottomNav";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Topbar />
      <main className="flex-1 w-full pb-24 md:pb-0">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

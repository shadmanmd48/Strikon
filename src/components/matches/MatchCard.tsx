import Link from "next/link";
import { Match } from "@/lib/mockData";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function MatchCard({ match }: { match: Match }) {
  const isLive = match.status === "LIVE";

  return (
    <Link href={`/match/${match.id}`} className="block">
      <div className="bg-[var(--card)] rounded-2xl p-4 border border-[var(--divider)] hover:border-[var(--primary)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 relative group">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 text-xs font-medium text-[var(--text-secondary)]">
          <span>{match.competition}</span>
          {isLive ? (
            <div className="flex items-center gap-1.5 text-[var(--live)] font-bold bg-[var(--live)]/10 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--live)] animate-[pulse_1.5s_ease-in-out_infinite]" />
              <span>{match.minute}&apos;</span>
            </div>
          ) : (
            <span>{match.status === "FINISHED" ? "FT" : new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          )}
        </div>

        {/* Teams & Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 relative bg-[var(--background)] rounded-sm overflow-hidden flex-shrink-0">
                <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-sm group-hover:text-[var(--primary)] transition-colors">{match.homeTeam.name}</span>
            </div>
            <span className={cn("font-bold text-lg", isLive ? "text-[var(--live)]" : "text-[var(--text-primary)]")}>
              {match.homeScore}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 relative bg-[var(--background)] rounded-sm overflow-hidden flex-shrink-0">
                <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-sm group-hover:text-[var(--primary)] transition-colors">{match.awayTeam.name}</span>
            </div>
            <span className={cn("font-bold text-lg", isLive ? "text-[var(--live)]" : "text-[var(--text-primary)]")}>
              {match.awayScore}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

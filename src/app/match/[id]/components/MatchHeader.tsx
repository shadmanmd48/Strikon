import { Match } from "@/lib/mockData";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function MatchHeader({ match }: { match: Match }) {
  const isLive = match.status === "LIVE";

  return (
    <div className="glass rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden border border-[var(--divider)] shadow-lg shadow-[var(--background)]/50">
      {/* Background ambient glow based on teams (simplified) */}
      <div 
        className="absolute -top-24 -left-24 w-64 h-64 rounded-full opacity-20 blur-[80px]" 
        style={{ background: match.homeTeam.color }}
      />
      <div 
        className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full opacity-20 blur-[80px]"
        style={{ background: match.awayTeam.color }}
      />

      <div className="text-sm font-medium text-[var(--text-secondary)] mb-6 z-10 text-center">
        {match.competition} • {match.stadium}
      </div>

      <div className="flex items-center justify-between w-full max-w-lg z-10">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-4 flex-1">
          <div className="w-20 h-20 md:w-24 md:h-24 relative bg-[var(--background)] rounded-2xl overflow-hidden shadow-md">
            <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <h3 className="font-bold text-lg md:text-xl text-center">{match.homeTeam.name}</h3>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center px-4 md:px-8">
          <div className="flex items-center gap-4 text-4xl md:text-5xl font-black">
            <span>{match.homeScore}</span>
            <span className="text-[var(--text-secondary)] opacity-50">-</span>
            <span>{match.awayScore}</span>
          </div>
          
          <div className="mt-4 flex items-center justify-center">
            {isLive ? (
              <div className="flex items-center gap-2 bg-[var(--live)]/10 text-[var(--live)] px-3 py-1 rounded-full border border-[var(--live)]/20">
                <span className="w-2 h-2 rounded-full bg-[var(--live)] animate-pulse" />
                <span className="font-bold text-sm">{match.minute}&apos;</span>
              </div>
            ) : (
              <div className="text-[var(--text-secondary)] font-bold text-sm bg-[var(--divider)] px-3 py-1 rounded-full">
                {match.status === "FINISHED" ? "FULL TIME" : new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-4 flex-1">
          <div className="w-20 h-20 md:w-24 md:h-24 relative bg-[var(--background)] rounded-2xl overflow-hidden shadow-md">
            <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <h3 className="font-bold text-lg md:text-xl text-center">{match.awayTeam.name}</h3>
        </div>
      </div>
    </div>
  );
}

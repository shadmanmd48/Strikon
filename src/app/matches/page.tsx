import { MatchCard } from "@/components/matches/MatchCard";
import { MOCK_MATCHES } from "@/lib/mockData";
import { CalendarDays } from "lucide-react";

export default function MatchesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black mb-2">All Matches</h1>
          <p className="text-[var(--text-secondary)]">Fixtures and Results</p>
        </div>

        {/* Filters (Mock) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {["All", "Today", "Tomorrow", "Live", "Completed"].map((filter, i) => (
            <button 
              key={filter}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                i === 0 
                  ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20" 
                  : "bg-[var(--card)] border border-[var(--divider)] hover:border-[var(--primary)] text-[var(--text-secondary)] hover:text-[var(--primary)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {MOCK_MATCHES.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
        {/* Duplicate mock matches just to fill the grid for demo */}
        {MOCK_MATCHES.map((match) => (
          <MatchCard key={match.id + "-copy"} match={{...match, id: match.id + "-copy"}} />
        ))}
      </div>

      {MOCK_MATCHES.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-[var(--text-secondary)] bg-[var(--card)] rounded-3xl border border-[var(--divider)] border-dashed">
          <CalendarDays size={48} className="mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No matches found</h3>
          <p>Try changing your filters or checking back later.</p>
        </div>
      )}
    </div>
  );
}

export default function BracketPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black mb-2">Knockout Stage</h1>
        <p className="text-[var(--text-secondary)]">Interactive Tournament Bracket</p>
      </div>

      <div className="bg-[var(--card)] border border-[var(--divider)] rounded-3xl p-8 overflow-x-auto custom-scrollbar shadow-sm">
        <div className="min-w-[1000px] flex justify-between relative gap-8 py-8">
          
          {/* Quarter Finals - Left */}
          <div className="flex flex-col justify-around gap-12 flex-1 relative z-10">
            <MatchBox home="ARG" away="NED" homeScore="2" awayScore="1" />
            <MatchBox home="BRA" away="CRO" homeScore="1" awayScore="2" />
          </div>
          
          {/* Semi Finals - Left */}
          <div className="flex flex-col justify-around gap-12 flex-1 relative z-10 my-16">
            <MatchBox home="ARG" away="CRO" homeScore="3" awayScore="0" />
          </div>
          
          {/* Final */}
          <div className="flex flex-col justify-center gap-12 flex-1 relative z-10">
            <div className="bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)] text-white p-6 rounded-2xl shadow-xl shadow-[var(--primary)]/20 text-center border-2 border-[var(--accent)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="font-bold text-sm tracking-widest opacity-80 uppercase block mb-2">World Champions</span>
              <span className="text-3xl font-black text-[var(--accent)] drop-shadow-md">ARGENTINA</span>
            </div>
            <div className="mt-8">
               <MatchBox home="ARG" away="FRA" homeScore="3" awayScore="3" extra="(4-2 p)" isFinal />
            </div>
          </div>
          
          {/* Semi Finals - Right */}
          <div className="flex flex-col justify-around gap-12 flex-1 relative z-10 my-16">
            <MatchBox home="FRA" away="MAR" homeScore="2" awayScore="0" />
          </div>

          {/* Quarter Finals - Right */}
          <div className="flex flex-col justify-around gap-12 flex-1 relative z-10">
            <MatchBox home="ENG" away="FRA" homeScore="1" awayScore="2" />
            <MatchBox home="POR" away="MAR" homeScore="0" awayScore="1" />
          </div>

        </div>
      </div>
    </div>
  );
}

function MatchBox({ home, away, homeScore, awayScore, extra, isFinal }: { home: string; away: string; homeScore: string; awayScore: string; extra?: string; isFinal?: boolean }) {
  return (
    <div className={`bg-[var(--background)] border ${isFinal ? 'border-[var(--accent)] shadow-[0_0_15px_var(--accent)]/30 scale-110' : 'border-[var(--divider)] hover:border-[var(--primary)]'} rounded-xl overflow-hidden shadow-sm transition-all hover:-translate-y-1 w-full max-w-[200px] mx-auto group cursor-pointer`}>
      <div className="flex items-center justify-between p-3 border-b border-[var(--divider)] group-hover:bg-[var(--card)] transition-colors">
        <span className="font-bold text-sm">{home}</span>
        <span className="font-black text-lg">{homeScore}</span>
      </div>
      <div className="flex items-center justify-between p-3 bg-[var(--background)] group-hover:bg-[var(--card)] transition-colors">
        <span className="font-bold text-sm">{away}</span>
        <span className="font-black text-lg">{awayScore}</span>
      </div>
      {extra && (
        <div className="px-3 py-1.5 bg-[var(--divider)]/50 text-[var(--text-secondary)] text-xs text-center font-bold">
          {extra}
        </div>
      )}
    </div>
  );
}

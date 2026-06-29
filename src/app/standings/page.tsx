import { TEAMS } from "@/lib/mockData";
import { clsx } from "clsx";

const MOCK_GROUP_A = [
  { team: TEAMS.arg, played: 3, win: 2, draw: 0, loss: 1, gf: 5, ga: 2, gd: 3, pts: 6 },
  { team: TEAMS.fra, played: 3, win: 1, draw: 2, loss: 0, gf: 4, ga: 3, gd: 1, pts: 5 },
  { team: TEAMS.bra, played: 3, win: 1, draw: 1, loss: 1, gf: 3, ga: 3, gd: 0, pts: 4 },
  { team: TEAMS.eng, played: 3, win: 0, draw: 1, loss: 2, gf: 1, ga: 5, gd: -4, pts: 1 },
];

export default function StandingsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black mb-2">Tournament Standings</h1>
        <p className="text-[var(--text-secondary)]">Group Stage Tables</p>
      </div>

      <div className="bg-[var(--card)] rounded-2xl border border-[var(--divider)] overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[var(--divider)] bg-[var(--background)]">
          <h2 className="font-bold text-lg">Group A</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[var(--text-secondary)] bg-[var(--background)]/50 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-semibold w-8">#</th>
                <th className="px-6 py-4 font-semibold">Team</th>
                <th className="px-3 py-4 font-semibold text-center">MP</th>
                <th className="px-3 py-4 font-semibold text-center">W</th>
                <th className="px-3 py-4 font-semibold text-center">D</th>
                <th className="px-3 py-4 font-semibold text-center">L</th>
                <th className="px-3 py-4 font-semibold text-center hidden md:table-cell">GF</th>
                <th className="px-3 py-4 font-semibold text-center hidden md:table-cell">GA</th>
                <th className="px-3 py-4 font-semibold text-center">GD</th>
                <th className="px-6 py-4 font-bold text-center text-[var(--text-primary)]">Pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--divider)]">
              {MOCK_GROUP_A.sort((a, b) => b.pts - a.pts).map((row, index) => {
                const isQualified = index < 2;
                return (
                  <tr key={row.team.id} className="hover:bg-[var(--background)] transition-colors group">
                    <td className="px-6 py-4">
                      <div className={clsx(
                        "w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs",
                        isQualified ? "bg-[var(--success)]/10 text-[var(--success)]" : "text-[var(--text-secondary)]"
                      )}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 relative rounded-sm overflow-hidden shadow-sm">
                          <img src={row.team.logo} alt={row.team.name} className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <span className="font-bold group-hover:text-[var(--primary)] transition-colors">{row.team.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center text-[var(--text-secondary)]">{row.played}</td>
                    <td className="px-3 py-4 text-center text-[var(--text-secondary)]">{row.win}</td>
                    <td className="px-3 py-4 text-center text-[var(--text-secondary)]">{row.draw}</td>
                    <td className="px-3 py-4 text-center text-[var(--text-secondary)]">{row.loss}</td>
                    <td className="px-3 py-4 text-center text-[var(--text-secondary)] hidden md:table-cell">{row.gf}</td>
                    <td className="px-3 py-4 text-center text-[var(--text-secondary)] hidden md:table-cell">{row.ga}</td>
                    <td className="px-3 py-4 text-center font-medium">{row.gd}</td>
                    <td className="px-6 py-4 text-center font-black text-base">{row.pts}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

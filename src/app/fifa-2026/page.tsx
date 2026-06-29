import { Share2 } from "lucide-react";
import { LiveMatchHero } from "@/components/LiveMatchHero";
import { UpcomingFixtures } from "@/components/UpcomingFixtures";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Dynamic Live Hero Section */}
      <LiveMatchHero />

      {/* Content Below Hero */}
      <div className="relative z-30 w-full max-w-6xl mx-auto px-4 -mt-6 md:-mt-12 space-y-6 pb-24">
         
         {/* Fixtures Section Moved Below Hero */}
         <div className="w-full">
            <h2 className="text-lg md:text-xl font-black uppercase flex items-center gap-2 mb-6 drop-shadow-md">
              <span className="text-[var(--primary)] text-xl md:text-2xl">📅</span> TODAY'S FIXTURES
            </h2>
            <UpcomingFixtures />
         </div>

         {/* Boxscore Card */}
         <div className="bg-[var(--card)] text-white rounded-2xl p-4 md:p-8 shadow-2xl border border-[var(--divider)] mt-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2 md:gap-0">
              <h3 className="font-black text-lg md:text-xl uppercase tracking-wider text-white">Match Stats</h3>
              <span className="font-bold text-[10px] md:text-xs text-[var(--text-secondary)] uppercase tracking-wider">Sun, Dec 18 • 10:00AM ET / FOX</span>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
               <div className="flex-1 overflow-x-auto custom-scrollbar pb-2">
                 <table className="w-full text-sm font-medium min-w-[300px]">
                   <thead>
                     <tr className="text-[var(--text-secondary)] border-b border-[var(--divider)] uppercase tracking-wider text-[10px] md:text-xs">
                       <th className="text-left pb-3 font-bold w-1/3">Team</th>
                       <th className="text-center pb-3 font-bold">1H</th>
                       <th className="text-center pb-3 font-bold">2H</th>
                       <th className="text-center pb-3 font-bold text-red-500 flex items-center justify-center gap-1">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> ET
                       </th>
                       <th className="text-center pb-3 font-bold">PEN</th>
                       <th className="text-center pb-3 font-bold text-white bg-[var(--background)] rounded-t-lg">Total</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr className="border-b border-[var(--divider)]">
                       <td className="py-3 md:py-4 flex items-center gap-2 md:gap-3">
                         <img src="https://flagcdn.com/w160/ar.png" alt="ARG" className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover border border-[var(--divider)] shrink-0" />
                         <span className="font-bold text-white text-xs md:text-sm">Argentina</span>
                       </td>
                       <td className="py-3 md:py-4 text-center font-bold text-white text-xs md:text-sm">2</td>
                       <td className="py-3 md:py-4 text-center font-bold text-white text-xs md:text-sm">0</td>
                       <td className="py-3 md:py-4 text-center text-white font-bold text-xs md:text-sm">1</td>
                       <td className="py-3 md:py-4 text-center text-[var(--text-secondary)] font-bold text-xs md:text-sm">-</td>
                       <td className="py-3 md:py-4 text-center font-black bg-[var(--background)] text-white text-base md:text-lg">3</td>
                     </tr>
                     <tr>
                       <td className="py-3 md:py-4 flex items-center gap-2 md:gap-3">
                         <img src="https://flagcdn.com/w160/fr.png" alt="FRA" className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover border border-[var(--divider)] shrink-0" />
                         <span className="font-bold text-white text-xs md:text-sm">France</span>
                       </td>
                       <td className="py-3 md:py-4 text-center font-bold text-white text-xs md:text-sm">0</td>
                       <td className="py-3 md:py-4 text-center font-bold text-white text-xs md:text-sm">2</td>
                       <td className="py-3 md:py-4 text-center text-white font-bold text-xs md:text-sm">1</td>
                       <td className="py-3 md:py-4 text-center text-[var(--text-secondary)] font-bold text-xs md:text-sm">-</td>
                       <td className="py-3 md:py-4 text-center font-black bg-[var(--background)] rounded-b-lg text-white text-base md:text-lg">3</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
               
               <div className="lg:w-72 lg:border-l border-[var(--divider)] lg:pl-8 flex flex-col justify-center items-center pt-6 lg:pt-0 border-t lg:border-t-0 mt-2 lg:mt-0">
                  <div className="text-[10px] md:text-xs text-[var(--text-secondary)] font-bold mb-4 tracking-widest uppercase">Win Probability</div>
                  <div className="flex items-center gap-4 md:gap-6 w-full justify-between px-2">
                     <div className="text-right">
                       <div className="font-black text-xl md:text-2xl text-white">55%</div>
                       <div className="text-[10px] md:text-xs font-bold text-[var(--text-secondary)] uppercase">ARG</div>
                       <div className="text-[8px] md:text-[10px] text-[var(--text-secondary)] font-bold mt-1 tracking-wider">To Lift Trophy</div>
                     </div>
                     
                     <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full border-4 md:border-[10px] border-[var(--divider)] flex justify-center items-center shrink-0">
                        <div className="absolute inset-0 rounded-full border-4 md:border-[10px] border-[var(--accent)]" style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}></div>
                        <div className="absolute w-6 h-6 md:w-8 md:h-8 bg-[var(--background)] rounded-full flex justify-center items-center shadow-sm z-10 border border-[var(--divider)]">
                           <span className="font-black text-[10px] md:text-xs text-[var(--text-secondary)]">VS</span>
                        </div>
                     </div>
                     
                     <div className="text-left">
                       <div className="font-black text-xl md:text-2xl text-white">45%</div>
                       <div className="text-[10px] md:text-xs font-bold text-[var(--text-secondary)] uppercase">FRA</div>
                       <div className="text-[8px] md:text-[10px] text-[var(--text-secondary)] font-bold mt-1 tracking-wider">To Lift Trophy</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* FIFA Stats Section */}
         <div className="mt-8 md:mt-12">
            <h2 className="text-lg md:text-xl font-black uppercase flex items-center gap-2 mb-6">
              <span className="text-[var(--primary)] text-xl md:text-2xl">🏆</span> TOURNAMENT STATS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {/* Top Scorers */}
               <div className="bg-[var(--card)] rounded-xl border border-[var(--divider)] p-5 shadow-lg relative overflow-hidden group">
                  <div className="absolute -right-6 -bottom-6 text-8xl opacity-[0.03] font-black italic select-none">GOALS</div>
                  <h3 className="font-bold text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-4 border-b border-[var(--divider)] pb-2">Top Scorers</h3>
                  <div className="space-y-4">
                     {[
                        { name: "Kylian Mbappé", team: "FRA", goals: 8, img: "https://flagcdn.com/w40/fr.png" },
                        { name: "Lionel Messi", team: "ARG", goals: 7, img: "https://flagcdn.com/w40/ar.png" },
                        { name: "Julián Álvarez", team: "ARG", goals: 4, img: "https://flagcdn.com/w40/ar.png" }
                     ].map((player, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-[var(--text-secondary)] w-3">{idx + 1}</span>
                              <img src={player.img} alt={player.team} className="w-6 h-6 rounded-full object-cover border border-[var(--divider)]" />
                              <div className="flex flex-col">
                                 <span className="font-bold text-sm text-[var(--text-primary)] leading-tight">{player.name}</span>
                                 <span className="text-[10px] text-[var(--text-secondary)] font-bold">{player.team}</span>
                              </div>
                           </div>
                           <span className="font-black text-lg text-[var(--text-primary)]">{player.goals}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Top Assists */}
               <div className="bg-[var(--card)] rounded-xl border border-[var(--divider)] p-5 shadow-lg relative overflow-hidden group">
                  <div className="absolute -right-6 -bottom-6 text-8xl opacity-[0.03] font-black italic select-none">AST</div>
                  <h3 className="font-bold text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-4 border-b border-[var(--divider)] pb-2">Top Assists</h3>
                  <div className="space-y-4">
                     {[
                        { name: "Antoine Griezmann", team: "FRA", ast: 3, img: "https://flagcdn.com/w40/fr.png" },
                        { name: "Lionel Messi", team: "ARG", ast: 3, img: "https://flagcdn.com/w40/ar.png" },
                        { name: "Harry Kane", team: "ENG", ast: 3, img: "https://flagcdn.com/w40/gb-eng.png" }
                     ].map((player, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-[var(--text-secondary)] w-3">{idx + 1}</span>
                              <img src={player.img} alt={player.team} className="w-6 h-6 rounded-full object-cover border border-[var(--divider)]" />
                              <div className="flex flex-col">
                                 <span className="font-bold text-sm text-[var(--text-primary)] leading-tight">{player.name}</span>
                                 <span className="text-[10px] text-[var(--text-secondary)] font-bold">{player.team}</span>
                              </div>
                           </div>
                           <span className="font-black text-lg text-[var(--text-primary)]">{player.ast}</span>
                        </div>
                     ))}
                  </div>
               </div>
               
               {/* Team Goals */}
               <div className="bg-[var(--card)] rounded-xl border border-[var(--divider)] p-5 shadow-lg relative overflow-hidden group">
                  <div className="absolute -right-6 -bottom-6 text-8xl opacity-[0.03] font-black italic select-none">TEAM</div>
                  <h3 className="font-bold text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-4 border-b border-[var(--divider)] pb-2">Team Goals</h3>
                  <div className="space-y-4">
                     {[
                        { team: "France", code: "FRA", goals: 16, img: "https://flagcdn.com/w40/fr.png" },
                        { team: "Argentina", code: "ARG", goals: 15, img: "https://flagcdn.com/w40/ar.png" },
                        { team: "England", code: "ENG", goals: 13, img: "https://flagcdn.com/w40/gb-eng.png" }
                     ].map((team, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-[var(--text-secondary)] w-3">{idx + 1}</span>
                              <img src={team.img} alt={team.code} className="w-6 h-6 rounded-full object-cover border border-[var(--divider)]" />
                              <div className="flex flex-col">
                                 <span className="font-bold text-sm text-[var(--text-primary)] leading-tight">{team.team}</span>
                                 <span className="text-[10px] text-[var(--text-secondary)] font-bold">{team.code}</span>
                              </div>
                           </div>
                           <span className="font-black text-lg text-[var(--text-primary)]">{team.goals}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

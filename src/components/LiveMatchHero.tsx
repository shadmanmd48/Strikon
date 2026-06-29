"use client";
import React, { useEffect, useState } from 'react';

export function LiveMatchHero() {
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<any>(null);
  
  // Slideshow state
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Try to fetch Live Matches
        const liveRes = await fetch('/api/live-matches');
        const liveJson = await liveRes.json();
        
        if (liveJson.apiError) {
           setApiError(liveJson.apiError);
           setLoading(false);
           return;
        } 
        
        let foundLive = false;
        if (liveJson.success && liveJson.data && liveJson.data.length > 0) {
           setLiveMatches(liveJson.data);
           foundLive = true;
        }

        // 2. If no live matches, fetch Upcoming Matches
        if (!foundLive) {
           const upcomingRes = await fetch('/api/fixtures/upcoming');
           const upcomingJson = await upcomingRes.json();
           
           if (upcomingJson.apiError) {
              setApiError(upcomingJson.apiError);
           } else if (upcomingJson.success && upcomingJson.data && upcomingJson.data.length > 0) {
              // Take the first 5 upcoming matches for the slideshow
              setUpcomingMatches(upcomingJson.data.slice(0, 5));
           } else if (upcomingJson.mockData) {
              setUpcomingMatches(upcomingJson.mockData);
           }
        }
        
        setApiError(null);
      } catch (e) {
        console.error("Failed to fetch match data", e);
        setApiError("Frontend fetch error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // Poll data every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Auto-Slideshow effect
  useEffect(() => {
    const activeMatches = liveMatches.length > 0 ? liveMatches : upcomingMatches;
    if (activeMatches.length <= 1) return;
    
    const slideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeMatches.length);
    }, 6000); // Change slide every 6 seconds
    
    return () => clearInterval(slideInterval);
  }, [liveMatches, upcomingMatches]);

  if (loading) {
     return (
       <div className="w-full h-[450px] md:h-[500px] flex flex-col items-center justify-center text-[var(--text-secondary)] bg-[var(--card)] rounded-3xl border border-[var(--divider)] mb-8">
         <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
         <span className="font-bold uppercase tracking-widest text-sm text-[var(--primary)] animate-pulse">CONNECTING TO LIVE SERVER...</span>
       </div>
     );
  }

  if (apiError) {
     return (
       <div className="w-full h-[450px] md:h-[500px] flex flex-col items-center justify-center text-red-500 bg-[var(--card)] rounded-3xl border border-red-500/30 mb-8 shadow-inner p-8 text-center">
         <span className="text-5xl mb-4">⚠️</span>
         <span className="font-bold uppercase tracking-widest text-lg text-white mb-2">API Error Detected</span>
         <pre className="text-xs bg-black/50 p-4 rounded-lg text-red-300 max-w-2xl overflow-auto border border-red-500/20 text-left">
           {JSON.stringify(apiError, null, 2)}
         </pre>
         <span className="text-sm mt-4 text-white">Please check your API key in .env.local</span>
       </div>
     );
  }

  const activeMatches = liveMatches.length > 0 ? liveMatches : upcomingMatches;
  const isLive = liveMatches.length > 0;

  if (activeMatches.length === 0) {
     return (
       <div className="w-full h-[450px] md:h-[500px] flex flex-col items-center justify-center text-[var(--text-secondary)] bg-[var(--card)] rounded-3xl border border-[var(--divider)] mb-8 shadow-inner">
         <span className="text-5xl mb-4">🏟️</span>
         <span className="font-bold uppercase tracking-widest text-lg text-[var(--text-primary)] text-center px-4">API Connected Successfully!</span>
         <span className="text-sm mt-2 text-center px-4">There are currently NO live or upcoming matches in the schedule.</span>
       </div>
     );
  }

  const currentMatch = activeMatches[currentIndex];
  const { fixture, league, teams, goals } = currentMatch;
  
  // Format score or show VS for upcoming
  const homeScore = isLive || fixture.status.short === 'FT' ? (goals?.home ?? 0) : '-';
  const awayScore = isLive || fixture.status.short === 'FT' ? (goals?.away ?? 0) : '-';
  
  // Format date for upcoming matches
  const matchDateObj = new Date(fixture.date);
  const formattedDate = matchDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative w-full h-[450px] md:h-[500px] rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl mb-8 group bg-[var(--card)]">
       {/* Background Split - Dynamically colorized */}
       <div className="absolute inset-0 flex transition-opacity duration-1000">
          <div className="w-1/2 h-full bg-gradient-to-br from-[#0B0C10] via-cyan-900/30 to-[#0B0C10] dark:from-cyan-900/40 dark:to-black"></div>
          <div className="w-1/2 h-full bg-gradient-to-bl from-[#0B0C10] via-fuchsia-900/30 to-[#0B0C10] dark:from-fuchsia-900/40 dark:to-black"></div>
       </div>

       {/* Top bar inside hero */}
       <div className="relative z-20 flex flex-col md:flex-row justify-between items-center w-full px-4 pt-6 md:pt-8 gap-4 md:gap-0">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 w-full md:w-auto">
             <div className="bg-black/40 backdrop-blur-md px-3 md:px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shrink-0">
                <span className="text-white font-bold text-[10px] md:text-xs uppercase">{league?.name || 'WORLD MATCH'}</span>
             </div>
             
             {isLive ? (
               <div className="bg-black/40 backdrop-blur-md px-3 md:px-4 py-1.5 rounded-full flex items-center gap-2 border border-[var(--live)]/50 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[var(--live)] animate-pulse shadow-[0_0_8px_var(--live)]"></span>
                  <span className="text-[var(--live)] font-bold text-[10px] md:text-xs tracking-wider uppercase">LIVE {fixture.status.elapsed ? `${fixture.status.elapsed}'` : fixture.status.short}</span>
               </div>
             ) : (
               <div className="bg-black/40 backdrop-blur-md px-3 md:px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/10 shrink-0">
                  <span className="text-[var(--primary)] font-bold text-[10px] md:text-xs tracking-wider uppercase">UPCOMING • {formattedDate}</span>
               </div>
             )}
          </div>
          
          <h1 className="text-sm md:text-xl font-bold tracking-widest uppercase text-center w-full md:w-auto md:ml-12 break-words text-white drop-shadow-md">
            {teams.home.name} vs {teams.away.name}
          </h1>
       </div>

       {/* Scoreboard - key={fixture.id} triggers re-render animation when sliding */}
       <div key={fixture.id} className="relative z-20 flex justify-center items-center w-full px-2 mt-4 md:mt-8 animate-in fade-in zoom-in duration-500">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-4 w-[35%] md:w-[40%] group-hover:-translate-x-4 transition-transform duration-500">
             <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-white/10 overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.2)] flex items-center justify-center bg-white/5 backdrop-blur-md p-3 md:p-6">
                <img src={teams.home.logo} alt={teams.home.name} className="w-full h-full object-contain drop-shadow-xl" />
             </div>
             <span className="text-xl md:text-4xl font-black uppercase tracking-wider text-white text-center drop-shadow-md truncate w-full max-w-[200px]">{teams.home.name.substring(0, 3)}</span>
          </div>

          {/* Score / VS */}
          <div className="flex flex-col items-center justify-center w-[30%] md:w-[20%]">
             <div className="flex items-center justify-center gap-3 md:gap-6 bg-black/60 backdrop-blur-xl px-5 md:px-10 py-4 md:py-8 rounded-3xl border border-white/10 shadow-2xl">
                {isLive ? (
                  <>
                    <span className="text-5xl md:text-7xl font-black text-white">{homeScore}</span>
                    <span className="text-3xl md:text-4xl font-black text-[var(--primary)] animate-pulse">:</span>
                    <span className="text-5xl md:text-7xl font-black text-white">{awayScore}</span>
                  </>
                ) : (
                  <span className="text-3xl md:text-5xl font-black text-[var(--text-secondary)] italic">VS</span>
                )}
             </div>
             <div className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white font-black text-[10px] md:text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                {fixture.status.long || "SCHEDULED"}
             </div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-4 w-[35%] md:w-[40%] group-hover:translate-x-4 transition-transform duration-500">
             <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-white/10 overflow-hidden shadow-[0_0_40px_rgba(226,0,116,0.2)] flex items-center justify-center bg-white/5 backdrop-blur-md p-3 md:p-6">
                <img src={teams.away.logo} alt={teams.away.name} className="w-full h-full object-contain drop-shadow-xl" />
             </div>
             <span className="text-xl md:text-4xl font-black uppercase tracking-wider text-white text-center drop-shadow-md truncate w-full max-w-[200px]">{teams.away.name.substring(0, 3)}</span>
          </div>
       </div>

       {/* Slideshow Indicators */}
       <div className="relative z-20 flex justify-center items-center gap-2 mb-4">
          {activeMatches.map((_, idx) => (
             <div 
               key={idx} 
               className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-[var(--primary)]' : 'w-2 bg-white/20'}`}
             />
          ))}
       </div>

       {/* Bottom spacing */}
       <div className="h-6 md:h-12 w-full relative z-20"></div>
    </div>
  );
}

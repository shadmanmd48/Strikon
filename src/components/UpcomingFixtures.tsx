"use client";
import React, { useEffect, useState } from 'react';

export function UpcomingFixtures() {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFixtures() {
      try {
        const res = await fetch('/api/fixtures/upcoming');
        const json = await res.json();
        
        if (json.success && json.data) {
          setFixtures(json.data);
        } else if (json.mockData) {
          setFixtures(json.mockData);
        } else {
          setError(json.message || "Failed to load fixtures");
        }
      } catch (err) {
        setError("Network error loading fixtures");
      } finally {
        setLoading(false);
      }
    }
    
    fetchFixtures();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 gap-4">
        <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest animate-pulse">Loading Schedule...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-[var(--card)] p-6 rounded-xl border border-red-500/30 text-center text-red-400">
        <p>⚠️ {error}</p>
      </div>
    );
  }

  if (fixtures.length === 0) {
    return (
      <div className="w-full bg-[var(--card)] p-6 rounded-xl border border-[var(--divider)] text-center text-[var(--text-secondary)]">
        <p>No upcoming fixtures found in the database.</p>
      </div>
    );
  }

  // Group fixtures by date
  const groupedFixtures = fixtures.reduce((acc: Record<string, any[]>, fixture: any) => {
    const dateObj = new Date(fixture.fixture.date);
    // Group by Day, Month Date (e.g., "Tuesday, June 16")
    const dateString = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    if (!acc[dateString]) acc[dateString] = [];
    acc[dateString].push(fixture);
    return acc;
  }, {});

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {Object.entries(groupedFixtures).map(([dateLabel, dateFixtures]) => (
        <div key={dateLabel}>
          <div className="sticky top-16 z-20 bg-[var(--background)]/90 backdrop-blur-md py-2 border-b border-[var(--divider)] mb-4">
             <h3 className="font-bold text-sm text-[var(--text-primary)]">{dateLabel}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {dateFixtures.map((item: any) => {
               const { fixture, league, teams } = item;
               const matchTime = new Date(fixture.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
               
               return (
                 <div key={fixture.id} className="bg-[var(--card)] hover:bg-[var(--card-hover)] border border-[var(--divider)] rounded-xl p-4 transition-colors cursor-pointer group shadow-sm hover:shadow-md">
                    <div className="flex justify-between items-center text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                       <span className="truncate max-w-[150px]">{league.name} {league.round && `- ${league.round}`}</span>
                       <span className="shrink-0">{matchTime}</span>
                    </div>
                    <div className="flex flex-col gap-3">
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                             <img src={teams.home.logo} className="w-6 h-6 rounded-full border border-[var(--divider)] bg-white object-contain p-0.5" alt={teams.home.name} />
                             <span className="font-bold text-sm text-[var(--text-primary)] truncate max-w-[140px] group-hover:text-white transition-colors">{teams.home.name}</span>
                          </div>
                          <span className="font-black text-lg text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">-</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                             <img src={teams.away.logo} className="w-6 h-6 rounded-full border border-[var(--divider)] bg-white object-contain p-0.5" alt={teams.away.name} />
                             <span className="font-bold text-sm text-[var(--text-primary)] truncate max-w-[140px] group-hover:text-white transition-colors">{teams.away.name}</span>
                          </div>
                          <span className="font-black text-lg text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">-</span>
                       </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--divider)] text-[10px] text-[var(--text-secondary)] font-semibold flex items-center justify-between">
                       <span className="truncate max-w-[150px]">{fixture.venue.name ? `${fixture.venue.name}, ${fixture.venue.city}` : "TBD"}</span>
                       <span className="text-[var(--primary)] group-hover:underline shrink-0 font-black tracking-widest uppercase">Match Center</span>
                    </div>
                 </div>
               );
             })}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Match } from "@/lib/mockData";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TABS = ["Overview", "Timeline", "Statistics", "Lineups"];

export function MatchTabs({ match }: { match: Match }) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 border-b border-[var(--divider)]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "relative px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
              activeTab === tab ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)]"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content (Mock placeholders for now) */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--card)] rounded-2xl border border-[var(--divider)] p-6"
          >
            {activeTab === "Overview" && (
              <div className="space-y-6">
                <h4 className="font-bold text-lg">Match Overview</h4>
                <div className="space-y-4">
                  <StatRow label="Possession" home="54%" away="46%" />
                  <StatRow label="Expected Goals (xG)" home="2.1" away="1.8" />
                  <StatRow label="Shots" home="12" away="9" />
                  <StatRow label="Shots on Target" home="5" away="4" />
                  <StatRow label="Pass Accuracy" home="88%" away="82%" />
                </div>
              </div>
            )}

            {activeTab === "Timeline" && (
              <div className="space-y-6">
                <h4 className="font-bold text-lg">Match Timeline</h4>
                <div className="relative border-l-2 border-[var(--divider)] ml-4 space-y-8 pb-4">
                  <TimelineEvent time="23'" title="Goal! Lionel Messi" team="home" type="goal" />
                  <TimelineEvent time="34'" title="Yellow Card! O. Dembélé" team="away" type="card" />
                  <TimelineEvent time="45+2'" title="Half Time" type="info" />
                  <TimelineEvent time="55'" title="Substitution (FRA)" type="sub" />
                  <TimelineEvent time="80'" title="Goal! K. Mbappe" team="away" type="goal" />
                </div>
              </div>
            )}
            
            {activeTab === "Statistics" && (
              <div className="flex flex-col items-center justify-center py-12 text-[var(--text-secondary)]">
                <div className="w-16 h-16 rounded-full bg-[var(--divider)] mb-4 animate-pulse" />
                <p>Detailed charts loading...</p>
              </div>
            )}
            
            {activeTab === "Lineups" && (
              <div className="flex flex-col items-center justify-center py-12 text-[var(--text-secondary)]">
                <div className="w-full aspect-[2/3] max-w-sm rounded-xl bg-green-900/20 mb-4 animate-pulse" />
                <p>Pitch view loading...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatRow({ label, home, away }: { label: string; home: string; away: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[var(--divider)] last:border-0">
      <span className="w-16 font-semibold text-center">{home}</span>
      <span className="flex-1 text-center text-sm text-[var(--text-secondary)] font-medium">{label}</span>
      <span className="w-16 font-semibold text-center">{away}</span>
    </div>
  );
}

function TimelineEvent({ time, title, type, team }: { time: string; title: string; type: string; team?: "home" | "away" }) {
  const IconColor = type === "goal" ? "bg-[var(--success)]" : type === "card" ? "bg-[var(--warning)]" : "bg-[var(--divider)]";
  
  return (
    <div className="relative pl-6">
      <div className={cn("absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-[var(--card)]", IconColor)} />
      <div className="flex items-start gap-4">
        <span className="font-bold text-sm min-w-[3ch]">{time}</span>
        <div>
          <p className="font-semibold">{title}</p>
        </div>
      </div>
    </div>
  );
}

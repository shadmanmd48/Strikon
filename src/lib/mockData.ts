export type MatchStatus = "LIVE" | "FINISHED" | "SCHEDULED";

export interface Team {
  id: string;
  name: string;
  shortName: string;
  code: string;
  logo: string;
  color: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  minute: number;
  date: string;
  competition: string;
  stadium: string;
}

export const TEAMS: Record<string, Team> = {
  arg: { id: "arg", name: "Argentina", shortName: "Argentina", code: "ARG", logo: "https://flagcdn.com/w160/ar.png", color: "#43A1D5" },
  fra: { id: "fra", name: "France", shortName: "France", code: "FRA", logo: "https://flagcdn.com/w160/fr.png", color: "#002395" },
  bra: { id: "bra", name: "Brazil", shortName: "Brazil", code: "BRA", logo: "https://flagcdn.com/w160/br.png", color: "#FFDF00" },
  eng: { id: "eng", name: "England", shortName: "England", code: "ENG", logo: "https://flagcdn.com/w160/gb-eng.png", color: "#FFFFFF" },
  por: { id: "por", name: "Portugal", shortName: "Portugal", code: "POR", logo: "https://flagcdn.com/w160/pt.png", color: "#FF0000" },
  esp: { id: "esp", name: "Spain", shortName: "Spain", code: "ESP", logo: "https://flagcdn.com/w160/es.png", color: "#AA151B" },
};

export const MOCK_MATCHES: Match[] = [
  {
    id: "m1",
    homeTeam: TEAMS.arg,
    awayTeam: TEAMS.fra,
    homeScore: 3,
    awayScore: 3,
    status: "LIVE",
    minute: 118,
    date: new Date().toISOString(),
    competition: "World Cup Final",
    stadium: "Lusail Stadium",
  },
  {
    id: "m2",
    homeTeam: TEAMS.bra,
    awayTeam: TEAMS.eng,
    homeScore: 1,
    awayScore: 0,
    status: "LIVE",
    minute: 45,
    date: new Date().toISOString(),
    competition: "World Cup Quarter-Final",
    stadium: "Al Bayt Stadium",
  },
  {
    id: "m3",
    homeTeam: TEAMS.por,
    awayTeam: TEAMS.esp,
    homeScore: 0,
    awayScore: 0,
    status: "SCHEDULED",
    minute: 0,
    date: new Date(Date.now() + 86400000).toISOString(),
    competition: "World Cup Semi-Final",
    stadium: "Education City Stadium",
  },
];

export const MOCK_NEWS = [
  {
    id: "n1",
    title: "Messi's Masterclass Secures Final Spot for Argentina",
    excerpt: "Lionel Messi puts on a show as Argentina defeats Croatia to reach the World Cup Final.",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop",
    date: new Date().toISOString(),
    category: "Match Report",
  },
  {
    id: "n2",
    title: "Mbappe Wins Golden Boot After Thrilling Final",
    excerpt: "The French superstar becomes the second player ever to score a hat-trick in a World Cup final.",
    image: "https://images.unsplash.com/photo-1518605368461-1ee5110d7e47?q=80&w=600&auto=format&fit=crop",
    date: new Date(Date.now() - 86400000).toISOString(),
    category: "News",
  }
];

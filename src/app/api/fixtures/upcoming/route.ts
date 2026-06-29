import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    // Return mock data if API key is not configured yet
    return NextResponse.json({
      success: false,
      message: "API Key is not configured in .env.local",
      mockData: [
        {
          fixture: { id: 101, date: "2026-06-11T16:00:00+00:00", venue: { name: "Estadio Azteca", city: "Mexico City" }, status: { short: "NS" } },
          league: { name: "World Cup 2026", round: "Group A" },
          teams: { home: { name: "Mexico", logo: "https://media.api-sports.io/football/teams/16.png" }, away: { name: "TBD", logo: "https://media.api-sports.io/football/teams/6.png" } }
        }
      ]
    });
  }

  try {
    // Strictly fetch FIFA World Cup (League 1) for the 2026 tournament.
    const response = await fetch(`https://v3.football.api-sports.io/fixtures?league=1&season=2026`, {
      headers: {
        "x-apisports-key": apiKey
      },
      cache: 'no-store'
    });

    const data = await response.json();
    
    // Check for API errors
    if (data.errors && (Array.isArray(data.errors) ? data.errors.length > 0 : Object.keys(data.errors).length > 0)) {
       return NextResponse.json({ success: false, apiError: data.errors });
    }

    // Limit to 15 matches for the UI
    const matches = data.response ? data.response.slice(0, 15) : [];

    return NextResponse.json({ success: true, data: matches });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error connecting to API" }, { status: 500 });
  }
}

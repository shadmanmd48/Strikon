import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    // Return mock data if API key is not configured yet
    return NextResponse.json({
      success: false,
      message: "API Key is not configured in .env.local",
      mockData: {
        fixture: { id: 1, status: { short: "2H", elapsed: 72 } },
        teams: {
          home: { name: "Argentina", logo: "https://media.api-sports.io/football/teams/26.png" },
          away: { name: "France", logo: "https://media.api-sports.io/football/teams/17.png" }
        },
        goals: { home: 2, away: 1 }
      }
    });
  }

  try {
    // Using direct API-Sports endpoint. league=1 restricts it strictly to FIFA World Cup matches.
    const response = await fetch("https://v3.football.api-sports.io/fixtures?live=all&league=1", {
      headers: {
        "x-apisports-key": apiKey
      },
      cache: 'no-store' // Disable caching temporarily for debugging
    });

    const data = await response.json();
    
    // API-Sports returns errors in the "errors" object
    if (data.errors && (Array.isArray(data.errors) ? data.errors.length > 0 : Object.keys(data.errors).length > 0)) {
       return NextResponse.json({ success: false, apiError: data.errors });
    }

    return NextResponse.json({ success: true, data: data.response });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error connecting to API" }, { status: 500 });
  }
}

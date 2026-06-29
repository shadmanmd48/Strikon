const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env.local');
const envData = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envData.match(/RAPIDAPI_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

if (!apiKey) {
  console.error("Could not find RAPIDAPI_KEY");
  process.exit(1);
}

async function checkLeague() {
  try {
    // Check available seasons for World Cup (league 1)
    const res = await fetch("https://v3.football.api-sports.io/leagues?id=1", {
      headers: { "x-apisports-key": apiKey }
    });
    const data = await res.json();
    
    if (data.response && data.response.length > 0) {
      console.log("Available Seasons for World Cup (League 1):");
      data.response[0].seasons.forEach(s => {
        console.log(`Season: ${s.year}, Current: ${s.current}`);
      });
    } else {
      console.log("No league data found or error:", data);
    }
  } catch (e) {
    console.error(e);
  }
}

checkLeague();

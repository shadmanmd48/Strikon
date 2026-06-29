const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env.local');
const envData = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envData.match(/RAPIDAPI_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

async function check() {
  try {
    const res = await fetch("https://v3.football.api-sports.io/fixtures?league=1&season=2026", {
      headers: { "x-apisports-key": apiKey }
    });
    const data = await res.json();
    
    fs.writeFileSync(path.resolve(__dirname, 'test_2026.json'), JSON.stringify({
      errors: data.errors,
      results: data.results,
      firstMatch: data.response ? data.response[0] : null,
      length: data.response ? data.response.length : 0
    }, null, 2));
    
    console.log("Successfully wrote test_2026.json with", data.response?.length, "items.");
  } catch(e) {
    console.error("Failed", e);
  }
}
check();

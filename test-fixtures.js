const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env.local');
const envData = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envData.match(/RAPIDAPI_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

async function checkFixtures() {
  const res = await fetch("https://v3.football.api-sports.io/fixtures?league=1&season=2026", {
    headers: { "x-apisports-key": apiKey }
  });
  const data = await res.json();
  console.log(`Found ${data.response?.length || 0} fixtures for 2026.`);
}

checkFixtures();

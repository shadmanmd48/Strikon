const fs = require('fs');
const path = require('path');

// Load env vars from .env.local manually for this simple script
const envPath = path.resolve(__dirname, '.env.local');
const envData = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envData.match(/RAPIDAPI_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

if (!apiKey) {
  console.error("Could not find RAPIDAPI_KEY in .env.local");
  process.exit(1);
}

async function testApi() {
  console.log("Fetching recent matches to inspect data structure...");
  
  try {
    // Fetch 1 recent completed match from the English Premier League (League ID: 39)
    const response = await fetch("https://v3.football.api-sports.io/fixtures?league=39&season=2023&status=FT&last=1", {
      headers: {
        "x-apisports-key": apiKey
      }
    });

    const data = await response.json();
    
    if (data.errors && Object.keys(data.errors).length > 0) {
      console.error("API Error:", data.errors);
      return;
    }

    // Save the result to a JSON file so you can inspect it
    const outputPath = path.resolve(__dirname, 'api_sample_data.json');
    fs.writeFileSync(outputPath, JSON.stringify(data.response[0], null, 2));
    
    console.log(`Success! Saved sample data to: ${outputPath}`);
    
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

testApi();

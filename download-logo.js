const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  // A raw github repo with the 2026 logo
  "https://raw.githubusercontent.com/x-knd/fifa-world-cup-2026/main/public/logo.png",
  "https://raw.githubusercontent.com/abhishek02b/fifa-world-cup-2026/main/public/logo.png",
  // Seeklogo via a different mirror
  "https://seeklogo.com/images/F/fifa-world-cup-2026-logo-4C5C0766EB-seeklogo.com.png",
  // A generic world cup trophy if all else fails
  "https://media.api-sports.io/football/leagues/1.png"
];

async function download() {
  const dest = path.resolve(__dirname, 'public', 'fifa26.png');
  
  for (let url of urls) {
    console.log("Trying:", url);
    try {
      await new Promise((resolve, reject) => {
        https.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
          }
        }, (res) => {
          if (res.statusCode === 200) {
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => {
              file.close();
              console.log("SUCCESS:", url);
              resolve();
            });
          } else if (res.statusCode === 301 || res.statusCode === 302) {
             console.log("Redirected...");
             reject(new Error("Redirect"));
          } else {
            console.log("Failed with status:", res.statusCode);
            reject(new Error(`Status ${res.statusCode}`));
          }
        }).on('error', reject);
      });
      return; // Stop if successful
    } catch(e) {
      console.log("Error:", e.message);
    }
  }
}

download();

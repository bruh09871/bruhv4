// getEmbedUrl.js
import fetch from "node-fetch"; // If using Node 18+, fetch is built-in, no need to import

// Replace with your premium Hyperbeam API key
const API_KEY = "YOUR_HYPERBEAM_API_KEY_HERE";

// Optional: URL you want the VM to open first
const START_URL = "https://google.com";

async function createVM() {
  try {
    const res = await fetch("https://engine.hyperbeam.com/v0/vm", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: START_URL })
    });

    const data = await res.json();
    console.log("Embed URL:", data.embed_url);
  } catch (err) {
    console.error("Error creating VM:", err);
  }
}

createVM();

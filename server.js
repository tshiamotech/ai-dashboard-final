import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = process.env.FOOTBALL_API_KEY;

// Example: API-Football (recommended)
const FOOTBALL_API_URL = "https://v3.football.api-sports.io/fixtures?next=1";

app.get("/football", async (req, res) => {
  try {
    const response = await fetch(FOOTBALL_API_URL, {
      headers: {
        "x-apisports-key": API_KEY
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Football API error" });
  }
});

app.get("/", (req, res) => {
  res.send("Football proxy running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on ${PORT}`));

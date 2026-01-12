import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.FOOTBALL_API_KEY;

/* Root check */
app.get("/", (req, res) => {
  res.send("Football proxy running");
});

/* FOOTBALL ENDPOINT */
app.get("/football", async (req, res) => {
  try {
    if (!API_KEY) {
      return res.status(500).json({ error: "API key missing" });
    }

    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?next=1",
      {
        headers: {
          "x-apisports-key": API_KEY
        }
      }
    );

    const data = await response.json();

    if (!data.response || data.response.length === 0) {
      return res.json({ message: "No live football data available" });
    }

    const match = data.response[0];

    res.json({
      home: match.teams.home.name,
      away: match.teams.away.name,
      kickoff: match.fixture.date
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Football proxy running on port ${PORT}`);
});

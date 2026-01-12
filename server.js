console.log("SERVER FILE LOADED");

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.FOOTBALL_API_KEY;

/* ROOT */
app.get("/", (req, res) => {
  res.send("Football proxy running");
});

/* FOOTBALL ROUTE */
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

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Football proxy running on port ${PORT}`);
});



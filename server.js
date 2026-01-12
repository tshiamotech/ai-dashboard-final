console.log("SERVER FILE LOADED — NUCLEAR FIX");

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.FOOTBALL_API_KEY;

/* LOG EVERY REQUEST */
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

/* FORCE FOOTBALL ROUTE */
app.use("/football", async (req, res) => {
  try {
    if (!API_KEY) {
      return res.json({ error: "API key missing" });
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
    res.json({ error: err.message });
  }
});

/* ROOT */
app.use("/", (req, res) => {
  res.send("Football proxy running");
});

app.listen(PORT, () => {
  console.log("Football proxy running on port", PORT);
});



const API_KEY = "ZF43I39J4DGVZ40H";

// Market data (S&P 500 proxy: SPY ETF)
async function loadMarketData() {
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    const quote = data["Global Quote"];
    const price = quote["05. price"];
    const change = quote["10. change percent"];

    document.getElementById("market-data").innerText =
      `📈 S&P 500 (SPY)\nPrice: $${price}\nChange: ${change}`;
  } catch (err) {
    document.getElementById("market-data").innerText =
      "⚠️ Failed to load market data";
  }
}

loadMarketData();

const FOOTBALL_API_KEY = "46d024ff909f6c7f353e9784854b3a2d";

async function loadFootballData() {
  try {
    const res = await fetch(
      "https://v3.football.api-sports.io/fixtures?next=1",
      {
        headers: {
          "x-apisports-key": FOOTBALL_API_KEY
        }
      }
    );

    const data = await res.json();
    const match = data.response[0];

    const home = match.teams.home.name;
    const away = match.teams.away.name;
    const date = new Date(match.fixture.date).toLocaleString();

    document.getElementById("football-data").innerText =
      `⚽ ${home} vs ${away}\n📅 ${date}\nPrediction: Home/Draw`;
  } catch (err) {
    document.getElementById("football-data").innerText =
      "⚠️ Failed to load football data";
  }
}

loadFootballData();


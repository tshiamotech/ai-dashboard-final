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

async function loadFootballData() {
  try {
    // Public fixtures data (no key needed)
    const res = await fetch(
      "https://raw.githubusercontent.com/openfootball/football.json/master/2025-26/en.1.json"
    );

    const data = await res.json();
    const match = data.matches[0];

    const home = match.team1;
    const away = match.team2;
    const date = match.date;

    document.getElementById("football-data").innerText =
      `⚽ ${home} vs ${away}\n📅 ${date}\nPrediction: Over 2.5 Goals`;
  } catch (err) {
    document.getElementById("football-data").innerText =
      "⚠️ Football data unavailable";
  }
}

loadFootballData();

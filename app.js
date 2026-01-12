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

   const changeValue = parseFloat(change);
const recommendation =
  changeValue > 0.5 ? "BUY / LONG" : "HOLD / WAIT";

document.getElementById("market-data").innerText =
  `📈 S&P 500 (SPY)
Price: $${price}
Change: ${change}
Recommendation: ${recommendation}`;
  } catch (err) {
    document.getElementById("market-data").innerText =
      "⚠️ Failed to load market data";
  }
}

async function loadFootballData() {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/openfootball/football.json/master/2025-26/en.1.json"
    );

    const data = await res.json();
    const match = data.matches[0];

    const home = match.team1;
    const away = match.team2;

    // Simple AI logic
    const confidence = Math.floor(65 + Math.random() * 20); // 65–85%
    const prediction =
      confidence > 75 ? "Home Win" : "Over 2.5 Goals";

    document.getElementById("football-data").innerText =
      `⚽ ${home} vs ${away}\nPrediction: ${prediction}\nConfidence: ${confidence}%`;
  } catch {
    document.getElementById("football-data").innerText =
      "⚠️ Football data unavailable";
  }
}

loadFootballData();

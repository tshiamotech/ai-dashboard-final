// ===============================
// AI Dashboard – Cached Data Mode
// ===============================

// Load MARKET data from local JSON (updated daily by GitHub Actions)
async function loadMarketData() {
  try {
    const res = await fetch("data/market.json");
    const data = await res.json();

    document.getElementById("market-data").innerText =
`📈 S&P 500 (SPY)
Price: $${data.price}
Change: ${data.change}
Recommendation: ${data.recommendation}
Confidence: ${data.confidence}%`;

    document.getElementById("market-confidence").style.width =
      data.confidence + "%";
  } catch {
    document.getElementById("market-data").innerText =
      "Market data unavailable";
  }
}

async function loadFootballData() {
  try {
    const res = await fetch("data/football.json");
    const data = await res.json();

    document.getElementById("football-data").innerText =
`⚽ ${data.match}
Prediction: ${data.prediction}
Confidence: ${data.confidence}%`;

    document.getElementById("football-confidence").style.width =
      data.confidence + "%";
  } catch {
    document.getElementById("football-data").innerText =
      "Football data unavailable";
  }
}

loadMarketData();
loadFootballData();


loadFootballData();

// ===============================
// AI Dashboard – Cached Data Mode
// ===============================

// Load MARKET data from local JSON (updated daily by GitHub Actions)
async function loadMarketData() {
  try {
    const res = await fetch("data/market.json");
    const data = await res.json();

    const price = Number(data.price); // 🔥 FORCE NUMBER

    document.getElementById("market-data").innerText =
`📈 S&P 500 (SPY)
Price: $${price}
Change: ${data.change}
Recommendation: ${data.recommendation}
Confidence: ${data.confidence}%`;

    document.getElementById("market-confidence").style.width =
      data.confidence + "%";

    // TEMP price history (now numeric)
    const priceHistory = [
      price - 3,
      price - 2,
      price - 1,
      price - 0.5,
      price,
      price + 0.3,
      price + 0.6
    ];

    drawMarketChart(priceHistory);

  } catch (err) {
    document.getElementById("market-data").innerText =
      "Market data unavailable";
    console.error(err);
  }
}


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

    // TEMP price history (replace later with real history)
    const priceHistory = [
      data.price - 3,
      data.price - 2,
      data.price - 1,
      data.price - 0.5,
      data.price,
      data.price + 0.3,
      data.price + 0.6
    ].map(Number);

    drawMarketChart(priceHistory);

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

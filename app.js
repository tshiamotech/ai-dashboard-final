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
  } catch (err) {
    document.getElementById("market-data").innerText =
      "Market data unavailable";
    console.error(err);
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
  } catch (err) {
    document.getElementById("football-data").innerText =
      "Football data unavailable";
    console.error(err);
  }
}

loadMarketData();
loadFootballData();

setInterval(loadMarketData, 300000);   // 5 minutes
setInterval(loadFootballData, 300000); // 5 minutes


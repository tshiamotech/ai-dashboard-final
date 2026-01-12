async function loadMarketData() {
  const res = await fetch("data/market.json");
  const data = await res.json();

  document.getElementById("market-data").innerText =
`📈 S&P 500 (SPY)
Price: $${data.price}
Change: ${data.change}
Recommendation: ${data.recommendation}
Confidence: ${data.confidence}%`;
}

async function loadFootballData() {
  const res = await fetch("data/football.json");
  const data = await res.json();

  document.getElementById("football-data").innerText =
`⚽ ${data.match}
Prediction: ${data.prediction}
Confidence: ${data.confidence}%`;
}

loadMarketData();
loadFootballData();

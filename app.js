async function loadMarket() {
  const res = await fetch("data/market.json?v=debug123");
  const data = await res.json();

  console.log("MARKET JSON LOADED:", data);

  document.getElementById("market").innerHTML = `
    <h2>Market Insights</h2>
    <p>📈 S&P 500 (SPY)</p>
    <p>Price: $${data.price}</p>
    <p>Change: ${data.change}</p>
    <p>Recommendation: ${data.recommendation}</p>
    <p>Confidence: ${data.confidence}%</p>
    <p>Last updated: ${data.lastUpdated}</p>
  `;
}

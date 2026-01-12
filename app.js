// ===============================
// AI Dashboard – Cached Data Mode
// ===============================

// Load MARKET data from local JSON (updated daily by GitHub Actions)
async function loadMarketData() {
  try {
    const res = await fetch("data/market.json");
    const data = await res.json();

    document.getElementById("marketStatus").innerHTML = `
      📈 S&P 500 (SPY)<br>
      Price: $${data.price}<br>
      Change: ${data.change}<br>
      Recommendation: ${data.recommendation}<br>
      Confidence: ${data.confidence}%
    `;

    renderChart(data.price);
  } catch (err) {
    document.getElementById("marketStatus").textContent =
      "Market data unavailable";
    console.error(err);
  }
}

function renderChart(price) {
  const ctx = document.getElementById("marketChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Yesterday", "Today"],
      datasets: [
        {
          label: "SPY Price",
          data: [price * 0.98, price],
          borderWidth: 2
        }
      ]
    }
  });
}

loadMarketData();

// ===============================
// AI Dashboard – Cached Data Mode
// ===============================

// Load MARKET data from local JSON (updated daily by GitHub Actions)
function drawMarketChart(prices) {
  const canvas = document.getElementById("marketChart");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const max = Math.max(...prices);
  const min = Math.min(...prices);

  const padding = 20;
  const scaleX = (canvas.width - padding * 2) / (prices.length - 1);
  const scaleY = (canvas.height - padding * 2) / (max - min);

  ctx.beginPath();
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 2;

  prices.forEach((price, i) => {
    const x = padding + i * scaleX;
    const y = canvas.height - padding - (price - min) * scaleY;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });

  ctx.stroke();
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

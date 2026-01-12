/***********************
 * AI MARKET LOGIC
 ***********************/
function marketAIPredict(data) {
  let score = 0;
  let reasons = [];

  // Trend logic
  if (data.trend === "up") {
    score += 30;
    reasons.push("Uptrend confirmed");
  } else if (data.trend === "down") {
    score -= 30;
    reasons.push("Downtrend detected");
  }

  // Momentum logic
  if (data.changePercent > 0.5) {
    score += 20;
    reasons.push("Strong positive momentum");
  } else if (data.changePercent < -0.5) {
    score -= 20;
    reasons.push("Strong negative momentum");
  }

  // RSI logic
  if (data.rsi >= 55 && data.rsi < 70) {
    score += 20;
    reasons.push("Healthy RSI");
  } else if (data.rsi >= 70) {
    score -= 20;
    reasons.push("Overbought market");
  } else if (data.rsi < 45) {
    score -= 10;
    reasons.push("Weak RSI");
  }

  // Final decision
  let recommendation = "HOLD";
  if (score >= 50) recommendation = "BUY / LONG";
  if (score <= -30) recommendation = "SELL / SHORT";

  return {
    recommendation,
    confidence: Math.min(Math.abs(score), 100),
    reasons
  };
}

/***********************
 * LOAD MARKET DATA
 ***********************/
async function loadMarketData() {
  try {
    const res = await fetch("data/market.json");
    const data = await res.json();

    const ai = marketAIPredict(data);

    document.getElementById("market-data").innerText =
`📈 S&P 500 (SPY)
Price: $${data.price}
Change: ${data.changePercent}%
RSI: ${data.rsi}
Trend: ${data.trend.toUpperCase()}

AI Recommendation: ${ai.recommendation}
Confidence: ${ai.confidence}%

Reasoning:
- ${ai.reasons.join("\n- ")}`;

    updateChart(data.price);
  } catch (err) {
    document.getElementById("market-data").innerText =
      "Market data unavailable";
    console.error(err);
  }
}

/***********************
 * LOAD FOOTBALL DATA
 ***********************/
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

/***********************
 * CHART LOGIC
 ***********************/
let marketChart;

function updateChart(price) {
  const ctx = document.getElementById("marketChart").getContext("2d");

  if (!marketChart) {
    marketChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Previous", "Current"],
        datasets: [{
          label: "SPY Price",
          data: [price - 4, price],
          borderWidth: 2
        }]
      }
    });
  } else {
    marketChart.data.datasets[0].data = [price - 4, price];
    marketChart.update();
  }
}

/***********************
 * INIT + AUTO UPDATE
 ***********************/
loadMarketData();
loadFootballData();

setInterval(loadMarketData, 300000);   // 5 minutes
setInterval(loadFootballData, 300000); // 5 minutes

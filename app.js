/***********************
 * MARKET AI LOGIC
 ***********************/
function marketAIPredict(data) {
  let score = 0;
  let reasons = [];

  if (data.trend === "up") {
    score += 30;
    reasons.push("Uptrend confirmed");
  } else if (data.trend === "down") {
    score -= 30;
    reasons.push("Downtrend detected");
  }

  if (data.changePercent > 0.5) {
    score += 20;
    reasons.push("Strong positive momentum");
  } else if (data.changePercent < -0.5) {
    score -= 20;
    reasons.push("Strong negative momentum");
  }

  if (data.rsi >= 55 && data.rsi < 70) {
    score += 20;
    reasons.push("Healthy RSI");
  } else if (data.rsi >= 70) {
    score -= 20;
    reasons.push("Overbought");
  }

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
 * FOOTBALL AI LOGIC
 ***********************/
function footballAIPredict(data) {
  let score = 0;
  let reasons = [];

  // Team strength
  if (data.homeStrength > data.awayStrength) {
    score += 20;
    reasons.push("Home team stronger");
  } else {
    score -= 10;
    reasons.push("Away team stronger");
  }

  // Recent form
  if (data.homeForm >= 3) {
    score += 15;
    reasons.push("Strong home form");
  }
  if (data.awayForm <= 2) {
    score += 10;
    reasons.push("Weak away form");
  }

  // Goals logic
  if (data.avgGoals >= 2.5) {
    score += 25;
    reasons.push("High scoring teams");
  } else {
    score -= 15;
    reasons.push("Low scoring trend");
  }

  // Odds logic
  if (data.over25Odds < 1.8) {
    score += 20;
    reasons.push("Bookmakers favor goals");
  }

  let prediction = "Under 2.5 Goals";
  if (score >= 40) prediction = "Over 2.5 Goals";

  return {
    prediction,
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

    const ai = footballAIPredict(data);

    document.getElementById("football-data").innerText =
`⚽ ${data.match}

AI Prediction: ${ai.prediction}
Confidence: ${ai.confidence}%

Reasoning:
- ${ai.reasons.join("\n- ")}`;
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

setInterval(loadMarketData, 300000);
setInterval(loadFootballData, 300000);

// =====================
// CONFIG
// =====================
const MARKET_API = "./data/market.json";
const FOOTBALL_API = "https://football-proxy-romn.onrender.com/football";

// =====================
// MARKET DATA
// =====================
async function loadMarket() {
  try {
    const res = await fetch(MARKET_API);
    const data = await res.json();

    document.getElementById("market").innerHTML = `
      <p><strong>📈 S&P 500 (SPY)</strong></p>
      <p>Price: $${data.price}</p>
      <p>Change: ${data.change}</p>
      <p>Recommendation: ${data.recommendation}</p>
      <p>Confidence: ${data.confidence}%</p>
      <small>Last updated: ${data.lastUpdated}</small>
    `;

    drawMarketChart(data.confidence);
  } catch (e) {
    document.getElementById("market").innerText = "Market data unavailable";
  }
}

// =====================
// FOOTBALL DATA
// =====================
async function loadFootball() {
  try {
    const res = await fetch(FOOTBALL_API);
    const data = await res.json();

    if (!data.response || data.response.length === 0) {
      document.getElementById("football").innerText =
        "No live football matches right now.";
      return;
    }

    const match = data.response[0];

    document.getElementById("football").innerHTML = `
      <p><strong>⚽ ${match.teams.home.name} vs ${match.teams.away.name}</strong></p>
      <p>Score: ${match.goals.home} - ${match.goals.away}</p>
      <p>Status: ${match.fixture.status.long}</p>
      <p>Prediction: Over 2.5 Goals</p>
      <p>Confidence: 78%</p>
    `;

    drawFootballChart(match.goals.home, match.goals.away);
  } catch (e) {
    document.getElementById("football").innerText =
      "Live football data unavailable";
  }
}

// =====================
// CHARTS
// =====================
function drawMarketChart(confidence) {
  const ctx = document.getElementById("marketChart");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Confidence", "Risk"],
      datasets: [
        {
          data: [confidence, 100 - confidence]
        }
      ]
    }
  });
}

function drawFootballChart(home, away) {
  const ctx = document.getElementById("footballChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Home", "Away"],
      datasets: [
        {
          label: "Goals",
          data: [home, away]
        }
      ]
    }
  });
}

// =====================
// INIT
// =====================
loadMarket();
loadFootball();
setInter

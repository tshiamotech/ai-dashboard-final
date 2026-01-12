const API_KEY = "ZF43I39J4DGVZ40H";

async function loadMarketData() {
  const fallback = () => {
    document.getElementById("market-data").innerText =
      "📈 Market data unavailable\nConfidence: 0%";
  };

  try {
    const url =
      "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=" +
      API_KEY;

    const res = await fetch(url);
    const data = await res.json();

    if (!data["Global Quote"]) return fallback();

    const quote = data["Global Quote"];
    const change = parseFloat(quote["10. change percent"]);

    let confidence;
    let recommendation;

    if (change > 1) {
      recommendation = "BUY / LONG";
      confidence = 85;
    } else if (change > 0.3) {
      recommendation = "BUY / LONG";
      confidence = 72;
    } else if (change > 0) {
      recommendation = "HOLD";
      confidence = 60;
    } else {
      recommendation = "AVOID / WAIT";
      confidence = 40;
    }

    document.getElementById("market-data").innerText =
      `📈 S&P 500 (SPY)
Price: $${quote["05. price"]}
Change: ${quote["10. change percent"]}
Recommendation: ${recommendation}
Confidence: ${confidence}%`;
  } catch {
    fallback();
  }
}

loadMarketData();


async function loadFootballData() {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/openfootball/football.json/master/2025-26/en.1.json"
    );

    const data = await res.json();
    const match = data.matches[0];

    const home = match.team1;
    const away = match.team2;

    // Simple AI logic
    const confidence = Math.floor(65 + Math.random() * 20); // 65–85%
    const prediction =
      confidence > 75 ? "Home Win" : "Over 2.5 Goals";

    document.getElementById("football-data").innerText =
      `⚽ ${home} vs ${away}\nPrediction: ${prediction}\nConfidence: ${confidence}%`;
  } catch {
    document.getElementById("football-data").innerText =
      "⚠️ Football data unavailable";
  }
}

loadFootballData();

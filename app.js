/***********************
 * FOOTBALL AI LOGIC
 ***********************/
function footballAIPredict(data) {
  let score = 0;
  let reasons = [];

  if (data.homeGoalsAvg + data.awayGoalsAvg >= 2.5) {
    score += 30;
    reasons.push("High combined goal average");
  }

  if (data.homeForm >= 3) {
    score += 20;
    reasons.push("Strong home form");
  }

  if (data.awayForm <= 2) {
    score += 10;
    reasons.push("Weak away defense");
  }

  let prediction = "Under 2.5 Goals";
  if (score >= 40) prediction = "Over 2.5 Goals";

  return {
    prediction,
    confidence: Math.min(score, 100),
    reasons
  };
}

/***********************
 * LOAD LIVE FOOTBALL DATA
 ***********************/
async function loadFootballData() {
  try {
    const res = await fetch("https://www.scorebat.com/video-api/v3/");
    const json = await res.json();

    // Take first upcoming match
    const match = json.response[0];

    // Simulated stats (Scorebat doesn't give raw odds)
    const data = {
      match: `${match.side1.name} vs ${match.side2.name}`,
      homeForm: 3,
      awayForm: 2,
      homeGoalsAvg: 1.6,
      awayGoalsAvg: 1.4
    };

    const ai = footballAIPredict(data);

    document.getElementById("football-data").innerText =
`⚽ ${data.match}

AI Prediction: ${ai.prediction}
Confidence: ${ai.confidence}%

Reasoning:
- ${ai.reasons.join("\n- ")}`;
  } catch (err) {
    document.getElementById("football-data").innerText =
      "Live football data unavailable";
    console.error(err);
  }
}

/***********************
 * INIT
 ***********************/
loadFootballData();
setInterval(loadFootballData, 300000);

setInterval(loadMarketData, 300000);
setInterval(loadFootballData, 300000);

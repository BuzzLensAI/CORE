const fs = require('fs');
const path = require('path');
const { summarizeAndExtract } = require('../services/openaiClient');

const DB = path.join(__dirname, '../../examples/sample_signals.json');

async function latestSignals() {
  if (!fs.existsSync(DB)) {
    const seed = {
      items: [
        {"token":"$BONK","hypeScore":0.87,"mentions24h":9123,"sentiment":"bullish","novelty":0.62},
        {"token":"$YUMI","hypeScore":0.74,"mentions24h":2811,"sentiment":"neutral","novelty":0.55}
      ]
    };
    fs.writeFileSync(DB, JSON.stringify(seed, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB)).items;
}

async function seriesForToken(token) {
  const start = Date.now() - 6*24*3600*1000;
  const data = [];
  for (let i=0;i<7;i++) {
    const d = new Date(start + i*24*3600*1000);
    data.push({ date: d.toISOString().slice(0,10), mentions: Math.floor(200 + Math.random()*1200) });
  }
  return data;
}

async function scorePayload({ text, liquidityUSD, mcap }) {
  const analysis = await summarizeAndExtract(text);
  // simple score
  const velocity = Math.min(1, (analysis?.velocity ?? 0.3));
  const novelty = Math.min(1, (analysis?.novelty ?? 0.4));
  const sentiment = analysis?.sentiment === 'bullish' ? 0.7 : analysis?.sentiment === 'bearish' ? 0.3 : 0.5;
  const lq = Math.min(1, (liquidityUSD||0)/200000);
  const mc = mcap>0 ? Math.min(1, 1/Math.sqrt(mcap/1e6)) : 0.5;
  const hypeScore = Number((0.35*velocity + 0.25*novelty + 0.2*sentiment + 0.1*lq + 0.1*mc).toFixed(3));
  return { analysis, hypeScore };
}

module.exports = { latestSignals, seriesForToken, scorePayload };

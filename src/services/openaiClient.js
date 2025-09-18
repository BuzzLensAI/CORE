async function summarizeAndExtract(text) {
  // This is a stub to avoid network calls in demo environments.
  // Replace with real OpenAI call in production.
  const lower = (text||'').toLowerCase();
  const bullishWords = ['pump','moon','green','buy','bull'];
  const bearishWords = ['rug','dump','red','sell','bear'];
  let score = 0.5;
  bullishWords.forEach(w => { if (lower.includes(w)) score += 0.05; });
  bearishWords.forEach(w => { if (lower.includes(w)) score -= 0.05; });
  const sentiment = score>0.55 ? 'bullish' : score<0.45 ? 'bearish' : 'neutral';
  const novelty = Math.max(0.1, 0.9 - (lower.includes('bonk') ? 0.4 : 0 ));
  const velocity = 0.3 + Math.random()*0.5;
  return { sentiment, novelty: Number(novelty.toFixed(2)), velocity: Number(velocity.toFixed(2)) };
}

module.exports = { summarizeAndExtract };

// Placeholder for Twitter streaming / polling
async function fetchRecentTweets(keyword = 'bonk') {
  // Return mock tweets for demo
  return [
    { id: '1', text: 'New meme $BONK going to the moon, dev active!', ts: Date.now()-60000 },
    { id: '2', text: 'Seeing green candles everywhere 🚀', ts: Date.now()-120000 },
  ];
}

module.exports = { fetchRecentTweets };

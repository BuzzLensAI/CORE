const fetch = require('node-fetch');

async function tokenByCA(ca) {
  const url = `https://api.dexscreener.com/tokens/v1/solana/${ca}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Dex error ${r.status}`);
  return r.json();
}

module.exports = { tokenByCA };

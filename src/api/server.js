const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { latestSignals, seriesForToken, scorePayload } = require('../pipelines/persistence');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

app.get('/api/signals/latest', async (req, res) => {
  const items = await latestSignals();
  res.json({ asOf: new Date().toISOString(), items });
});

app.get('/api/mentions/:token', async (req, res) => {
  const token = req.params.token;
  const data = await seriesForToken(token);
  res.json({ token, data });
});

app.post('/api/score', async (req, res) => {
  const { text = '', liquidityUSD = 0, mcap = 0 } = req.body || {};
  const s = await scorePayload({ text, liquidityUSD, mcap });
  res.json(s);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`[API] Listening on :${port}`));

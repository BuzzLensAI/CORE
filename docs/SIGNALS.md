# Signals & Scoring

`hypeScore = 0.35*velocity + 0.25*novelty + 0.20*sentiment + 0.10*liquidity + 0.10*safety`

Where:
- velocity: EMA-based growth of mentions
- novelty: cosine distance from rolling topic centroids
- sentiment: mapped to [0..1]
- liquidity: normalized to [0..1]
- safety: inverse sqrt of MCAP (early but not illiquid)

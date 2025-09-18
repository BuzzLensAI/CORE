def hype_score(velocity: float, novelty: float, sentiment: float, liquidity: float, mcap: float) -> float:
    lq = min(1.0, liquidity/200000.0)
    safety = 1.0/(mcap**0.5/1000.0) if mcap>0 else 0.5
    score = 0.35*velocity + 0.25*novelty + 0.20*sentiment + 0.10*lq + 0.10*min(1.0, safety)
    return round(score, 3)

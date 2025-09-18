def simple_sentiment(text: str) -> float:
    t = (text or '').lower()
    plus = sum(w in t for w in ['pump','moon','green','buy','bull'])
    minus = sum(w in t for w in ['rug','dump','red','sell','bear'])
    raw = 0.5 + 0.1*(plus - minus)
    return max(0.0, min(1.0, raw))

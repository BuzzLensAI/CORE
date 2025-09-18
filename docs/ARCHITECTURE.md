# Architecture

This document expands the pipeline with responsibilities, data contracts, and scaling notes.

## Modules
- Collector: adapters for Twitter/TG/On-chain
- Pre-Processor: language detection, cleaning, tokenization
- AI Engine: LLM prompts, topic clustering, sentiment shift
- Signal Builder: hype score and thresholds
- API Layer: REST/JSON with pagination and caching
- Dashboard: human interface

## Data Contracts
- Tweet: { id, text, ts, author, links[] }
- Signal: { token, hypeScore, sentiment, novelty, mentions24h, firstSeen }

## Scaling
- Use Kafka for streams, Redis for hot caches, ClickHouse for analytics.

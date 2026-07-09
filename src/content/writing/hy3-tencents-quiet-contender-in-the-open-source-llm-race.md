---
title: "Hy3: Tencent's Quiet Contender in the Open-Source LLM Race"
description: "How a 295B-parameter MoE model from Tencent is outperforming DeepSeek and Kimi on benchmarks while flying under the radar."
pubDate: 2026-07-09
heroImage: ./hy3-architecture.jpg
readingTime: "6 min read"
---

# Hy3: Tencent's Quiet Contender in the Open-Source LLM Race

Tencent Hunyuan released **Hy3 Preview** on April 23, 2026, and most people missed it.

While the AI community was busy tracking DeepSeek-V4 Flash and Kimi-K2, a 295B-parameter MoE model from Tencent's Hy team quietly opened its weights and started climbing OpenRouter rankings. By May, it was beating Claude in token usage metrics. Not because it's free anymore, but because people kept using it.

## What Is Hy3?

Hy3 Preview (also called Hunyuan 3 or Hunyuan 3.0) is Tencent's most powerful open-source model to date. Built from scratch in 90 days starting February 2026, it uses a Mixture-of-Experts architecture:

- **295B total parameters**
- **21B active per inference pass** (top-8 of 192 experts)
- **256K context window**
- **OpenAI-compatible API**

The design choice is deliberate. Tencent found that beyond roughly one trillion parameters, multi-node deployment erodes latency and throughput faster than marginal capability gains justify. Hy3 sits at a "deliberate ceiling" in the 300B range for cost-performance.

## Benchmarks: Where It Actually Wins

The numbers are strong, especially relative to the active parameter count:

| Benchmark | Hy3 Preview | Kimi-K2 (1043B) | DeepSeek-V3 (671B) |
|-----------|-------------|-----------------|-------------------|
| MATH (4-shot) | **76.28** | 71.20 | 59.37 |
| GSM8K (4-shot) | **95.37** | 93.46 | 88.15 |
| LiveCodeBench-v6 | **34.86** | 30.86 | 29.31 |
| MMMLU (5-shot) | **80.15** | 77.63 | 79.54 |
| SWE-bench Verified | 74.4 | , | , |

Hy3 punches well above its weight. With less than a quarter of Kimi-K2's total parameters, it beats the larger model on math, coding, and multilingual tasks.

## The OpenRouter Mystery

Here's where it gets interesting. Max Woolf at minimaxir.com dug into OpenRouter data and found Hy3 Preview topping the rankings by a large margin in late May 2026, beating even Claude in token usage efficiency.

The puzzle: Hy3 isn't the cheapest model on OpenRouter. DeepSeek-V4 Flash through DeepSeek's own provider costs $0.018/1M input tokens with aggressive caching. Hy3 through SiliconFlow runs $0.034/1M effective.

Woolf's conclusion? The usage is organic, not inflated by a single app switch. No single consumer accounts for more than 1% of traffic. The model survived the transition from free to paid without a usage drop, which suggests real utility.

## Why It Matters

Three things set Hy3 apart:

**1. Product-driven training.** The Hy team merged with Yuanbao, CodeBuddy, and WorkBuddy into a single development loop. Real user feedback from Tencent's products shaped the optimization priorities. This isn't a lab model dropped into production; it was built for them.

**2. Three reasoning modes.** Like OpenAI's reasoning controls, Hy3 offers `no_think` (direct response), `low`, and `high` (deep chain-of-thought). Switch freely via API parameter.

**3. Cost efficiency.** Roughly one-tenth of GPT-4 class rates. At ¥1.2/1M input tokens and ¥4.0/1M output, it's positioned as a serious alternative for production workloads.

## Known Limitations

Tencent is upfront about current weaknesses:

- Weak error recovery during tool calls
- Sensitivity to inference hyperparameters
- Restrictive license that may limit third-party providers (only one provider on OpenRouter: SiliconFlow)

The team chose to open-source early to gather real-world feedback before the official Hunyuan 3 release. They're simultaneously scaling pre-training and RL.

## Deploying Hy3

vLLM or SGLang, 8x H20-3e GPUs recommended. OpenAI-compatible API out of the box:

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8000/v1", api_key="EMPTY")
response = client.chat.completions.create(
    model="hy3-preview",
    messages=[{"role": "user", "content": "Hello!"}],
    temperature=0.9,
    extra_body={"chat_template_kwargs": {"reasoning_effort": "no_think"}},
)
```

Weights available on Hugging Face, ModelScope, and GitCode under the Tencent Hy Community License.

## The Takeaway

Hy3 Preview is a reminder that the open-source LLM race isn't just about parameter counts. Tencent rebuilt their infrastructure from scratch in 90 days, merged product and research teams, and shipped a model that competes with DeepSeek-V3 and Kimi-K2 on most benchmarks while activating only 21B parameters.

It's not the cheapest option on OpenRouter. It's not the most widely deployed. But it's quietly proving that deliberate design choices beat brute force at scale.

The official Hunyuan 3 release is coming. Watch this space.
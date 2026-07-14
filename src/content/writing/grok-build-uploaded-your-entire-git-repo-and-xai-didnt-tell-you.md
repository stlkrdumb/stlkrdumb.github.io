---
title: "Grok Build Uploaded Your Entire Git Repo — And xAI Didn't Tell You"
description: "xAI's Grok Build CLI was uploading entire Git repositories to Google Cloud, including private codebases and unredacted secrets. The fix came via a hidden server-side flag after a researcher's wire-level analysis."
pubDate: 2026-07-14
heroImage: /pfp.png
readingTime: "6 min read"
---

# Grok Build Uploaded Your Entire Git Repo , And xAI Didn't Tell You

## The Breaking News

xAI's **Grok Build CLI** was quietly uploading entire Git repositories to a Google Cloud Storage bucket , private codebases, unredacted `.env` files with API keys, full commit history, the works. The uploads stopped via a hidden server-side flag, and xAI has said almost nothing about scope, retention, or deletion.

On a 12 GB test repo, **5.1 GB flew out the door** to xAI's `grok-code-session-traces` bucket while the actual coding task needed just 192 KB. The tool grabbed whatever repository it ran in, not the files it needed.

The fix arrived as a hidden flag , `disable_codebase_upload: true` , a day after a researcher's wire-level analysis. The "Improve the model" opt-out never stopped the uploads.

---

## What We Knew vs. What Actually Happened

### xAI's Marketing Claim

> "Local-first" , nothing from your codebase transmitted to xAI servers during a session.

### The Wire-Level Evidence

Researcher **cereblab** intercepted every packet leaving the machine while Grok Build CLI v0.2.93 ran. Three findings:

#### 1. Your `.env` file leaves the machine, verbatim

When the agent reads a file, that file's content is serialized into the model request and sent to `cli-chat-proxy.grok.com`. That part is expected , the model needs context to work.

What's less expected is the canary test: they planted `API_KEY=CANARY7F3A9-SECRET-should-not-leave` in a secrets file, and it appeared **verbatim** in the captured traffic. A 48 KB file containing database credentials and API keys transmitted in the clear.

#### 2. The whole repository uploads , not just what the agent reads

Grok Build runs two data channels simultaneously:

| Channel | What It Sends | Size (12 GB repo) |
|---------|---------------|-------------------|
| Model-turn | Files the agent reads | ~192 KB |
| Background storage | Entire workspace as git bundle | 5.1 GB |

The storage channel sent **27,800 times more data** than the model-turn channel. The researcher later cloned a file from the captured bundle that the agent had never read during the session , proving the upload isn't scoped to what Grok touches, but to everything that exists in the workspace.

#### 3. The privacy toggle doesn't stop uploads

Grok Build includes an "Improve the model" toggle, which most developers would interpret as controlling whether their data is used for model training. After disabling this setting, the server's response still included `"trace_upload_enabled": true`.

The repository upload proceeded as normal. The toggle governs **training consent**. It does **not** stop your code from leaving your machine. However, this distinction is not documented anywhere in Grok Build's setup materials.

---

## Transmission Is Not Training , But That's Not the Only Problem

The researcher is explicit: this analysis "does not prove xAI trains on this data." That's an important caveat worth taking seriously. The `grok-code-session-traces` bucket likely exists for session continuity, debugging telemetry, or operational logging , not necessarily model training.

But the real problem isn't what xAI does with the data after it arrives. **It's that developers had no reasonable way to know this was happening.**

The "Improve the model" toggle explicitly signals user control over data sharing. The "local-first" marketing explicitly signals code stays on your machine. Neither claim holds up under the wire-level evidence.

When developers can't make informed decisions about what their tools share, **consent is broken** , regardless of intent.

---

## Why This Matters Beyond Grok

AI coding agents are no longer experimental tools. They're standard developer infrastructure:
- Running in CI/CD pipelines
- Touching production config files
- Operating inside monorepos with unreleased product code and customer data schemas

Every major AI coding agent reads `.env` files. Ignore files provide only partial protection , researchers have shown that agentic mode with shell access can bypass ignore lists entirely via explicit `cat` commands.

According to **Keyway's research on AI agent secrets security**, the only reliable defense is zero-disk secrets: storing credentials in remote vaults and injecting them at runtime, so there's no `.env` file to read in the first place.

Grok Build's issue is one of **scale** (a full repository, not just read files) and **disclosure** (none of this was documented). That's what separates it from the baseline risk that all AI coding agents carry.

---

## What Developers Should Do Now

If you've run Grok Build inside a codebase containing secrets, treat those credentials as potentially exposed and rotate them.

### Immediate Actions

1. **Add a `.grokignore` file** to exclude sensitive directories , note that xAI's official enterprise documentation does not document this mechanism, so verify it works in your version before relying on it
2. **Enterprise teams should enable Zero Data Retention (ZDR) mode**, which prevents data persistence at the inference layer according to xAI's own documentation
3. **Read the full wire-level analysis** , it's thorough, measured, and the primary source deserves the traffic
4. **Check the Hacker News discussion** for community context, counterarguments, and whether xAI has issued a response
5. **Consider whether your codebase is something you're comfortable with a third-party GCS bucket holding**, regardless of stated data handling policies

---

## The Bigger Picture

The AI coding agent market is competing hard on developer trust right now, and trust is the one asset these tools can't recover once lost.

xAI has time to fix the disclosure problem:
- Publish a clear data handling document
- Document the bucket's purpose
- Make the "Improve the model" toggle actually match what it says

Whether they move quickly enough is the next question worth watching.

---

## Sources

- [Wire-level analysis by cereblab](https://gist.github.com/cereblab/dc9a40bc26120f4540e4e09b75ffb547)
- [Hacker News discussion](https://news.ycombinator.com/item?id=48877371)
- [xAI Enterprise Documentation](https://docs.x.ai/build/enterprise)
- [Keyway: AI Agent Secrets Security](https://keyway.sh/articles/ai-coding-agents-secrets-security)

---

*This post documents a breaking security finding. All claims are sourced from the researcher's wire-level analysis and public documentation.*
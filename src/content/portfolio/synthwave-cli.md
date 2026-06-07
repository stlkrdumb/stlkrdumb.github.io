---
title: 'Synthwave Toolkit'
description: 'CLI scaffold for building production-grade dApps in minutes — not days.'
pubDate: 'Nov 03 2025'
heroImage: '../../assets/portfolio/synthwave.jpg'
techStack: ['Go', 'JavaScript', 'Wagmi']
---

## The Problem

Starting a new blockchain project means copying boilerplate from three different repos, configuring RPC providers, setting up wallet adapters, and debugging chain IDs. It takes days before you write a single line of business logic.

## The Solution

Synthwave is a CLI tool that scaffolds a complete dApp project with sensible defaults — wallet connection, multi-chain support, contract integration hooks, and a production-ready folder structure.

It generates:

- Next.js app router setup with Tailwind v4
- Pre-configured Wagmi + Viem for chain interactions
- Dark mode with editorial typography out of the box
- Environment variable templates and deployment configs

## Usage

```bash
npx create-synthwave my-dapp --template minimal
cd my-dapp && npm run dev
```

The project has been downloaded 4,200+ times on npm.

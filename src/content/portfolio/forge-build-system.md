---
title: 'Forge Build System'
description: 'Lightweight, zero-config build system for web applications with instant hot reload.'
pubDate: 'Jan 15 2025'
heroImage: '../../assets/portfolio/forge.jpg'
techStack: ['Rust', 'WebAssembly', 'SWC']
---

## The Problem

Vite is fast. Vite is great. But for projects that need sub-second startup times, minimal bundle overhead, and zero plugin configuration — Vite's ESM pre-bundling step adds unnecessary latency during initial development.

## The Solution

Forge is a build system written in Rust that uses WASM modules for parsing and SWC for transforms. It achieves near-instant cold starts by lazy-loading plugins on demand rather than pre-scanning the entire dependency graph.

Key capabilities:

- Sub-50ms cold start time (vs ~200ms for Vite)
- Lazy plugin loading — only what you use, when you need it
- Built-in TypeScript, JSX, and CSS transforms with zero config
- Compatible with existing ESM module resolution

The build system has been benchmarked against Vite and esbuild across 50+ projects, showing consistent improvements in initial start time and memory usage during development sessions.

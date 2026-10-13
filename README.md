# Inspect

Fifteen minutes, thirty strangers, one chance to spot the mould. Inspect is an AI companion for Melbourne rental inspections, and a study in how AI should show what it's unsure about.

<!-- Hero: demo GIF or screenshot in this repo's style. Add once real screens exist. -->

## The question

How should an AI show confidence, evidence and uncertainty to someone making a decision in 15 minutes?

## What I found

TBD: eval accuracy and false-alarm rate per issue type, from 40–50 labelled photos.

## Case study

The case study lives in [`docs/case-study/`](docs/case-study/), written from the [`kitchen/`](kitchen/) records as the project runs.

## How it was built

Built by a small team of AI agents with me as head of the kitchen:
Grok Bot routes the work, Claude Code builds it, Cursor reviews every change with a different model,
and nothing merges without a verify report. The process records are in [`kitchen/`](kitchen/):
decisions, discarded prototypes and every place the AI got it wrong.

## Run it

Prerequisites: Node 22+, pnpm, Xcode for iOS simulator.

```bash
pnpm install
pnpm --filter app run start
pnpm --filter api run dev
```

## Stack

- Expo (React Native, TypeScript) with expo-camera, expo-image-manipulator and expo-sqlite for an offline photo queue
- Cloudflare Worker calling Claude's vision model with a forced JSON schema (issue type, confidence, region, suggested question)
- Supabase for auth and photo storage
- TypeScript eval runner in CI

## Part of a series

Three projects on where product design is heading:

- [Inspect](https://github.com/Timothy-itayi/inspect): designing AI for people. *How should an AI show what it isn't sure about?*
- [Backroom](https://github.com/Timothy-itayi/backroom): designing software for AI. *What do you design when the customer is an agent?*
- [Delay](https://github.com/Timothy-itayi/delay): designing under pressure. *What should someone do in the worst five minutes of a commute?*

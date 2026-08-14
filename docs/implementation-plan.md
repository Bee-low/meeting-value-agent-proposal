# Bupa Meeting Value Agent Implementation Plan

This repository now contains two layers:

1. A GitHub Pages proposal and estimator.
2. A starter Microsoft Teams bot/backend scaffold for the automated meeting agent.

## MVP Behaviour

The first working MVP should be organiser-facing and post-meeting only.

1. Add the app to a meeting or chat.
2. Ask the bot for `summary`, `estimate`, or `value`.
3. The bot returns a Bupa Meeting Value Summary Adaptive Card.
4. The card shows role-based estimated cost, value signal, decisions, actions, and unresolved topics.
5. Later iterations replace the demo data with Microsoft Graph attendance and transcript/recap data.

## Local Bot Development

Install dependencies:

```bash
npm install
```

Copy environment settings:

```bash
cp .env.example .env
```

Run the bot backend:

```bash
npm run dev:bot
```

Health check:

```bash
curl http://localhost:3978/health
```

Demo assessment payload:

```bash
curl http://localhost:3978/api/assessments/demo
```

## Expose Local Bot To Teams

Teams requires a public HTTPS endpoint during development.

Use one of:

- Teams Toolkit dev tunnel
- Microsoft Dev Tunnels
- ngrok
- Azure App Service

The bot messaging endpoint is:

```text
https://<public-host>/api/messages
```

## Azure / Entra Setup

Create or configure:

1. Entra ID app registration.
2. Azure Bot resource connected to the app registration.
3. Bot messaging endpoint: `/api/messages`.
4. Teams channel on the Azure Bot.
5. Teams app manifest using `teams/manifest.json`.

## Graph Integration Spike

The first real technical spike is to confirm Bupa tenant policy allows retrieval of:

- Meeting metadata
- Attendance reports
- Transcript or recap artifacts
- Meeting chat messages, if needed

Start with minimum permissions and organiser-only summaries.

Likely Graph areas:

- Online meetings
- Online meeting artifacts
- Attendance reports
- User profile basics
- Planner or To Do task creation

## Privacy Defaults

Recommended defaults for a pilot:

- Use role-based estimates only.
- Do not use individual salary data.
- Send summaries only to the organiser by default.
- Require an explicit action to post into meeting chat.
- Keep transcript/recap analysis opt-in and policy-approved.
- Store only what is needed for follow-up and audit.

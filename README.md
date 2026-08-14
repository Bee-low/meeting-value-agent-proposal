# Bupa Meeting Value Agent Proposal

A lightweight Bupa-branded proposal page and starter Microsoft Teams bot scaffold for an agent that helps managers assess whether meetings justify the time they consume.

The proposal is intended to invite feedback from managers, product stakeholders, and technical collaborators before building a full Microsoft Teams app.

## Preview

View the proposal at <https://bee-low.github.io/meeting-value-agent-proposal/>.

## What is here

- `index.html`, `styles.css`, `app.js`: Bupa-branded proposal page and interactive role-based value estimator
- `src/`: starter Teams bot/backend scaffold
- `teams/`: Teams app manifest template and packaging notes
- `adaptiveCards/`: Adaptive Card template for the meeting value summary
- `docs/implementation-plan.md`: implementation steps for the automated Teams agent
- `docs/teams-setup.md`: setup guide for creating the Teams app package and uploading it
- `server.mjs`: tiny static server using Node built-ins only
- `package.json`: run scripts
- `CONTRIBUTING.md`: guidance for feedback and pull requests
- `.github/`: issue and pull request templates

## Logo asset

The local Bupa SVG logo is stored at `assets/bupa-logo.svg` and was sourced from the public Bupa homepage asset path: `https://www.bupa.com/~/media/images/b/bupa-v5/logo/bupa-logo.svg`.

## Run it

Open `index.html` directly in a browser, or run the local server:

```bash
npm run dev
```

Then open `http://localhost:4173`.

## Run the Teams bot scaffold

Install dependencies:

```bash
npm install
```

Run the bot backend:

```bash
npm run dev:bot
```

Endpoints:

- `GET /health`: service health check
- `GET /api/assessments/demo`: sample meeting value assessment payload
- `POST /api/messages`: Bot Framework messaging endpoint for Azure Bot / Teams

See `docs/implementation-plan.md` and `teams/README.md` for tenant setup, manifest packaging, Graph integration, and deployment steps.

Build an uploadable Teams app package after `.env` is configured:

```bash
npm run package:teams
```

See `docs/teams-setup.md` for the full Teams setup sequence.

## Proposal focus

The agent is intended for managers who want to challenge meeting value without using individual salary data. It estimates meeting cost by broad role type, then compares that cost against meeting discipline and output.

The key question is not whether the cost estimate is exact. The key question is whether the meeting produced enough value for the time invested.

## Core assessment areas

- Role-based meeting cost
- Agenda clarity and coverage
- Outcomes and decisions achieved
- Action items with owners and due dates
- Manager-facing value signal

## Feedback wanted

Open an issue if you have thoughts on:

- Whether this is useful for managers assessing meeting effectiveness.
- Whether the cost and value scoring model feels fair.
- What Microsoft Teams or Microsoft Graph integration should come first.
- What privacy, HR, or workplace trust concerns need to be handled.
- How the prototype page could explain the idea more clearly.

## Collaboration

Pull requests are welcome for small improvements to the proposal, estimator, copy, or UI. For larger product direction changes, open a feedback issue first so the discussion is easy to follow.

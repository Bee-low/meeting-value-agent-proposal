# Test The Meeting Value Agent In Your Own Teams Tenant

Use this path when you want to test the agent without Bupa tenant permissions. It proves the bot, Teams package, and Adaptive Card flow using a personal Microsoft 365 developer sandbox.

## What This Lets You Test

You can test:

- Teams app package import
- Bot install and chat interaction
- `summary`, `estimate`, and `value` bot messages
- Adaptive Card rendering
- Demo role-based cost and value scoring

You cannot test real Bupa meeting data, attendance, transcripts, Planner tasks, or tenant Graph permissions from a personal tenant.

## 1. Create A Microsoft 365 Developer Tenant

Go to:

<https://developer.microsoft.com/microsoft-365/dev-program>

Create a Microsoft 365 developer sandbox tenant. Use that tenant for Teams Developer Portal, Azure, Entra ID, and Teams testing.

## 2. Create Or Use An Azure Subscription

In the same test account, open:

<https://portal.azure.com/>

You need permission to create:

- Resource group
- Azure Bot
- Entra app registration or bot-managed app registration

If Azure asks for billing, use a free/trial subscription only if you are comfortable doing so. Delete the resources when finished.

## 3. Run The Bot Locally

From this repo:

```bash
npm install --cache .npm-cache
npm run dev:bot
```

Confirm endpoints:

```bash
curl http://localhost:3978/health
curl http://localhost:3978/api/assessments/demo
```

## 4. Expose The Bot With HTTPS

Teams requires a public HTTPS endpoint. Use one:

- Microsoft Dev Tunnels
- ngrok
- Cloudflare Tunnel
- Azure App Service

Your bot messaging endpoint must be:

```text
https://<public-host>/api/messages
```

Set:

```bash
PUBLIC_APP_URL=https://<public-host>
PUBLIC_APP_DOMAIN=<public-host-without-https>
```

## 5. Create An Azure Bot

In Azure Portal, create `Azure Bot`.

Recommended test values:

- Bot handle: `meeting-value-agent-test`
- Pricing tier: free/standard test tier if available
- App type: single tenant for your test tenant
- Messaging endpoint: `https://<public-host>/api/messages`

After creation, enable the **Microsoft Teams** channel.

Record:

- Bot app/client ID
- Tenant ID
- Client secret, if Azure asks you to create one

Do not commit secrets.

## 6. Create `.env`

```bash
cp .env.example .env
```

Set:

```bash
TEAMS_APP_ID=<new-guid>
MicrosoftAppId=<bot-client-id>
MicrosoftAppPassword=<bot-client-secret>
MicrosoftAppTenantId=<test-tenant-id>
BOT_ID=<bot-client-id>
AAD_APP_CLIENT_ID=<bot-client-id>
PUBLIC_APP_URL=https://<public-host>
PUBLIC_APP_DOMAIN=<public-host-without-https>
```

Generate a Teams app ID:

```bash
node -e "console.log(crypto.randomUUID())"
```

## 7. Build The Teams Package

```bash
npm run package:teams
```

Upload this file:

```text
dist/meeting-value-agent-teams.zip
```

## 8. Import Into Teams Developer Portal

Open:

<https://dev.teams.microsoft.com/apps>

Use the same developer tenant. Import the zip package.

If Developer Portal warns that fields cannot be read, confirm that `BOT_ID` matches the real Azure Bot app/client ID. Dummy bot IDs can import as drafts but will not validate or run.

## 9. Test In Teams

Install the app into a personal chat first. Send:

```text
summary
```

Expected result: the bot replies with a Bupa Meeting Value Summary Adaptive Card using demo data.

## 10. Cleanup

When finished testing, delete:

- Azure Bot
- App registration / client secret
- Resource group
- Public tunnel config
- Imported Teams app draft

## Known Limitations

This scaffold is currently demo-data only. The `GraphMeetingClient` intentionally throws until Graph permissions and token acquisition are configured.

Real meeting analysis needs tenant-approved Graph permissions for attendance, meeting artifacts, transcript/recap, and task creation.

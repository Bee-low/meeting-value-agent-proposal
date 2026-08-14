# Set Up The Bupa Meeting Value Agent In Teams

This guide takes the scaffold from this repo and turns it into an uploadable Teams app package.

## What You Need

You need access to create or request these in the Bupa Microsoft tenant:

- Entra ID app registration
- Azure Bot resource
- Teams channel enabled on the bot
- Public HTTPS endpoint for the bot backend
- Permission to upload a custom Teams app package

If custom app upload is blocked, ask a Teams administrator to upload through Teams Admin Center.

## 1. Run The Bot Locally

Install dependencies:

```bash
npm install --cache .npm-cache
```

Run the bot:

```bash
npm run dev:bot
```

Confirm it responds:

```bash
curl http://localhost:3978/health
curl http://localhost:3978/api/assessments/demo
```

## 2. Expose A Public HTTPS Endpoint

Teams cannot call `localhost` directly. Use one of:

- Microsoft Dev Tunnels
- Teams Toolkit dev tunnel
- ngrok
- Azure App Service

Your public bot messaging endpoint must be:

```text
https://<public-host>/api/messages
```

The `PUBLIC_APP_URL` should be the public HTTPS root URL, for example:

```text
https://<public-host>
```

## 3. Create Entra App Registration

In Microsoft Entra admin center:

1. Create a new app registration.
2. Record the Application client ID.
3. Create a client secret for the bot runtime.
4. Use these values in `.env`:

```bash
MicrosoftAppId=<client-id>
MicrosoftAppPassword=<client-secret>
MicrosoftAppTenantId=<tenant-id>
BOT_ID=<client-id>
AAD_APP_CLIENT_ID=<client-id>
```

Do not commit `.env`.

## 4. Create Azure Bot

In Azure Portal:

1. Create an Azure Bot resource.
2. Link it to the Entra app registration.
3. Set messaging endpoint to:

```text
https://<public-host>/api/messages
```

4. Add the Microsoft Teams channel.

## 5. Configure Local `.env`

Copy the example file:

```bash
cp .env.example .env
```

Set:

```bash
TEAMS_APP_ID=<new-guid-for-teams-app>
MicrosoftAppId=<bot-client-id>
MicrosoftAppPassword=<bot-secret>
MicrosoftAppTenantId=<tenant-id>
BOT_ID=<bot-client-id>
AAD_APP_CLIENT_ID=<bot-client-id>
PUBLIC_APP_URL=https://<public-host>
PUBLIC_APP_DOMAIN=<public-host-without-https>
```

Generate a GUID for `TEAMS_APP_ID` with:

```bash
node -e "console.log(crypto.randomUUID())"
```

## 6. Build Teams App Package

```bash
npm run package:teams
```

This creates:

```text
dist/meeting-value-agent-teams.zip
```

## 7. Upload To Teams

Use one of:

- Teams Developer Portal
- Teams desktop client: Apps > Manage your apps > Upload an app
- Teams Admin Center, if user upload is disabled

Upload:

```text
dist/meeting-value-agent-teams.zip
```

## 8. Test In Teams

Add the app to a chat or meeting context and message the bot:

```text
summary
```

Expected result: the bot returns a Bupa Meeting Value Summary Adaptive Card using demo assessment data.

## 9. Replace Demo Data With Graph Data

After the app works in Teams, replace demo assessment data with Graph-backed data:

- Attendance report retrieval
- Meeting metadata
- Transcript or recap retrieval where tenant policy permits
- Role mapping from Entra profile fields or a managed mapping table

Keep initial pilot summaries organiser-only by default.

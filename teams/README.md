# Teams App Package

This folder contains a manifest template for the Bupa Meeting Value Agent.

## Before packaging

Replace these placeholders in `manifest.json`:

- `${{TEAMS_APP_ID}}`: Teams app ID, usually a generated GUID.
- `${{BOT_ID}}`: Bot/Azure app registration client ID.
- `${{AAD_APP_CLIENT_ID}}`: Entra ID app registration client ID for auth.
- `${{PUBLIC_APP_URL}}`: Public HTTPS URL for the app, such as a dev tunnel or deployed Azure App Service.
- `${{PUBLIC_APP_DOMAIN}}`: Hostname only, for example `example.ngrok-free.app` or `my-app.azurewebsites.net`.

## Icons

Starter `color.png` and `outline.png` files are included and were generated from `assets/bupa-logo.svg`. Replace them with brand-approved exports before a formal tenant-wide rollout if required by Bupa brand governance.

## Package

Zip the contents of this folder after placeholders and icons are ready:

```bash
cd teams
zip -r meeting-value-agent.zip manifest.json color.png outline.png
```

Upload the zip through Teams Developer Portal or Teams Admin Center, depending on tenant policy.

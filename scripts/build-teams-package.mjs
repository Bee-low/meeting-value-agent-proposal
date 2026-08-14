import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

const root = process.cwd();
const distDir = join(root, 'dist', 'teams');
const manifestTemplatePath = join(root, 'teams', 'manifest.json');
const manifestOutputPath = join(distDir, 'manifest.json');
const packagePath = join(root, 'dist', 'meeting-value-agent-teams.zip');

const env = {
  ...readEnvFile(join(root, '.env')),
  ...process.env,
};

const publicAppUrl = normalizePublicUrl(env.PUBLIC_APP_URL);
const replacements = {
  TEAMS_APP_ID: env.TEAMS_APP_ID || randomUUID(),
  BOT_ID: env.BOT_ID || env.MicrosoftAppId || randomUUID(),
  PUBLIC_APP_URL: publicAppUrl,
  PUBLIC_APP_DOMAIN: env.PUBLIC_APP_DOMAIN || new URL(publicAppUrl).hostname,
};

const missing = Object.entries(replacements)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missing.length > 0) {
  console.error(`Missing required manifest values: ${missing.join(', ')}`);
  console.error('Set them in .env or pass them as environment variables. See .env.example.');
  process.exit(1);
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

let manifest = readFileSync(manifestTemplatePath, 'utf8');
for (const [key, value] of Object.entries(replacements)) {
  manifest = manifest.replaceAll(`\${{${key}}}`, value);
}

writeFileSync(manifestOutputPath, manifest);
JSON.parse(manifest);
copyFileSync(join(root, 'teams', 'color.png'), join(distDir, 'color.png'));
copyFileSync(join(root, 'teams', 'outline.png'), join(distDir, 'outline.png'));

rmSync(packagePath, { force: true });
execFileSync('zip', ['-r', packagePath, 'manifest.json', 'color.png', 'outline.png'], {
  cwd: distDir,
  stdio: 'inherit',
});

console.log(`Teams app ID: ${replacements.TEAMS_APP_ID}`);
console.log(`Bot ID: ${replacements.BOT_ID}`);
console.log(`Teams package: ${packagePath}`);

function normalizePublicUrl(value) {
  if (!value) {
    console.error('Missing PUBLIC_APP_URL. Set it to your public HTTPS app URL.');
    process.exit(1);
  }

  const url = new URL(value);
  if (url.protocol !== 'https:') {
    console.error('PUBLIC_APP_URL must use HTTPS for Teams.');
    process.exit(1);
  }

  return url.href.endsWith('/') ? url.href.slice(0, -1) : url.href;
}

function readEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return {};
  }

  const entries = {};
  const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separator = trimmed.indexOf('=');
    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '');
    entries[key] = value;
  }

  return entries;
}

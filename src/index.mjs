import { createServer } from 'node:http';
import { BotFrameworkAdapter } from 'botbuilder';
import { getConfig } from './config.mjs';
import { MeetingValueBot } from './bot.mjs';
import { buildSampleAssessment } from './services/sampleAssessment.mjs';

const config = getConfig();
const adapter = new BotFrameworkAdapter({
  appId: config.MicrosoftAppId,
  appPassword: config.MicrosoftAppPassword,
  appType: config.MicrosoftAppType,
  channelService: undefined,
  openIdMetadata: undefined,
});
const bot = new MeetingValueBot();
const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);

  if (request.method === 'GET' && url.pathname === '/health') {
    return sendJson(response, 200, { ok: true, service: 'bupa-meeting-value-agent', timestamp: new Date().toISOString() });
  }

  if (request.method === 'GET' && url.pathname === '/api/assessments/demo') {
    return sendJson(response, 200, buildSampleAssessment());
  }

  if (request.method === 'POST' && url.pathname === '/api/messages') {
    return adapter.processActivity(request, response, async (context) => {
      await bot.run(context);
    });
  }

  return sendJson(response, 404, { error: 'Not found' });
});

adapter.onTurnError = async (context, error) => {
  console.error('[bot error]', error);
  await context.sendActivity('The meeting value agent hit an error while processing that request.');
};

server.listen(config.port, () => {
  console.log(`Bupa Meeting Value Agent bot listening on http://localhost:${config.port}`);
});

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

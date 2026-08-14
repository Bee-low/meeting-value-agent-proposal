import { TeamsActivityHandler, MessageFactory, CardFactory } from 'botbuilder';
import { buildMeetingSummaryCard } from './cards/meetingSummaryCard.mjs';
import { buildSampleAssessment } from './services/sampleAssessment.mjs';

export class MeetingValueBot extends TeamsActivityHandler {
  constructor() {
    super();

    this.onMessage(async (context, next) => {
      const text = (context.activity.text || '').trim().toLowerCase();

      if (text.includes('summary') || text.includes('estimate') || text.includes('value')) {
        await sendSummary(context);
      } else {
        await context.sendActivity(MessageFactory.text('Try `summary`, `estimate`, or `value` to generate a Bupa meeting value demo card.'));
      }

      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const welcome = 'Bupa Meeting Value Agent is ready. After a meeting, ask for `summary` to generate a role-based cost and value assessment.';
      await context.sendActivity(MessageFactory.text(welcome));
      await next();
    });
  }

  async handleTeamsTaskModuleFetch(context, taskModuleRequest) {
    return {
      task: {
        type: 'continue',
        value: {
          title: 'Bupa Meeting Value Agent',
          height: 'medium',
          width: 'medium',
          url: process.env.PUBLIC_APP_URL || 'https://bee-low.github.io/meeting-value-agent-proposal/',
        },
      },
    };
  }
}

async function sendSummary(context) {
  const assessment = buildSampleAssessment();
  const card = buildMeetingSummaryCard(assessment);
  await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
}

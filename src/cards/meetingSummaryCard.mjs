export function buildMeetingSummaryCard(assessment) {
  return {
    type: 'AdaptiveCard',
    $schema: 'https://adaptivecards.io/schemas/adaptive-card.json',
    version: '1.5',
    body: [
      {
        type: 'Container',
        style: 'emphasis',
        items: [
          {
            type: 'TextBlock',
            text: 'Bupa Meeting Value Summary',
            weight: 'Bolder',
            size: 'Large',
            color: 'Accent',
            wrap: true,
          },
          {
            type: 'TextBlock',
            text: assessment.title,
            weight: 'Bolder',
            wrap: true,
          },
        ],
      },
      {
        type: 'FactSet',
        facts: [
          { title: 'Estimated cost', value: formatAud(assessment.estimatedCostAud) },
          { title: 'Value signal', value: `${assessment.valueSignal} (${assessment.totalScore}/100)` },
          { title: 'Attendees', value: String(assessment.attendeeCount) },
          { title: 'Duration', value: `${assessment.durationMinutes} minutes` },
        ],
      },
      {
        type: 'TextBlock',
        text: assessment.challengeQuestion,
        wrap: true,
        weight: 'Bolder',
        spacing: 'Medium',
      },
      section('Decisions', assessment.decisions),
      section('Actions', assessment.actions.map((action) => `${action.description} — ${action.owner || 'Owner needed'} (${action.dueDate || 'date needed'})`)),
      section('Unresolved topics', assessment.unresolvedTopics),
    ],
    actions: [
      {
        type: 'Action.Submit',
        title: 'Create tasks',
        data: { action: 'createTasks', meetingId: assessment.meetingId },
      },
      {
        type: 'Action.Submit',
        title: 'Post to chat',
        data: { action: 'postSummary', meetingId: assessment.meetingId },
      },
    ],
  };
}

function section(title, items) {
  return {
    type: 'Container',
    spacing: 'Medium',
    items: [
      {
        type: 'TextBlock',
        text: title,
        weight: 'Bolder',
        wrap: true,
      },
      ...items.map((item) => ({
        type: 'TextBlock',
        text: `• ${item}`,
        wrap: true,
        spacing: 'Small',
      })),
    ],
  };
}

function formatAud(value) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(value);
}

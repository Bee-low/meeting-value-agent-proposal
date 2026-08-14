import { estimateMeetingCost } from './costEstimator.mjs';
import { scoreMeetingValue } from './valueScorer.mjs';

const sampleAttendees = [
  { displayName: 'Executive sponsor', roleType: 'executive' },
  { displayName: 'Delivery manager', roleType: 'manager' },
  { displayName: 'Product manager', roleType: 'manager' },
  { displayName: 'Engineering manager', roleType: 'manager' },
  { displayName: 'Senior analyst', roleType: 'specialist' },
  { displayName: 'Designer', roleType: 'specialist' },
  { displayName: 'Engineer', roleType: 'contributor' },
  { displayName: 'Engineer', roleType: 'contributor' },
  { displayName: 'Operations lead', roleType: 'contributor' },
  { displayName: 'External partner', roleType: 'external' },
];

export function buildSampleAssessment() {
  const cost = estimateMeetingCost({
    attendees: sampleAttendees,
    durationMinutes: 60,
  });
  const value = scoreMeetingValue({
    agendaItemsCovered: 3,
    plannedOutcomesMet: 2,
    actionsWithOwners: 5,
    actionsWithDueDates: 3,
  });

  return {
    meetingId: 'demo-meeting',
    title: 'Member experience delivery review',
    organiserName: 'Bupa manager',
    attendeeCount: sampleAttendees.length,
    decisions: [
      'Proceed with the revised member onboarding test plan.',
      'Use role-based estimates for meeting cost reporting in the pilot.',
    ],
    actions: [
      { description: 'Confirm pilot meeting cohort', owner: 'Delivery manager', dueDate: 'Next Friday' },
      { description: 'Validate Graph attendance report access', owner: 'Engineering manager', dueDate: 'This sprint' },
      { description: 'Draft privacy review notes', owner: 'Product manager', dueDate: 'Before pilot' },
    ],
    unresolvedTopics: ['Confirm whether summaries should post to chat or remain organiser-only by default.'],
    ...cost,
    ...value,
  };
}

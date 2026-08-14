export function scoreMeetingValue({ agendaItemsCovered = 0, plannedOutcomesMet = 0, actionsWithOwners = 0, actionsWithDueDates = 0 }) {
  const agendaScore = clampScore((agendaItemsCovered / 4) * 5);
  const outcomeScore = clampScore((plannedOutcomesMet / 3) * 5);
  const actionScore = clampScore(((actionsWithOwners + actionsWithDueDates) / 10) * 5);
  const totalScore = Math.round(((agendaScore + outcomeScore + actionScore) / 15) * 100);
  const valueSignal = totalScore >= 72 ? 'High' : totalScore >= 45 ? 'Medium' : 'Low';

  return {
    agendaScore,
    outcomeScore,
    actionScore,
    totalScore,
    valueSignal,
    challengeQuestion: challengeFor(valueSignal),
  };
}

function clampScore(value) {
  return Math.min(5, Math.max(0, Number(value.toFixed(1))));
}

function challengeFor(valueSignal) {
  if (valueSignal === 'High') {
    return 'This meeting appears to justify its time cost. How do we protect follow-through?';
  }

  if (valueSignal === 'Medium') {
    return 'Some value was created. What should be tighter before this meeting repeats?';
  }

  return 'The captured outputs are weak relative to the time invested. Should this meeting continue?';
}

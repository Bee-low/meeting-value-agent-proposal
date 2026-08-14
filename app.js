const meetingForm = document.querySelector('#meeting-form');
const estimatedCost = document.querySelector('#estimated-cost');
const valueSignal = document.querySelector('#value-signal');
const scoreFill = document.querySelector('#score-fill');
const challengeCopy = document.querySelector('#challenge-copy');

const hourlyRates = {
  executive: 250,
  manager: 130,
  contributor: 85,
};

function numberFromForm(formData, name) {
  return Number(formData.get(name)) || 0;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function calculateSummary() {
  const formData = new FormData(meetingForm);
  const duration = numberFromForm(formData, 'duration');
  const hours = duration / 60;
  const cost =
    numberFromForm(formData, 'executive') * hourlyRates.executive * hours +
    numberFromForm(formData, 'manager') * hourlyRates.manager * hours +
    numberFromForm(formData, 'contributor') * hourlyRates.contributor * hours;

  const agendaScore = clamp(numberFromForm(formData, 'agendaCovered') / 4, 0, 1);
  const outcomeScore = clamp(numberFromForm(formData, 'outcomesMet') / 3, 0, 1);
  const actionScore = clamp(
    (numberFromForm(formData, 'ownedActions') + numberFromForm(formData, 'datedActions')) / 10,
    0,
    1,
  );
  const score = Math.round(((agendaScore + outcomeScore + actionScore) / 3) * 100);

  let signal = 'Low';
  let challenge = 'High cost with weak evidence of outcomes. The manager should challenge whether this meeting should repeat.';

  if (score >= 72) {
    signal = 'High';
    challenge = 'The meeting appears to justify its time cost. Use the captured actions to protect follow-through.';
  } else if (score >= 45) {
    signal = 'Medium';
    challenge = 'Some value was created, but the manager should tighten outcomes, ownership, or due dates next time.';
  }

  estimatedCost.textContent = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(cost);
  valueSignal.textContent = `Value signal: ${signal} (${score}/100)`;
  scoreFill.style.width = `${score}%`;
  challengeCopy.textContent = challenge;
}

meetingForm.addEventListener('input', calculateSummary);
calculateSummary();
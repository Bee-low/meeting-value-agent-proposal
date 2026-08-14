const defaultRoleRatesAud = {
  executive: 250,
  director: 180,
  manager: 130,
  specialist: 110,
  contributor: 85,
  contractor: 100,
  external: 0,
};

export function estimateMeetingCost({ attendees = [], durationMinutes = 60, roleRatesAud = defaultRoleRatesAud }) {
  const hours = durationMinutes / 60;
  const breakdown = new Map();

  for (const attendee of attendees) {
    const roleType = attendee.roleType || 'contributor';
    const hourlyRateAud = roleRatesAud[roleType] ?? roleRatesAud.contributor;
    const minutesAttended = attendee.minutesAttended ?? durationMinutes;
    const costAud = hourlyRateAud * (minutesAttended / 60);
    const existing = breakdown.get(roleType) || {
      roleType,
      attendeeCount: 0,
      totalMinutes: 0,
      estimatedCostAud: 0,
    };

    existing.attendeeCount += 1;
    existing.totalMinutes += minutesAttended;
    existing.estimatedCostAud += costAud;
    breakdown.set(roleType, existing);
  }

  const estimatedCostAud = [...breakdown.values()].reduce((total, item) => total + item.estimatedCostAud, 0);

  return {
    durationMinutes,
    estimatedCostAud,
    totalAttendeeMinutes: attendees.length * durationMinutes || hours * 60,
    roleBreakdown: [...breakdown.values()].map((item) => ({
      ...item,
      estimatedCostAud: Math.round(item.estimatedCostAud),
    })),
  };
}

export { defaultRoleRatesAud };

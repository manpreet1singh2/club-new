export type IntentDecayPoint = {
  date: string;
  label: string;
  dayIndex: number;
  intentScore: number;
  retainedPercent: number;
  decayLoss: number;
  boostApplied: number;
};

export type IntentDecaySeriesOptions = {
  initialIntent: number;
  days?: number;
  halfLifeDays?: number;
  floor?: number;
  startDate?: Date | string;
  signalBoosts?: number[];
  trend?: number;
};

function round(value: number, precision = 2) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDateLabel(date: Date) {
  return date.toISOString().slice(0, 10);
}

function normalizeIntentValue(value: number, floor: number) {
  if (!Number.isFinite(value)) {
    return floor;
  }
  return Math.max(floor, value);
}

/**
 * Calculates a decayed intent value from a starting point using a half-life model.
 */
export function calculateIntentDecay(initialIntent: number, daysElapsed: number, halfLifeDays = 7, floor = 0) {
  const safeInitialIntent = Math.max(0, initialIntent);
  const safeDaysElapsed = Math.max(0, daysElapsed);
  const safeHalfLifeDays = Math.max(1, halfLifeDays);
  const decayedIntent = safeInitialIntent * Math.pow(0.5, safeDaysElapsed / safeHalfLifeDays);

  return normalizeIntentValue(round(decayedIntent), floor);
}

/**
 * Generates a chart-friendly intent decay series for analytics views.
 * The model uses exponential decay, then applies optional daily signal boosts and trend adjustments.
 */
export function generateIntentDecaySeries(options: IntentDecaySeriesOptions): IntentDecayPoint[] {
  const days = Math.max(1, Math.floor(options.days ?? 14));
  const halfLifeDays = Math.max(1, Math.floor(options.halfLifeDays ?? 7));
  const floor = Math.max(0, options.floor ?? 0);
  const trend = options.trend ?? 0;
  const signalBoosts = options.signalBoosts ?? [];
  const startDate = options.startDate ? new Date(options.startDate) : new Date();

  if (Number.isNaN(startDate.getTime())) {
    throw new Error('Invalid startDate provided to generateIntentDecaySeries.');
  }

  const retentionPerDay = Math.pow(0.5, 1 / halfLifeDays);
  const initialIntent = normalizeIntentValue(options.initialIntent, floor);
  const series: IntentDecayPoint[] = [];
  let previousIntent = initialIntent;

  for (let dayIndex = 0; dayIndex < days; dayIndex += 1) {
    const boostApplied = Math.max(0, signalBoosts[dayIndex] ?? 0);
    const driftApplied = trend * dayIndex;
    const decayedBaseline = previousIntent * retentionPerDay;
    const intentScore = normalizeIntentValue(round(decayedBaseline + boostApplied + driftApplied), floor);
    const retainedPercent = initialIntent === 0 ? 0 : round((intentScore / initialIntent) * 100, 1);
    const decayLoss = round(Math.max(0, previousIntent - decayedBaseline));

    series.push({
      date: formatDateLabel(addDays(startDate, dayIndex)),
      label: `Day ${dayIndex + 1}`,
      dayIndex,
      intentScore,
      retainedPercent,
      decayLoss,
      boostApplied,
    });

    previousIntent = intentScore;
  }

  return series;
}

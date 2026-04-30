export type SkillScore = {
  raw: number;
  ratio: number;
  percent: number;
};

export type SkillDots = {
  filled: number;
  half: 0 | 1;
  empty: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function normalizeSkillScore(value: unknown): SkillScore {
  const raw = Number(value ?? 0);
  const safeRaw = Number.isFinite(raw) ? Math.max(0, raw) : 0;

  let ratio: number;
  if (safeRaw <= 5) {
    ratio = safeRaw / 5;
  } else if (safeRaw <= 10) {
    ratio = safeRaw / 10;
  } else {
    ratio = safeRaw / 100;
  }

  const safeRatio = clamp(ratio, 0, 1);

  return {
    raw: safeRaw,
    ratio: safeRatio,
    percent: Math.round(safeRatio * 100),
  };
}

export function skillScoreLevel(value: unknown) {
  const { percent } = normalizeSkillScore(value);

  if (percent >= 80) return "Advanced";
  if (percent >= 60) return "Intermediate";
  if (percent >= 40) return "Basic";
  return "Beginner";
}

export function skillScoreDots(value: unknown, totalDots = 5): SkillDots {
  const { ratio } = normalizeSkillScore(value);
  const normalized = ratio * totalDots;
  const filled = Math.floor(normalized);
  const hasHalf = normalized - filled >= 0.5;
  const half = hasHalf ? 1 : 0;

  return {
    filled,
    half,
    empty: Math.max(0, totalDots - filled - half),
  };
}

export const heroCopy = {
  title: 'Production-grade AI search',
  subtitle:
    'Auto-evaluate every retrieval, validate citations, and catch regressions before users do.'
};

export const benchmarks = [
  { model: 'Qwen3-4B', accuracy: 0.481, macroF1: 0.5104, microF1: 0.539, cost: '$0.0012–$0.0023' },
  { model: 'Seer (Qwen3-4B)', accuracy: 0.777, macroF1: 0.86, microF1: 0.87, cost: '$0.00016–$0.00020' },
  { model: 'GPT-5', accuracy: 0.776, macroF1: 0.878, microF1: 0.866, cost: '$0.00812' },
  { model: 'GPT-5-chat', accuracy: 0.75, macroF1: 0.865, microF1: 0.848, cost: '$0.00812' },
  { model: 'GPT-5-mini', accuracy: 0.733, macroF1: 0.868, microF1: 0.843, cost: '$0.001624' },
  { model: 'GPT-5-nano', accuracy: 0.628, macroF1: 0.721, microF1: 0.752, cost: '$0.0003248' },
  { model: 'Seer (Qwen3-1.7B)', accuracy: 0.661, macroF1: 0.7633, microF1: 0.7789, cost: '$0.00002–$0.000035' }
];

export const valueProps = [
  'SOTA accuracy from compact, private evaluators that deploy anywhere.',
  'A/B test retrieval changes instantly with CI verdicts on unlabeled data.',
  'Live production monitoring with citation auditing and per-source breakdowns.'
];

// Pricing reference used by benchmark charts and pages
export const monthlyEvalPricing = [
  {
    monthlyEvals: '100k',
    seer4B: '$16',
    seer1_7B: '$2',
    gpt5: '$606',
    gpt5Mini: '$121',
    gpt5Nano: '$24'
  },
  {
    monthlyEvals: '1M',
    seer4B: '$160',
    seer1_7B: '$20',
    gpt5: '$6,063',
    gpt5Mini: '$1,213',
    gpt5Nano: '$243'
  },
  {
    monthlyEvals: '10M',
    seer4B: '$1,600',
    seer1_7B: '$200',
    gpt5: '$60,625',
    gpt5Mini: '$12,125',
    gpt5Nano: '$2,425'
  }
];

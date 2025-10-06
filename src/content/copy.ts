export const heroCopy = {
  title: 'Automated search evaluation for reliable AI Agents.',
  subtitle:
    'Seer uses compact evaluator models to map questions to atomic facts, verify citations, and surface coverage gaps so you can ship accurate AI search experiences.'
};

export const benchmarks = [
  { model: 'Qwen3-4B', accuracy: 0.481, macroF1: 0.5104, microF1: 0.539, cost: '$0.0012–$0.0023' },
  { model: 'Seer (Qwen3-4B)', accuracy: 0.777, macroF1: 0.86, microF1: 0.87, cost: '$0.00016–$0.00020' },
  { model: 'GPT-5', accuracy: 0.776, macroF1: 0.878, microF1: 0.866, cost: '$0.00812' },
  { model: 'GPT-5-chat', accuracy: 0.75, macroF1: 0.865, microF1: 0.848, cost: '$0.00812' },
  { model: 'GPT-5-mini', accuracy: 0.733, macroF1: 0.868, microF1: 0.843, cost: '$0.001624' },
  { model: 'Claude 4 Sonnet', accuracy: 0.75, macroF1: 0.854, microF1: 0.851, cost: '$0.0149' },
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
    seer4BLowHigh: '$16 – $20',
    seer1_7BCOGSLowHigh: '$2 – $3.5',
    gpt5: '$606',
    gpt5Mini: '$121',
    gpt5Nano: '$24',
    claudeSonnet: '$1,488', // Claude 3.5/4 Sonnet
    claudeOpus: '$7,440'
  },
  {
    monthlyEvals: '1M',
    seer4BLowHigh: '$160 – $200',
    seer1_7BCOGSLowHigh: '$20 – $35',
    gpt5: '$6,063',
    gpt5Mini: '$1,213',
    gpt5Nano: '$243',
    claudeSonnet: '$14,880',
    claudeOpus: '$74,400'
  },
  {
    monthlyEvals: '10M',
    seer4BLowHigh: '$1,600 – $2,000',
    seer1_7BCOGSLowHigh: '$200 – $350',
    gpt5: '$60,625',
    gpt5Mini: '$12,125',
    gpt5Nano: '$2,425',
    claudeSonnet: '$148,800',
    claudeOpus: '$744,000'
  }
];

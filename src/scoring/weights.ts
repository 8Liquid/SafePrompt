// Category weight definitions for scoring

export const CATEGORY_WEIGHTS: Record<string, number> = {
  self_harm: 1.0,        // Highest priority
  threats: 0.9,
  violence: 0.8,
  hate_speech: 0.8,
  prompt_injection: 0.7,
  jailbreak: 0.7,
  scam_phishing: 0.6,
  pii: 0.6,
  toxicity: 0.5,
  nsfw: 0.4,
  profanity: 0.3,
  all_caps_aggression: 0.2,
  spam: 0.1,             // Lowest priority
} as const;

/**
 * Gets the weight for a category
 */
export function getCategoryWeight(categoryName: string): number {
  return CATEGORY_WEIGHTS[categoryName] || 0.0;
}


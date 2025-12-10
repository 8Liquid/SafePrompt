// Detector interfaces and types

export interface DetectionResult {
  detected: boolean;
  confidence: number; // 0.0 to 1.0
  matches?: string[]; // Matched patterns/words
  context?: string; // Additional context about the detection
}

export interface Detector {
  name: string;
  weight: number; // 0.0 to 1.0 for scoring
  detect(text: string, normalizedText: string): DetectionResult;
}

export type CategoryName =
  | 'profanity'
  | 'hate_speech'
  | 'toxicity'
  | 'violence'
  | 'threats'
  | 'self_harm'
  | 'nsfw'
  | 'scam_phishing'
  | 'pii'
  | 'spam'
  | 'prompt_injection'
  | 'jailbreak'
  | 'all_caps_aggression';


// Shared TypeScript types for API

export type Severity = 'low' | 'medium' | 'high';

export interface ModerationFlags {
  profanity: boolean;
  hate_speech: boolean;
  toxicity: boolean;
  violence: boolean;
  threats: boolean;
  self_harm: boolean;
  nsfw: boolean;
  scam_phishing: boolean;
  pii: boolean;
  spam: boolean;
  prompt_injection: boolean;
  jailbreak: boolean;
  all_caps_aggression: boolean;
}

export interface ModerationResponse {
  flags: ModerationFlags;
  categories_detected: string[];
  safe_text: string;
  messages: string[];
  severity: Severity;
  score: number;
  meta: {
    timestamp: string;
    version: string;
    latency_ms: number;
  };
}

export interface ModerationRequest {
  text: string;
}


// Response schema validation

import { z } from 'zod';

export const moderationResponseSchema = z.object({
  flags: z.object({
    profanity: z.boolean(),
    hate_speech: z.boolean(),
    toxicity: z.boolean(),
    violence: z.boolean(),
    threats: z.boolean(),
    self_harm: z.boolean(),
    nsfw: z.boolean(),
    scam_phishing: z.boolean(),
    pii: z.boolean(),
    spam: z.boolean(),
    prompt_injection: z.boolean(),
    jailbreak: z.boolean(),
    all_caps_aggression: z.boolean(),
  }),
  categories_detected: z.array(z.string()),
  safe_text: z.string(),
  messages: z.array(z.string()),
  severity: z.enum(['low', 'medium', 'high']),
  score: z.number().min(0).max(1),
  meta: z.object({
    timestamp: z.string(),
    version: z.string(),
    latency_ms: z.number(),
  }),
});

export type ModerationResponse = z.infer<typeof moderationResponseSchema>;


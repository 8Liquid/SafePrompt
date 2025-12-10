// Detector registry and orchestration
import type { Detector, DetectionResult } from './types';
import { profanityDetector } from './profanity';
import { hateSpeechDetector } from './hateSpeech';
import { toxicityDetector } from './toxicity';
import { violenceDetector } from './violence';
import { threatsDetector } from './threats';
import { selfHarmDetector } from './selfHarm';
import { nsfwDetector } from './nsfw';
import { scamPhishingDetector } from './scamPhishing';
import { piiDetector } from './pii';
import { spamDetector } from './spam';
import { promptInjectionDetector } from './promptInjection';
import { jailbreakDetector } from './jailbreak';
import { allCapsAggressionDetector } from './allCapsAggression';

// Registry of all detectors
export const detectors: Detector[] = [
  profanityDetector,
  hateSpeechDetector,
  toxicityDetector,
  violenceDetector,
  threatsDetector,
  selfHarmDetector,
  nsfwDetector,
  scamPhishingDetector,
  piiDetector,
  spamDetector,
  promptInjectionDetector,
  jailbreakDetector,
  allCapsAggressionDetector,
];

/**
 * Runs all detectors in parallel on the given text
 */
export async function runAllDetectors(
  text: string,
  normalizedText: string
): Promise<Map<string, DetectionResult>> {
  const results = new Map<string, DetectionResult>();
  
  // Run all detectors in parallel
  const detectionPromises = detectors.map(async (detector) => {
    const result = detector.detect(text, normalizedText);
    return { name: detector.name, result };
  });
  
  const detectionResults = await Promise.all(detectionPromises);
  
  for (const { name, result } of detectionResults) {
    results.set(name, result);
  }
  
  return results;
}

/**
 * Gets detector by name
 */
export function getDetector(name: string): Detector | undefined {
  return detectors.find(d => d.name === name);
}


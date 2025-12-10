// Cleaner registry and orchestration
import type { Cleaner } from './types';
import type { DetectionResult } from '../detectors/types';
import { profanityCleaner } from './profanityCleaner';
import { piiCleaner } from './piiCleaner';
import { injectionCleaner } from './injectionCleaner';
import { harmfulPhrasingCleaner } from './harmfulPhrasingCleaner';
import { normalizationCleaner } from './normalizationCleaner';

// Registry of all cleaners
export const cleaners: Cleaner[] = [
  piiCleaner,              // First: Remove sensitive data
  injectionCleaner,         // Second: Remove injection/jailbreak content
  profanityCleaner,         // Third: Mask profane language
  harmfulPhrasingCleaner,   // Fourth: Soften violent/threatening language
  normalizationCleaner,     // Fifth: Final whitespace and casing cleanup
];

/**
 * Runs all cleaners in sequence on the given text
 */
export function cleanText(text: string, detections: Map<string, DetectionResult>): string {
  let cleaned = text;
  
  // Only run cleaners if there are detections
  const hasDetections = Array.from(detections.values()).some(d => d.detected);
  
  if (!hasDetections) {
    // Still run normalization for consistency
    return normalizationCleaner.clean(text);
  }
  
  // Run cleaners in order
  for (const cleaner of cleaners) {
    cleaned = cleaner.clean(cleaned);
  }
  
  return cleaned;
}

/**
 * Gets cleaner by name
 */
export function getCleaner(name: string): Cleaner | undefined {
  return cleaners.find(c => c.name === name);
}


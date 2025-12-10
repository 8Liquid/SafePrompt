import type { Cleaner } from './types';

// Patterns for harmful phrasing that should be softened
const HARMFUL_PATTERNS = [
  // Violence/threats
  {
    pattern: /\b(I|I'm|I am)\s+(will|going to|gonna)\s+(kill|hurt|harm|destroy|attack)\s+(you|your|them|him|her)\b/gi,
    replacement: '[action redacted]',
  },
  {
    pattern: /\b(kill|hurt|harm|destroy|attack)\s+(you|your|them|him|her)\b/gi,
    replacement: '[action redacted]',
  },
];

export const harmfulPhrasingCleaner: Cleaner = {
  name: 'harmful_phrasing',
  
  clean(text: string): string {
    let cleaned = text;
    
    // Apply harmful phrasing replacements
    for (const { pattern, replacement } of HARMFUL_PATTERNS) {
      cleaned = cleaned.replace(pattern, replacement);
    }
    
    return cleaned;
  },
};


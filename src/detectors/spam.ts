import type { Detector, DetectionResult } from './types';
import { PATTERNS, matchesPattern } from '../utils/patternMatching';

export const spamDetector: Detector = {
  name: 'spam',
  weight: 0.1,
  
  detect(text: string, normalizedText: string): DetectionResult {
    // Check for repeated characters (5+)
    const repeatedChars = matchesPattern(text, PATTERNS.REPEATED_CHARS);
    
    // Check for repeated words (3+)
    const repeatedWords = matchesPattern(text, PATTERNS.REPEATED_WORDS);
    
    // Check for excessive punctuation (3+)
    const excessivePunctuation = matchesPattern(text, PATTERNS.EXCESSIVE_PUNCTUATION);
    
    const detected = repeatedChars || repeatedWords || excessivePunctuation;
    
    if (detected) {
      let confidence = 0.5;
      if (repeatedChars) confidence += 0.2;
      if (repeatedWords) confidence += 0.2;
      if (excessivePunctuation) confidence += 0.1;
      
      return {
        detected: true,
        confidence: Math.min(0.9, confidence),
        matches: [],
      };
    }
    
    return {
      detected: false,
      confidence: 0.0,
    };
  },
};


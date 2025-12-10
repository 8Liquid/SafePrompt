import type { Detector, DetectionResult } from './types';

// Note: We don't include actual slurs in wordlists for ethical reasons
// Hate speech detection relies on patterns and context

// Patterns for hate speech constructions - detect discriminatory language patterns
const HATE_SPEECH_PATTERNS = [
  // Group-based derogatory statements
  /\b(all|every|no)\s+(people|person|ones?|them|they)\s+(of|from|who)\s+\w+\s+(are|is)\s+(stupid|inferior|worthless|disgusting|trash)/i,
  // Elimination rhetoric
  /\b\w+\s+(should|must|need to|deserve to)\s+(die|be killed|be eliminated|be removed|not exist)/i,
  // Dehumanizing language
  /\b(they|them|those|these)\s+(are|is)\s+(animals|vermin|pests|scum|garbage|filth)/i,
  // Discriminatory generalizations
  /\b(all|every|no)\s+\w+\s+(people|person|ones?)\s+(are|is)\s+(criminals|thieves|liars|cheaters)/i,
  // Hateful comparisons
  /\b\w+\s+(are|is)\s+(worse than|inferior to|below|less than)\s+/i,
];

export const hateSpeechDetector: Detector = {
  name: 'hate_speech',
  weight: 0.8,
  
  detect(text: string, normalizedText: string): DetectionResult {
    // Check for hate speech patterns (pattern-based detection is more reliable)
    const patternMatch = HATE_SPEECH_PATTERNS.some(pattern => pattern.test(text));
    
    if (patternMatch) {
      return {
        detected: true,
        confidence: 0.85,
        matches: [],
      };
    }
    
    return {
      detected: false,
      confidence: 0.0,
    };
  },
};


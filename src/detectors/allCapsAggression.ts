import type { Detector, DetectionResult } from './types';
import { isMostlyUppercase, containsCommonAcronyms } from '../utils/heuristics';

export const allCapsAggressionDetector: Detector = {
  name: 'all_caps_aggression',
  weight: 0.2,
  
  detect(text: string, normalizedText: string): DetectionResult {
    // Minimum length threshold
    if (text.length < 10) {
      return {
        detected: false,
        confidence: 0.0,
      };
    }
    
    // Check if mostly uppercase
    const mostlyUpper = isMostlyUppercase(text, 0.7);
    
    // Exclude common acronyms
    const hasAcronyms = containsCommonAcronyms(text);
    
    // Check for aggressive language patterns combined with caps
    const aggressivePatterns = [
      /\b(WHAT|WHY|HOW|STOP|NO|DON'T|CAN'T)\b/,
      /\b(ANGRY|MAD|FURIOUS|HATE|DISGUSTED)\b/,
    ];
    
    const hasAggressiveLanguage = aggressivePatterns.some(pattern => pattern.test(text));
    
    const detected = mostlyUpper && !hasAcronyms && (hasAggressiveLanguage || text.length > 20);
    
    if (detected) {
      return {
        detected: true,
        confidence: hasAggressiveLanguage ? 0.8 : 0.5,
        matches: [],
      };
    }
    
    return {
      detected: false,
      confidence: 0.0,
    };
  },
};


import type { Detector, DetectionResult } from './types';
import { containsKeyword, createWordSet } from '../utils/keywordMatching';

// NSFW wordlist
const NSFW_WORDS = [
  'explicit', 'sexual', 'pornographic', 'adult content',
  'mature content', 'explicit material'
];

const nsfwSet = createWordSet(NSFW_WORDS);

export const nsfwDetector: Detector = {
  name: 'nsfw',
  weight: 0.4,
  
  detect(text: string, normalizedText: string): DetectionResult {
    // Check keyword list
    const keywordMatch = containsKeyword(normalizedText, nsfwSet);
    
    // Additional explicit content patterns
    const explicitPatterns = [
      /\b(explicit|sexual|pornographic|adult)\s+(content|material|video|image)/i,
    ];
    
    const patternMatch = explicitPatterns.some(pattern => pattern.test(text));
    
    const detected = keywordMatch || patternMatch;
    
    if (detected) {
      return {
        detected: true,
        confidence: keywordMatch ? 0.8 : 0.6,
        matches: [],
      };
    }
    
    return {
      detected: false,
      confidence: 0.0,
    };
  },
};


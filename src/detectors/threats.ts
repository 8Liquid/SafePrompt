import type { Detector, DetectionResult } from './types';
import { containsKeyword, createWordSet } from '../utils/keywordMatching';

// Threats wordlist
const THREATS_WORDS = [
  'kill you', 'hurt you', 'harm you',
  'shoot you', 'stab you', 'beat you',
  'cut you', 'choke you', 'strangle you',
  'i will kill you', 'i will hurt you', 'i will harm you',
  'i will stab you', 'i will shoot you', 'i will beat you',
  'going to kill you', 'going to hurt you', 'going to harm you',
  'going to stab you', 'going to shoot you', 'going to beat you',
  'will kill you', 'will hurt you', 'will harm you',
  'will stab you', 'will shoot you', 'will beat you',
  'i am going to kill you', 'i am going to hurt you',
  'i am going to harm you', 'i am going to stab you',
  'come to kill you', 'come to hurt you', 'come to harm you',
  'threaten you', 'threatening you'
];

const threatsSet = createWordSet(THREATS_WORDS);

// Threat patterns
const THREAT_PATTERNS = [
  // Direct threats
  /\b(I|I'm|I am)\s+(will|going to|gonna)\s+(kill|hurt|harm|destroy|attack)\s+(you|your|them|him|her)/i,
  // Conditional threats
  /\bif\s+(you|they|he|she)\s+(do|don't|try|attempt)/i,
  // Temporal threats
  /\b(soon|later|tomorrow|next week)\s+(I|we)\s+(will|going to)\s+(kill|hurt|harm)/i,
];

export const threatsDetector: Detector = {
  name: 'threats',
  weight: 0.9,
  
  detect(text: string, normalizedText: string): DetectionResult {
    const keywordMatch = containsKeyword(normalizedText, threatsSet);
    const patternMatch = THREAT_PATTERNS.some(pattern => pattern.test(text));
    
    const detected = keywordMatch || patternMatch;
    
    if (detected) {
      return {
        detected: true,
        confidence: keywordMatch ? 0.95 : 0.8,
        matches: [],
      };
    }
    
    return {
      detected: false,
      confidence: 0.0,
    };
  },
};


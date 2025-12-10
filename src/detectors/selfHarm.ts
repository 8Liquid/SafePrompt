import type { Detector, DetectionResult } from './types';
import { containsKeyword, createWordSet } from '../utils/keywordMatching';

// Self-harm wordlist
const SELF_HARM_WORDS = [
  'suicide', 'kill myself', 'hurt myself', 'end my life', 'take my life',
  'self harm', 'self-harm', 'cutting', 'cut myself', 'self injury', 'self-injury',
  'want to die', 'wish i was dead', 'wish i were dead',
  'no reason to live', 'can’t go on', 'don’t want to live',
  'i want to disappear', 'i want to give up',
  'i hate my life', 'life is pointless', 'life is meaningless'
];


const selfHarmSet = createWordSet(SELF_HARM_WORDS);

// Self-harm patterns
const SELF_HARM_PATTERNS = [
  /\b(I|I'm|I am)\s+(want|wish|plan|going)\s+(to|to be)\s+(die|dead|kill myself|hurt myself)/i,
  /\b(no|not)\s+(reason|point)\s+(to|in)\s+(live|living|life)/i,
  /\b(end|ending|take|taking)\s+(my|the)\s+life/i,
];

export const selfHarmDetector: Detector = {
  name: 'self_harm',
  weight: 1.0, // Highest priority
  
  detect(text: string, normalizedText: string): DetectionResult {
    const keywordMatch = containsKeyword(normalizedText, selfHarmSet);
    const patternMatch = SELF_HARM_PATTERNS.some(pattern => pattern.test(text));
    
    const detected = keywordMatch || patternMatch;
    
    if (detected) {
      return {
        detected: true,
        confidence: keywordMatch ? 0.95 : 0.85,
        matches: [],
        context: 'Self-harm content detected. This may require immediate attention.',
      };
    }
    
    return {
      detected: false,
      confidence: 0.0,
    };
  },
};


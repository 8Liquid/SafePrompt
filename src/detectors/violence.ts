import type { Detector, DetectionResult } from './types';
import { containsKeyword, createWordSet } from '../utils/keywordMatching';

// Violence wordlist - only specific violent terms, not generic words
const VIOLENCE_WORDS = [
  'murder', 'kill', 'slaughter', 'massacre',
  'stab', 'stabbing', 'shoot', 'shooting',
  'torture', 'maim', 'strangle', 'strangulation',
  'behead', 'decapitate', 'lynch',
  'rape', 'raping', 'raped',
  'execute', 'execution', 'homicide',
  'assault', 'battery',
  'bomb', 'explosive', 'grenade', 'landmine',
  'molotov', 'firebomb', 'arson',
  'detonate', 'detonation',
  'gun', 'pistol', 'rifle', 'shotgun',
  'knife', 'blade', 'machete', 'sword'
];


const violenceSet = createWordSet(VIOLENCE_WORDS);

// Patterns for violent action constructions - more context-aware
const VIOLENCE_PATTERNS = [
  // Direct violent actions with intent
  /\b(I|we|they|he|she)\s+(will|going to|gonna)\s+(kill|murder|assault|slaughter)/i,
  // Violent threats with weapons
  /\b(use|using|with)\s+(gun|knife|weapon|bomb)\s+(to|for)\s+(kill|hurt|harm)/i,
  // Graphic violence descriptions
  /\b(brutal|brutality|gore|bloody)\s+(murder|kill|attack|violence)/i,
  // Mass violence
  /\b(massacre|slaughter|genocide)/i,
];

export const violenceDetector: Detector = {
  name: 'violence',
  weight: 0.8,
  
  detect(text: string, normalizedText: string): DetectionResult {
    // Check for specific violent keywords
    const keywordMatch = containsKeyword(normalizedText, violenceSet);
    
    // Check for violent patterns (more reliable than keywords alone)
    const patternMatch = VIOLENCE_PATTERNS.some(pattern => pattern.test(text));
    
    // Require pattern match for higher confidence (avoids false positives)
    const detected = patternMatch || (keywordMatch && text.length < 50); // Short texts with keywords are more likely to be violent
    
    if (detected) {
      return {
        detected: true,
        confidence: patternMatch ? 0.9 : keywordMatch ? 0.6 : 0.7,
        matches: [],
      };
    }
    
    return {
      detected: false,
      confidence: 0.0,
    };
  },
};


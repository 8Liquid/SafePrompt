import type { Detector, DetectionResult } from './types';

// Toxicity patterns - insult patterns, belittling phrases
const TOXICITY_PATTERNS = [
  /\byou're\s+(so|such|really|very)\s+(stupid|idiot|dumb|moron|fool)/i,
  /\b(you|your)\s+(are|is)\s+(worthless|useless|pathetic|disgusting)/i,
  /\b(go|goes)\s+(to|die|away|fuck yourself)/i,
  /\b(shut up|shut your mouth|be quiet)/i,
  /\b(no one|nobody)\s+(likes|loves|cares about)\s+you/i,
];

export const toxicityDetector: Detector = {
  name: 'toxicity',
  weight: 0.5,
  
  detect(text: string, normalizedText: string): DetectionResult {
    const matches: string[] = [];
    
    for (const pattern of TOXICITY_PATTERNS) {
      const match = text.match(pattern);
      if (match) {
        matches.push(...match);
      }
    }
    
    const detected = matches.length > 0;
    
    return {
      detected,
      confidence: detected ? Math.min(0.9, 0.5 + (matches.length * 0.1)) : 0.0,
      matches,
    };
  },
};


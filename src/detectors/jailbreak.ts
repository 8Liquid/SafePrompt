import type { Detector, DetectionResult } from './types';

// Jailbreak patterns
const JAILBREAK_PATTERNS = [
  // DAN (Do Anything Now) patterns
  /\b(DAN|do anything now|jailbreak mode|developer mode|debug mode|admin mode)\b/i,
  // Character role-play
  /\b(pretend you're|you're now|imagine you are|act as if you are)\s+/i,
  // Hypothetical scenarios
  /\b(hypothetically|in a fictional story|in a hypothetical scenario|pretend that)/i,
  // Developer/admin modes
  /\b(developer|debug|admin|unrestricted|unlimited)\s+mode/i,
  // Bypass attempts
  /\b(bypass|override|ignore|circumvent)\s+(safety|restrictions|limits|rules)/i,
];

export const jailbreakDetector: Detector = {
  name: 'jailbreak',
  weight: 0.7,
  
  detect(text: string, normalizedText: string): DetectionResult {
    const matches: string[] = [];
    
    for (const pattern of JAILBREAK_PATTERNS) {
      const match = text.match(pattern);
      if (match) {
        matches.push(...match);
      }
    }
    
    const detected = matches.length > 0;
    
    if (detected) {
      return {
        detected: true,
        confidence: Math.min(0.95, 0.7 + (matches.length * 0.1)),
        matches,
      };
    }
    
    return {
      detected: false,
      confidence: 0.0,
    };
  },
};


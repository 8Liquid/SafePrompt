import type { Detector, DetectionResult } from './types';

// Prompt injection patterns
const INJECTION_PATTERNS = [
  // Instruction override
  /\b(ignore|disregard|forget)\s+(previous|all|all previous)\s+(instructions|prompts|rules)/i,
  /\b(ignore|disregard)\s+(everything|what|all)\s+(above|before|said)/i,
  // Role-playing
  /\b(you are now|you're now|pretend to be|act as|roleplay as)\s+/i,
  // System prompt extraction
  /\b(what are|show me|tell me|reveal)\s+(your|the)\s+(instructions|prompt|system prompt|rules)/i,
  // Encoding attempts (basic detection)
  /\b(base64|hex|encoded|decoded)\s+(string|text|message)/i,
  // Delimiter attacks
  /(```|~~~|===|###)\s*(system|instruction|prompt|override)/i,
];

export const promptInjectionDetector: Detector = {
  name: 'prompt_injection',
  weight: 0.7,
  
  detect(text: string, normalizedText: string): DetectionResult {
    const matches: string[] = [];
    
    for (const pattern of INJECTION_PATTERNS) {
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


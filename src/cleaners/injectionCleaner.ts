import type { Cleaner } from './types';

// Injection and jailbreak patterns (same as detectors)
const INJECTION_PATTERNS = [
  /\b(ignore|disregard|forget)\s+(previous|all|all previous)\s+(instructions|prompts|rules).*?[.!?]/gi,
  /\b(ignore|disregard)\s+(everything|what|all)\s+(above|before|said).*?[.!?]/gi,
  /\b(you are now|you're now|pretend to be|act as|roleplay as).*?[.!?]/gi,
  /\b(what are|show me|tell me|reveal)\s+(your|the)\s+(instructions|prompt|system prompt|rules).*?[.!?]/gi,
  /\b(base64|hex|encoded|decoded)\s+(string|text|message).*?[.!?]/gi,
  /(```|~~~|===|###)\s*(system|instruction|prompt|override).*?[.!?]/gi,
];

const JAILBREAK_PATTERNS = [
  /\b(DAN|do anything now|jailbreak mode|developer mode|debug mode|admin mode).*?[.!?]/gi,
  /\b(pretend you're|you're now|imagine you are|act as if you are).*?[.!?]/gi,
  /\b(hypothetically|in a fictional story|in a hypothetical scenario|pretend that).*?[.!?]/gi,
  /\b(developer|debug|admin|unrestricted|unlimited)\s+mode.*?[.!?]/gi,
  /\b(bypass|override|ignore|circumvent)\s+(safety|restrictions|limits|rules).*?[.!?]/gi,
];

export const injectionCleaner: Cleaner = {
  name: 'injection',
  
  clean(text: string): string {
    let cleaned = text;
    
    // Remove injection patterns
    for (const pattern of INJECTION_PATTERNS) {
      cleaned = cleaned.replace(pattern, '');
    }
    
    // Remove jailbreak patterns
    for (const pattern of JAILBREAK_PATTERNS) {
      cleaned = cleaned.replace(pattern, '');
    }
    
    // Clean up multiple spaces that might result from removals
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    return cleaned;
  },
};


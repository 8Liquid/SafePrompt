import type { Detector, DetectionResult } from './types';
import { PATTERNS, findMatches } from '../utils/patternMatching';
import { isValidCreditCard } from '../utils/heuristics';

export const piiDetector: Detector = {
  name: 'pii',
  weight: 0.6,
  
  detect(text: string, normalizedText: string): DetectionResult {
    const matches: string[] = [];
    
    // Check for email addresses
    const emails = findMatches(text, PATTERNS.EMAIL);
    matches.push(...emails);
    
    // Check for phone numbers
    const phones = findMatches(text, PATTERNS.PHONE_US);
    matches.push(...phones);
    
    // Check for credit cards (with Luhn validation)
    const creditCardMatches = findMatches(text, PATTERNS.CREDIT_CARD);
    const validCards = creditCardMatches.filter(card => isValidCreditCard(card));
    matches.push(...validCards);
    
    // Check for SSN
    const ssns = findMatches(text, PATTERNS.SSN);
    matches.push(...ssns);
    
    // Check for IP addresses
    const ipv4s = findMatches(text, PATTERNS.IPV4);
    const ipv6s = findMatches(text, PATTERNS.IPV6);
    matches.push(...ipv4s, ...ipv6s);
    
    const detected = matches.length > 0;
    
    return {
      detected,
      confidence: detected ? 0.9 : 0.0,
      matches: [...new Set(matches)], // Remove duplicates
    };
  },
};


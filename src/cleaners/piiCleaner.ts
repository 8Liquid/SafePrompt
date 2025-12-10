import type { Cleaner } from './types';
import { PATTERNS } from '../utils/patternMatching';
import { isValidCreditCard } from '../utils/heuristics';

/**
 * Masks email addresses
 */
function maskEmail(email: string): string {
  return '[EMAIL_REDACTED]';
}

/**
 * Masks phone numbers
 */
function maskPhone(phone: string): string {
  return '[PHONE_REDACTED]';
}

/**
 * Masks credit card numbers (shows last 4 digits)
 */
function maskCreditCard(card: string): string {
  const digits = card.replace(/\D/g, '');
  if (digits.length >= 4) {
    const last4 = digits.slice(-4);
    return `[CARD_REDACTED-${last4}]`;
  }
  return '[CARD_REDACTED]';
}

/**
 * Masks SSN
 */
function maskSSN(ssn: string): string {
  return '[SSN_REDACTED]';
}

/**
 * Masks IP addresses
 */
function maskIP(ip: string): string {
  return '[IP_REDACTED]';
}

export const piiCleaner: Cleaner = {
  name: 'pii',
  
  clean(text: string): string {
    let cleaned = text;
    
    // Mask emails
    cleaned = cleaned.replace(PATTERNS.EMAIL, maskEmail);
    
    // Mask phone numbers
    cleaned = cleaned.replace(PATTERNS.PHONE_US, maskPhone);
    
    // Mask credit cards (with validation)
    const cardMatches = cleaned.match(PATTERNS.CREDIT_CARD);
    if (cardMatches) {
      for (const card of cardMatches) {
        if (isValidCreditCard(card)) {
          cleaned = cleaned.replace(card, maskCreditCard(card));
        }
      }
    }
    
    // Mask SSN
    cleaned = cleaned.replace(PATTERNS.SSN, maskSSN);
    
    // Mask IPv4
    cleaned = cleaned.replace(PATTERNS.IPV4, maskIP);
    
    // Mask IPv6
    cleaned = cleaned.replace(PATTERNS.IPV6, maskIP);
    
    return cleaned;
  },
};


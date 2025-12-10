// Regex and pattern utilities

/**
 * Pre-compiled regex patterns for common use cases
 */
export const PATTERNS = {
  // Email pattern
  EMAIL: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  
  // Phone number patterns (US format)
  PHONE_US: /(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/g,
  
  // Credit card pattern (basic)
  CREDIT_CARD: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
  
  // SSN pattern
  SSN: /\b\d{3}-\d{2}-\d{4}\b/g,
  
  // IPv4 pattern
  IPV4: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
  
  // IPv6 pattern (simplified)
  IPV6: /\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b/g,
  
  // Repeated characters (5+)
  REPEATED_CHARS: /(.)\1{4,}/g,
  
  // Repeated words (3+)
  REPEATED_WORDS: /\b(\w+)(?:\s+\1){2,}\b/gi,
  
  // Excessive punctuation (3+)
  EXCESSIVE_PUNCTUATION: /[!?.]{3,}/g,
} as const;

/**
 * Tests if text matches a pattern
 */
export function matchesPattern(text: string, pattern: RegExp): boolean {
  return pattern.test(text);
}

/**
 * Finds all matches of a pattern in text
 */
export function findMatches(text: string, pattern: RegExp): string[] {
  const matches = text.match(pattern);
  return matches || [];
}

/**
 * Escapes special regex characters
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


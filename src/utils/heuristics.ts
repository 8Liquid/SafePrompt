// Heuristic rule functions

/**
 * Calculates the ratio of uppercase characters in text
 */
export function calculateCapsRatio(text: string): number {
  if (text.length === 0) return 0;
  
  const upperCount = (text.match(/[A-Z]/g) || []).length;
  return upperCount / text.length;
}

/**
 * Checks if text is mostly uppercase (threshold: 70%)
 */
export function isMostlyUppercase(text: string, threshold = 0.7): boolean {
  return calculateCapsRatio(text) >= threshold;
}

/**
 * Checks if text contains common acronyms (to exclude from all-caps detection)
 */
export function containsCommonAcronyms(text: string): boolean {
  const acronyms = ['NASA', 'FBI', 'CIA', 'USA', 'UK', 'EU', 'CEO', 'CTO', 'API', 'HTTP', 'HTTPS', 'URL', 'JSON', 'XML'];
  const upperText = text.toUpperCase();
  return acronyms.some(acronym => upperText.includes(acronym));
}

/**
 * Counts the number of detected categories
 */
export function countDetectedCategories(flags: Record<string, boolean>): number {
  return Object.values(flags).filter(Boolean).length;
}

/**
 * Checks if text contains urgency language (for scam detection)
 */
export function containsUrgencyLanguage(text: string): boolean {
  const urgencyPatterns = [
    /\bact now\b/i,
    /\blimited time\b/i,
    /\bexpires soon\b/i,
    /\burgent\b/i,
    /\bimmediately\b/i,
    /\basap\b/i,
    /\bright now\b/i,
  ];
  
  return urgencyPatterns.some(pattern => pattern.test(text));
}

/**
 * Checks if text contains financial request language (for scam detection)
 */
export function containsFinancialRequests(text: string): boolean {
  const financialPatterns = [
    /\bsend money\b/i,
    /\bwire transfer\b/i,
    /\bgift card\b/i,
    /\bvenmo\b/i,
    /\bpaypal\b/i,
    /\bwestern union\b/i,
    /\bcredit card number\b/i,
  ];
  
  return financialPatterns.some(pattern => pattern.test(text));
}

/**
 * Validates credit card number using Luhn algorithm
 */
export function isValidCreditCard(cardNumber: string): boolean {
  // Remove non-digits
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}


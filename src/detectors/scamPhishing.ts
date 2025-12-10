import type { Detector, DetectionResult } from './types';
import { containsUrgencyLanguage, containsFinancialRequests } from '../utils/heuristics';

// Scam/phishing patterns
const SCAM_PATTERNS = [
  // Urgency language
  /\b(act now|limited time|expires soon|urgent|immediately|asap|right now)\b/i,
  // Financial requests
  /\b(send money|wire transfer|gift card|venmo|paypal|western union|credit card number)\b/i,
  // Authority impersonation
  /\b(IRS|FBI|CIA|police|court order|arrest warrant|legal action)\b/i,
  // Suspicious links (basic pattern)
  /\b(click here|visit this link|go to this website)\s+(http|https|www\.)/i,
];

export const scamPhishingDetector: Detector = {
  name: 'scam_phishing',
  weight: 0.6,
  
  detect(text: string, normalizedText: string): DetectionResult {
    const urgencyMatch = containsUrgencyLanguage(text);
    const financialMatch = containsFinancialRequests(text);
    const patternMatch = SCAM_PATTERNS.some(pattern => pattern.test(text));
    
    // Count indicators
    let indicatorCount = 0;
    if (urgencyMatch) indicatorCount++;
    if (financialMatch) indicatorCount++;
    if (patternMatch) indicatorCount++;
    
    const detected = indicatorCount >= 2; // Require multiple indicators
    
    if (detected) {
      return {
        detected: true,
        confidence: Math.min(0.95, 0.6 + (indicatorCount * 0.1)),
        matches: [],
      };
    }
    
    return {
      detected: false,
      confidence: 0.0,
    };
  },
};


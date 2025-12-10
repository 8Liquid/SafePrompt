// Scoring engine

import type { DetectionResult } from '../detectors/types';
import type { Severity } from '../schemas/types';
import { getCategoryWeight } from './weights';
import { mapScoreToSeverity } from './severity';

/**
 * Calculates the severity score from detection results
 * 
 * Formula:
 * base_score = max(detected_categories.map(cat => cat.weight))
 * intensity_multiplier = 1.0 + (0.2 * number_of_categories_detected)
 * final_score = min(1.0, base_score * intensity_multiplier)
 */
export function calculateScore(detections: Map<string, DetectionResult>): number {
  const detectedCategories: string[] = [];
  
  // Collect all detected categories
  for (const [categoryName, result] of detections.entries()) {
    if (result.detected) {
      detectedCategories.push(categoryName);
    }
  }
  
  // If no detections, return 0
  if (detectedCategories.length === 0) {
    return 0.0;
  }
  
  // Calculate base score (max weight of detected categories)
  const weights = detectedCategories.map(cat => getCategoryWeight(cat));
  const baseScore = Math.max(...weights);
  
  // Calculate intensity multiplier
  const intensityMultiplier = 1.0 + (0.2 * detectedCategories.length);
  
  // Calculate final score (capped at 1.0)
  const finalScore = Math.min(1.0, baseScore * intensityMultiplier);
  
  return finalScore;
}

/**
 * Gets severity level from score
 */
export function getSeverity(score: number): Severity {
  return mapScoreToSeverity(score);
}

/**
 * Generates human-readable messages from detected categories
 */
export function generateMessages(
  detectedCategories: string[],
  severity: Severity
): string[] {
  const messages: string[] = [];
  
  if (detectedCategories.length === 0) {
    messages.push('No issues detected in text');
    return messages;
  }
  
  // Format category names for display
  const formattedCategories = detectedCategories.map(cat => {
    return cat
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  });
  
  // Generate message based on number of categories
  if (detectedCategories.length === 1) {
    messages.push(`Detected ${formattedCategories[0]} in text`);
  } else if (detectedCategories.length === 2) {
    messages.push(`Detected ${formattedCategories[0]} and ${formattedCategories[1]} in text`);
  } else {
    const lastCategory = formattedCategories.pop();
    const otherCategories = formattedCategories.join(', ');
    messages.push(`Detected ${otherCategories}, and ${lastCategory} in text`);
  }
  
  // Add severity warning for high severity
  if (severity === 'high') {
    messages.push('High severity content detected. Please review carefully.');
  }
  
  return messages;
}


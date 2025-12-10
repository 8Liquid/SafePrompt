import { describe, it, expect } from 'vitest';
import { calculateScore, getSeverity, generateMessages } from '../../src/scoring';
import type { DetectionResult } from '../../src/detectors/types';

describe('scoring', () => {
  describe('calculateScore', () => {
    it('should return 0 for no detections', () => {
      const detections = new Map<string, DetectionResult>();
      const score = calculateScore(detections);
      expect(score).toBe(0.0);
    });

    it('should calculate score for single detection', () => {
      const detections = new Map<string, DetectionResult>();
      detections.set('profanity', { detected: true, confidence: 0.9 });
      const score = calculateScore(detections);
      expect(score).toBeGreaterThan(0);
      expect(score).toBeLessThanOrEqual(1.0);
    });

    it('should increase score with multiple detections', () => {
      const detections = new Map<string, DetectionResult>();
      detections.set('profanity', { detected: true, confidence: 0.9 });
      detections.set('violence', { detected: true, confidence: 0.9 });
      
      const score = calculateScore(detections);
      expect(score).toBeGreaterThan(0.3); // Should be higher than single detection
    });

    it('should cap score at 1.0', () => {
      const detections = new Map<string, DetectionResult>();
      // Add many high-weight detections
      detections.set('self_harm', { detected: true, confidence: 0.9 });
      detections.set('threats', { detected: true, confidence: 0.9 });
      detections.set('violence', { detected: true, confidence: 0.9 });
      
      const score = calculateScore(detections);
      expect(score).toBeLessThanOrEqual(1.0);
    });
  });

  describe('getSeverity', () => {
    it('should return low for score < 0.3', () => {
      expect(getSeverity(0.2)).toBe('low');
    });

    it('should return medium for 0.3 <= score < 0.7', () => {
      expect(getSeverity(0.5)).toBe('medium');
    });

    it('should return high for score >= 0.7', () => {
      expect(getSeverity(0.8)).toBe('high');
    });
  });

  describe('generateMessages', () => {
    it('should generate message for no detections', () => {
      const messages = generateMessages([], 'low');
      expect(messages).toContain('No issues detected in text');
    });

    it('should generate message for single category', () => {
      const messages = generateMessages(['profanity'], 'low');
      expect(messages[0]).toContain('Profanity');
    });

    it('should generate message for multiple categories', () => {
      const messages = generateMessages(['profanity', 'violence'], 'medium');
      expect(messages[0]).toContain('Profanity');
      expect(messages[0]).toContain('Violence');
    });

    it('should include severity warning for high severity', () => {
      const messages = generateMessages(['threats'], 'high');
      expect(messages.some(msg => msg.includes('High severity'))).toBe(true);
    });
  });
});


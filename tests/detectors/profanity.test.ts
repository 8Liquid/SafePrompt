import { describe, it, expect } from 'vitest';
import { profanityDetector } from '../../src/detectors/profanity';

describe('profanityDetector', () => {
  it('should detect profanity in text', () => {
    const result = profanityDetector.detect('This is a damn test', 'this is a damn test');
    expect(result.detected).toBe(true);
    expect(result.confidence).toBeGreaterThan(0);
  });

  it('should not detect profanity in clean text', () => {
    const result = profanityDetector.detect('This is a clean test', 'this is a clean test');
    expect(result.detected).toBe(false);
  });

  it('should detect profanity with character substitutions', () => {
    const result = profanityDetector.detect('This is a d@mn test', 'this is a d@mn test');
    expect(result.detected).toBe(true);
  });
});


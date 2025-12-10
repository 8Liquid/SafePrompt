import { describe, it, expect } from 'vitest';
import { spamDetector } from '../../src/detectors/spam';

describe('spamDetector', () => {
  it('should detect repeated characters', () => {
    const result = spamDetector.detect('This is aaaaaa test', 'this is aaaaaa test');
    expect(result.detected).toBe(true);
  });

  it('should detect repeated words', () => {
    const result = spamDetector.detect('test test test message', 'test test test message');
    expect(result.detected).toBe(true);
  });

  it('should detect excessive punctuation', () => {
    const result = spamDetector.detect('This is great!!!', 'this is great!!!');
    expect(result.detected).toBe(true);
  });

  it('should not detect spam in normal text', () => {
    const result = spamDetector.detect('This is a normal message.', 'this is a normal message.');
    expect(result.detected).toBe(false);
  });
});


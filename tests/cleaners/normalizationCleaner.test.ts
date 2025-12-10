import { describe, it, expect } from 'vitest';
import { normalizationCleaner } from '../../src/cleaners/normalizationCleaner';

describe('normalizationCleaner', () => {
  it('should normalize whitespace', () => {
    const cleaned = normalizationCleaner.clean('This   has   multiple   spaces');
    expect(cleaned).toBe('This has multiple spaces');
  });

  it('should normalize excessive punctuation', () => {
    const cleaned = normalizationCleaner.clean('This is great!!!');
    expect(cleaned).toContain('!');
    expect(cleaned).not.toContain('!!!');
  });

  it('should preserve normal text', () => {
    const cleaned = normalizationCleaner.clean('This is a normal message.');
    expect(cleaned).toBe('This is a normal message.');
  });
});


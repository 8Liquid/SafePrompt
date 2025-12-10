import { describe, it, expect } from 'vitest';
import { profanityCleaner } from '../../src/cleaners/profanityCleaner';

describe('profanityCleaner', () => {
  it('should mask profanity', () => {
    const cleaned = profanityCleaner.clean('This is a damn test');
    expect(cleaned).toContain('d***');
    expect(cleaned).not.toContain('damn');
  });

  it('should preserve non-profane text', () => {
    const cleaned = profanityCleaner.clean('This is a clean test');
    expect(cleaned).toBe('This is a clean test');
  });

  it('should mask multiple profane words', () => {
    const cleaned = profanityCleaner.clean('This is a damn hell test');
    expect(cleaned).toContain('d***');
    expect(cleaned).toContain('h***');
  });
});


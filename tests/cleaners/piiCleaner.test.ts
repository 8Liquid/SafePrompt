import { describe, it, expect } from 'vitest';
import { piiCleaner } from '../../src/cleaners/piiCleaner';

describe('piiCleaner', () => {
  it('should mask email addresses', () => {
    const cleaned = piiCleaner.clean('Contact me at user@example.com');
    expect(cleaned).toContain('[EMAIL_REDACTED]');
    expect(cleaned).not.toContain('user@example.com');
  });

  it('should mask phone numbers', () => {
    const cleaned = piiCleaner.clean('Call me at 555-123-4567');
    expect(cleaned).toContain('[PHONE_REDACTED]');
    expect(cleaned).not.toContain('555-123-4567');
  });

  it('should mask SSN', () => {
    const cleaned = piiCleaner.clean('SSN: 123-45-6789');
    expect(cleaned).toContain('[SSN_REDACTED]');
    expect(cleaned).not.toContain('123-45-6789');
  });

  it('should mask IP addresses', () => {
    const cleaned = piiCleaner.clean('IP: 192.168.1.1');
    expect(cleaned).toContain('[IP_REDACTED]');
    expect(cleaned).not.toContain('192.168.1.1');
  });

  it('should preserve clean text', () => {
    const cleaned = piiCleaner.clean('This is a clean message');
    expect(cleaned).toBe('This is a clean message');
  });
});


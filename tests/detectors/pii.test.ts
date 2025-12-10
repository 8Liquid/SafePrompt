import { describe, it, expect } from 'vitest';
import { piiDetector } from '../../src/detectors/pii';

describe('piiDetector', () => {
  it('should detect email addresses', () => {
    const result = piiDetector.detect('Contact me at user@example.com', 'contact me at user@example.com');
    expect(result.detected).toBe(true);
    expect(result.matches).toContain('user@example.com');
  });

  it('should detect phone numbers', () => {
    const result = piiDetector.detect('Call me at 555-123-4567', 'call me at 555-123-4567');
    expect(result.detected).toBe(true);
  });

  it('should detect SSN', () => {
    const result = piiDetector.detect('SSN: 123-45-6789', 'ssn: 123-45-6789');
    expect(result.detected).toBe(true);
    expect(result.matches).toContain('123-45-6789');
  });

  it('should detect IP addresses', () => {
    const result = piiDetector.detect('IP: 192.168.1.1', 'ip: 192.168.1.1');
    expect(result.detected).toBe(true);
  });

  it('should not detect PII in clean text', () => {
    const result = piiDetector.detect('This is a clean message', 'this is a clean message');
    expect(result.detected).toBe(false);
  });
});


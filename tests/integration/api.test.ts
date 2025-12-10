import { describe, it, expect } from 'vitest';
import { router } from '../../src/router';

describe('API Integration', () => {
  it('should handle POST /moderate with valid request', async () => {
    const request = new Request('http://localhost/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'This is a test message' }),
    });

    const response = await router(request);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('flags');
    expect(data).toHaveProperty('categories_detected');
    expect(data).toHaveProperty('safe_text');
    expect(data).toHaveProperty('messages');
    expect(data).toHaveProperty('severity');
    expect(data).toHaveProperty('score');
    expect(data).toHaveProperty('meta');
  });

  it('should return 400 for invalid request', async () => {
    const request = new Request('http://localhost/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await router(request);
    expect(response.status).toBe(400);
  });

  it('should return 400 for empty text', async () => {
    const request = new Request('http://localhost/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: '' }),
    });

    const response = await router(request);
    expect(response.status).toBe(400);
  });

  it('should return 404 for unknown route', async () => {
    const request = new Request('http://localhost/unknown', {
      method: 'POST',
    });

    const response = await router(request);
    expect(response.status).toBe(404);
  });

  it('should handle CORS preflight', async () => {
    const request = new Request('http://localhost/moderate', {
      method: 'OPTIONS',
    });

    const response = await router(request);
    expect(response.status).toBe(204);
  });

  it('should detect and clean profanity', async () => {
    const request = new Request('http://localhost/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'This is a damn test' }),
    });

    const response = await router(request);
    const data = await response.json();

    expect(data.flags.profanity).toBe(true);
    expect(data.categories_detected).toContain('profanity');
    expect(data.safe_text).not.toContain('damn');
  });

  it('should detect PII', async () => {
    const request = new Request('http://localhost/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Contact me at user@example.com' }),
    });

    const response = await router(request);
    const data = await response.json();

    expect(data.flags.pii).toBe(true);
    expect(data.safe_text).toContain('[EMAIL_REDACTED]');
  });
});


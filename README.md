# SafePrompt

**SafePrompt — a lightweight, open-source text moderation API.**

![GitHub stars](https://img.shields.io/github/stars/8Liquid/SafePrompt?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/8Liquid/SafePrompt?style=social)

SafePrompt is a rule-based text moderation API designed for Cloudflare Workers. It analyzes input text for harmful, unsafe, or malicious content and returns detected categories, cleaned/sanitized text, severity scores, and human-readable messages.

## 🚀 Try It Now (Free API)

**Live API Endpoint:** `https://safeprompt.safeprompt.workers.dev/moderate`

Test the API directly in your browser or with curl:

```bash
curl -X POST https://safeprompt.safeprompt.workers.dev/moderate \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a test message"}'
```

Or try it in JavaScript:

```javascript
const response = await fetch('https://safeprompt.safeprompt.workers.dev/moderate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Your text here' })
});
const result = await response.json();
console.log(result);
```

**No API key required** - Free to use for testing and development!

## Overview

SafePrompt provides fast, lightweight text moderation without requiring machine learning models. It uses a modular detector system with keyword lists, regex patterns, and heuristics to identify various types of problematic content.

## Features

SafePrompt detects and moderates the following categories:

- **Profanity** - Offensive language and swear words
- **Hate Speech** - Discriminatory or bigoted content
- **Toxicity** - Insulting or belittling language
- **Violence** - Violent content and threats
- **Threats** - Direct or implied threats
- **Self-Harm** - Self-harm or suicide-related content
- **NSFW** - Not safe for work content
- **Scam/Phishing** - Scam and phishing attempts
- **PII Leak** - Personally identifiable information (emails, phone numbers, SSN, credit cards, IP addresses)
- **Spam** - Spam patterns (repeated characters, words, excessive punctuation)
- **Prompt Injection** - AI prompt injection attempts
- **Jailbreak** - AI jailbreak attempts
- **All-Caps Aggression** - Excessive capitalization with aggressive language

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This starts a local development server using Wrangler.

### Deployment

```bash
# Deploy to production
npm run deploy:production

# Deploy to staging
npm run deploy:staging
```

## API Reference

### Endpoint: `POST /moderate`

Moderates input text and returns detection results.

#### Request

```json
{
  "text": "Your text to moderate here"
}
```

#### Response

```json
{
  "flags": {
    "profanity": false,
    "hate_speech": false,
    "toxicity": false,
    "violence": false,
    "threats": false,
    "self_harm": false,
    "nsfw": false,
    "scam_phishing": false,
    "pii": false,
    "spam": false,
    "prompt_injection": false,
    "jailbreak": false,
    "all_caps_aggression": false
  },
  "categories_detected": [],
  "safe_text": "Your text to moderate here",
  "messages": ["No issues detected in text"],
  "severity": "low",
  "score": 0.0,
  "meta": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "1.0.0",
    "latency_ms": 5
  }
}
```

#### Response Fields

- `flags` - Object with boolean flags for each category
- `categories_detected` - Array of detected category names
- `safe_text` - Sanitized version of the input text
- `messages` - Human-readable messages explaining detections
- `severity` - Severity level: `low`, `medium`, or `high`
- `score` - Numeric score from 0.0 to 1.0
- `meta` - Metadata including timestamp, version, and processing latency

## Examples

### cURL

```bash
# Using the live API (no API key needed)
curl -X POST https://safeprompt.safeprompt.workers.dev/moderate \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a test message"}'
```

### JavaScript

```javascript
// Using the live API (no API key needed)
const response = await fetch('https://safeprompt.safeprompt.workers.dev/moderate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'This is a test message'
  })
});

const result = await response.json();
console.log(result);
```

## Deployment

### Prerequisites

- Node.js 18+ and npm
- Cloudflare account
- Wrangler CLI installed (`npm install -g wrangler`)

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Wrangler:**
   ```bash
   wrangler login
   ```

3. **Deploy:**
   ```bash
   npm run deploy:production
   ```

4. **Verify deployment:**
   ```bash
   curl https://your-worker.your-subdomain.workers.dev/moderate \
     -X POST \
     -H "Content-Type: application/json" \
     -d '{"text": "test"}'
   ```

## Roadmap

### Phase 1 (v1.0) - Current
- ✅ Core moderation categories
- ✅ Basic cleaning and sanitization
- ✅ Scoring system
- ✅ OpenAPI documentation

### Phase 2 (v1.1) - Planned
- Custom wordlist support via API
- Configurable severity thresholds
- Batch processing endpoint
- Webhook notifications

### Phase 3 (v2.0) - Future
- Multi-language support
- Custom detector plugins
- Analytics dashboard
- Enterprise features

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to SafePrompt.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/8Liquid/SafePrompt/issues)
- **Discussions**: [GitHub Discussions](https://github.com/8Liquid/SafePrompt/discussions)

---

Made with ❤️ by [8Liquid](https://github.com/8Liquid)


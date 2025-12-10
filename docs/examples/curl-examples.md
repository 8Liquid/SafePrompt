# cURL Examples

## Basic Request

```bash
curl -X POST https://api.safeprompt.io/moderate \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a test message"}'
```

## Request with Profanity

```bash
curl -X POST https://api.safeprompt.io/moderate \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a test message with inappropriate content"}'
```

## Request with PII

```bash
curl -X POST https://api.safeprompt.io/moderate \
  -H "Content-Type: application/json" \
  -d '{"text": "Contact me at user@example.com or call 555-123-4567"}'
```

## Pretty Print Response

```bash
curl -X POST https://api.safeprompt.io/moderate \
  -H "Content-Type: application/json" \
  -d '{"text": "Test message"}' | jq
```

## Save Response to File

```bash
curl -X POST https://api.safeprompt.io/moderate \
  -H "Content-Type: application/json" \
  -d '{"text": "Test message"}' > response.json
```


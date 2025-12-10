# JavaScript Examples

## Basic Request

```javascript
async function moderateText(text) {
  const response = await fetch('https://api.safeprompt.io/moderate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Usage
const result = await moderateText('This is a test message');
console.log(result);
```

## With Error Handling

```javascript
async function moderateText(text) {
  try {
    const response = await fetch('https://api.safeprompt.io/moderate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Moderation error:', error);
    throw error;
  }
}
```

## Check for Specific Categories

```javascript
const result = await moderateText('Some text to check');

if (result.flags.profanity) {
  console.log('Profanity detected!');
}

if (result.flags.pii) {
  console.log('PII detected:', result.categories_detected);
}

if (result.severity === 'high') {
  console.warn('High severity content detected!');
}
```

## Use Sanitized Text

```javascript
const result = await moderateText('Text with issues');

// Use the sanitized version
const safeText = result.safe_text;
console.log('Safe text:', safeText);
```

## Node.js Example

```javascript
const fetch = require('node-fetch'); // or use native fetch in Node 18+

async function moderateText(text) {
  const response = await fetch('https://api.safeprompt.io/moderate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  
  return await response.json();
}

// Usage
moderateText('Test message')
  .then(result => console.log(result))
  .catch(error => console.error('Error:', error));
```


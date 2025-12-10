# Contributing to SafePrompt

Thank you for your interest in contributing to SafePrompt! This document provides guidelines and instructions for contributing.

## Getting Started

### Development Environment Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/yourusername/safeprompt.git
   cd safeprompt
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## Adding Categories

To add a new moderation category:

1. **Create a detector file** in `src/detectors/`:
   ```typescript
   // src/detectors/myCategory.ts
   import type { Detector, DetectionResult } from './types';
   
   export const myCategoryDetector: Detector = {
     name: 'my_category',
     weight: 0.5, // Set appropriate weight (0.0 to 1.0)
     detect(text: string, normalizedText: string): DetectionResult {
       // Implementation
     },
   };
   ```

2. **Register the detector** in `src/detectors/index.ts`:
   ```typescript
   import { myCategoryDetector } from './myCategory';
   
   export const detectors: Detector[] = [
     // ... existing detectors
     myCategoryDetector,
   ];
   ```

3. **Add to response schema** in `src/schemas/types.ts`:
   ```typescript
   export interface ModerationFlags {
     // ... existing flags
     my_category: boolean;
   }
   ```

4. **Update router** in `src/router.ts` to include the new flag

5. **Add weight** in `src/scoring/weights.ts`

6. **Write tests** in `tests/detectors/myCategory.test.ts`

## Modifying Wordlists

Wordlists are stored in `data/wordlists/` as plain text files.

### Wordlist Format

- One word or phrase per line
- Lines starting with `#` are treated as comments
- Empty lines are ignored
- Case-insensitive matching

### Adding Words

1. Edit the appropriate wordlist file in `data/wordlists/`
2. Add words/phrases (one per line)
3. Test your changes:
   ```bash
   npm test
   ```
4. Submit a pull request

### Best Practices

- Keep wordlists focused and relevant
- Avoid overly broad terms that cause false positives
- Consider context (e.g., medical terms vs. profanity)
- Document any special considerations in comments

## Running Tests

### Run all tests:
```bash
npm test
```

### Run with coverage:
```bash
npm run test:coverage
```

### Run specific test file:
```bash
npm test tests/detectors/profanity.test.ts
```

### Test Structure

- **Unit tests**: Test individual functions and modules
- **Integration tests**: Test full API endpoints
- **Fixture data**: Test cases in `tests/fixtures/`

### Writing Tests

```typescript
import { describe, it, expect } from 'vitest';
import { myDetector } from '../../src/detectors/myDetector';

describe('myDetector', () => {
  it('should detect problematic content', () => {
    const result = myDetector.detect('problematic text', 'problematic text');
    expect(result.detected).toBe(true);
  });
  
  it('should not detect safe content', () => {
    const result = myDetector.detect('safe text', 'safe text');
    expect(result.detected).toBe(false);
  });
});
```

## Code Style

### TypeScript Guidelines

- Use strict TypeScript mode
- Prefer `const` over `let`
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions focused and small

### Linting

Run the linter:
```bash
npm run lint
```

### Type Checking

Check types without building:
```bash
npm run typecheck
```

## Pull Request Process

1. **Create a branch:**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes** and commit:
   ```bash
   git commit -m "Add feature: description"
   ```

3. **Push to your fork:**
   ```bash
   git push origin feature/my-feature
   ```

4. **Create a Pull Request** on GitHub

### PR Requirements

- ✅ All tests pass
- ✅ Code is properly formatted
- ✅ Type checking passes
- ✅ Documentation updated (if needed)
- ✅ Description explains the changes

## Issue Guidelines

### Reporting Bugs

When reporting bugs, please include:

- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (version, deployment)
- Additional context (screenshots, logs, etc.)

### Requesting Features

When requesting features, please include:

- Feature description
- Use case
- Proposed implementation (optional)
- Alternatives considered

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Questions?

If you have questions, feel free to:

- Open a GitHub Discussion
- Create an issue
- Reach out to maintainers

Thank you for contributing to SafePrompt! 🎉


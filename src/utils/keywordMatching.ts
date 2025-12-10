// Keyword list matching utilities

/**
 * Creates a Set from a wordlist for O(1) lookups
 */
export function createWordSet(words: string[]): Set<string> {
  return new Set(words.map(word => word.toLowerCase().trim()));
}

/**
 * Checks if any word from the wordlist appears in the text
 */
export function containsKeyword(text: string, wordSet: Set<string>): boolean {
  const words = text.toLowerCase().split(/\s+/);
  return words.some(word => wordSet.has(word));
}

/**
 * Finds all matching keywords in the text
 */
export function findKeywords(text: string, wordSet: Set<string>): string[] {
  const words = text.toLowerCase().split(/\s+/);
  const matches: string[] = [];
  
  for (const word of words) {
    if (wordSet.has(word)) {
      matches.push(word);
    }
  }
  
  return [...new Set(matches)]; // Remove duplicates
}

/**
 * Checks for keywords with character substitutions (e.g., @ for a, $ for s)
 */
export function containsKeywordWithSubstitutions(
  text: string,
  wordSet: Set<string>
): boolean {
  // Common character substitutions
  const substitutions: Record<string, string> = {
    '@': 'a',
    '$': 's',
    '0': 'o',
    '1': 'i',
    '3': 'e',
    '5': 's',
    '7': 't',
    '!': 'i',
  };
  
  // Normalize text by replacing substitutions
  let normalized = text.toLowerCase();
  for (const [sub, replacement] of Object.entries(substitutions)) {
    normalized = normalized.replace(new RegExp(sub, 'g'), replacement);
  }
  
  return containsKeyword(normalized, wordSet);
}


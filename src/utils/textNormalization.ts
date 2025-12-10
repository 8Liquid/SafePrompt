// Text preprocessing utilities

/**
 * Normalizes text for detection purposes
 * - Converts to lowercase
 * - Normalizes whitespace
 * - Handles Unicode normalization
 */
export function normalizeText(text: string): string {
  return text
    .normalize('NFKC') // Unicode normalization
    .toLowerCase()
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Preserves original text structure while normalizing for matching
 */
export function normalizeForMatching(text: string): string {
  return text
    .normalize('NFKC')
    .toLowerCase()
    .trim();
}


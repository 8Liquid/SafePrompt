// Utility to load wordlists from data files
// In Cloudflare Workers, we'll need to bundle these as static data

/**
 * Loads a wordlist from a text file
 * Each line is a separate word/phrase
 */
export function loadWordlist(words: string[]): string[] {
  return words
    .map(word => word.trim())
    .filter(word => word.length > 0 && !word.startsWith('#')); // Filter empty lines and comments
}

// Wordlists will be imported as arrays in the detector files
// For Cloudflare Workers, we'll bundle them at build time


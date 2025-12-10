import type { Cleaner } from './types';
import { createWordSet } from '../utils/keywordMatching';

// Profanity wordlist (same as detector)
const PROFANITY_WORDS = [
  'damn', 'hell', 'crap', 'ass', 'bastard', 'bitch', 'shit', 'fuck',
  'piss', 'dick', 'cock', 'pussy', 'asshole', 'motherfucker', 'fucker',
  'shitty', 'fucking', 'damned',
  'bullshit', 'dipshit', 'horseshit', 'jackass',
  'douche', 'douchebag', 'cunt',
  'prick', 'twat', 'slut', 'whore',
  'fuckface', 'fuckhead', 'shithead', 'dickhead',
  'buttplug', 'cockhead', 'cocksucker',
  'crackwhore', 'skank', 'cum', 'cumshot',
  'ballsack', 'nutsack',
  'motherfucking', 'fricking', 'frigging',
  'shitface', 'bitchass', 'pisshead',
  'bastards', 'shitbag'
];

const profanitySet = createWordSet(PROFANITY_WORDS);

/**
 * Masks profane words with asterisks (first letter + asterisks)
 */
function maskProfanity(word: string): string {
  if (word.length === 0) return word;
  if (word.length === 1) return '*';
  
  const firstLetter = word[0];
  const asterisks = '*'.repeat(word.length - 1);
  return firstLetter + asterisks;
}

export const profanityCleaner: Cleaner = {
  name: 'profanity',
  
  clean(text: string): string {
    const words = text.split(/(\s+)/); // Preserve whitespace
    const cleaned = words.map(word => {
      const trimmed = word.trim().toLowerCase();
      if (trimmed && profanitySet.has(trimmed)) {
        // Preserve original casing and punctuation
        const originalWord = word.trim();
        const masked = maskProfanity(originalWord);
        // Preserve leading/trailing whitespace and punctuation
        return word.replace(originalWord, masked);
      }
      return word;
    });
    
    return cleaned.join('');
  },
};


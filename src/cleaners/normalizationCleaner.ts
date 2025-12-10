import type { Cleaner } from './types';

export const normalizationCleaner: Cleaner = {
  name: 'normalization',
  
  clean(text: string): string {
    let cleaned = text;
    
    // Normalize whitespace (multiple spaces to single space)
    cleaned = cleaned.replace(/\s+/g, ' ');
    
    // Normalize excessive punctuation (3+ to single)
    cleaned = cleaned.replace(/[!]{3,}/g, '!');
    cleaned = cleaned.replace(/[?]{3,}/g, '?');
    cleaned = cleaned.replace(/[.]{3,}/g, '...');
    
    // Normalize excessive caps (convert to sentence case, but preserve proper nouns)
    // This is a simplified approach - in production, might want more sophisticated handling
    const sentences = cleaned.split(/([.!?]\s+)/);
    const normalizedSentences = sentences.map((sentence, index) => {
      if (index % 2 === 0) {
        // This is a sentence (not punctuation)
        // Only normalize if it's all caps and long enough
        if (sentence.length > 10 && sentence === sentence.toUpperCase() && /[A-Z]/.test(sentence)) {
          // Convert to sentence case
          return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
        }
      }
      return sentence;
    });
    
    cleaned = normalizedSentences.join('');
    
    // Final trim
    cleaned = cleaned.trim();
    
    return cleaned;
  },
};


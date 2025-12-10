import type { Detector, DetectionResult } from './types';
import { containsKeyword, containsKeywordWithSubstitutions, createWordSet } from '../utils/keywordMatching';

// Profanity wordlist (in production, load from data file)
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

export const profanityDetector: Detector = {
  name: 'profanity',
  weight: 0.3,
  
  detect(text: string, normalizedText: string): DetectionResult {
    // Check for direct keyword matches
    const directMatch = containsKeyword(normalizedText, profanitySet);
    
    // Check for keyword matches with character substitutions
    const substitutionMatch = containsKeywordWithSubstitutions(text, profanitySet);
    
    const detected = directMatch || substitutionMatch;
    
    if (detected) {
      return {
        detected: true,
        confidence: directMatch ? 0.9 : 0.7, // Higher confidence for direct matches
        matches: [],
      };
    }
    
    return {
      detected: false,
      confidence: 0.0,
    };
  },
};


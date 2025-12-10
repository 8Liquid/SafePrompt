// Severity mapping logic

import type { Severity } from '../schemas/types';

/**
 * Maps a score to a severity level
 */
export function mapScoreToSeverity(score: number): Severity {
  if (score < 0.3) {
    return 'low';
  } else if (score < 0.7) {
    return 'medium';
  } else {
    return 'high';
  }
}


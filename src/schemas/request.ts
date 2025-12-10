// Request validation schema

import { z } from 'zod';
import { CONFIG } from '../config';

export const moderationRequestSchema = z.object({
  text: z
    .string()
    .min(1, 'Text cannot be empty')
    .max(CONFIG.MAX_TEXT_LENGTH, `Text cannot exceed ${CONFIG.MAX_TEXT_LENGTH} characters`),
});

export type ModerationRequest = z.infer<typeof moderationRequestSchema>;


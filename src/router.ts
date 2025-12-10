// HTTP router and middleware

import type { ModerationRequest, ModerationResponse } from './schemas/types';
import { moderationRequestSchema } from './schemas/request';
import { normalizeText } from './utils/textNormalization';
import { runAllDetectors } from './detectors';
import { cleanText } from './cleaners';
import { calculateScore, getSeverity, generateMessages } from './scoring';
import { CONFIG } from './config';

/**
 * Creates a JSON response
 */
function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/**
 * Creates an error response
 */
function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ error: message }, status);
}

/**
 * Handles CORS preflight requests
 */
function handleOptions(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/**
 * Main moderation endpoint handler
 */
export async function handleModerate(request: Request): Promise<Response> {
  const startTime = Date.now();
  
  try {
    // Parse and validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch (error) {
      return errorResponse('Invalid JSON in request body', 400);
    }
    
    // Validate request schema
    const validationResult = moderationRequestSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message || 'Invalid request';
      return errorResponse(errorMessage, 400);
    }
    
    const { text } = validationResult.data;
    
    // Check text length
    if (text.length > CONFIG.MAX_TEXT_LENGTH) {
      return errorResponse(
        `Text exceeds maximum length of ${CONFIG.MAX_TEXT_LENGTH} characters`,
        413
      );
    }
    
    // Normalize text for detection
    const normalizedText = normalizeText(text);
    
    // Run all detectors in parallel
    const detections = await runAllDetectors(text, normalizedText);
    
    // Calculate score and severity
    const score = calculateScore(detections);
    const severity = getSeverity(score);
    
    // Build flags object
    const flags: ModerationResponse['flags'] = {
      profanity: detections.get('profanity')?.detected || false,
      hate_speech: detections.get('hate_speech')?.detected || false,
      toxicity: detections.get('toxicity')?.detected || false,
      violence: detections.get('violence')?.detected || false,
      threats: detections.get('threats')?.detected || false,
      self_harm: detections.get('self_harm')?.detected || false,
      nsfw: detections.get('nsfw')?.detected || false,
      scam_phishing: detections.get('scam_phishing')?.detected || false,
      pii: detections.get('pii')?.detected || false,
      spam: detections.get('spam')?.detected || false,
      prompt_injection: detections.get('prompt_injection')?.detected || false,
      jailbreak: detections.get('jailbreak')?.detected || false,
      all_caps_aggression: detections.get('all_caps_aggression')?.detected || false,
    };
    
    // Get detected categories
    const categoriesDetected = Object.entries(flags)
      .filter(([, detected]) => detected)
      .map(([category]) => category);
    
    // Clean/sanitize text
    const safeText = cleanText(text, detections);
    
    // Generate messages
    const messages = generateMessages(categoriesDetected, severity);
    
    // Calculate latency
    const latencyMs = Date.now() - startTime;
    
    // Build response
    const response: ModerationResponse = {
      flags,
      categories_detected: categoriesDetected,
      safe_text: safeText,
      messages,
      severity,
      score,
      meta: {
        timestamp: new Date().toISOString(),
        version: CONFIG.VERSION,
        latency_ms: latencyMs,
      },
    };
    
    return jsonResponse(response);
    
  } catch (error) {
    // Log error (in production, use proper logging)
    console.error('Error processing moderation request:', error);
    
    // Return generic error (don't leak internal details)
    return errorResponse('Internal server error', 500);
  }
}

/**
 * Main router function
 */
export async function router(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;
  
  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return handleOptions();
  }
  
  // Route to moderation endpoint
  if (path === '/moderate' && method === 'POST') {
    return handleModerate(request);
  }
  
  // 404 for unknown routes
  return errorResponse('Not Found', 404);
}


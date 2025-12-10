// Cloudflare Worker entry point

import { router } from './router';

/**
 * Cloudflare Workers export
 */
export default {
  async fetch(request: Request): Promise<Response> {
    return router(request);
  },
};


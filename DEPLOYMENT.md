# Deployment Guide

## Prerequisites

1. **Node.js 18+** installed
2. **Cloudflare account** (free tier works)
3. **npm** or **yarn** package manager

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Login to Cloudflare

```bash
npx wrangler login
```

This will open a browser window to authenticate with Cloudflare.

## Step 3: Test Locally (Recommended)

Before deploying, test the API locally:

```bash
npm run dev
```

This will start a local development server. You should see output like:
```
⎔ Starting local server...
[wrangler:inf] Ready on http://localhost:8787
```

Test it with:
```bash
curl -X POST http://localhost:8787/moderate \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a test message"}'
```

## Step 4: Deploy to Cloudflare Workers

### Quick Deploy (to workers.dev subdomain)

```bash
npm run deploy
```

This will deploy to: `https://safeprompt.YOUR_SUBDOMAIN.workers.dev`

### Deploy to Production Environment

```bash
npm run deploy:production
```

### Deploy to Staging Environment

```bash
npm run deploy:staging
```

## Step 5: Test Your Deployment

After deployment, you'll get a URL like:
```
https://safeprompt.YOUR_SUBDOMAIN.workers.dev
```

Test it:
```bash
curl -X POST https://safeprompt.YOUR_SUBDOMAIN.workers.dev/moderate \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a test message"}'
```

## Troubleshooting

### Error: "No account ID found"

Make sure you're logged in:
```bash
npx wrangler whoami
```

If not logged in:
```bash
npx wrangler login
```

### Error: "Module not found" or TypeScript errors

Make sure dependencies are installed:
```bash
npm install
```

Run type checking:
```bash
npm run typecheck
```

### Error: "Worker exceeded CPU time limit"

This shouldn't happen with the current implementation, but if it does:
- Check for infinite loops in your code
- Reduce the maximum text length in `src/config.ts`
- Optimize regex patterns

## Custom Domain Setup (Optional)

1. Add your domain to Cloudflare
2. Update `wrangler.toml` with your domain:
```toml
[env.production]
routes = [
  { pattern = "api.yourdomain.com/*", zone_name = "yourdomain.com" }
]
```

3. Deploy:
```bash
npm run deploy:production
```

## Monitoring

View logs in the Cloudflare dashboard:
- Go to Workers & Pages → safeprompt → Logs

Or use wrangler:
```bash
npx wrangler tail
```

## Updating the Deployment

After making changes:

1. Test locally: `npm run dev`
2. Run tests: `npm test`
3. Deploy: `npm run deploy`


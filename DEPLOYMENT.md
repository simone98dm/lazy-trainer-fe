# Deployment Guide

This guide covers deployment options for Lazy Trainer Frontend.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Build Configuration](#build-configuration)
- [Deployment Platforms](#deployment-platforms)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Netlify](#netlify)
  - [Cloudflare Pages](#cloudflare-pages)
  - [Node.js Server](#nodejs-server)
  - [Docker](#docker)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying:

1. ✅ **Supabase Project**: Set up your production Supabase project
2. ✅ **Domain**: (Optional) Custom domain configured
3. ✅ **Build Success**: Verify local build works
4. ✅ **Tests Pass**: All tests should pass
5. ✅ **Environment Variables**: Prepare production credentials

### Pre-Deployment Checklist

```bash
# 1. Update dependencies
yarn install

# 2. Run linter
yarn lint

# 3. Run tests
yarn test:unit
yarn test:e2e

# 4. Build locally
yarn build

# 5. Test production build
yarn preview
```

---

## Build Configuration

### Build Command

```bash
yarn build
# or
npm run build
```

### Output Directory

- **Static files**: `.output/public`
- **Server**: `.output/server`

### Build Settings

| Setting          | Value            |
| ---------------- | ---------------- |
| Build Command    | `yarn build`     |
| Output Directory | `.output/public` |
| Install Command  | `yarn install`   |
| Node Version     | 18.x or higher   |

---

## Deployment Platforms

### Vercel (Recommended)

Vercel provides zero-config deployment for Nuxt applications.

#### Method 1: CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel deploy

# Deploy to production
vercel --prod
```

#### Method 2: Git Integration

1. **Push to GitHub**:

   ```bash
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure project settings

3. **Environment Variables**:
   - Add in Vercel Dashboard → Settings → Environment Variables
   - Add for all environments (Production, Preview, Development)

4. **Deploy**:
   - Automatic deployment on git push
   - Preview deployments for pull requests

#### Vercel Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "yarn build",
  "devCommand": "yarn dev",
  "installCommand": "yarn install",
  "framework": "nuxtjs",
  "outputDirectory": ".output/public"
}
```

---

### Netlify

Netlify offers excellent support for Nuxt applications.

#### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "yarn build"
  publish = ".output/public"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

#### Deploy Steps

1. **Push to Git**:

   ```bash
   git push origin main
   ```

2. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repository

3. **Build Settings**:
   - Build command: `yarn build`
   - Publish directory: `.output/public`
   - Node version: 18

4. **Environment Variables**:
   - Add in Site Settings → Environment Variables

5. **Deploy**:
   - Click "Deploy site"
   - Automatic deployments on push

---

### Cloudflare Pages

Cloudflare Pages provides global edge deployment.

#### Deploy Steps

1. **Push to Git**:

   ```bash
   git push origin main
   ```

2. **Create Project**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Pages → Create a project
   - Connect your Git repository

3. **Build Configuration**:
   - Framework preset: `Nuxt.js`
   - Build command: `yarn build`
   - Build output directory: `.output/public`
   - Node version: 18

4. **Environment Variables**:
   - Add in Settings → Environment variables

5. **Deploy**:
   - Automatic deployment on push

---

### Node.js Server

Deploy to any Node.js hosting platform.

#### Build

```bash
yarn build
```

#### Run

```bash
node .output/server/index.mjs
```

#### Process Manager (PM2)

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start .output/server/index.mjs --name lazy-trainer

# Save process list
pm2 save

# Set up startup script
pm2 startup
```

#### PM2 Ecosystem File

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: 'lazy-trainer',
      script: './.output/server/index.mjs',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
```

Run with:

```bash
pm2 start ecosystem.config.js
```

---

### Docker

Containerize your application with Docker.

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN yarn build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built application
COPY --from=builder /app/.output ./.output

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start application
CMD ["node", ".output/server/index.mjs"]
```

#### .dockerignore

```
node_modules
.nuxt
.output
.git
.env
.env.local
dist
coverage
*.log
```

#### Build and Run

```bash
# Build image
docker build -t lazy-trainer:latest .

# Run container
docker run -p 3000:3000 \
  -e SUPABASE_URL=your_url \
  -e SUPABASE_ANON_KEY=your_key \
  -e SUPABASE_SERVICE_ROLE_KEY=your_key \
  lazy-trainer:latest
```

#### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - BASE_URL=https://yourdomain.com
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

---

## Environment Variables

### Required Variables

| Variable                    | Description                         | Example                   |
| --------------------------- | ----------------------------------- | ------------------------- |
| `SUPABASE_URL`              | Supabase project URL                | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY`         | Supabase anonymous key              | `eyJhbG...`               |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side only) | `eyJhbG...`               |

### Optional Variables

| Variable   | Description          | Default                 |
| ---------- | -------------------- | ----------------------- |
| `BASE_URL` | Application base URL | `http://localhost:3000` |
| `NODE_ENV` | Environment mode     | `production`            |
| `PORT`     | Server port          | `3000`                  |

### Setting Variables

#### Vercel

```bash
vercel env add SUPABASE_URL production
vercel env add SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
```

#### Netlify

```bash
netlify env:set SUPABASE_URL "your_url"
netlify env:set SUPABASE_ANON_KEY "your_key"
netlify env:set SUPABASE_SERVICE_ROLE_KEY "your_key"
```

#### Server

Create `.env.production`:

```env
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
BASE_URL=https://yourdomain.com
```

---

## Post-Deployment

### Verification Checklist

After deploying, verify:

- [ ] **Homepage loads** correctly
- [ ] **Authentication works** (login/signup)
- [ ] **PWA installs** properly
- [ ] **Mobile responsive** on various devices
- [ ] **Service worker** caches assets
- [ ] **API calls** connect to Supabase
- [ ] **404 page** displays for invalid routes
- [ ] **SEO meta tags** are correct
- [ ] **HTTPS** is enabled
- [ ] **Performance** is acceptable

### Monitoring

Set up monitoring:

1. **Error Tracking**: Sentry, LogRocket, or similar
2. **Analytics**: Google Analytics, Plausible, or similar
3. **Uptime Monitoring**: UptimeRobot, Pingdom, or similar
4. **Performance**: Lighthouse CI, WebPageTest

### SEO

1. **Submit sitemap** to search engines
2. **Verify domain** in Google Search Console
3. **Test structured data** with Google's Rich Results Test
4. **Check robots.txt**

---

## Troubleshooting

### Build Fails

**Issue**: Build command fails

**Solutions**:

- Check Node.js version (18+)
- Clear cache: `rm -rf node_modules .nuxt .output && yarn install`
- Check for TypeScript errors: `yarn typecheck`
- Review build logs for specific errors

### Environment Variables Not Working

**Issue**: App can't connect to Supabase

**Solutions**:

- Verify variables are set in platform dashboard
- Check variable names are exact (case-sensitive)
- Restart deployment after adding variables
- Check if variables are available in build vs runtime

### 404 on Refresh

**Issue**: Page refreshes return 404

**Solutions**:

- Configure redirect rules (see platform-specific sections)
- Ensure `fallback: '200.html'` in Nuxt config for static generation
- Check server configuration for SPA fallback

### PWA Not Installing

**Issue**: Install prompt doesn't appear

**Solutions**:

- Verify HTTPS is enabled
- Check manifest.json is accessible
- Verify service worker registration
- Test in Chrome DevTools → Application → Manifest

### Slow Performance

**Issue**: App loads slowly

**Solutions**:

- Enable CDN for static assets
- Optimize images (use WebP format)
- Enable gzip/brotli compression
- Use performance monitoring tools
- Check bundle size: `yarn build --analyze`

### Authentication Issues

**Issue**: Login doesn't work after deployment

**Solutions**:

- Add production URL to Supabase Auth → URL Configuration
- Check CORS settings in Supabase
- Verify redirect URLs are correct
- Check service role key permissions

---

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Run linter
        run: yarn lint

      - name: Run unit tests
        run: yarn test:unit

      - name: Build
        run: yarn build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Best Practices

1. **Always test locally** before deploying
2. **Use environment variables** for all secrets
3. **Enable HTTPS** in production
4. **Set up monitoring** from day one
5. **Backup Supabase** data regularly
6. **Use CI/CD** for automated deployments
7. **Test on real devices** before going live
8. **Monitor performance** continuously
9. **Keep dependencies updated**
10. **Document deployment process**

---

**Need Help?** Open an issue on [GitHub](https://github.com/simone98dm/lazy-trainer-fe/issues)

**Last Updated**: November 13, 2025

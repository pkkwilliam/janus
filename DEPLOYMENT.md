# Deployment Guide for Mystical App

This guide covers deploying the Mystical App to GitHub Pages with the custom domain `fortune-cookie.me`.

## 🚀 Automatic Deployment Setup

### 1. GitHub Repository Configuration

The project is configured to automatically deploy to GitHub Pages using GitHub Actions.

**Workflow triggers:**
- Push to `main` branch
- Manual trigger via `workflow_dispatch`
- Repository dispatch with type `mystical-app-trigger`

### 2. Required GitHub Settings

In your GitHub repository settings:

1. **Go to Settings > Pages**
   - Source: Deploy from a branch
   - Branch: Select `gh-pages` (will be created automatically)
   - Folder: `/ (root)`

2. **Go to Settings > Actions > General**
   - Ensure "Allow GitHub Actions to create and approve pull requests" is enabled
   - Workflow permissions: "Read and write permissions"

### 3. Custom Domain Configuration

The workflow automatically:
- Creates a CNAME file with `fortune-cookie.me`
- Configures the domain for GitHub Pages

**DNS Configuration Required:**
- Point your domain `fortune-cookie.me` to GitHub Pages
- Add a CNAME record: `fortune-cookie.me` → `yourusername.github.io`

## 📁 Project Configuration

### Next.js Configuration (`next.config.ts`)

```typescript
const nextConfig: NextConfig = {
  output: 'export',        // Static export for GitHub Pages
  trailingSlash: true,     // Required for GitHub Pages
  images: {
    unoptimized: true      // GitHub Pages doesn't support Next.js image optimization
  }
};
```

### API Configuration

The app uses environment-based API configuration:

- **Development**: `http://localhost:8080`
- **Production**: `https://api.fortune-cookie.me`

The production API URL is automatically used when deployed to GitHub Pages.

## 🛠 Local Testing

### Test Static Export Locally

```bash
# Build the static export
npm run build

# Serve the static files (optional)
npx serve out
```

### Verify Production Build

```bash
# Set production environment
export NODE_ENV=production
export NEXT_PUBLIC_ENVIRONMENT=production

# Build and test
npm run build
```

## 🔧 Deployment Process

### Automatic Deployment

1. Push changes to the `main` branch
2. GitHub Actions automatically:
   - Installs dependencies
   - Builds the Next.js app with static export
   - Creates CNAME file for custom domain
   - Deploys to GitHub Pages

### Manual Deployment

1. Go to GitHub repository
2. Click "Actions" tab
3. Select "Deploy to GitHub Pages" workflow
4. Click "Run workflow"

## 📊 Monitoring Deployment

### Check Deployment Status

1. **GitHub Actions**: Monitor build progress in the Actions tab
2. **GitHub Pages**: Check deployment status in Settings > Pages
3. **Live Site**: Visit `https://fortune-cookie.me` to verify

### Common Issues and Solutions

**Build Failures:**
- Check GitHub Actions logs for specific errors
- Ensure all dependencies are correctly specified in `package.json`
- Verify Next.js configuration for static export

**Domain Issues:**
- Verify DNS configuration for `fortune-cookie.me`
- Check that CNAME file is correctly created
- Wait for DNS propagation (can take up to 48 hours)

**API Connection:**
- Ensure `https://api.fortune-cookie.me` is accessible
- Check API configuration in `src/lib/api/config.ts`
- Verify CORS settings on the API server

## 🔐 Security Considerations

### Authentication Tokens

- JWT tokens are stored in localStorage (only for authentication state)
- User profile data is cached in memory (cleared on page refresh)
- Sensitive data is not persisted in browser storage

### API Security

- All API calls use HTTPS in production
- Proper error handling for failed API requests
- Automatic token cleanup on invalid/expired tokens

## 🚧 Production Checklist

Before deploying to production:

- [ ] API server at `api.fortune-cookie.me` is running and accessible
- [ ] DNS for `fortune-cookie.me` points to GitHub Pages
- [ ] GitHub Pages is enabled in repository settings
- [ ] All environment variables are correctly configured
- [ ] Static export build works locally
- [ ] Authentication flow works with production API
- [ ] All pages load correctly without server-side features

## 📞 Support

For deployment issues:
1. Check GitHub Actions logs
2. Verify GitHub Pages settings
3. Test local static export build
4. Check DNS configuration for custom domain

The deployment is fully automated and should work seamlessly once the initial setup is complete.
# Deployment Troubleshooting Guide

## Common Issues and Solutions

### 1. Esbuild Binary Compatibility Issues

**Problem**: Deployment fails with esbuild binary errors like:
```
Error: Command failed: /opt/buildhome/repo/node_modules/esbuild/bin/esbuild --version
status: null, signal: 'SIGSEGV'
```

**Solution**: 
- We've switched from `esbuild` to `terser` as the minifier in `vite.config.ts`
- This avoids binary compatibility issues in different deployment environments
- Terser is more portable and doesn't require native binaries

### 2. Build Failures

**Problem**: Build process fails during deployment

**Solution**:
- Use `npm run build:clean` to ensure clean builds
- This removes the `dist` folder before building, preventing stale files
- Updated deployment scripts now use this by default

### 3. Package Installation Issues

**Problem**: Dependencies fail to install in deployment environment

**Solution**:
- Added `.npmrc` file with deployment-friendly settings
- Use `npm` instead of `bun` for better compatibility
- Avoid optional dependencies that might cause issues

## Updated Build Configuration

### Vite Config Changes
- **Minifier**: Changed from `esbuild` to `terser`
- **Terser Options**: Added console and debugger removal for production
- **Build Scripts**: Added clean build option

### Package Scripts
- `build:clean`: Removes dist folder and builds fresh
- `deploy:staging`: Clean build + deploy to staging
- `deploy:production`: Clean build + deploy to production

## Deployment Commands

```bash
# For staging
npm run deploy:staging

# For production  
npm run deploy:production

# Manual deployment
npm run build:clean && wrangler deploy
```

## Environment-Specific Notes

### Cloudflare Workers
- Uses `@cloudflare/vite-plugin`
- Assets are served from `dist/client` directory
- SSR bundle generated in `dist/hellloai_landing`

### Build Output
- Client bundle: `dist/client/`
- SSR bundle: `dist/hellloai_landing/`
- Assets with content hashes for cache busting

## Troubleshooting Steps

1. **Clear build cache**: `npm run build:clean`
2. **Check dependencies**: `npm ci` (clean install)
3. **Verify Node version**: Ensure compatibility with deployment environment
4. **Check build logs**: Look for specific error messages
5. **Test locally**: Run `npm run build` before deploying

## Prevention

- Always use `build:clean` for deployments
- Keep dependencies up to date
- Test builds locally before deploying
- Monitor deployment logs for early warning signs

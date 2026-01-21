# Coolify NGINX Configuration for Next.js Standalone

## The Problem

NGINX was using `try_files` which attempts to serve routes as static files first.
When accessing dynamic routes like `/certificate/[id]`, NGINX couldn't find a static file
and returned 404 instead of forwarding the request to Next.js.

## The Solution

**Proxy ALL requests directly to Next.js** without trying to resolve them as files.
Next.js standalone server handles:

- Static files (\_next/static)
- Public assets
- Dynamic routes
- API routes

## NGINX Configuration

Use the `nginx.conf` file in this repo for your Coolify deployment.

### Key Points:

1. **Simple proxy_pass**: All requests go to `localhost:3044`
2. **No try_files**: Don't attempt to resolve routes as static files
3. **WebSocket support**: `Upgrade` and `Connection` headers
4. **Proper headers**: Forward real IP, protocol, and host information

## Environment Variables

Add to your Coolify environment:

```bash
# Public URL (used in PDFs, emails, redirects)
NEXT_PUBLIC_APP_URL=https://certify.fakereviewgenerator.com

# Next.js standalone port (must match NGINX proxy_pass)
PORT=3044

# Node environment
NODE_ENV=production
```

## Best Practices

### 1. Absolute URLs in PDFs

```typescript
// lib/pdf-utils.ts or similar
const getAbsoluteUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${baseUrl}${path.startsWith("/") ? path : "/" + path}`;
};

// Usage in PDF generation
const certificateUrl = getAbsoluteUrl(`/certificate/${certificateId}`);
```

### 2. Dynamic Routes with App Router

```typescript
// app/certificate/[id]/page.tsx
export default async function CertificatePage({
  params,
}: {
  params: { id: string };
}) {
  // This will work with the NGINX config
  const { id } = params;
  // ... fetch and render
}
```

### 3. Metadata for SEO (optional but recommended)

```typescript
export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Certificate ${params.id}`,
    alternates: {
      canonical: `https://certify.fakereviewgenerator.com/certificate/${params.id}`,
    },
  };
}
```

## Coolify Deployment Steps

1. **Update NGINX config** in Coolify dashboard:
   - Go to your app → Configuration → NGINX
   - Replace with the content from `nginx.conf`

2. **Set environment variables**:
   - Add `NEXT_PUBLIC_APP_URL`
   - Confirm `PORT=3044`

3. **Verify next.config.js**:

   ```javascript
   module.exports = {
     output: "standalone",
     // ... other config
   };
   ```

4. **Redeploy**:
   ```bash
   git push
   # Or trigger manual deployment in Coolify
   ```

## Testing

After deployment, test dynamic routes:

```bash
# Should return Next.js page, not 404
curl -I https://certify.fakereviewgenerator.com/certificate/test123

# Should see "HTTP/2 200" not "HTTP/2 404"
```

## Common Issues

### Still getting 404?

- Check NGINX is actually reloaded: `sudo nginx -t && sudo systemctl reload nginx`
- Verify port 3044 is listening: `netstat -tlnp | grep 3044`
- Check Next.js logs in Coolify

### WebSocket issues?

- Ensure `Upgrade` and `Connection` headers are set
- Check `proxy_http_version 1.1`

### Static files not loading?

- Next.js standalone serves these automatically
- No need for separate static file handling
- Verify build includes `.next/static` directory

## Why This Works

1. **No file resolution**: NGINX doesn't try to find files on disk
2. **All routes forwarded**: Next.js handles routing, not NGINX
3. **Proper headers**: Next.js knows the original request context
4. **WebSocket ready**: Connection upgrades work for real-time features

## Alternative: If You Have Separate Static Assets

If you're serving static assets from a CDN or separate location:

```nginx
location /_next/static {
    proxy_pass http://localhost:3044;
    add_header Cache-Control "public, max-age=31536000, immutable";
}

location /public {
    proxy_pass http://localhost:3044;
}

location / {
    proxy_pass http://localhost:3044;
    # ... other headers
}
```

But for standard Next.js standalone, the simple single `location /` block is sufficient.

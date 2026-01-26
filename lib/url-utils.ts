/**
 * URL utilities for generating absolute URLs in PDFs, emails, and exports
 */

/**
 * Get the base URL for the application
 * Uses NEXT_PUBLIC_APP_URL in production, falls back to localhost in development
 */
export function getBaseUrl(): string {
  // Browser
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // Server-side in production (Coolify)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // Vercel deployment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Development fallback
  return "http://localhost:3004";
}

/**
 * Convert a relative path to an absolute URL
 * @param path - The relative path (e.g., "/certificate/123" or "certificate/123")
 * @returns Absolute URL
 */
export function getAbsoluteUrl(path: string): string {
  const baseUrl = getBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Generate an absolute URL for a certificate by ID
 * @param certificateId - The certificate ID
 * @returns Absolute URL for the certificate page
 */
export function getCertificateUrl(certificateId: string): string {
  return getAbsoluteUrl(`/certificate/${certificateId}`);
}

/**
 * Generate an absolute URL for a certificate verification page
 * @param certificateId - The certificate ID
 * @returns Absolute URL for the certificate verification page
 */
export function getVerificationUrl(certificateId: string): string {
  return getAbsoluteUrl(`/verify/${certificateId}`);
}

/**
 * Check if we're running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * Check if we're running on the server
 */
export function isServer(): boolean {
  return typeof window === "undefined";
}

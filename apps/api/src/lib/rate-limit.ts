import type { Bindings } from '../index';

const RATE_LIMIT_MAX = 15;
const RATE_LIMIT_TTL = 24 * 60 * 60; // 24 hours in seconds

interface RateLimitData {
  count: number;
  resetAt: number;
}

// Generate hash using Web Crypto API
async function generateHash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Get IP from request
function getIP(request: Request): string {
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP;

  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP;

  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();

  return 'anonymous';
}

// Get user agent components for fingerprinting
function getUserAgentComponents(request: Request): {
  browser: string;
  os: string;
  device: string;
  full: string;
} {
  const userAgent = request.headers.get('user-agent') || 'unknown';

  let browser = 'unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';

  let os = 'unknown';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'MacOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS') || userAgent.includes('iPhone')) os = 'iOS';

  let device = 'desktop';
  if (userAgent.includes('Mobile')) device = 'mobile';
  else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) device = 'tablet';

  return { browser, os, device, full: userAgent };
}

// Generate identifier for rate limiting
async function generateIdentifier(request: Request): Promise<string> {
  const ip = getIP(request);
  const { browser, os, device, full: userAgent } = getUserAgentComponents(request);
  const acceptLanguage = request.headers.get('accept-language') || 'unknown';
  const secChUa = request.headers.get('sec-ch-ua') || 'unknown';

  const data = `${ip}:${userAgent}:${acceptLanguage}:${secChUa}:${browser}:${os}:${device}`;
  return generateHash(data);
}

export async function rateLimit(
  request: Request,
  kv: KVNamespace
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  identifier: string;
}> {
  const identifier = await generateIdentifier(request);
  const key = `ratelimit:${identifier}`;
  const now = Date.now();

  // Get current data from KV
  const data = await kv.get<RateLimitData>(key, 'json');
  
  let count = 0;
  let resetAt = now + RATE_LIMIT_TTL * 1000;

  if (data) {
    // Check if rate limit has expired
    if (now >= data.resetAt) {
      // Reset counter
      count = 0;
      resetAt = now + RATE_LIMIT_TTL * 1000;
    } else {
      count = data.count;
      resetAt = data.resetAt;
    }
  }

  // Check if limit exceeded
  if (count >= RATE_LIMIT_MAX) {
    return {
      success: false,
      limit: RATE_LIMIT_MAX,
      remaining: 0,
      identifier,
    };
  }

  // Increment counter
  count += 1;
  
  // Calculate TTL for KV (seconds until reset)
  const ttlSeconds = Math.ceil((resetAt - now) / 1000);

  // Store updated data
  await kv.put(key, JSON.stringify({ count, resetAt }), {
    expirationTtl: ttlSeconds,
  });

  return {
    success: true,
    limit: RATE_LIMIT_MAX,
    remaining: RATE_LIMIT_MAX - count,
    identifier,
  };
}

export async function getRemainingMessages(
  request: Request,
  kv: KVNamespace
): Promise<number> {
  const identifier = await generateIdentifier(request);
  const key = `ratelimit:${identifier}`;
  const now = Date.now();

  const data = await kv.get<RateLimitData>(key, 'json');
  
  if (!data || now >= data.resetAt) {
    return RATE_LIMIT_MAX;
  }

  return Math.max(0, RATE_LIMIT_MAX - data.count);
}

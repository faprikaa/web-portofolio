import { LRUCache } from 'lru-cache';
import { NextRequest } from 'next/server';

// Define options for the rate limiter
const ratelimitOptions = {
  // Maximum number of requests per user per day
  max: 15,
  // Time window in milliseconds (24 hours)
  ttl: 24 * 60 * 60 * 1000,
};

// Interface for tracking user access data
interface UserAccessData {
  count: number;
  lastAccess: Date;
  totalAccess: number;
  fingerprints: Set<string>;
}

// Create a cache to store user identifiers and their request counts
const ratelimitCache = new LRUCache<string, number>(ratelimitOptions);

// Store additional user access data (not subject to TTL expiry)
const userAccessData = new Map<string, UserAccessData>();

// Separate caches for different identifier types
const ipCache = new LRUCache<string, number>(ratelimitOptions);
const fingerprintCache = new LRUCache<string, number>(ratelimitOptions);
const deviceCache = new LRUCache<string, number>(ratelimitOptions);

// Helper function to generate a hash using Web Crypto API
async function generateHash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Helper function to get IP address from request
function getIP(request: NextRequest): string {
  // Get IP from Cloudflare-specific header (most reliable for CF Workers)
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Get IP from X-Real-IP header
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Get IP from X-Forwarded-For header
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  // Fallback to a default value
  return 'anonymous';
}

// Get user agent fingerprint components
function getUserAgentComponents(request: NextRequest): {
  browser: string;
  os: string;
  device: string;
  full: string;
} {
  const userAgent = request.headers.get('user-agent') || 'unknown';

  // Extract browser info
  let browser = 'unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  else if (userAgent.includes('Opera')) browser = 'Opera';

  // Extract OS info
  let os = 'unknown';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'MacOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';

  // Extract device type
  let device = 'desktop';
  if (userAgent.includes('Mobile')) device = 'mobile';
  else if (userAgent.includes('Tablet') || userAgent.includes('iPad')) device = 'tablet';

  return { browser, os, device, full: userAgent };
}

// Generate multiple identifiers for robust tracking
async function generateIdentifiers(request: NextRequest): Promise<{
  ipIdentifier: string;
  fingerprintIdentifier: string;
  deviceIdentifier: string;
  combinedIdentifier: string;
}> {
  const ip = getIP(request);
  const { browser, os, device, full: userAgent } = getUserAgentComponents(request);

  // Additional headers for fingerprinting
  const acceptLanguage = request.headers.get('accept-language') || 'unknown';
  const acceptEncoding = request.headers.get('accept-encoding') || 'unknown';
  const secChUa = request.headers.get('sec-ch-ua') || 'unknown';
  const secChUaPlatform = request.headers.get('sec-ch-ua-platform') || 'unknown';
  const secChUaMobile = request.headers.get('sec-ch-ua-mobile') || 'unknown';

  // Get client hints if available (modern browsers)
  const dpr = request.headers.get('dpr') || request.headers.get('sec-ch-dpr') || 'unknown';
  const viewportWidth = request.headers.get('viewport-width') || request.headers.get('sec-ch-viewport-width') || 'unknown';

  // Cookie-based device ID (if available)
  const cookies = request.headers.get('cookie') || '';
  const deviceIdMatch = cookies.match(/device_id=([^;]+)/);
  const cookieDeviceId = deviceIdMatch ? deviceIdMatch[1] : '';

  // IP-based identifier (primary)
  const ipIdentifier = await generateHash(`ip:${ip}`);

  // Fingerprint identifier (combines multiple browser characteristics)
  const fingerprintData = `fp:${userAgent}:${acceptLanguage}:${acceptEncoding}:${secChUa}:${secChUaPlatform}:${dpr}:${viewportWidth}`;
  const fingerprintIdentifier = await generateHash(fingerprintData);

  // Device identifier (combines IP + device type + browser + OS)
  const deviceData = `device:${ip}:${browser}:${os}:${device}:${secChUaMobile}:${cookieDeviceId}`;
  const deviceIdentifier = await generateHash(deviceData);

  // Combined identifier (most strict - combines all factors)
  const combinedData = `combined:${ip}:${userAgent}:${acceptLanguage}:${secChUa}:${cookieDeviceId}`;
  const combinedIdentifier = await generateHash(combinedData);

  return {
    ipIdentifier,
    fingerprintIdentifier,
    deviceIdentifier,
    combinedIdentifier,
  };
}

// Get the highest count across all identifier types
function getHighestCount(identifiers: {
  ipIdentifier: string;
  fingerprintIdentifier: string;
  deviceIdentifier: string;
  combinedIdentifier: string;
}): number {
  const ipCount = ipCache.get(identifiers.ipIdentifier) || 0;
  const fpCount = fingerprintCache.get(identifiers.fingerprintIdentifier) || 0;
  const deviceCount = deviceCache.get(identifiers.deviceIdentifier) || 0;
  const combinedCount = ratelimitCache.get(identifiers.combinedIdentifier) || 0;

  // Return the highest count to prevent bypass attempts
  return Math.max(ipCount, fpCount, deviceCount, combinedCount);
}

// Increment all counters
function incrementAllCounters(identifiers: {
  ipIdentifier: string;
  fingerprintIdentifier: string;
  deviceIdentifier: string;
  combinedIdentifier: string;
}, newCount: number): void {
  ipCache.set(identifiers.ipIdentifier, newCount);
  fingerprintCache.set(identifiers.fingerprintIdentifier, newCount);
  deviceCache.set(identifiers.deviceIdentifier, newCount);
  ratelimitCache.set(identifiers.combinedIdentifier, newCount);
}

export async function rateLimit(request: NextRequest) {
  // Generate all identifiers
  const identifiers = await generateIdentifiers(request);

  // Get the highest count across all identifier types
  const currentCount = getHighestCount(identifiers);

  // Update user access data for analytics
  const userData = userAccessData.get(identifiers.combinedIdentifier) || {
    count: 0,
    lastAccess: new Date(),
    totalAccess: 0,
    fingerprints: new Set<string>()
  };
  userData.count = currentCount + 1;
  userData.lastAccess = new Date();
  userData.totalAccess += 1;
  userData.fingerprints.add(identifiers.fingerprintIdentifier);
  userAccessData.set(identifiers.combinedIdentifier, userData);

  // Check if any identifier has reached the limit
  if (currentCount >= ratelimitOptions.max) {
    return {
      success: false,
      limit: ratelimitOptions.max,
      remaining: 0,
      identifier: identifiers.combinedIdentifier,
    };
  }

  // Increment all counters
  incrementAllCounters(identifiers, currentCount + 1);

  // Return success and remaining count
  return {
    success: true,
    limit: ratelimitOptions.max,
    remaining: ratelimitOptions.max - (currentCount + 1),
    identifier: identifiers.combinedIdentifier,
  };
}

// Helper function to get remaining message count
export async function getRemainingMessages(request: NextRequest): Promise<number> {
  const identifiers = await generateIdentifiers(request);
  const currentCount = getHighestCount(identifiers);
  return Math.max(0, ratelimitOptions.max - currentCount);
}

// Function to get all user access data (for admin purposes)
export function getAllUserAccessData(): {
  users: Array<{
    id: string;
    dailyCount: number;
    lastAccess: Date;
    totalAccess: number;
    remaining: number;
    uniqueFingerprints: number;
  }>;
  totalUsers: number;
  totalRequests: number;
  cacheStats: {
    ipCacheSize: number;
    fingerprintCacheSize: number;
    deviceCacheSize: number;
    combinedCacheSize: number;
  };
} {
  const users = Array.from(userAccessData.entries()).map(([id, data]) => {
    const dailyCount = ratelimitCache.get(id) || 0;
    return {
      id,
      dailyCount,
      lastAccess: data.lastAccess,
      totalAccess: data.totalAccess,
      remaining: Math.max(0, ratelimitOptions.max - dailyCount),
      uniqueFingerprints: data.fingerprints.size
    };
  });

  const totalRequests = users.reduce((sum, user) => sum + user.totalAccess, 0);

  return {
    users,
    totalUsers: users.length,
    totalRequests,
    cacheStats: {
      ipCacheSize: ipCache.size,
      fingerprintCacheSize: fingerprintCache.size,
      deviceCacheSize: deviceCache.size,
      combinedCacheSize: ratelimitCache.size,
    }
  };
}

// Secret admin key for accessing stats
export const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'muammar_admin_secret_key_change_this'; 
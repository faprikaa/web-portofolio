import { LRUCache } from 'lru-cache';
import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

// Define options for the rate limiter
const ratelimitOptions = {
  // Maximum number of requests per user per day
  max: 15,
  // Time window in milliseconds (24 hours)
  ttl: 24 * 60 * 60 * 1000,
};

// Create a cache to store user identifiers and their request counts
const ratelimitCache = new LRUCache<string, number>(ratelimitOptions);

// Helper function to generate a unique identifier for the request
function getUserIdentifier(request: NextRequest): string {
  // Get IP address
  const ip = getIP(request);
  
  // Get user agent
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Get accept-language header
  const acceptLanguage = request.headers.get('accept-language') || 'unknown';
  
  // Create a unique identifier by combining multiple factors
  const identifier = `${ip}:${userAgent}:${acceptLanguage}`;
  
  // Hash the identifier to protect privacy and ensure consistent length
  return createHash('sha256').update(identifier).digest('hex');
}

// Helper function to get IP address from request
function getIP(request: NextRequest): string {
  // Get IP from Cloudflare-specific header
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Get IP from X-Forwarded-For header
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  // Fallback to a default value
  return 'anonymous';
}

export async function rateLimit(request: NextRequest) {
  // Get the unique identifier for this request
  const identifier = getUserIdentifier(request);
  
  // Get the current count for this identifier
  const currentCount = ratelimitCache.get(identifier) || 0;
  
  // Check if the identifier has reached the limit
  if (currentCount >= ratelimitOptions.max) {
    return {
      success: false,
      limit: ratelimitOptions.max,
      remaining: 0,
    };
  }
  
  // Increment the count for this identifier
  ratelimitCache.set(identifier, currentCount + 1);
  
  // Return success and remaining count
  return {
    success: true,
    limit: ratelimitOptions.max,
    remaining: ratelimitOptions.max - (currentCount + 1),
  };
}

// Helper function to get remaining message count
export function getRemainingMessages(request: NextRequest): number {
  const identifier = getUserIdentifier(request);
  const currentCount = ratelimitCache.get(identifier) || 0;
  return Math.max(0, ratelimitOptions.max - currentCount);
} 
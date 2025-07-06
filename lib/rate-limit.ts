import { LRUCache } from 'lru-cache';
import { NextRequest, NextResponse } from 'next/server';

// Define options for the rate limiter
const ratelimitOptions = {
  // Maximum number of requests per IP per day
  max: 15,
  // Time window in milliseconds (24 hours)
  ttl: 24 * 60 * 60 * 1000,
};

// Create a cache to store IP addresses and their request counts
const ratelimitCache = new LRUCache<string, number>(ratelimitOptions);

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
  // Get the IP address from the request
  const ip = getIP(request);
  
  // Get the current count for this IP
  const currentCount = ratelimitCache.get(ip) || 0;
  
  // Check if the IP has reached the limit
  if (currentCount >= ratelimitOptions.max) {
    return {
      success: false,
      limit: ratelimitOptions.max,
      remaining: 0,
    };
  }
  
  // Increment the count for this IP
  ratelimitCache.set(ip, currentCount + 1);
  
  // Return success and remaining count
  return {
    success: true,
    limit: ratelimitOptions.max,
    remaining: ratelimitOptions.max - (currentCount + 1),
  };
}

// Helper function to get remaining message count for an IP
export function getRemainingMessages(request: NextRequest): number {
  const ip = getIP(request);
  const currentCount = ratelimitCache.get(ip) || 0;
  return Math.max(0, ratelimitOptions.max - currentCount);
} 
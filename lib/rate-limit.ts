import { LRUCache } from 'lru-cache';
import { NextRequest, NextResponse } from 'next/server';

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
}

// Create a cache to store user identifiers and their request counts
const ratelimitCache = new LRUCache<string, number>(ratelimitOptions);

// Store additional user access data (not subject to TTL expiry)
const userAccessData = new Map<string, UserAccessData>();

// Helper function to generate a hash using Web Crypto API
async function generateHash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Helper function to generate a unique identifier for the request
async function getUserIdentifier(request: NextRequest): Promise<string> {
  // Get IP address
  const ip = getIP(request);
  
  // Get user agent
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Get accept-language header
  const acceptLanguage = request.headers.get('accept-language') || 'unknown';
  
  // Create a unique identifier by combining multiple factors
  const identifier = `${ip}:${userAgent}:${acceptLanguage}`;
  
  // Hash the identifier to protect privacy and ensure consistent length
  return await generateHash(identifier);
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
  const identifier = await getUserIdentifier(request);
  
  // Get the current count for this identifier
  const currentCount = ratelimitCache.get(identifier) || 0;
  
  // Update user access data
  const userData = userAccessData.get(identifier) || { count: 0, lastAccess: new Date(), totalAccess: 0 };
  userData.count = currentCount + 1;
  userData.lastAccess = new Date();
  userData.totalAccess += 1;
  userAccessData.set(identifier, userData);
  
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
export async function getRemainingMessages(request: NextRequest): Promise<number> {
  const identifier = await getUserIdentifier(request);
  const currentCount = ratelimitCache.get(identifier) || 0;
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
  }>;
  totalUsers: number;
  totalRequests: number;
} {
  const users = Array.from(userAccessData.entries()).map(([id, data]) => {
    const dailyCount = ratelimitCache.get(id) || 0;
    return {
      id,
      dailyCount,
      lastAccess: data.lastAccess,
      totalAccess: data.totalAccess,
      remaining: Math.max(0, ratelimitOptions.max - dailyCount)
    };
  });
  
  const totalRequests = users.reduce((sum, user) => sum + user.totalAccess, 0);
  
  return {
    users,
    totalUsers: users.length,
    totalRequests
  };
}

// Secret admin key for accessing stats
export const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'muammar_admin_secret_key_change_this'; 
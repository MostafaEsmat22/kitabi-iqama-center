interface RateLimitOptions {
  maxRequests: number;
  timeWindow: number; // in milliseconds
}

class RateLimiter {
  private requests: Map<string, number[]>;
  private options: RateLimitOptions;

  constructor(options: RateLimitOptions) {
    this.requests = new Map();
    this.options = options;
  }

  isRateLimited(key: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(key) || [];
    
    // Remove old requests outside the time window
    const validRequests = userRequests.filter(
      timestamp => now - timestamp < this.options.timeWindow
    );
    
    // Update the requests map
    this.requests.set(key, validRequests);
    
    // Check if the user has exceeded the rate limit
    if (validRequests.length >= this.options.maxRequests) {
      return true;
    }
    
    // Add the new request
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return false;
  }

  reset(key: string): void {
    this.requests.delete(key);
  }
}

// Create a singleton instance with default options
export const rateLimiter = new RateLimiter({
  maxRequests: 100, // 100 requests
  timeWindow: 60 * 1000, // per minute
});

// Higher-order function to apply rate limiting to any function
export function withRateLimit<T extends (...args: any[]) => any>(
  fn: T,
  key: string
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (rateLimiter.isRateLimited(key)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    return fn(...args);
  };
} 
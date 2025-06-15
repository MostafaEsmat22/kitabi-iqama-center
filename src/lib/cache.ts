interface CacheOptions {
  ttl: number; // Time to live in milliseconds
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class Cache {
  private cache: Map<string, CacheItem<any>>;
  private options: CacheOptions;

  constructor(options: CacheOptions) {
    this.cache = new Map();
    this.options = options;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > this.options.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

// Create a singleton instance with default options
export const cache = new Cache({
  ttl: 5 * 60 * 1000, // 5 minutes
});

// Higher-order function to cache the result of any async function
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  key: string
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const cachedResult = cache.get<ReturnType<T>>(key);
    if (cachedResult) {
      return cachedResult;
    }

    const result = await fn(...args);
    cache.set(key, result);
    return result;
  };
} 
import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { APP_CONSTANTS } from '../constants/app.constants';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, CacheItem<any>>();

  /**
   * Get data from cache if available and not expired
   */
  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  /**
   * Set data in cache with TTL
   */
  set<T>(key: string, data: T, ttl: number = APP_CONSTANTS.CACHE_TTL): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };

    this.cache.set(key, item);
  }

  /**
   * Get data from cache or execute fallback function
   */
  getOrSet<T>(
    key: string,
    fallback: () => Observable<T>,
    ttl?: number
  ): Observable<T> {
    const cached = this.get<T>(key);

    if (cached !== null) {
      return of(cached);
    }

    return fallback().pipe(
      switchMap((data) => {
        this.set(key, data, ttl);
        return of(data);
      })
    );
  }

  /**
   * Remove specific item from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Clear expired items from cache
   */
  clearExpired(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Check if key exists in cache
   */
  has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Get cache keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Set up automatic cache cleanup
   */
  setupAutoCleanup(interval: number = 60000): void {
    timer(interval, interval).subscribe(() => {
      this.clearExpired();
    });
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

import { CacheService as BaseCacheService } from '@lib/core/application/ports/services/cache.service';

@Injectable()
export class CacheService implements BaseCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | null> {
    const cached = await this.cacheManager.get<T>(key);
    if (cached) return cached;
    return null;
  }

  async set(key: string, value: any): Promise<void> {
    await this.cacheManager.set(key, value);
  }
}

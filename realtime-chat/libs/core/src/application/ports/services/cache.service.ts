export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set(key: string, value: any): Promise<void>;
}

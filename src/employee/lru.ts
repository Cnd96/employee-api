import * as LRU from 'lru-cache';

// Create an instance of LRU cache
const cache = new LRU();

/**
 * Caches the result of a function.
 *
 * @param {string} key Custom key, example: "my_function"
 * @param {number} ttl Ttl in seconds, example: 300
 */
export function Cache(key: string, ttl: number) {
  return (
    _target: Record<string, any>,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ): any => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const cacheKey = args.length ? `${key}_${JSON.stringify(args)}` : key;
      const found = cache.get(cacheKey);
      if (found) {
        return found;
      }
      const result = await method.apply(this, args);
      cache.set(cacheKey, result, ttl * 1000);
      return result;
    };
  };
}

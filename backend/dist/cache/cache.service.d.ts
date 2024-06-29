import { Cache } from 'cache-manager';
export declare class CacheService {
    private cacheManager;
    constructor(cacheManager: Cache);
    retrieveData(bearer: string): Promise<string>;
    storeData(bearer: string): Promise<void>;
}

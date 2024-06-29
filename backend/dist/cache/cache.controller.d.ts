import { CacheService } from './cache.service';
export declare class CacheController {
    private readonly cacheService;
    constructor(cacheService: CacheService);
    find(bearer: string): Promise<string>;
    store(bearer: string): Promise<void>;
}

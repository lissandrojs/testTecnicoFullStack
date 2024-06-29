import { Controller, Get, Post } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Get()
  async find(bearer: string) {
    return await this.cacheService.retrieveData(bearer);
  }

  @Post()
  async store(bearer: string) {
    return this.cacheService.storeData(bearer);
  }
}

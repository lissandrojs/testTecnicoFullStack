import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/cache/cache.service';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private reflector;
    private redisCache;
    constructor(jwtService: JwtService, reflector: Reflector, redisCache: CacheService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}

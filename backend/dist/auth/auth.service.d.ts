import { JwtService } from '@nestjs/jwt';
import { CacheService } from 'src/cache/cache.service';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private redisCache;
    constructor(userService: UsersService, jwtService: JwtService, redisCache: CacheService);
    compareHash(password: string, hash: string): Promise<boolean>;
    signIn(email: string, password: string): Promise<any>;
}

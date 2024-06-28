import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    compareHash(password: string, hash: string): Promise<boolean>;
    signIn(email: string, password: string): Promise<any>;
}

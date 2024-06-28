import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class UsersService {
    private readonly userRepository;
    private readonly mailService;
    constructor(userRepository: Repository<User>, mailService: MailerService);
    create(user: CreateUserDto): Promise<CreateUserDto>;
    update(id: string, user: UpdateUserDto): Promise<any>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<any>;
    getHash(password: string): Promise<string>;
    resetPassword(email: string): Promise<void>;
    remove(id: number): Promise<any>;
}

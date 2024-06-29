import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    user.password = await this.getHash(user.password);

    const result = await this.userRepository.save(
      this.userRepository.create(user),
    );

    delete result.password;
    return result;
  }

  async alterPassword(id: string, password: string) {
    const hashPassword = await this.getHash(password);
    return await this.userRepository.update(id, { password: hashPassword });
  }

  async update(id: string, user: UpdateUserDto): Promise<any> {
    return await this.userRepository.update(id, { ...user });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<any> {
    return await this.userRepository.findBy({ id });
  }

  async getHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async remove(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }
}

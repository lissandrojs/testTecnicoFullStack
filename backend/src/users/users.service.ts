import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailerService,
  ) {}

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    user.password = await this.getHash(user.password);

    const result = await this.userRepository.save(
      this.userRepository.create(user),
    );

    delete result.password;
    return result;
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

  async resetPassword(email: string) {
    const existEmail = await this.findByEmail(email);
    const token = new Date();
    if (!existEmail) {
      throw new UnauthorizedException();
    }

    const appUrl = `${process.env.BASE_URL}/insertNewPassword?email=${existEmail}?token=${token}`;

    await this.mailService.sendMail({
      to: existEmail.email,
      subject: 'Recuperar Senha',
      template: './recover-password',
      context: {
        name: existEmail.username,
        url: appUrl,
      },
    });
  }

  async remove(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }
}

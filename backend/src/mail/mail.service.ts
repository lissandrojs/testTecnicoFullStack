import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly userService: UsersService,
  ) {}

  async resetPassword(createMailDto: CreateMailDto) {
    const existEmail = await this.userService.findByEmail(createMailDto.email);

    if (!existEmail) {
      throw new UnauthorizedException();
    }

    const token = new Date().getTime().toString();

    const appUrl = `${process.env.BASE_URL}/insertNewPassword?email=${existEmail}&token=${token}`;

    try {
      await this.mailService.sendMail({
        to: existEmail.email,
        subject: 'Recuperar Senha',
        template: './recover-password',
        context: {
          name: existEmail.username,
          url: appUrl,
        },
      });
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}

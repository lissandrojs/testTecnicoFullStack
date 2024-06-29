import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly userService: UsersService,
    private readonly auth: AuthService,
  ) {}

  async resetPassword(createMailDto: CreateMailDto) {
    const existEmail = await this.userService.findByEmail(createMailDto.email);
    const payload = { email: existEmail.email, name: existEmail.username };

    if (!existEmail) {
      throw new UnauthorizedException();
    }

    const token = await this.auth.genereteToken(payload);

    const appUrl = `${process.env.BASE_URL_FRONTEND}/insertNewPassword?email=${existEmail.email}&id=${existEmail.id}&token=${token.token}`;
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

import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { Public } from 'src/auth/constants/constants';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Post()
  create(@Body() createMailDto: CreateMailDto) {
    return this.mailService.resetPassword(createMailDto);
  }
}

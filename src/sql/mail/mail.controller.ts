import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private  mailService: MailService) {}

    @Post('send-email')
    sendWelcomeEmail() {
      const userEmail = 'icover1997@gmail.com'; 
      const userName = 'John Doe';  
      return this.mailService.sendWelcomeEmail(userEmail);
    }
}

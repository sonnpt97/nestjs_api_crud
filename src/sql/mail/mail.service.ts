import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {


    constructor(private readonly mailerService: MailerService) { }

    async sendWelcomeEmail(userEmail: string) {
        await this.mailerService.sendMail({
            to: userEmail,  // Địa chỉ email người nhận
            subject: 'Welcome to Our Platform',
            template: 'welcome-email',  // Template EJS sẽ được sử dụng
            // context: {
            //     name, 
            // },
        });
    }
}

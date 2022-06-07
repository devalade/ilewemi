import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@Modules/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: Partial<UserEntity>, token: string) {
    const url = `http://localhost:3000/set-password?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Bienvenue sur Ilewemi! Définissez votre mot de passe',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        fullName: user.firstName + ' ' + user.lastName,
        link: url,
      },
    });
  }
}

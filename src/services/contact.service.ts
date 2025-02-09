import config from '../config/config';
import boom from '@hapi/boom';
import { transporter } from '../libs/nodemailer';

class ContactService {
  async send({ name, email, message }: { name: string, email: string, message: string }) {
    try {
      await transporter.sendMail({
        from: config.smtpEmail, // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: `${message}`, // plain text body
        html: `<p>Hello ${name}</p>`, // html body
      });

      return {
        message: 'Mensaje Enviado',
      };
    } catch (error) {
      console.log(error)
      throw boom.notFound('Error sending email');
    }
  }
}

export default ContactService;

import nodemailer from 'nodemailer';
import config from '../config/config';

export const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: config.smtpEmail,
    pass: config.smtpPass,
  },
});


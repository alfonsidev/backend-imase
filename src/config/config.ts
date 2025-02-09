import 'dotenv/config';

interface Config {
  env: string;
  port: number | string;
  dbDialect: string;
  dbUser: string;
  dbPassword: string;
  dbHost: string;
  dbName: string;
  apiKey: string;
  jwtSecret: string;
  smtpEmail: string;
  smtpPass: string;
  cloudName: string;
  cloudApiKey: string;
  cloudApiSecret: string;
  frontendUrl?: string;
}


const config: Config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbDialect: process.env.DB_DIALECT!,
  dbUser: process.env.DB_USER!,
  dbPassword: process.env.DB_PASSWORD!,
  dbHost: process.env.DB_HOST!,
  dbName: process.env.DB_NAME!,
  apiKey: process.env.API_KEY!,
  jwtSecret: process.env.JWT_SECRET!,
  smtpEmail: process.env.SMTP_EMAIL!,
  smtpPass: process.env.SMTP_PASS!,

  //  cloudinary
  cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
  cloudApiKey: process.env.CLOUDINARY_API_KEY!,
  cloudApiSecret: process.env.CLOUDINARY_API_SECRET!,

  // CORS
  frontendUrl: process.env.FRONTEND_URL,
};

export default config


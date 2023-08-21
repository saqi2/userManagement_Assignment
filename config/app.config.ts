import { registerAs } from '@nestjs/config';

export const databaseConfig = {
  port: parseInt(process.env.APP_POSTGRES_PORT, 10) || 5432,
  host: process.env.APP_POSTGRES_HOST,
  dbName: process.env.USER_MANAGEMENT_POSTGRES_DB,
  username: process.env.APP_POSTGRES_USER,
  password: process.env.APP_POSTGRES_PASSWORD,
  synchronize: process.env.NODE_ENV !== 'production',
};

export const redisConfig = {
  port: parseInt(process.env.APP_REDIS_PORT, 10) || 6379,
  host: process.env.APP_REDIS_HOST,
  db: parseInt(process.env.USER_MANAGEMENT_REDIS_DB, 10) || 0,
};

export const jwtConfig = {
  jwtSecret: process.env.APP_JWT_SECRET,
  expiresIn: process.env.APP_JWT_EXPIRED_IN || '1w',
};

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  appName: process.env.USER_MANAGEMENT_APP_NAME,
  workingDirectory: process.env.USER_MANAGEMENT_PWD || '/',
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  apiPrefix: process.env.USER_MANAGEMENT_API_PREFIX || '/api/v1',
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'fa',
  googleSecret: process.env.USER_MANAGEMENT_GOOGLE_SECRET,
  googleClientId: process.env.USER_MANAGEMENT_GOOGLE_CLIENT_ID,
  googleCallbackUrl: process.env.USER_MANAGEMENT_GOOGLE_CALLBACK_URL,
  databaseConfig,
  redisConfig,
  jwtConfig,
}));

import { Settings } from '../../../types/settings';

export class SettingsHelper {
  
  public static isDevMode(): boolean {
    return SettingsHelper.getSettings().environment === 'development';
  }

  public static getSettings(): Settings {
    const { env } = process;
    return {
      environment: env && env.NODE_ENV,
      database: env && env.DB_NAME,
      usernameDB: env && env.DB_USERNAME,
      userPasswordDB: env && env.DB_PASSWORD,
      dbHost: env && env.DB_HOST,
      host: env && env.HOST,
      serverPort: env && env.SERVER_PORT,
      dbPort: env && env.DB_PORT,
      dbURL: env && env.DB_URI,
    };
  }
}
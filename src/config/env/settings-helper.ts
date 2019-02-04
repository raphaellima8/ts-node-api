import { Settings } from '../../../types/settings';

export class SettingsHelper {

  public static getSettings(): Settings {
    const { NODE_ENV, DB_NAME, PORT, PROD_DB_URI, LOCAL_DB_URI } = process.env;
    const dbURL = NODE_ENV !== 'development' ? PROD_DB_URI : LOCAL_DB_URI;
    return {
      environment: NODE_ENV,
      database: DB_NAME,
      serverPort: PORT,
      dbURL,
    };
  }
}
import mongoose from 'mongoose';
import { SettingsHelper } from '../../config/env/settings-helper';

export class Database {

  private DBURI: string = 'mongodb://localhost/martan';

  public connect() {
    const { dbURL } = SettingsHelper.getSettings();
    this.DBURI = SettingsHelper.isDevMode() ? this.DBURI : dbURL;
    mongoose.connect(this.DBURI, {useNewUrlParser: true});
    mongoose
      .connection
      .on('connected', this.log.bind(this, `Mongoose connected to ${this.DBURI}`))
      .on('error', this.log.bind(this, `Mongoose connection error:`))
      .on('disconnected', this.log.bind(this, `Mongoose connected to ${this.DBURI}`));
  }

  private log(message: string, aditionalInfo?: any) {
    const msg = (!!message && !!aditionalInfo) ? `${message} ${aditionalInfo}` : `${message}`; 
    console.log(msg);
  }

  public closeConnection() {
    mongoose.connection.close();
  }

}

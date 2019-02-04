import mongoose from 'mongoose';
import { SettingsHelper } from '../../config/env/settings-helper';

export class Database {

  public connect() {
    const { dbURL, database } = SettingsHelper.getSettings();
    mongoose.connect(dbURL, { useNewUrlParser: true, useCreateIndex: true });
    mongoose
      .connection
      .on('connected', this.log.bind(this, `Mongoose connected to ${database}`))
      .on('error', this.log.bind(this, `Mongoose connection error:`))
      .on('disconnected', this.log.bind(this, `Mongoose disconnected from ${database}`));
  }

  private log(message: string, aditionalInfo?: any) {
    const msg = (!!message && !!aditionalInfo) ? `${message} ${aditionalInfo}` : `${message}`; 
    console.log(msg);
  }

  public closeConnection() {
    mongoose.connection.close();
  }

}

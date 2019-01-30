import { Application } from 'express';
import http from 'http';
import { CoreModule } from '../core/core';
import { SettingsHelper } from '../config/env/settings-helper';

export class Server {

  private express: Application;

  constructor() {
    this.express = new CoreModule().express;
    const { serverPort } = SettingsHelper.getSettings();
    this.upServer(Number(serverPort));
  }

  private upServer(port: number) {
    http
      .createServer(this.express)
      .listen(port)
      .on('listening', this.onServerUp.bind(this, port))
      .on('error', this.onServerStartUpError.bind(this));
  }

  private onServerUp(port: number) {
    console.log(`Server is running on port: ${port}`);
  }

  private onServerStartUpError(error: Error) {
    console.log(`An error occurred: ${error}`);
  }
}
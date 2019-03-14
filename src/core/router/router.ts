import { Application } from 'express';
import { RouterInfo } from '../../modules/router/router-definitions';

export class RouterModule {

  private express: Application;
  private routerModulesInfo: RouterInfo[];

  constructor(app: Application, modulesRouterInfo: RouterInfo[]) {
    this.express = app;
    this.routerModulesInfo = modulesRouterInfo;
    this.exposeEndpoints();
  }

  private exposeEndpoints() {
    this.routerModulesInfo.forEach(this.mountEndpoint.bind(this));
  }

  private mountEndpoint(moduleInfo: RouterInfo) {
    const { auth, endpoint, callback, httpVerb } = moduleInfo;
    console.log(endpoint);
    auth
      ? this.express.route(endpoint).all(() => {})[httpVerb](callback)
      : this.express.route(endpoint)[httpVerb](callback);
  }

}

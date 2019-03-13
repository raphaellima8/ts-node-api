import { ModulesMapper } from './router/router-mapper';
import { RegisteredModule, RouterInfo } from './router/router-definitions';

export class ModuleFactory {

  private routerModulesInfo: Array<RouterInfo> = [];

  constructor() {
    this.bootstrapModules();
  }

  private bootstrapModules() {
    new ModulesMapper().registeredModules.forEach((registeredModule: RegisteredModule) => {
      this.routerModulesInfo = [
        ...this.routerModulesInfo,
        ...new registeredModule.moduleRef()[registeredModule.parserName]()
      ]
    });
  }

  public getInfoFromRegisteredModules(): Array<RouterInfo> {
    return this.routerModulesInfo;
  }
}
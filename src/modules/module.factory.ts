import { ModulesMapper } from './router/router-mapper';
import { RegisteredModule } from './router/router-helpers';
import { RouterInfo } from './router/router-info.model';

export class ModuleFactory {

  private routerModulesInfo: RouterInfo[] = [];

  constructor() {
    this.bootstrapModules();
  }

  public getInfoFromRegisteredModules(): RouterInfo[] {
    return this.routerModulesInfo;
  }

  private bootstrapModules() {
    new ModulesMapper().registeredModules.forEach((registeredModule: RegisteredModule) => {
      this.routerModulesInfo = [
        ...this.routerModulesInfo,
        ...new registeredModule.moduleRef()[registeredModule.parserName]()
      ];
    });
  }
}

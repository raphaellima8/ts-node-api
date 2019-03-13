import { RegisteredModule } from './router-definitions';
import { ProductRouter } from '../product/product.router';

export class ModulesMapper {

  public registeredModules: Array<RegisteredModule> = [
    {
      moduleRef: ProductRouter,
      parserName: 'getRouterModuleConfig'
    }
  ];
}

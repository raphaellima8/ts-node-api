import { RegisteredModule } from './router-definitions';
import { ProductRouter } from '../product/product.router';

export class ModulesMapper {

  public registeredModules: RegisteredModule[] = [
    {
      moduleRef: ProductRouter,
      parserName: 'getRouterModuleConfig'
    }
  ];
}

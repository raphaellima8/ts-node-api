import { RegisteredModule } from './router-helpers';
import { ProductRouter } from '../product/product.router';

export class ModulesMapper {

  public registeredModules: RegisteredModule[] = [
    {
      moduleRef: ProductRouter,
      parserName: 'getRouterModuleConfig'
    }
  ];
}

import { Application } from 'express';
import ProductController from './product.controller';

export class ProductRouter {

  private readonly ENDPOINT: string = '/api/v1/products';

  public exposeEndpoints(app: Application) {
    app.route(this.ENDPOINT).get(ProductController.getProducts.bind(ProductController));
  }
}

export default new ProductRouter();

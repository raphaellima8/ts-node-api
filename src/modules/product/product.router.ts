import { Request, Response } from 'express';
import { ProductController } from './product.controller';
import { BaseRouterModule } from '../router/base-router';

export class ProductRouter extends BaseRouterModule {

  private productController: ProductController;
  private readonly HTTP_SUCCESS_CODE: number = 200;

  constructor() {
    super('product');
    this.productController = new ProductController();
  }

  public async list(req: Request, res: Response) {
    const data = await this.productController.getProducts(req.query);
    return res.status(this.HTTP_SUCCESS_CODE).send({ result: data });
  }

  public async findOne(req: Request, res: Response) {
    try {
      const result = await this.productController.getProduct(req.query.productId);
      return res.status(this.HTTP_SUCCESS_CODE).send({ result });
    } catch (error) {
      console.log(error);
    }
  }
}

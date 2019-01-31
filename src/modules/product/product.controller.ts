import { Product } from './product.schema';
import { Request, Response } from 'express';
import { ProductModel } from './product.model';
import { Document } from 'mongoose';

export class ProductController {

  private readonly DEFAULT_PAGE_SIZE: number = 5;
  private readonly DEFAULT_SKIP_DOCS: number = 0;
  private readonly DEFAULT_CURRENT_PAGE: number = 1;
  private readonly SUCCESS_HTTP_STATUS_CODE: number = 200;

  public async getProducts(req: Request, res: Response) {
    return res.status(this.SUCCESS_HTTP_STATUS_CODE).send(await this.parseResponse(req.query));
  }

  private async parseResponse(query) {
    const { itemsPerPage, skip, currentPage } = this.parseParams(query);
    const amountDocs: number = await Product.countDocuments();
    const amountPages: number = (amountDocs / itemsPerPage); 
    const pages = Number.isInteger(amountPages) ? amountPages : Math.round(amountPages) + 1
    const data: Array<Document> = await Product.find().skip(skip).limit(itemsPerPage);
    const products: Array<ProductModel> = data.map((document: Document) => new ProductModel(document));
    return {
      amountDocs,
      itemsPerPage: products.length,
      products,
      pages,
      currentPage
    }
  }

  private parseParams(query): { ['itemsPerPage']: number, ['skip']: number, ['currentPage']: number } {
    const { limit, page } = query;
    let itemsPerPage: number = this.DEFAULT_PAGE_SIZE;
    let skip: number = this.DEFAULT_SKIP_DOCS;
    let currentPage: number = this.DEFAULT_CURRENT_PAGE;

    if (limit) {
      const parsedLimit = Math.round(parseInt(limit));
      itemsPerPage = !Number.isNaN(parsedLimit) ? parsedLimit : itemsPerPage;
      skip = itemsPerPage;
    } 
    if (page) {
      const parsedPageNumber = Math.round(parseInt(page));
      skip = (itemsPerPage * (parsedPageNumber - 1));
      currentPage = parsedPageNumber;
    }

    return {
      itemsPerPage, skip, currentPage
    }
  }
}

export default new ProductController();
import { Product } from './product.schema';
import { ProductModel } from './product.model';
import { Document } from 'mongoose';

interface QueryParams {
  itemsPerPage: number;
  skip: number;
  currentPage: number;
  searchTerm: { [key: string]: RegExp } | undefined;
}

export class ProductController {

  private readonly DEFAULT_PAGE_SIZE: number = 5;
  private readonly DEFAULT_SKIP_DOCS: number = 0;
  private readonly DEFAULT_CURRENT_PAGE: number = 1;

  public async getProducts(queryParams?: any) {
    return await this.parseResponse(queryParams);
  }

  private async parseResponse(query) {
    const { itemsPerPage, skip, currentPage, searchTerm } = this.parseParams(query);
    const { pages, amountDocs, products } = await this.execQuery(searchTerm, skip, itemsPerPage);
    return {
      amountDocs,
      itemsPerPage: products.length,
      products,
      pages,
      currentPage
    };
  }

  private parseParams(query): QueryParams {
    const { limit, page, search } = query;
    let itemsPerPage: number = this.DEFAULT_PAGE_SIZE;
    let skip: number = this.DEFAULT_SKIP_DOCS;
    let currentPage: number = this.DEFAULT_CURRENT_PAGE;
    const searchTerm = search ? { name: new RegExp(search, 'i') } : undefined;

    if (limit) {
      const parsedLimit = Math.trunc(parseInt(limit));
      itemsPerPage = !Number.isNaN(parsedLimit) ? parsedLimit : itemsPerPage;
    }

    if (page) {
      const parsedPageNumber = Math.trunc(parseInt(page));
      skip = (itemsPerPage * (parsedPageNumber - 1));
      currentPage = parsedPageNumber;
    }

    return {
      itemsPerPage, skip, currentPage, searchTerm
    };
  }

  private async execQuery(searchTerm: {[key: string]: RegExp}, skip: number, itemsPerPage: number) {
    const amountDocs: number = await Product.find(searchTerm).countDocuments();
    const data: Document[] = await Product.find(searchTerm).skip(skip).limit(itemsPerPage);
    const products: ProductModel[] = data.map((document: Document) => new ProductModel(document));
    const amountPages: number = amountDocs <= itemsPerPage ? 1 : (amountDocs / itemsPerPage);
    const pages = Number.isInteger(amountPages) ? amountPages : Math.trunc(amountPages) + 1;
    return {
      pages, amountDocs, products
    };
  }
}

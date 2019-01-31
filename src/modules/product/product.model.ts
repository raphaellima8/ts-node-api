import { BaseModel } from '../../core/data-parser/base.model';

export class ProductModel extends BaseModel {

  public name: string;
  public category: string; 
  public type: string; 
  public price: number; 
  public promotionalPrice?: number; 
  public images: Array<string>;

  parse(data: any): ProductModel {
    this.name = data.name;
    this.category = data.category;
    this.type = data.type;
    this.price = data.price;
    this.promotionalPrice = data.promotionalPrice;
    this.images = this.parseList(data.images);
    return this;
  }

}

export abstract class BaseModel {
  productId: string;

  constructor(data) {
    if(data) {
      this.productId = data._id;
      this.parse(data);
    }
  }
  
  public abstract parse(data: any): BaseModel;

  protected parseList(list: Array<any>): any[] {
    if (list !== null) {
      if (Array.isArray(list)) {
        return list.map(item => item);
      }

      if (typeof list === 'string' || typeof list === 'object') {
        return [list];
      }
    }
    return [];
  }
}
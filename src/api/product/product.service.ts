import { Product } from "./product.entity";
import { Product as ProductModel } from './product.model';

export class ProductService {

  async find(query: any): Promise<Product[]> {
    const q: any = {};
    if (query.name) {
      q.name = {$regex: new RegExp(`^${query.name}`, 'i')};
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      q.netPrice = {};
    }
    if (query.minPrice) {
      q.netPrice['$gte'] = query.minPrice;
    }
    if (query.maxPrice) {
      q.netPrice['$lte'] = query.maxPrice;
    }

    const list = await ProductModel.find(q);
    return list;
  }

  async getById(id: string): Promise<Product | null> {
    const item = await ProductModel.findById(id);
    return item;
  }

}

export default new ProductService();
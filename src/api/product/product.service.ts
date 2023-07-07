import { FilterQuery } from "mongoose";
import { Product } from "./product.entity";
import { Product as ProductModel } from './product.model';
import { QueryProductDTO } from "./product.dto";

export class ProductService {

  async find(query: QueryProductDTO): Promise<Product[]> {
    const q: FilterQuery<Product> = {};
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

    const page = 3;
    const limit = 100;

    const list = await ProductModel.find(q).limit(limit);
    return list;
  }

  async getById(id: string): Promise<Product | null> {
    const item = await ProductModel.findById(id);
    return item;
  }

}

export default new ProductService();
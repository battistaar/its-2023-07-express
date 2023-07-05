import { assign } from 'lodash';
import { CartItem } from "./cart-item.entity";
import { CartItem as CartItemModel } from './cart-item.model';
import { NotFoundError } from '../../errors/not-found';


export class CartItemService {
  
  async find(): Promise<CartItem[]> {
    return CartItemModel.find().populate('product');
  }

  async getById(id: string): Promise<CartItem | null> {
    return this._getById(id);
  }

  private async _getById(id: string) {
    return CartItemModel.findById(id).populate('product');
  }

  async add(item: CartItem): Promise<CartItem> {
    // const newItem = new CartItemModel(item);
    // await newItem.save();

    const existing = await CartItemModel.findOne({product: item.product});
    if (existing) {
      return this.update(existing.id, {quantity: existing.quantity + item.quantity});
    }

    const newItem = await CartItemModel.create(item);
    await newItem.populate('product');

    return newItem;
  }

  async update(id: string, data: Partial<CartItem>): Promise<CartItem> {
    const item = await this._getById(id);
    if (!item) {
      throw new NotFoundError();
    }
    assign(item, data);
    await item.save();

    return item;
  }

  async remove(id: string): Promise<void> {
    const item = await this._getById(id);
    if (!item) {
      throw new NotFoundError();
    }
    await item.deleteOne();
  }
}

export default new CartItemService();
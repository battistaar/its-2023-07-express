import { assign } from 'lodash';
import { CartItem } from "./cart-item.entity";

const CART: CartItem[] = [];

export class CartItemService {
  
  async find(): Promise<CartItem[]> {
    return CART;
  }

  async getById(id: string): Promise<CartItem | null> {
    return CART.find(item => item.id === id) || null;
  }

  async add(item: CartItem): Promise<CartItem> {
    CART.push(item);
    return item;
  }

  async update(id: string, data: Partial<CartItem>): Promise<CartItem> {
    const item = await this.getById(id);
    if (!item) {
      throw new Error('Not Found');
    }
    assign(item, data);
    return item;
  }

  async remove(id: string): Promise<void> {
    const index = CART.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Not Found');
    }
    CART.splice(index, 1);
  }
}

export default new CartItemService();
import { Request, Response, NextFunction } from 'express';
import cartItemService from './cart-item.service';
import productService from '../product/product.service';
import { CartItem } from './cart-item.entity';
import { TypedRequest } from '../../utils/typed-request.interface';
import { NotFoundError } from '../../errors/not-found';
import { plainToClass } from 'class-transformer';
import { AddCartItemDTO } from './cart-item.dto';
import { validate } from 'class-validator';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const list = await cartItemService.find();
  res.json(list);
}

export const add = async (
  req: TypedRequest<{productId: string, quantity: number}>,
  res: Response,
  next: NextFunction) => {
    
  try {
    const data = plainToClass(AddCartItemDTO, req.body);
    const errors = await validate(data);
    if (errors.length) {
      console.log(errors);
      next(errors);
      return;
    }

    const { productId, quantity } = data;
      
    const product = await productService.getById(productId);
    if (!product) {
      throw new NotFoundError();
    }
    
    const newItem: CartItem = {
      product: productId,
      quantity
    };
    const saved = await cartItemService.add(newItem);
    res.json(saved);
  } catch(err) {
    next(err);
  }
}

export const updateQuantity = async (req: TypedRequest<{quantity: number}>, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const newQuantity = req.body.quantity;

  if (newQuantity === undefined || newQuantity < 0 || newQuantity > 10) {
    res.status(400);
    res.send("Invalid quantity");
    return;
  }

  try {
    const updated = await cartItemService.update(id, {quantity: newQuantity});
    res.json(updated);
  } catch(err: any) {
    next(err);
  }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    await cartItemService.remove(id);
    res.status(204);
    res.send();
  } catch(err: any) {
    next(err);
  }
}
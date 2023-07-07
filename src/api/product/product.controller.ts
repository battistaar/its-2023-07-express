import { Request, Response, NextFunction } from 'express';
import productService from './product.service';
import { NotFoundError } from '../../errors/not-found';
import { TypedRequest } from '../../utils/typed-request.interface';
import { QueryProductDTO } from './product.dto';

export const list = async (req: TypedRequest<any, QueryProductDTO>,
                          res: Response,
                          next: NextFunction) => {
  const products = await productService.find(req.query);
  res.json(products);
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const item = await productService.getById(req.params.id);
  if (!item) {
    throw new NotFoundError();
  }
  res.json(item);
}
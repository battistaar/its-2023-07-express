import { NextFunction, Request, Response } from "express"

export const genericErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  res.status(500);
  res.json({
    error: 'InternalServerError',
    message: 'The server encountered an internal error'
  });
}
import { Request, Response, NextFunction } from 'express';
import BadRequest from '../erros/badRequest';

export default class ValidateLogin {
  public static checkRequired(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequest('All fields must be filled');
    }

    if (!/\S+@\S+.\S+/.test(email) || password.length < 6) {
      throw new BadRequest('All fields must be filled');
    }

    next();
  }
}

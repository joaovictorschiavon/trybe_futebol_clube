import { Request, Response, NextFunction } from 'express';
import InvalidFieldsError from '../erros/invalidFields';
import BadRequestError from '../erros/badRequest';

export default class ValidateLogin {
  public static checkRequired(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!email || !password) {
      throw new BadRequestError('All fields must be filled');
    }

    try {
      if (!emailRegex.test(email) || password.length < 6) {
        throw new InvalidFieldsError('All fields must be filled');
      }
    } catch {
      res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}

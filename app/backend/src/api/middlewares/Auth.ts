import { Request, Response, NextFunction } from 'express';
import InvalidFieldsError from '../erros/invalidFields';
import JWTService from '../utils/JWT';

const JWT = new JWTService();

export default class Auth {
  public static checkToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) throw new InvalidFieldsError('Token not found');

    const token = JWT.verifyToken(authorization);

    if (token instanceof Error) throw new InvalidFieldsError('Invalid token');

    req.body = token;

    next();
  }
}

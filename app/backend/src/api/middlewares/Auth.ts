import { Request, Response, NextFunction } from 'express';
import InvalidFieldsError from '../erros/invalidFields';
import JWTService from '../utils/JWT';

const JWT = new JWTService();

export default class Auth {
  public static checkToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) throw new InvalidFieldsError('Token not found');

    const payload = JWT.verifyToken(authorization);

    if (payload instanceof Error) throw new InvalidFieldsError('Invalid token');

    req.body = { userData: payload, ...req.body };

    next();
  }
}

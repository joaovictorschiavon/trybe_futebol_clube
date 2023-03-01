import * as jwt from 'jsonwebtoken';
import InvalidFieldsError from '../erros/invalidFields';

class JWTService {
  private _secret = process.env.JWT_SECRET || 'sparesecret';

  // constructor(secret: string) {
  //   this._secret = secret;
  // }

  generateToken(payload: jwt.JwtPayload): string {
    const config: jwt.SignOptions = {
      expiresIn: '2d',
      algorithm: 'HS256',
    };

    const token = jwt.sign(payload, this._secret, config);

    return token;
  }

  verifyToken(token: string): jwt.JwtPayload {
    if (!token) throw new InvalidFieldsError('Token not found');

    try {
      const payload = jwt.verify(token, this._secret);

      return payload as jwt.JwtPayload;
    } catch (error) {
      throw new InvalidFieldsError('Token must be a valid token');
    }
  }
}

export default JWTService;

import * as jwt from 'jsonwebtoken';

class JWTService {
  private _secret: string;
  constructor(secret: string) {
    this._secret = secret;
  }

  generateToken(payload: jwt.JwtPayload): string {
    const config: jwt.SignOptions = {
      expiresIn: '2d',
      algorithm: 'HS256',
    };

    const token = jwt.sign(payload, this._secret, config);

    return token;
  }

  verifyToken(token: string): jwt.JwtPayload {
    try {
      const payload = jwt.verify(token, this._secret);

      return payload as jwt.JwtPayload;
    } catch (error) {
      throw new jwt.JsonWebTokenError('Token not valid');
    }
  }
}

export default JWTService;

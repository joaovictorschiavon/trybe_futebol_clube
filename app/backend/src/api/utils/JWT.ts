import * as jwt from 'jsonwebtoken';

class JWTService {
  private _secret: string;
  constructor(secret: string) {
    this._secret = secret;
  }

  generateToken(payload: string): string {
    const config: jwt.SignOptions = {
      expiresIn: '2d',
      algorithm: 'HS256',
    };

    const token = jwt.sign(payload, this._secret, config);

    return token;
  }

  verifyToken(token: string): string {
    const payload = jwt.verify(token, this._secret) as string;

    return payload;
  }
}

export default JWTService;

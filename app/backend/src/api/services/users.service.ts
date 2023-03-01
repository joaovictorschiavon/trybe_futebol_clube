import { ModelStatic } from 'sequelize';
import * as bcryptjs from 'bcryptjs';
import UsersModel from '../../database/models/user.model';
import IUsers from '../interfaces/IUsers';
import IUsersService from '../interfaces/IUsersService';
import IToken from '../interfaces/IToken';
import JWTService from '../utils/JWT';
import 'dotenv/config';

import InvalidFields from '../erros/invalidFields';

export default class UsersService implements IUsersService {
  protected model: ModelStatic<UsersModel> = UsersModel;

  private _secret = process.env.JWT_SECRET as string;

  private _jwtService: JWTService = new JWTService(this._secret);

  async checkLogin(userLogin: IUsers): Promise<IToken> {
    const user = await this.model.findOne({ where: { email: userLogin.email } });

    if (!user) throw new InvalidFields('Invalid email or password');

    const isPass = bcryptjs.compareSync(userLogin.password, user.password);

    if (!isPass) throw new InvalidFields('Invalid email or password');

    const payload = userLogin.email as string;

    const token = this._jwtService.generateToken(payload);

    return { token };
  }
}

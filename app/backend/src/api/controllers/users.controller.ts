import { Request, Response, NextFunction } from 'express';
import IUsersService from '../interfaces/IUsersService';

class UsersController {
  private _usersService: IUsersService;

  constructor(service: IUsersService) {
    this._usersService = service;
  }

  async checkLogin(req: Request, res: Response, next: NextFunction) {
    try {
      // const user = await this.model.
      const token = await this._usersService.checkLogin(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async getRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body.userData;

      const role = await this._usersService.getRole(email);

      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;

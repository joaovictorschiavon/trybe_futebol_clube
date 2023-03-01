import { Request, Response, NextFunction } from 'express';
import IUsersService from '../interfaces/IUsersService';

class UsersController {
  private _usersService: IUsersService;

  constructor(service: IUsersService) {
    this._usersService = service;
  }

  async checkLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this._usersService.checkLogin(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;

import { Router, Request, Response, NextFunction } from 'express';
import UsersController from '../controllers/users.controller';
import UsersService from '../services/users.service';
import ValidateLogin from '../middlewares/ValidateLogin';
import Auth from '../middlewares/Auth';

const usersRouter = Router();
const usersService = new UsersService();
const usersController = new UsersController(usersService);

usersRouter.post(
  '/login',
  ValidateLogin.checkRequired,
  (req: Request, res: Response, next: NextFunction) => usersController.checkLogin(req, res, next),
);
usersRouter.get(
  '/login/role',
  Auth.checkToken,
  (req: Request, res: Response, next: NextFunction) => usersController.getRole(req, res, next),
);

export default usersRouter;

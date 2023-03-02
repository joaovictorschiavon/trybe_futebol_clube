import { Router, Request, Response, NextFunction } from 'express';
import MatchesController from '../controllers/matches.controller';
import MatchesService from '../services/matches.service';
import Auth from '../middlewares/Auth';

const matchesRouter = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get(
  '/matches',
  (req: Request, res: Response) => matchesController.getAll(req, res),
);

matchesRouter.patch(
  '/matches/:id/finish',
  Auth.checkToken,
  (req: Request, res: Response, next: NextFunction) => matchesController
    .finishMatch(req, res, next),
);

matchesRouter.patch(
  '/matches/:id',
  Auth.checkToken,
  (req: Request, res: Response, next: NextFunction) => matchesController.update(req, res, next),
);

export default matchesRouter;

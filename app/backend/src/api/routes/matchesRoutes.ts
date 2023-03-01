import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/matches.controller';
import MatchesService from '../services/matches.service';

const matchesRouter = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get(
  '/matches',
  (req: Request, res: Response) => matchesController.getAll(req, res),
);

export default matchesRouter;

import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services/teams.service';
import MatchesService from '../services/matches.service';

const leaderboardRouter = Router();
const teamsService = new TeamsService();
const matchesService = new MatchesService();
const teamsController = new TeamsController(teamsService, matchesService);

leaderboardRouter.get(
  '/leaderboard/home',
  (req: Request, res: Response) => teamsController.getBoard(req, res),
);

export default leaderboardRouter;

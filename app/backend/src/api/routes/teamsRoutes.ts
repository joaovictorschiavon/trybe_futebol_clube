import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services/teams.service';
import MatchesService from '../services/matches.service';

const teamsRouter = Router();
const teamsService = new TeamsService();
const matchesService = new MatchesService();
const teamsController = new TeamsController(teamsService, matchesService);

teamsRouter.get('/teams', (req: Request, res: Response) => teamsController.getAll(req, res));
teamsRouter.get('/teams/:id', (req: Request, res: Response) => teamsController.getById(req, res));

export default teamsRouter;

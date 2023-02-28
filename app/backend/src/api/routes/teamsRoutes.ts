import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services/teams.service';

const teamsRouter = Router();
const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

teamsRouter.get('/teams', (req: Request, res: Response) => teamsController.getAll(req, res));

export default teamsRouter;

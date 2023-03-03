import { NextFunction, Request, Response } from 'express';
import IMatchesService from '../interfaces/IMatchesService';
import NotFoundError from '../erros/notFound';

class MatchesController {
  private _matchesService: IMatchesService;

  constructor(service: IMatchesService) {
    this._matchesService = service;
  }

  async getAll(req: Request, res: Response) {
    const matchesRecovered = await this._matchesService.getAll();

    const { inProgress } = req.query;

    if (inProgress) {
      return res.status(200).json(matchesRecovered
        .filter((item) => item.inProgress === (inProgress === 'true')));
    }

    return res.status(200).json(matchesRecovered);
  }

  async finishMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await this._matchesService.finishMatch(Number(id));

      if (!result) throw new NotFoundError('Match not found');

      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;

      await this._matchesService.update(Number(id), homeTeamGoals, awayTeamGoals);

      // if (!result) throw new NotFoundError('Match not found');

      return res.status(200).json({ message: 'Sucess' });
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { homeTeamId, homeTeamGoals, awayTeamGoals, awayTeamId } = req.body;

      const match = await this._matchesService
        .register(homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals);

      return res.status(201).json(match);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchesController;

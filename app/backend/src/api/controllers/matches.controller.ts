import { Request, Response } from 'express';
import IMatchesService from '../interfaces/IMatchesService';

class MatchesController {
  private _matchesService: IMatchesService;

  constructor(service: IMatchesService) {
    this._matchesService = service;
  }

  async getAll(req: Request, res: Response) {
    const matchesRecovered = await this._matchesService.getAll();

    const { inProgress } = req.body;

    if (inProgress) {
      return res.status(200).json(matchesRecovered
        .filter((item) => item.inProgress === (req.query.inProgress === 'true')));
    }

    return res.status(200).json(matchesRecovered);
  }
}

export default MatchesController;

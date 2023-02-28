import { Request, Response } from 'express';
import ITeamsService from '../interfaces/ITeamsService';

class TeamsController {
  private _teamService: ITeamsService;

  constructor(service: ITeamsService) {
    this._teamService = service;
  }

  async getAll(_req: Request, res: Response) {
    const teamsRecovered = await this._teamService.getAll();

    return res.status(200).json(teamsRecovered);
  }
}

export default TeamsController;

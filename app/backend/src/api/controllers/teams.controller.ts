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

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const teamRecovered = await this._teamService.getById(+id);

    return res.status(200).json(teamRecovered);
  }
}

export default TeamsController;

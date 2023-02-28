import { ModelStatic } from 'sequelize';
import TeamsModel from '../../database/models/team.model';
import ITeams from '../interfaces/ITeams';
import ITeamsService from '../interfaces/ITeamsService';

export default class TeamsService implements ITeamsService {
  protected model: ModelStatic<TeamsModel> = TeamsModel;

  async getAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getById(id: number): Promise<ITeams> {
    const team = await this.model.findByPk(id);
    return team as unknown as ITeams;
  }
}

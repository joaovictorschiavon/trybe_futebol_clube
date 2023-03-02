import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/team.model';
import MatchesModel from '../../database/models/match.model';
import IMatches from '../interfaces/IMatches';
import IMatchesService from '../interfaces/IMatchesService';

export default class MatchesService implements IMatchesService {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async getAll(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  async finishMatch(id: number): Promise<number> {
    const match = await this.model.update({ inProgress: false }, { where: { id } });

    return match[0];
  }

  async update(id:number, homeTeamGoals: number, awayTeamGoals: number): Promise<number> {
    const match = await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return match[0];
  }
}

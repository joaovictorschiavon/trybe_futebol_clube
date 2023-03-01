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
}

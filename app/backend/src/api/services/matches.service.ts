import { ModelStatic } from 'sequelize';
import Teams from '../../database/models/team.model';
import MatchesModel from '../../database/models/match.model';
import IMatches from '../interfaces/IMatches';
import IMatchesService from '../interfaces/IMatchesService';
import UnprocessableEntityError from '../erros/unprocessableEntity';
import NotFoundError from '../erros/notFound';

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

  async register(
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
  ): Promise<IMatches> {
    const homeTeam = await this.model.findByPk(homeTeamId);
    const awayTeam = await this.model.findByPk(awayTeamId);

    if (!homeTeam || !awayTeam) {
      throw new NotFoundError('There is no team with such id!');
    }

    if (homeTeam.id === awayTeam.id) {
      throw new UnprocessableEntityError(
        'It is not possible to create a match with two equal teams',
      );
    }

    return this.model.create({
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true,
    });
  }
}

import IMatches from './IMatches';

export default interface IMatchesService {
  getAll(): Promise<IMatches[]>;
  finishMatch(id: number): Promise<number>;
  update(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number>;
}

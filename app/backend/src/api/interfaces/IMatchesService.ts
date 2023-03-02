import IMatches from './IMatches';

export default interface IMatchesService {
  getAll(): Promise<IMatches[]>;
  finishMatch(id: number): Promise<number>;
}

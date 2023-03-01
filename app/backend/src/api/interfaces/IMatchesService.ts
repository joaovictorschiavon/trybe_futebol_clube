import IMatches from './IMatches';

export default interface IMatchesService {
  getAll(): Promise<IMatches[]>;
}

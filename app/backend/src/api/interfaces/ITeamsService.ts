import ITeams from './ITeams';

export default interface ITeamsService {
  getAll(): Promise<ITeams[]>;
  getById(id: number): Promise<ITeams>
}

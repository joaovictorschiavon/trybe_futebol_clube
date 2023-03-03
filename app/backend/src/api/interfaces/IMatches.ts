export default interface IMatches {
  // [index: string]: number | string | boolean | undefined;
  id?: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

import { Request, Response } from 'express';
import ITeamsService from '../interfaces/ITeamsService';
import IMatches from '../interfaces/IMatches';
import IDecisions from '../interfaces/IDecisions';
import ITeams from '../interfaces/ITeams';
import IMatchesService from '../interfaces/IMatchesService';
import IResult from '../interfaces/IResult';

class TeamsController {
  private _teamService: ITeamsService;
  private _matchesService: IMatchesService;

  constructor(teamsService: ITeamsService, matchesService: IMatchesService) {
    this._teamService = teamsService;
    this._matchesService = matchesService;
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

  public static option(o: string) {
    if (o !== '') {
      if (o === 'homeTeamId') {
        return 'homeTeamId';
      }
      return 'awayTeamId';
    }
    return 'all';
  }

  public static filterMatches(o: string, matches: IMatches[], id: number | undefined) {
    const option = TeamsController.option(o);
    let filteredMatches;
    if (option !== 'all') {
      filteredMatches = o ? matches.filter((e) => e[option] === id) : matches;
    } else { filteredMatches = matches; }
    return filteredMatches;
  }

  public static efficiency(points: number, games: number) {
    return (((points) / (games * 3)) * 100).toFixed(2);
  }

  public static goalsBalance(favor: number, own: number) {
    return favor - own;
  }

  public static totalPoints(victories: number, draws: number) {
    return victories * 3 + draws;
  }

  public static totalLosses(decisions: IDecisions[], id: number | undefined) {
    let losses = 0;
    decisions.forEach((e) => { if (e.decision === 1 && (e.loser === id)) { losses += 1; } });
    return losses;
  }

  public static totalVictories(decisions: IDecisions[], id: number | undefined) {
    let victories = 0;
    decisions.forEach((e) => { if (e.decision === 1 && (e.winner === id)) { victories += 1; } });
    return victories;
  }

  public static totalDraws(decisions: IDecisions[], id: number | undefined) {
    let draws = 0;
    decisions.forEach((e) => {
      if (e.decision === 0 && (e.winner === id || e.loser === id)) { draws += 1; }
    });
    return draws;
  }

  public static totalGames(matches: IMatches[], id: number | undefined, o: string) {
    let games = 0;
    const fMatches = TeamsController.filterMatches(o, matches, id);
    fMatches.forEach((e) => { if (id === e.homeTeamId || id === e.awayTeamId) { games += 1; } });
    return games;
  }

  public static goalsOwn(matches: IMatches[], id: number | undefined, o: string) {
    let oGoals = 0;
    const filteredMatches = TeamsController.filterMatches(o, matches, id);
    filteredMatches.forEach((e) => {
      if (id === e.homeTeamId) { oGoals += e.awayTeamGoals; } else { oGoals += e.homeTeamGoals; }
    });
    return oGoals;
  }

  public static goalsFavor(matches: IMatches[], id: number | undefined, o: string) {
    let fGoals = 0;
    const filteredMatches = TeamsController.filterMatches(o, matches, id);
    filteredMatches.forEach((e) => {
      if (id === e.homeTeamId) { fGoals += e.homeTeamGoals; } else { fGoals += e.awayTeamGoals; }
    });
    return fGoals;
  }

  public static decisionOfMatches(matches: IMatches[]) {
    const matchesResults = matches.map((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return { decision: 1, winner: match.homeTeamId, loser: match.awayTeamId };
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        return { decision: 1, winner: match.awayTeamId, loser: match.homeTeamId };
      }
      return { decision: 0, winner: match.awayTeamId, loser: match.homeTeamId };
    });
    return matchesResults;
  }

  public static getGoals(teams: ITeams[], matches: IMatches[], o: string) {
    const result = teams.map((team) => {
      const filteredMatches = TeamsController.filterMatches(o, matches, team.id);
      const goalsF = TeamsController.goalsFavor(filteredMatches, team.id, o);
      const goalsO = TeamsController.goalsOwn(filteredMatches, team.id, o);
      const goalsB = TeamsController.goalsBalance(goalsF, goalsO);

      return {
        goalsFavor: goalsF,
        goalsOwn: goalsO,
        goalsBalance: goalsB,
      };
    });

    return result;
  }

  public static calculateScore(teams: ITeams[], matches: IMatches[], o: string) {
    const result = teams.map(({ id }) => {
      const filteredMatches = TeamsController.filterMatches(o, matches, id);

      const decisions = TeamsController.decisionOfMatches(filteredMatches);

      const totalGames = TeamsController.totalGames(filteredMatches, id, o);
      const totalVictories = TeamsController.totalVictories(decisions, id);
      const totalLosses = TeamsController.totalLosses(decisions, id);
      const totalDraws = TeamsController.totalDraws(decisions, id);
      const totalPoints = TeamsController.totalPoints(totalVictories, totalDraws);
      const efficiency = TeamsController.efficiency(totalPoints, totalGames);

      return {
        totalPoints, totalGames, totalVictories, totalDraws, totalLosses, efficiency,
      };
    });
    return result;
  }

  public static orderResult(result: IResult[]) {
    return result.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      return 0;
    });
  }

  async getMatches() {
    const matches = await this._matchesService.getAll();

    const matchesFinished = matches.filter((item) => item.inProgress === false);

    return matchesFinished;
  }

  async getHomeBoard(req: Request, res: Response) {
    const teams = await this._teamService.getAll();

    const matches = await this.getMatches();

    const allGoals = TeamsController.getGoals(teams, matches, 'homeTeamId');

    const score = TeamsController.calculateScore(teams, matches, 'homeTeamId');

    const unsortedResult = teams.map((team, i) => ({
      name: team.teamName, ...allGoals[i], ...score[i],
    }));

    const sortedResult = TeamsController.orderResult(unsortedResult);

    return res.status(200).json(sortedResult);
  }

  async getAwayBoard(req: Request, res: Response) {
    const teams = await this._teamService.getAll();

    const matches = await this.getMatches();

    const allGoals = TeamsController.getGoals(teams, matches, 'awayTeamId');

    const score = TeamsController.calculateScore(teams, matches, 'awayTeamId');

    const unsortedResult = teams.map((team, i) => ({
      name: team.teamName, ...allGoals[i], ...score[i],
    }));

    const sortedResult = TeamsController.orderResult(unsortedResult);

    return res.status(200).json(sortedResult);
  }

  async getBoard(req: Request, res: Response) {
    const teams = await this._teamService.getAll();

    const matches = await this.getMatches();

    const allGoals = TeamsController.getGoals(teams, matches, '');

    const score = TeamsController.calculateScore(teams, matches, '');

    const unsortedResult = teams.map((team, i) => ({
      name: team.teamName, ...allGoals[i], ...score[i],
    }));

    const sortedResult = TeamsController.orderResult(unsortedResult);
    console.log(sortedResult);
    return res.status(200).json(sortedResult);
  }
}

export default TeamsController;

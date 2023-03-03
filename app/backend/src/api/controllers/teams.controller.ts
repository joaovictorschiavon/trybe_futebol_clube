import { Request, Response } from 'express';
import ITeamsService from '../interfaces/ITeamsService';
// import MatchesService from '../services/matches.service';
import IMatches from '../interfaces/IMatches';
import IDecisions from '../interfaces/IDecisions';
import ITeams from '../interfaces/ITeams';
import IMatchesService from '../interfaces/IMatchesService';

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

  public static efficiency(points: number, games: number) {
    return (((points) / (games * 3)) * 100).toFixed(2);
  }

  public static goalsBalance(favor: number, own: number) {
    return favor - own;
  }

  public static totalPoints(victories: number) {
    return victories * 3;
  }

  public static totalLosses(decisions: IDecisions[], id: number | undefined) {
    let losses = 0;
    decisions.forEach((e) => {
      if (e.decision === 1 && (e.loser === id)) {
        losses += 1;
      }
    });
    return losses;
  }

  public static totalVictories(decisions: IDecisions[], id: number | undefined) {
    let victories = 0;
    decisions.forEach((e) => {
      if (e.decision === 1 && (e.winner === id)) {
        victories += 1;
      }
    });
    return victories;
  }

  public static totalDraws(decisions: IDecisions[], id: number | undefined) {
    let draws = 0;
    decisions.forEach((e) => {
      if (e.decision === 0 && (e.winner === id || e.loser === id)) {
        draws += 1;
      }
    });
    return draws;
  }

  public static totalGames(matches: IMatches[], id: number | undefined) {
    let games = 0;
    matches.forEach((e) => {
      if (id === e.homeTeamId || id === e.awayTeamId) {
        games += 1;
      }
    });
    return games;
  }

  public static goalsOwn(matches: IMatches[], id: number | undefined) {
    let goals = 0;
    matches.forEach((e) => {
      if (id === e.homeTeamId) {
        goals += e.awayTeamGoals;
      } else {
        goals += e.homeTeamGoals;
      }
    });
    return goals;
  }

  public static goalsFavor(matches: IMatches[], id: number | undefined) {
    let goals = 0;
    matches.forEach((e) => {
      if (id === e.homeTeamId) {
        goals += e.homeTeamGoals;
      } else {
        goals += e.awayTeamGoals;
      }
    });
    return goals;
  }

  public static decisionOfMatches(matches: IMatches[]) {
    const matchesResults = matches.map((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return { decision: 1, winner: match.homeTeamId, loser: match.awayTeamId };
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
        return { decision: 1, winner: match.awayTeamId, loser: match.homeTeamId };
      }
      // if (match.homeTeamGoals === match.awayTeamGoals) {

      // }
      return { decision: 0, winner: match.awayTeamId, loser: match.homeTeamId };
    });
    return matchesResults;
  }

  async getMatches() {
    const matches = await this._matchesService.getAll();

    const matchesFinished = matches.filter((item) => item.inProgress === false);

    return matchesFinished;
  }

  public static getGoals(teams: ITeams[], matches: IMatches[]) {
    const result = teams.map((team) => {
      const goalsF = TeamsController.goalsFavor(matches, team.id);
      const goalsO = TeamsController.goalsOwn(matches, team.id);
      const goalsB = TeamsController.goalsBalance(goalsF, goalsO);

      return {
        goalsFavor: goalsF,
        goalsOwn: goalsO,
        goalsBalance: goalsB,
      };
    });

    return result;
  }

  public static calculateScore(teams: ITeams[], matches: IMatches[], decisions: IDecisions[]) {
    const result = teams.map((team) => {
      const games = TeamsController.totalGames(matches, team.id);
      const victories = TeamsController.totalVictories(decisions, team.id);
      const points = TeamsController.totalPoints(victories);
      const draws = TeamsController.totalDraws(decisions, team.id);
      const losses = TeamsController.totalLosses(decisions, team.id);
      const efficiency = TeamsController.efficiency(points, games);

      return {
        totalPoints: points,
        totalGames: games,
        totalVictories: victories,
        totalDraws: draws,
        totalLosses: losses,
        efficiency,
      };
    });

    return result;
  }

  async getBoard(req: Request, res: Response) {
    const teams = await this._teamService.getAll();

    const matches = await this.getMatches();

    const decisions = TeamsController.decisionOfMatches(matches);

    const allGoals = TeamsController.getGoals(teams, matches);

    const score = TeamsController.calculateScore(teams, matches, decisions);

    const result = teams.map((team, i) => ({
      name: team.teamName,
      ...allGoals[i],
      ...score[i],
    }));

    console.log(result);

    return res.status(200).json(result);
  }
}

export default TeamsController;

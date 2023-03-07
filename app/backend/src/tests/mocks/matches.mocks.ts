// import Matches from "../../database/models/match.model";
import IMatches from "../../api/interfaces/IMatches";
import Matches from "../../database/models/match.model";
import { Model } from "sequelize";

interface IMatchesModel extends Model, IMatches {}

const matches: IMatches[] = [
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
    },
    {
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
    },
    {
      "id": 3,
      "homeTeamId": 4,
      "homeTeamGoals": 3,
      "awayTeamId": 11,
      "awayTeamGoals": 0,
      "inProgress": false,
    }
  ]

const newMatch = {
  'id': 4,
  'homeTeamId': 2,
  'homeTeamGoals': 0,
  'awayTeamId': 1,
  'awayTeamGoals': 1,
  'inProgress': true,
} as IMatchesModel

const inputRegisterMock = {
  homeTeamId: 2,
  homeTeamGoals: 0,
  awayTeamId: 1,
  awayTeamGoals: 1,
}

const newInvalidMatch = {
  homeTeamId: 200,
  homeTeamGoals: 0,
  awayTeamId: 1,
  awayTeamGoals: 1,
} 

const inputSameIdTeamsMock = {
  homeTeamId: 2,
  homeTeamGoals: 0,
  awayTeamId: 2,
  awayTeamGoals: 1,
}

export { matches, newMatch, inputRegisterMock, newInvalidMatch, inputSameIdTeamsMock }; 
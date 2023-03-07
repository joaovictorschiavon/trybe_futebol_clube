import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Matches from '../database/models/match.model';
import MatchesService from '../api/services/matches.service';
import { matches, newMatch, inputRegisterMock, newInvalidMatch, inputSameIdTeamsMock } from './mocks/matches.mocks';
import { beforeEach } from 'mocha';
import { bodyLogin } from './mocks/users.mocks'
import { Model } from 'sequelize';
import IMatches from '../api/interfaces/IMatches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de Matches', () => {
  const getToken = async () => {
    const resultLogin = await chai.request(app).post('/login').send(bodyLogin);
    expect(resultLogin.body.token).not.to.be.empty;

    return resultLogin.body.token;
  }

  afterEach(() => {
    sinon.restore();
  });

  describe('Function getAll', function () {
    it('should return all the matches and status code 200, route get /matches', async function () {
      // arrange 

      sinon.stub(Matches, 'findAll').resolves(matches as Matches[]);

      // act

      const result = await chai.request(app).get('/matches');

    
      // assert

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal(matches);
    })
  })

  describe('Function finishMatch', function () {
    it('should finish the match of the id and status code 200, route patch /matches/id/finish', async function () {
      // arrange 

      const token = await getToken();

      sinon.stub(Matches, 'update').resolves([1]);

      // act

      const result = await chai.request(app).patch('/matches/1/finish').set('authorization', token);

    
      // assert

      expect(result.status).to.be.equal(200);
      
    })
  })

  describe('Function update', function () {
    it('should update the match of the id and status code 200, route patch /matches/id', async function () {
      // arrange 

      const token = await getToken();

      sinon.stub(Matches, 'update').resolves([2]);

      // act

      const result = await chai.request(app).patch('/matches/1').set('authorization', token)
      .send({ 'homeTeamGoals': 2, 'awayTeamGoals': 1 });

    
      // assert

      expect(result.status).to.be.equal(200);
      
    })
    it('should return error status 401 because update without token, route patch /matches/id',
    async function () {
      // arrange 

      // const token = await getToken();

      sinon.stub(Matches, 'update').resolves([2]);

      // act

      const result = await chai.request(app).patch('/matches/1')
      .send({ 'homeTeamGoals': 2, 'awayTeamGoals': 1 });

    
      // assert

      expect(result.status).to.be.equal(401);
      
    })
  })
  describe('Function insert', function () {
    it('should create a new match and return status code 201, route post /matches', async function () {
      // arrange 

      const token = await getToken();

      sinon.stub(Matches, 'create').resolves(newMatch);

      // act

      const result = await chai.request(app).post('/matches').set('authorization', token)
      .send(inputRegisterMock);

    
      // assert

      expect(result.status).to.be.equal(201);
      
    })
    it('should return error status code 401 because send without token, route post /matches', async function () {
      // arrange 

      // const token = await getToken();

      sinon.stub(Matches, 'create').resolves(newMatch);

      // act

      const result = await chai.request(app).post('/matches')
      .send(inputRegisterMock);

    
      // assert

      expect(result.status).to.be.equal(401);
      
    })
    it('should return error status code 404 because id of teams used not valid, route post /matches',
    async function () {
      // arrange 

      const token = await getToken();

      sinon.stub(Matches, 'create').resolves(undefined);

      // act

      const result = await chai.request(app).post('/matches').set('authorization', token)
      .send(newInvalidMatch);

    
      // assert

      expect(result.status).to.be.equal(404);
      
    })
    it('should return error status code 422 because same time id used, route post /matches',
    async function () {
      // arrange 

      const token = await getToken();

      sinon.stub(Matches, 'create').resolves(undefined);

      // act

      const result = await chai.request(app).post('/matches').set('authorization', token)
      .send(inputSameIdTeamsMock);

    
      // assert

      expect(result.status).to.be.equal(422);
      
    })
  })
});

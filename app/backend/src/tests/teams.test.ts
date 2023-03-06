import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Teams from '../database/models/team.model';
import TeamsService from '../api/services/teams.service';
import { teams } from './mocks/teams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de Teams', () => {

  afterEach(() => {
    sinon.restore();
  });

  describe('Function getAll', function () {
    it('should return all the teams and status code 200', async function () {
      // arrange
      
      sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);

      // act

      const result = await chai.request(app).get('/teams');

    
      // assert

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal(teams);
    })
  })

  describe('Function getById', function () {
    it('should return the team 2 and status code 200', async function () {
      // arrange 
      sinon.stub(Teams, 'findByPk').resolves(teams[1] as Teams)

      // act

      const result = await chai.request(app).get('/teams/2');

    
      // assert

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal({
        "id": 2,
        "teamName": "Bahia"
      })
    })
  })
});

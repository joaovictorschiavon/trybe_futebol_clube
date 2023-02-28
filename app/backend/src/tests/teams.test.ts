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
    test('should return all the teams and status code 200', async function () {
      // arrange 

      // act

      const result = await chai.request(app).get('/teams').send(teams);

    
      // assert

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal(teams);
    })
  })

  describe('Function getById', function () {
    test('should return the team 2 and status code 200', async function () {
      // arrange 

      // act

      const result = await chai.request(app).get('/teams/:2').send(teams);

    
      // assert

      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal({
        "id": 2,
        "teamName": "Bahia"
      })
    })
  })
});

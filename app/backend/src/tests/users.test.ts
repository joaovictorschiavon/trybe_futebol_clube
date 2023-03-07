import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Users from '../database/models/user.model';
import UsersService from '../api/services/users.service';
import { teams } from './mocks/teams.mocks';
import { bodyLogin, invalidLogin, invalidPassword, missingEmail, missingPassword } from './mocks/users.mocks'
import * as jwt from 'jsonwebtoken';

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzgxNDY4NzYsImV4cCI6MTY3ODMxOTY3Nn0.Qj3MrG3D-PdF8JNcPOFcg3qT4khBR9oamRuCchJ33EU'

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste de Users', () => {

  afterEach(() => {
    sinon.restore();
  });

  describe('Function checkLogin', function () {
    it('should return the token and status code 200', async function () {
      // arrange 

      // act

      const result = await chai.request(app).post('/login').send(bodyLogin);

    
      // assert

      expect(result.status).to.be.equal(200);
    })
    it('should return error code status 401 because invalid email', async function () {
      // arrange 

      // act

      const result = await chai.request(app).post('/login').send(invalidLogin);

    
      // assert

      expect(result.status).to.be.equal(401);
    })
    it('should return error code status 400 because missing email', async function () {
      // arrange 

      // act

      const result = await chai.request(app).post('/login').send(missingEmail);

    
      // assert

      expect(result.status).to.be.equal(400);
    })
    it('should return error code status 400 because missing password', async function () {
      // arrange 

      // act

      const result = await chai.request(app).post('/login').send(missingPassword);

    
      // assert

      expect(result.status).to.be.equal(400);
    })
  })

  describe('Function getRole', function () {
    it('should return the role of the user and status code 200', async function () {
      // arrange 

      const resultLogin = await chai.request(app).post('/login').send(bodyLogin);
      expect(resultLogin.body.token).not.to.be.empty;

      const passT: string = resultLogin.body.token;

      // act

      const result = await chai.request(app).get('/login/role').set('authorization', passT);

    
      // assert

      expect(result.status).to.be.equal(200);

    })
  })
});

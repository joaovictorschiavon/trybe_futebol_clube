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
import { bodyLogin, token } from './mocks/users.mocks'
import * as jwt from 'jsonwebtoken';

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
  })

  describe('Function getRole', function () {
    it('should return the role of the user and status code 200', async function () {
      // arrange 

      sinon.stub(jwt, 'verify').callsFake(() => {
        return Promise.resolve({ sucess: 'Token is valid' });
      })

      // act

      const result = await chai.request(app).get('/login/role').set('authorization', 'token');

    
      // assert

      expect(result.status).to.be.equal(200);
      // expect(result.body).to.be.deep.equal({
      //   role: 'admin'
      // })
    })
  })
});

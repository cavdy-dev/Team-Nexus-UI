import '@babel/polyfill';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../api/index';

chai.use(chaiHttp);

describe('Testing LOGIN', () => {
  it(
    'ON SUCCESS',
    async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'friend@friend.com',
          password: 'password',
        });
      expect(response.body).to.be.an('object');
      expect(response).to.have.status(200);
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.equal('successfully logged in');
    },
  );
  it(
    'WHEN NO DATA PASSED',
    async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: '',
          password: '',
        });
      expect(response.body).to.be.an('object');
      expect(response).to.have.status(422);
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('email');
      expect(response.body.data).to.have.property('password');
      expect(response.body.data.email).to.equal('Please put in a valid email');
      expect(response.body.data.password).to.equal('Password should be at least 7 characters long');
    },
  );
  it(
    'WHEN EMAIL DONT EXIST',
    async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'friend33@friend.com',
          password: 'password',
        });
      expect(response.body).to.be.an('object');
      expect(response).to.have.status(404);
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('email');
      expect(response.body.data.email).to.equal('Email does not exist');
    },
  );
  it(
    'WHEN PASSWORD DONT MATCH',
    async () => {
      const response = await chai.request(app)
        .post('/login')
        .send({
          email: 'friend@friend.com',
          password: 'password33',
        });
      expect(response.body).to.be.an('object');
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('password');
      expect(response.body.data.password).to.equal('incorrect password');
    },
  );
});

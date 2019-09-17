import '@babel/polyfill';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../api/index';

chai.use(chaiHttp);

describe('Testing REGISTER', () => {
  it(
    'ON SUCCESS',
    async () => {
      const response = await chai.request(app)
        .post('/register')
        .send({
          name: 'friend',
          username: 'friend',
          email: 'friend@friend.com',
          password: 'password',
        });
      expect(response.body).to.be.an('object');
      expect(response).to.have.status(200);
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.equal('successfully signed up');
    },
  );
  it(
    'WHEN NO DATA PASSED',
    async () => {
      const response = await chai.request(app)
        .post('/register')
        .send({
          name: '',
          username: '',
          email: '',
          password: '',
        });
      expect(response.body).to.be.an('object');
      expect(response).to.have.status(422);
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('name');
      expect(response.body.data).to.have.property('username');
      expect(response.body.data).to.have.property('email');
      expect(response.body.data).to.have.property('password');
      expect(response.body.data.name).to.equal('Name should be between 5 and 15 characters');
      expect(response.body.data.username).to.equal('Username should be between 3 and 15 characters');
      expect(response.body.data.email).to.equal('Please put in a valid email');
      expect(response.body.data.password).to.equal('Password should be at least 7 characters long');
    },
  );
  it(
    'WHEN INVALID DATA PASSED',
    async () => {
      const response = await chai.request(app)
        .post('/register')
        .send({
          name: 'name3728',
          username: 'name26@@',
          email: 'name@name.com',
          password: 'password'
        });
      expect(response.body).to.be.an('object');
      expect(response).to.have.status(422);
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('name');
      expect(response.body.data).to.have.property('username');
      expect(response.body.data.name).to.equal('Name should be alphabet');
      expect(response.body.data.username).to.equal('Username can only contain alphabet and numbers');
    },
  );
  it(
    'WHEN EMAIL ALREADY EXIST',
    async () => {
      const response = await chai.request(app)
        .post('/register')
        .send({
          name: 'friend',
          username: 'friend2',
          email: 'friend@friend.com',
          password: 'password',
        });
      expect(response.body).to.be.an('object');
      expect(response).to.have.status(409);
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('email');
      expect(response.body.data.email).to.equal('Email already exist');
    },
  );
  it(
    'WHEN USERNAME ALREADY EXIST',
    async () => {
      const response = await chai.request(app)
        .post('/register')
        .send({
          name: 'friend',
          username: 'friend',
          email: 'friend2@friend.com',
          password: 'password',
        });
      expect(response.body).to.be.an('object');
      expect(response).to.have.status(409);
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('username');
      expect(response.body.data.username).to.equal('Username not available');
    },
  );
});

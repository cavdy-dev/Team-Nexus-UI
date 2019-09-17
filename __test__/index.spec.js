import '@babel/polyfill';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../api/index';

chai.use(chaiHttp);

describe('Testing INDEX.JS', () => {
  it(
    'APP INDEX PAGE',
    async () => {
      const response = await chai.request(app)
        .get('/')
        .send();
      expect(response.body).to.be.an('object');
      expect(response).to.have.status(200);
      // expect(response.body).to.have.property('status');
      // expect(response.body).to.have.property('data');
      // expect(response.body.data).to.equal('Welcome to Team Nexus');
    },
  );
  it(
    '404 PAGE',
    async () => {
      const response = await chai.request(app)
        .get('/lol')
        .send();
      expect(response.body).to.be.an('object');
      expect(response).to.have.status(404);
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.equal('Route Not Found');
    },
  );
});

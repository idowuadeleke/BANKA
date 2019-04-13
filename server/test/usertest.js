import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../app';

const { expect } = chai;

// using chai-http middleware
chai.use(chaiHttp);

const newUser = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'dele1989',
  type: 'client',
  isAdmin: false,
};

let UserToken;
let adminToken;

describe('Test user login and signup', () => {
    // Test suite for POST /signup route
    describe('POST api/v1/auth/signup', () => {
        it('Should successfully create a user account if inputs are valid', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(newUser)
            .end((err, res) => {
            if (err) done();
            const { body } = res;
            UserToken = body.data.token;
            expect(body).to.be.an('object');
            expect(body.status).to.be.a('number');
            expect(body.status).to.be.equals(201);
            expect(body.data).to.be.an('object');
            expect(body.data.token).to.be.a('string');
            done();
            });
        });

        it('Should return an error if signup inputs are invalid', (done) => {
          chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send({})
            .end((err, res) => {
              if (err) done();
              const { body } = res;
              expect(body).to.be.an('object');
              expect(body.status).to.be.a('number');
              expect(body.status).to.be.equal(422);
              expect(body.errors).to.be.a('object');
      
              done();
            });
        });

  });

});
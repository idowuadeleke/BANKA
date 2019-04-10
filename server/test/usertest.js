import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../app';
// import messageData from '../data/messages.json';

// const { id } = messageData[0];

const { expect } = chai;

// using chai-http middleware
chai.use(chaiHttp);

// const validMessage = {
//   id: 26,
//   sender: 'andela.giwa1@epic.com',
//   subject: 'Welcome home',
//   message: 'New message',
//   status: 'sent',
//   reciever: 'matti@epics.com',
// };

// const invalidMessage = {
//   sender: 'matti@epics.com',
//   subject: 'Welcome home',
//   message: 'New message',
//   status: 'sent',
//   reciever: 'Layne80@hotmailwrong.com',
// };

const newUser = {
  firstname: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'dele1989',
  type: 'client',
};

// let UserToken;
// let DbToken;
// let groupId;
// let DbnewUserToken;
// let userToDelete;
// Test suite for home route
describe('GET /', () => {
  it('Should redirect to home route', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data[0]).to.haveOwnProperty('message');
        expect(body.data[0].message).to.be.a('string');
        done();
      });
  });
});

// Test suite for non existing route
describe('GET *', () => {
  it('Should throw a 404 error', (done) => {
    chai
      .request(app)
      .get('/dsd')
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(404);
        expect(body.error).to.be.a('string');
        done();
      });
  });
});

// ========================USERS TEST=====================
// Test suite for POST /signup route
describe('POST api/v1/auth/signup', () => {
  it('Should successfully create a user account if inputs are valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        number: '08067678787',
        password: 'dele1989',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // UserToken = body.data.token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(201);
        expect(body.data).to.be.an('object');
        expect(body.data.token).to.be.a('string');
        done();
      });
  });
});

// Test suite for POST /signup route invalid
describe('POST api/v1/auth/signup', () => {
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
        expect(body.status).to.be.equal(400);
        expect(body.errors).to.be.a('object');

        done();
      });
  });
});


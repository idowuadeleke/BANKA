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
};

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
      .send(newUser)
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


// test suite for POST /signup user already exists
describe('POST api/v1/auth/signup', () => {
  it('should return an error if email already exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Idowu',
        lastname: 'Adeleke',
        email: 'idowu@andela.com',
        number: '0816957689',
        password: 'dele1989',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(409);
        expect(body.error).to.be.a('string');
        done();
      });
  });
});


// test for POST /login suite
describe('POST api/v1/auth/login', () => {
  it('should login successfully if user inputs are valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'andela.giwa1@epic.com',
        password: 'dele1989',
      })
      .end((err, res) => {
        if (err) done();
        const { body } = res;
        // UserToken = body.data.token;
        expect(body).to.be.an('object');
        expect(body.status).to.be.a('number');
        expect(body.status).to.be.equals(200);
        expect(body.data).to.be.an('object');
        expect(body.data.token).to.be.a('string');

        done();
      });
  });

  // Test suite for POST /login user email does not exists
  describe('POST api/v1/auth/login', () => {
    it('Should return an error if login email inputs is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'wrongemail@epicmail.com',
          password: 'cent46',
        })
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(404);
          expect(body.error).to.be.a('string');
          expect(body.error).to.be.equals('User does not exist');
          done();
        });
    });
  });

  // Test suite for POST /login password invalid
  describe('POST api/v1/auth/login', () => {
    it('Should return an error if login password inputs is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'idowu@andela.com',
          password: 'wrongpassword',
        })
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(401);
          expect(body.error).to.be.a('string');
          expect(body.error).to.be.equals('Invalid Email/Password');
          done();
        });
    });
  });

  // Test suite for POST /login route invalid
  describe('POST api/v1/auth/login', () => {
    it('Should return an error if login inputs are invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/login')
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
});

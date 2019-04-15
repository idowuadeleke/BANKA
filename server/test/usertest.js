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
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(200);
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
          expect(body.status).to.be.equal(400);
          expect(body.errors).to.be.a('object');

          done();
        });
    });

    // test suite for POST /signup user already exists
    it('should return an error if email already exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Idowu',
          lastname: 'Adeleke',
          email: 'idowu@andela.com',
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(409);
          expect(body.error).to.be.a('string');

          done();
        });
    });

    it('should return an error if user is client and isAdmin is true', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Idowu',
          lastname: 'Adeleke',
          email: 'idowu@andela.com',
          password: 'dele1989',
          type: 'client',
          isAdmin: true,
        })
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(400);
          expect(body.errors.clientAdmin).to.be.equals('Client cannot be admin');
          done();
        });
    });


    it('should return an error if user firstname field is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: '',
          lastname: 'Adeleke',
          email: 'idowu@andela.com',
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(400);
          expect(body.errors.firstname).to.be.equals('First Name field is required');
          done();
        });
    });

    it('should return an error if user lastname field is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Idowu',
          lastname: '',
          email: 'idowu@andela.com',
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(400);
          expect(body.errors.lastname).to.be.equals('Last Name field is required');
          done();
        });
    });

    it('should return an error if user email field is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Idowu',
          lastname: 'Adeleke',
          email: '',
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(400);
          expect(body.errors.email).to.be.equals('Email field is required');
          done();
        });
    });

    it('should return an error if user type field is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Idowu',
          lastname: 'Adeleke',
          email: 'idowu@andela.com',
          password: 'dele1989',
          type: '',
          isAdmin: false,
        })
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(400);
          expect(body.errors.type).to.be.equals('Type field is required');
          done();
        });
    });

    it('should return an error if email is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Idowu',
          lastname: 'Adeleke',
          email: 'idowucom',
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(400);
          expect(body.errors.email).to.be.equals('Email is invalid');
          done();
        });
    });

    it('should return an error if type field is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Idowu',
          lastname: 'Adeleke',
          email: 'idowu@andela.com',
          password: 'dele1989',
          type: 'administrator',
          isAdmin: false,
        })
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(400);
          expect(body.errors.type).to.be.equals('Type must either be client or staff');
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
          email: 'idowu@andela.com',
          password: 'dele1989',
        })
        .end((err, res) => {
          if (err) done();
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(200);
          expect(body.data).to.be.an('object');
          expect(body.data.token).to.be.a('string');

          done();
        });
    });

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

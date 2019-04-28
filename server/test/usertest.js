import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../app';

const { expect } = chai;
let adminDbToken;

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

describe('Test user signin and signup', () => {
  // Test suite for POST /signup route
  describe('POST api/v1/auth/signup', () => {
    it('Should successfully create a user account if inputs are valid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(201);
          expect(body.data[0]).to.be.an('object');
          expect(body.data[0].token).to.be.a('string');
          done();
        });
    });

    it('Should return an error if signup inputs are invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({})
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(400);
          expect(body.errors).to.be.a('object');

          done();
        });
    });

    it('Should return an error if signup firstname and last name contains symbol', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: '@$%jdd',
          lastname: '@$%jdd',
          email: faker.internet.email(),
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(400);
          expect(body.errors).to.be.a('object');

          done();
        });
    });

    it('Should return an error if signup input type is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: true,
          lastname: true,
          email: true,
          password: true,
          type: true,
          isAdmin: 'www',
        })
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(400);
          expect(body.errors).to.be.a('object');

          done();
        });
    });

    it('Should return an error if signup firstname and last is less than 2 characters', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'd',
          lastname: 'd',
          email: faker.internet.email(),
          password: 'dele1989',
          type: 'client',
          isAdmin: '',
        })
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(400);
          expect(body.errors).to.be.a('object');

          done();
        });
    });

    it('Should return an error if email address is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'defi',
          lastname: 'defi',
          email: 'andela',
          password: 'de',
          type: 'client4',
          isAdmin: false,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(400);
          expect(body.errors).to.be.a('object');

          done();
        });
    });

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
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(400);
          expect(body.errors.type).to.be.equals('Type field is required');
          done();
        });
    });

    it('should return an error if isAdmin field is a string', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Idowu',
          lastname: 'Adeleke',
          email: 'idowu@andela.com',
          password: 'dele1989',
          type: 'client',
          isAdmin: "howdy",
        })
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(400);
          expect(body.errors.isAdmin).to.be.equals('isAdmin field must be a boolean value and is required');
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
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(400);
          expect(body.errors.type).to.be.equals('Type must either be client or staff');
          done();
        });
    });
  });

  // test for POST /signin suite
  describe('POST api/v1/auth/signin', () => {
    it('should signin successfully if user inputs are valid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'idowu@andela.com',
          password: 'dele1989',
        })
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(200);
          expect(body.data[0]).to.be.an('object');
          expect(body.data[0].token).to.be.a('string');

          done();
        });
    });

    it('Should return an error if signin email inputs is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'wrongemail@epicmail.com',
          password: 'cent46',
        })
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(404);
          expect(body.error).to.be.a('string');
          expect(body.error).to.be.equals('User does not exist');
          done();
        });
    });

    it('Should return an error if signin password inputs is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'idowu@andela.com',
          password: 'wroneegpassword',
        })
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(401);
          expect(body.error).to.be.a('string');
          expect(body.error).to.be.equals('Invalid Email/Password');
          done();
        });
    });

    it('Should return an error if signin email is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'idowu',
          password: 'wroneegpassword',
        })
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(400);
          expect(body.errors).to.be.an('object');
          expect(body.errors.email).to.be.equals('Email is invalid');
          done();
        });
    });

    it('Should return an error if signin email and password is boolean', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: true,
          password: true,
        })
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(400);
          expect(body.errors).to.be.an('object');
          expect(body.errors.email).to.be.equals('Email is invalid');
          expect(body.errors.password).to.be.equals('password field must be a string');
          done();
        });
    });

    it('Should return an error if signin inputs are invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({})
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(400);
          expect(body.errors).to.be.a('object');

          done();
        });
    });
  });

  describe('POST api/v1/user', () => {
    before('Sign in as an admin ', (done) => {
      const userCredential = {
        email: 'idowuadeleke@gmail.com',
        password: 'dele1989',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(userCredential)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          adminDbToken = body.data[0].token;
          done();
        });
    });

    it('Should successfully create a user account if inputs are valid', (done) => {
      chai
        .request(app)
        .post('/api/v1/user')
        .send({
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          email: faker.internet.email(),
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .set('token', adminDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(201);
          expect(body.data[0]).to.be.an('object');
          expect(body.data[0].token).to.be.a('string');
          done();
        });
    });

    it('Should return an error if signup inputs are invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/user')
        .send({})
        .set('token', adminDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(400);
          expect(body.errors).to.be.a('object');

          done();
        });
    });

    it('Should return an error if signup firstname and last name contains symbol', (done) => {
      chai
        .request(app)
        .post('/api/v1/user')
        .send({
          firstname: '@$%jdd',
          lastname: '@$%jdd',
          email: faker.internet.email(),
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .set('token', adminDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(400);
          expect(body.errors).to.be.a('object');

          done();
        });
    });

    it('Should return an error if signup firstname and last is less than 2 characters', (done) => {
      chai
        .request(app)
        .post('/api/v1/user')
        .send({
          firstname: 'd',
          lastname: 'd',
          email: faker.internet.email(),
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .set('token', adminDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(400);
          expect(body.errors).to.be.a('object');

          done();
        });
    });

    it('Should return an error if email address is invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/user')
        .send({
          firstname: 'defi',
          lastname: 'defi',
          email: 'andela',
          password: 'de',
          type: 'client4',
          isAdmin: false,
        })
        .set('token', adminDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equal(400);
          expect(body.errors).to.be.a('object');

          done();
        });
    });

    it('should return an error if email already exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/user')
        .send({
          firstname: 'Idowu',
          lastname: 'Adeleke',
          email: 'idowu@andela.com',
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .set('token', adminDbToken)
        .end((err, res) => {
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
        .post('/api/v1/user')
        .send({
          firstname: 'Idowu',
          lastname: 'Adeleke',
          email: 'idowu@andela.com',
          password: 'dele1989',
          type: 'client',
          isAdmin: true,
        })
        .set('token', adminDbToken)
        .end((err, res) => {
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
        .post('/api/v1/user')
        .send({
          firstname: '',
          lastname: 'Adeleke',
          email: 'idowu@andela.com',
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .set('token', adminDbToken)
        .end((err, res) => {
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
        .post('/api/v1/user')
        .send({
          firstname: 'Idowu',
          lastname: '',
          email: 'idowu@andela.com',
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .set('token', adminDbToken)
        .end((err, res) => {
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
        .post('/api/v1/user')
        .send({
          firstname: 'Idowu',
          lastname: 'Adeleke',
          email: '',
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .set('token', adminDbToken)
        .end((err, res) => {
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
        .post('/api/v1/user')
        .send({
          firstname: 'Idowu',
          lastname: 'Adeleke',
          email: 'idowu@andela.com',
          password: 'dele1989',
          type: '',
          isAdmin: false,
        })
        .set('token', adminDbToken)
        .end((err, res) => {
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
        .post('/api/v1/user')
        .send({
          firstname: 'Idowu',
          lastname: 'Adeleke',
          email: 'idowucom',
          password: 'dele1989',
          type: 'client',
          isAdmin: false,
        })
        .set('token', adminDbToken)
        .end((err, res) => {
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
        .post('/api/v1/user')
        .send({
          firstname: 'Idowu',
          lastname: 'Adeleke',
          email: 'idowu@andela.com',
          password: 'dele1989',
          type: 'administrator',
          isAdmin: false,
        })
        .set('token', adminDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.a('number');
          expect(body.status).to.be.equals(400);
          expect(body.errors.type).to.be.equals('Type must either be client or staff');
          done();
        });
    });
  });
});

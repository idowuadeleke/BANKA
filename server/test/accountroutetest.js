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

describe('Test account related endpoints - POST, GET, PATH, DELETE', () => {
    
    before('Sign in user to obtain auth token', (done) => {
        const userCredential = {
          email: 'idowu@andela.com',
          password: 'dele1989',
        };
    
        chai
          .request(app)
          .post('/api/v1/auth/login')
          .send(userCredential)
          .end((err, res) => {
            const { body } = res;
            expect(body.status).to.be.equals(200);
            if (!err) {
                UserToken = body.data.token;
            }
            done();
          });
      });

      describe('POST api/v1/accounts', () => {
        it('it should check for token in the request header', (done) => {
            const details = {
              type: 'savings',
              balance: 0.00,
            };
            chai
              .request(app)
              .post('/api/v1/accounts')
              .send(details)
              .end((err, res) => {
                const { body } = res;
                expect(body.status).to.be.a('number');
                expect(body.status).to.be.equals(403);
                expect(body).to.be.an('object');
                expect(body).to.haveOwnProperty('error');
                expect(body.error).to.be.equals('Unauthorized!, you have to login');
                done();
              });
          });

        it('it should throw error when account type is not specified', (done) => {
          const details = {
            balance: 0.00,
          };
      
          chai
            .request(app)
            .post('/api/v1/accounts')
            .send(details)
            .set('token', UserToken)
            .end((err, res) => {
              const { body } = res;
              expect(body.status).to.be.equals(422);
              expect(body).to.be.an('object');
              expect(body.errors.type).to.be.equals('Type field is required');
              done();
            });
        });
      
        it('it should throw error when account type is different from savings and account', (done) => {
          const details = {
            type: 'somethingdifferent',
          };
      
          chai
            .request(app)
            .post('/api/v1/accounts')
            .set('token', UserToken)
            .send(details)
            .end((err, res) => {
              const { body } = res;
              expect(body.status).to.be.equals(422);
              expect(body).to.be.an('object');
              expect(body.errors.type).to.be.equals('Type must be one of [savings, current]');
              done();
            });
        });
      
      
        it('it should throw error when starting balance is not specified', (done) => {
          const details = {
            type: 'savings',
          };
      
          chai
            .request(app)
            .post('/api/v1/accounts')
            .send(details)
            .set('token', UserToken)
            .end((err, res) => {
              const { body } = res;
              expect(body.status).to.be.equals(422);
              expect(body).to.be.an('object');
              expect(body.errors.balance).to.be.equals('Balance field is required');
              done();
            });
        });
      
        it('it should throw error when starting balance is not a number', (done) => {
          const details = {
            type: 'savings',
            balance: 'rrrr',
          };
      
          chai
            .request(app)
            .post('/api/v1/accounts')
            .send(details)
            .set('token', UserToken)
            .end((err, res) => {
              const { body } = res;
              expect(body.status).to.be.equals(422);
              expect(body).to.be.an('object');
              expect(body.errors.balance).to.be.equals('Balance field must be a number');
              done();
            });
        });
        // describe('POST api/v1/accounts', () => {
//   it('Should successfully create a bank account if inputs are valid', (done) => {
//     const details = {
//       type: 'savings',
//       balance: 0.00,
//     };
//     chai
//       .request(app)
//       .post('/api/v1/accounts')

//       .set('token', UserToken)
//       .send(details)

//       .end((err, res) => {
//         if (err) done(err);
//         const { body } = res;
//         expect(body).to.be.an('object');
//         expect(body.status).to.be.a('number');
//         expect(body.status).to.be.equals(201);
//         expect(body.data).to.be.an('object');
//         expect(body.data).to.haveOwnProperty('accountNumber');
//         expect(body.data).to.haveOwnProperty('firstName');
//         expect(body.data).to.haveOwnProperty('lastName');
//         expect(body.data).to.haveOwnProperty('email');
//         expect(body.data).to.haveOwnProperty('type');
//         expect(body.data).to.haveOwnProperty('balance');
//         done();
//       });
//   });
// });
      });

    /**
   * Test the GET /accounts/ routes
   */
  describe('GET /accounts', () => {
    it('it should throw permission error if user is not an admin', (done) => {
      chai
        .request(app)
        .get('/api/v1/accounts')
        .set('token', UserToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(403);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('only a staff has the permission to get all bank accounts');
          done();
        });
    });

    it('it should get all the bank accounts', (done) => {
      chai
        .request(app)
        .get('/api/v1/accounts')
        .set('token', adminToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          expect(body.data.accounts).to.be.an('array');
          done();
        });
    });

    before('Sign in as an admin/staff ', (done) => {
      const userCredential = {
        email: 'Jennings_Heathcote57@gmail.com',
        password: 'dele1989',
      };

      chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(userCredential)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          if (!err) {
            adminToken = body.data.token;
          }
          done();
        });
    });
  });

  /**
     * Test the GET /accounts/:accountNumber route
     */
  describe('GET /accounts/:accountNumber', () => {
    it('it should throw an error if a client wants to get other user\'s account', (done) => {
      const accountNumber = 45677988;
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('token', UserToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(403);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('only a staff has the permission to get other user\'s account');
          done();
        });
    });

    it('it should GET a bank account details as a client if i own the account', (done) => {
      const accountNumber =  45678088;
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('token', UserToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          expect(body).to.be.an('object');
          expect(body.data).to.haveOwnProperty('accountNumber');
          expect(body.data).to.haveOwnProperty('firstName');
          expect(body.data).to.haveOwnProperty('lastName');
          expect(body.data).to.haveOwnProperty('email');
          expect(body.data).to.haveOwnProperty('type');
          expect(body.data).to.haveOwnProperty('balance');
          done();
        });
    });

    it('it should GET a bank account details as a staff', (done) => {
      const accountNumber = 45678088;
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('token', adminToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          expect(body).to.be.an('object');
          expect(body.data).to.haveOwnProperty('accountNumber');
          expect(body.data).to.haveOwnProperty('firstName');
          expect(body.data).to.haveOwnProperty('lastName');
          expect(body.data).to.haveOwnProperty('email');
          expect(body.data).to.haveOwnProperty('type');
          expect(body.data).to.haveOwnProperty('balance');
          done();
        });
    });

    it('it should throw an error if a client account that doesnt exist',(done) => {
      const accountNumber = 222567722988;
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('token', UserToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(404);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('account number doesn\'t exist');
          done();
        });
    });
    

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 2220107724455; 
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('token', adminToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(404);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('account number doesn\'t exist');
          done();
        });
    });
  });

});
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

// using chai-http middleware
chai.use(chaiHttp);

let adminDbToken;
let userDbToken;

describe('Test account related endpoints - POST, GET, PATH, DELETE', () => {
  before('Sign db user to obtain auth token', (done) => {
    const userCredential = {
      email: 'idowu@andela.com',
      password: 'dele1989',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(userCredential)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        if (!err) {
          userDbToken = body.data.token;
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
          expect(body.error).to.be.equals('Unauthorized!, you have to signin');
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
        .set('token', userDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
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
        .set('token', userDbToken)
        .send(details)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
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
        .set('token', userDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
          expect(body).to.be.an('object');
          expect(body.errors.balance).to.be.equals('balance field is required and must be a number');
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
        .set('token', userDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
          expect(body).to.be.an('object');
          expect(body.errors.balance).to.be.equals('balance field is required and must be a number');
          done();
        });
    });
  });

  /**
   * Test the GET /accounts/ routes
   */
  describe('GET /accounts', () => {
    it('it should throw permission error if user is not an admin', (done) => {
      chai
        .request(app)
        .get('/api/v1/accounts')
        .set('token', userDbToken)
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
        .set('token', adminDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          expect(body.data).to.be.an('array');
          done();
        });
    });

    it('it should get all active bank accounts', (done) => {
      chai
        .request(app)
        .get('/api/v1/accounts')
        .query({"status":"active"})
        .set('token', adminDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          expect(body.data).to.be.an('array');
          done();
        });
    });

    it('it should throw error if no dormant account has been created', (done) => {
      chai
        .request(app)
        .get('/api/v1/accounts')
        .query({"status":"dormant"})
        .set('token', adminDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.equals(404);
          expect(body.error).to.be.equals('no dormant account has been created');
          done();
        });
    });

    it('it should return error if status query is empty ', (done) => {
      chai
        .request(app)
        .get('/api/v1/accounts')
        .query({"status":""})
        .set('token', adminDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.equals(400);
          expect(body.errors.status).to.be.equals('status query field cannot be empty');
          done();
        });
    });

    it('it should return error if status query is invalid ', (done) => {
      chai
        .request(app)
        .get('/api/v1/accounts')
        .query({"status":"www"})
        .set('token', adminDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body).to.be.an('object');
          expect(body.status).to.be.equals(400);
          expect(body.errors.status).to.be.equals('status must be one of [dormant, active]');
          done();
        });
    });

    before('Sign in as an admin/staff222 ', (done) => {
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
          if (!err) {
            adminDbToken = body.data.token;
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
      const accountNumber = 1449088;
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('token', userDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(403);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('only a staff has the permission to get other user\'s account');
          done();
        });
    });

    it('it should GET a bank account details as a client if i own the account', (done) => {
      const accountNumber = 1448988;
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('token', userDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          expect(body).to.be.an('object');
          expect(body.data[0]).to.haveOwnProperty('accountnumber');
          expect(body.data[0]).to.haveOwnProperty('firstname');
          expect(body.data[0]).to.haveOwnProperty('lastname');
          expect(body.data[0]).to.haveOwnProperty('email');
          expect(body.data[0]).to.haveOwnProperty('type');
          expect(body.data[0]).to.haveOwnProperty('balance');
          done();
        });
    });

    it('it should GET a bank account details as a staff', (done) => {
      const accountNumber = 1448988;
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('token', adminDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          expect(body).to.be.an('object');
          expect(body.data[0]).to.haveOwnProperty('accountnumber');
          expect(body.data[0]).to.haveOwnProperty('firstname');
          expect(body.data[0]).to.haveOwnProperty('lastname');
          expect(body.data[0]).to.haveOwnProperty('email');
          expect(body.data[0]).to.haveOwnProperty('type');
          expect(body.data[0]).to.haveOwnProperty('balance');
          done();
        });
    });

    it('it should throw an error if a client account that doesnt exist', (done) => {
      const accountNumber = 222567;
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('token', userDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(404);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('account number doesn\'t exist');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 2220107;
      chai
        .request(app)
        .get(`/api/v1/accounts/${accountNumber}`)
        .set('token', adminDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(404);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('account number doesn\'t exist');
          done();
        });
    });
  });

  /**
   * Test the PATCH /accounts/:accountNumber route
   */
  describe('PATCH /accounts/:accountNumber', () => {
    it('it should throw permission error if user is not an admin', (done) => {
      const accountNumber = 222010872;
      const requestBody = { status: 'active' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('token', userDbToken)
        .send(requestBody)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(403);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('only a admin has the permission to change account status');
          done();
        });
    });

    it('it should activate a user bank account', (done) => {
      const accountNumber = 1448988;
      const requestBody = { status: 'active' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('token', adminDbToken)
        .send(requestBody)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          expect(body).to.be.an('object');
          expect(body.data).to.haveOwnProperty('accountNumber');
          expect(body.data).to.haveOwnProperty('status');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 33333;
      const requestBody = { status: 'dormant' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('token', adminDbToken)
        .send(requestBody)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(404);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('account number doesn\'t exist');
          done();
        });
    });

    it('it should throw error when request body status is not dormant or active', (done) => {
      const accountNumber = 222010872;
      const requestBody = { status: 'waiting' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('token', adminDbToken)
        .send(requestBody)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
          expect(body).to.be.an('object');
          expect(body.errors.updatestatus).to.be.equals('status must be one of [dormant, active]');
          done();
        });
    });

    it('it should throw error when request body status is empty', (done) => {
      const accountNumber = 222010872;
      const requestBody = { status: '' };
      chai
        .request(app)
        .patch(`/api/v1/accounts/${accountNumber}`)
        .set('token', adminDbToken)
        .send(requestBody)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
          expect(body).to.be.an('object');
          expect(body.errors.updatestatus).to.be.equals('Status field is required');
          done();
        });
    });
  });

  /**
     * Test  DELETE /accounts/:accountNumber route
     */
  describe('DELETE /accounts/:accountNumber', () => {
    it('it should throw permission error if user is not an admin', (done) => {
      const accountNumber = 45678088;
      chai
        .request(app)
        .delete(`/api/v1/accounts/${accountNumber}`)
        .set('token', userDbToken)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(403);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('only a staffs can delete an account');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 211110;
      chai
        .request(app)
        .delete(`/api/v1/accounts/${accountNumber}`)
        .set('token', adminDbToken)
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

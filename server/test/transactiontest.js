import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;

// using chai-http middleware
chai.use(chaiHttp);


describe('Test transaction related endpoints - Debit and Credit an account', () => {
  let cashierTokenDb;
  let userTokenDb;

  /**
     * Sign in as a cashier to generate user token before test
     */
  before('Sign in cashier to obtain auth token to be used in other account operations', (done) => {
    const userCredential = {
      email: 'greatness@gmail.com',
      password: 'dele1989',
    };

    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(userCredential)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        cashierTokenDb = body.data[0].token;
        done();
      });
  });

  /**
     * Sign in as a user to generate user token before test
     */
  before('Sign in user to obtain auth token for test', (done) => {
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
        userTokenDb = body.data[0].token;
        done();
      });
  });


  /**
   * Test the POST /transactions/:accountNumber/debit route
   */
  describe('POST /transactions/:accountNumber/debit', () => {
    it('it should throw permission error if user is not a cashier', (done) => {
      const accountNumber = 222010872;
      const details = { amount: 50000 };
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('token', userTokenDb)
        .send(details)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(401);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('only cashier can debit account');
          done();
        });
    });

    it('it should throw an insufficient balance error', (done) => {
      const accountNumber = 1448888;
      const details = { amount: 500000 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('token', cashierTokenDb)
        .send(details)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('account balance is not sufficient');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 88560;
      const details = { amount: 200000 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('token', cashierTokenDb)
        .send(details)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(404);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('account number doesn\'t exist');
          done();
        });
    });

    it('it should throw an error when account number is invalid', (done) => {
      const accountNumber = '88560jjj';
      const details = { amount: 200000 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('token', cashierTokenDb)
        .send(details)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
          expect(body).to.be.an('object');
          expect(body.errors.type).to.be.equals('account number must be an integer');
          done();
        });
    });

    it('it should throw an error when "amount" in request body is not provided ', (done) => {
      const accountNumber = 45678088;
      const responseBody = {};
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('token', cashierTokenDb)
        .send(responseBody)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
          expect(body).to.be.an('object');
          expect(body.errors.amount).to.be.equals('amount field is must be a number');
          done();
        });
    });

    it('it should throw an error when "amount" is not a number', (done) => {
      const accountNumber = 8856578900;
      const details = { amount: '20000err0' };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('token', cashierTokenDb)
        .send(details)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
          expect(body).to.be.an('object');
          expect(body.errors.amount).to.be.equals('amount field is must be a number');
          done();
        });
    });

    it('it should debit a bank account', (done) => {
      const accountNumber = 1448888;
      const details = { amount: 0 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('token', cashierTokenDb)
        .send(details)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          expect(body).to.be.an('object');
          expect(body.data[0]).to.haveOwnProperty('accountNumber');
          expect(body.data[0]).to.haveOwnProperty('transactionId');
          expect(body.data[0]).to.haveOwnProperty('amount');
          expect(body.data[0]).to.haveOwnProperty('cashier');
          expect(body.data[0]).to.haveOwnProperty('transactionType');
          expect(body.data[0]).to.haveOwnProperty('accountBalance');
          done();
        });
    });
  });

  /**
     * Test the POST /transactions/:accountNumber/credit route
     */
  describe('POST /transactions/:accountNumber/credit', () => {
    it('it should throw permission error if user is not a cashier', (done) => {
      const accountNumber = 222010872;
      const details = { amount: 50000 };
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('token', userTokenDb)
        .send(details)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(401);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('only cashier can credit account');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 885657;
      const details = { amount: 200000 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('token', cashierTokenDb)
        .send(details)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(404);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('account number doesn\'t exist');
          done();
        });
    });

    it('it should throw an error when account number is invalid', (done) => {
      const accountNumber = '88560jjj';
      const details = { amount: 200000 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('token', cashierTokenDb)
        .send(details)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
          expect(body).to.be.an('object');
          expect(body.errors.type).to.be.equals('account number must be an integer');
          done();
        });
    });

    it('it should throw an error when "amount" in request body is not provided ', (done) => {
      const accountNumber = 45678088;
      const responseBody = {};
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('token', cashierTokenDb)
        .send(responseBody)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
          expect(body).to.be.an('object');
          expect(body.errors.amount).to.be.equals('amount field is must be a number');
          done();
        });
    });

    it('it should throw an error when "amount" is not a number', (done) => {
      const accountNumber = 8856578900;
      const details = { amount: '20000err0' };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('token', cashierTokenDb)
        .send(details)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
          expect(body).to.be.an('object');
          expect(body.errors.amount).to.be.equals('amount field is must be a number');
          done();
        });
    });

    it('it should credit a bank account', (done) => {
      const accountNumber = 1449088;
      const details = { amount: 50 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('token', cashierTokenDb)
        .send(details)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          expect(body).to.be.an('object');
          expect(body.data[0]).to.haveOwnProperty('accountNumber');
          expect(body.data[0]).to.haveOwnProperty('transactionId');
          expect(body.data[0]).to.haveOwnProperty('amount');
          expect(body.data[0]).to.haveOwnProperty('cashier');
          expect(body.data[0]).to.haveOwnProperty('transactionType');
          expect(body.data[0]).to.haveOwnProperty('accountBalance');
          done();
        });
    });
  });

  /**
     * Test the GET /accounts/:accountNumber route
     */
  describe('GET /transactions/:transactionId', () => {
    it('it should throw an error if a client wants to get other user\'s account', (done) => {
      const transactionId = 211;
      chai
        .request(app)
        .get(`/api/v1/transactions/${transactionId}`)
        .set('token', userTokenDb)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(401);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('only a staff has the permission to get other users transaction details');
          done();
        });
    });

    it('it should GET a bank account details as a staff', (done) => {
      const transactionId = 211;
      chai
        .request(app)
        .get(`/api/v1/transactions/${transactionId}`)
        .set('token', cashierTokenDb)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          expect(body).to.be.an('object');
          expect(body.data[0]).to.haveOwnProperty('id');
          expect(body.data[0]).to.haveOwnProperty('accountNumber');
          expect(body.data[0]).to.haveOwnProperty('createdOn');
          expect(body.data[0]).to.haveOwnProperty('type');
          expect(body.data[0]).to.haveOwnProperty('oldBalance');
          expect(body.data[0]).to.haveOwnProperty('newBalance');
          done();
        });
    });


    it('it should throw an error if a transaction doesnt exist', (done) => {
      const transactionId = 5000;
      chai
        .request(app)
        .get(`/api/v1/transactions/${transactionId}`)
        .set('token', cashierTokenDb)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(404);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('no transaction exist for this id');
          done();
        });
    });

    it('it should throw an error if a transaction id is invalid', (done) => {
      const transactionId = 'y5000';
      chai
        .request(app)
        .get(`/api/v1/transactions/${transactionId}`)
        .set('token', cashierTokenDb)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
          expect(body).to.be.an('object');
          expect(body.errors.type).to.be.equals('transaction id must be an integer');
          done();
        });
    });
  });
});

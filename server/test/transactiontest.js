import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../app';

const { expect } = chai;

// using chai-http middleware
chai.use(chaiHttp);


describe('Test transaction related endpoints - Debit and Credit an account', () => {
  let cashierToken = null;
  let UserToken = null;

  /**
     * Sign in as a cashier to generate user token before test
     */
  before('Sign in cashier to obtain auth token to be used in other account operations', (done) => {
    const userCredential = {
      email: 'Jaylin.Wisoky@yahoo.com',
      password: 'dele1989',
    };

    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userCredential)
      .end((err, res) => {
        const { body } = res;
        expect(body.status).to.be.equals(200);
        if (!err) {
          cashierToken = res.body.data.token;
        }
        done();
      });
  });


  before('Sign in user to obtain auth token for test', (done) => {
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


  /**
   * Test the POST /transactions/:accountNumber/debit route
   */
  describe('POST /transactions/:accountNumber/debit', () => {
    it('it should throw permission error if user is not a cashier', (done) => {
      const accountNumber = 222010872;
      const body = { amount: 50000 };
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('token', UserToken)
        .send(body)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(403);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('only cashier can debit account');
          done();
        });
    });


    it('it should throw an insufficient balance error', (done) => {
      const accountNumber = 45678088;
      const body = { amount: 5000000 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('token', cashierToken)
        .send(body)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(400);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('account balance is not sufficient');
          done();
        });
    });

    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 8856578900;
      const body = { amount: 200000 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('token', cashierToken)
        .send(body)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(404);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('account number doesn\'t exist');
          done();
        });
    });

    // it('it should throw an error when "amount" in request body is not provided ', (done) => {
    //   const accountNumber = 45678088;
    //   const body = {};
    //   chai.request(app)
    //     .post(`/api/v1/transactions/${accountNumber}/debit`)
    //     .set('token', cashierToken)
    //     .send(body)
    //     .end((err, res) => {
    //       const { body } = res;
    //       expect(body.status).to.be.equals(422);
    //       expect(body).to.be.an('object');
    //       expect(body.errors.amount).to.be.equals('amount field is required');
    //       done();
    //     });
    // });

    it('it should throw an error when "amount" is not a number', (done) => {
      const accountNumber = 8856578900;
      const body = { amount: '20000err0' };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('token', cashierToken)
        .send(body)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(422);
          expect(body).to.be.an('object');
          expect(body.errors.amount).to.be.equals('amount field must be a number');
          done();
        });
    });

    it('it should debit a bank account', (done) => {
      const accountNumber = 45677988;
      const body = { amount: 500 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/debit`)
        .set('token', cashierToken)
        .send(body)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          expect(body).to.be.an('object');
          expect(body.data).to.haveOwnProperty('accountNumber');
          expect(body.data).to.haveOwnProperty('transactionId');
          expect(body.data).to.haveOwnProperty('amount');
          expect(body.data).to.haveOwnProperty('cashier');
          expect(body.data).to.haveOwnProperty('transactionType');
          expect(body.data).to.haveOwnProperty('accountBalance');
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
      const body = { amount: 50000 };
      chai
        .request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('token', UserToken)
        .send(body)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(403);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('only cashier can credit account');
          done();
        });
    });


    it('it should throw an error when account number is not found', (done) => {
      const accountNumber = 8856578900;
      const body = { amount: 200000 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('token', cashierToken)
        .send(body)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(404);
          expect(body).to.be.an('object');
          expect(body.error).to.be.equals('account number doesn\'t exist');
          done();
        });
    });

    // it('it should throw an error when "amount" in request body is not provided ', (done) => {
    //   const accountNumber = 45678088;
    //   const body = {};
    //   chai.request(app)
    //     .post(`/api/v1/transactions/${accountNumber}/credit`)
    //     .set('token', cashierToken)
    //     .send(body)
    //     .end((err, res) => {
    //       const { body } = res;
    //       expect(body.status).to.be.equals(422);
    //       expect(body).to.be.an('object');
    //       expect(body.errors.amount).to.be.equals('amount field is required');
    //       done();
    //     });
    // });

    it('it should throw an error when "amount" is not a number', (done) => {
      const accountNumber = 8856578900;
      const body = { amount: '20000err0' };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('token', cashierToken)
        .send(body)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(422);
          expect(body).to.be.an('object');
          expect(body.errors.amount).to.be.equals('amount field must be a number');
          done();
        });
    });

    it('it should debit a bank account', (done) => {
      const accountNumber = 45677988;
      const body = { amount: 50 };
      chai.request(app)
        .post(`/api/v1/transactions/${accountNumber}/credit`)
        .set('token', cashierToken)
        .send(body)
        .end((err, res) => {
          const { body } = res;
          expect(body.status).to.be.equals(200);
          expect(body).to.be.an('object');
          expect(body.data).to.haveOwnProperty('accountNumber');
          expect(body.data).to.haveOwnProperty('transactionId');
          expect(body.data).to.haveOwnProperty('amount');
          expect(body.data).to.haveOwnProperty('cashier');
          expect(body.data).to.haveOwnProperty('transactionType');
          expect(body.data).to.haveOwnProperty('accountBalance');
          done();
        });
    });
  });
});

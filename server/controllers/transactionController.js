import DB from '../db/index';
import EmailNotificationMarshal from '../helper/emailNotification';

const { sendEmail } = EmailNotificationMarshal;

class transactionController {
  // debit user account
  static async debitUserAccountDb(req, res) {
    try {
      const { id } = req.user;
      const { accountNumber } = req.params;
      const { amount } = req.body;
      const foundAccountQueryString = `select accounts.balance, users.email from accounts
                            LEFT JOIN users ON accounts.owner = users.id WHERE "accountNumber" = $1`;
      const foundAccountDb = await DB.query(foundAccountQueryString, [accountNumber]);
      if (foundAccountDb.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'account number doesn\'t exist',
        });
      }
      const userEmail = foundAccountDb.rows[0].email;
      const oldBalance = foundAccountDb.rows[0].balance;
      if (oldBalance < amount) {
        return res.status(400).json({
          status: 400,
          error: 'account balance is not sufficient',
        });
      }
      const newBalance = oldBalance - amount;
      const values = ['debit', accountNumber, id, amount, oldBalance, newBalance];
      const accountqueryString = `INSERT INTO transactions(type, "accountNumber", cashier,amount, "oldBalance", "newBalance")
                                  VALUES($1, $2, $3, $4, $5, $6)returning *`;
      const { rows } = await DB.query(accountqueryString, values);
      const updatebalanceQueryString = 'UPDATE accounts SET balance = $1 WHERE "accountNumber" = $2';
      await DB.query(updatebalanceQueryString, [newBalance, accountNumber]);
      sendEmail(userEmail, rows[0], req, res);

      return res.status(200).json({
        status: 200,
        data: {
          transactionId: rows[0].id,
          accountNumber: rows[0].accountNumber,
          amount: rows[0].amount,
          cashier: rows[0].cashier,
          transactionType: rows[0].type,
          accountBalance: rows[0].newBalance,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  static async creditUserAccountDb(req, res) {
    try {
      const { id } = req.user;
      const { accountNumber } = req.params;
      const { amount } = req.body;
      const foundAccountQueryString = `select accounts.balance, users.email from accounts
                            LEFT JOIN users ON accounts.owner = users.id WHERE "accountNumber" = $1`;
      const foundAccountDb = await DB.query(foundAccountQueryString, [accountNumber]);
      if (foundAccountDb.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'account number doesn\'t exist',
        });
      }
      const userEmail = foundAccountDb.rows[0].email;
      const oldBalance = foundAccountDb.rows[0].balance;
      const newBalance = oldBalance + amount;
      const values = ['credit', accountNumber, id, amount, oldBalance, newBalance];
      const accountqueryString = `INSERT INTO transactions(type, "accountNumber", cashier,amount, "oldBalance", "newBalance")
                                  VALUES($1, $2, $3, $4, $5, $6)returning *`;
      const { rows } = await DB.query(accountqueryString, values);
      const updatebalanceQueryString = 'UPDATE accounts SET balance = $1 WHERE "accountNumber" = $2';
      await DB.query(updatebalanceQueryString, [newBalance, accountNumber]);
      sendEmail(userEmail, rows[0], req, res);
      return res.status(200).json({
        status: 200,
        data: {
          transactionId: rows[0].id,
          accountNumber: rows[0].accountNumber,
          amount: rows[0].amount,
          cashier: rows[0].cashier,
          transactionType: rows[0].type,
          accountBalance: rows[0].newBalance,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  // get a specific account transactions
  static async getSpecificTransaction(req, res) {
    try {
      const { transactionId } = req.params;
      const accountQueryString = `select id, "accountNumber","createdOn", type,amount, "oldBalance",
       "newBalance" FROM transactions  WHERE id = $1`;
      const accounts = await DB.query(accountQueryString, [transactionId]);
      if (accounts.rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: accounts.rows,
        });
      }
      // return error if no transaction made
      return res.status(404).json({
        status: 404,
        error: 'no transaction exist for this id',
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }
}
export default transactionController;

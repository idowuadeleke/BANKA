import DB from '../db/index';
import helper from '../helper/helper';

const {selectFromDb, updateDb, insertToDb} = helper;

class accountController {
  /**
   *create a message
   * @param {*} req
   * @param {*} res
   */
  static async createBankAccountdb(req, res) {
    try {
      const { id } = req.user;
      const { type, balance } = req.body;
      const user = await selectFromDb('*','users','id',id)
      if (user) {
        // Generate new account data
        const accountNoQueryString = 'SELECT "accountNumber" FROM accounts ORDER BY id DESC LIMIT 1';
        const LastaccountNoRow = await DB.query(accountNoQueryString, []);
        // change this to a function that checks if account exists
        const newAccountNo = LastaccountNoRow.rows[0].accountNumber + 100;
        const values = [newAccountNo, id, 'draft', type, balance];
        const rows = await insertToDb("accounts", '"accountNumber", owner, status, type, balance', '$1, $2, $3, $4, $5',values)
        return res.status(201).json({
          status: 201,
          data: [rows[0]],
        });
      }
      // return error if requesting user does not exist
      return res.status(404).json({
        status: 404,
        error: 'User not found',
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again ',
      });
    }
  }

  static async fetchAllAccountsDb(req, res) {
    try {
      let allAccounts;
      let allAccountQueryString;
      let statustype;

      if (req.query.status === undefined) {
        allAccountQueryString = `select accounts.id, accounts."accountNumber", accounts."createdOn",
        accounts.status, accounts.type, accounts.balance,users.email from accounts
         LEFT JOIN users ON accounts.owner = users.id`;
        allAccounts = await DB.query(allAccountQueryString, []);
        statustype = '';
      } else {
        const { status } = req.query;
        allAccountQueryString = `select accounts.id,accounts."accountNumber", accounts."createdOn",
        accounts.status, accounts.type, accounts.balance,users.email from accounts
         LEFT JOIN users ON accounts.owner = users.id WHERE accounts.status = $1`;
        allAccounts = await DB.query(allAccountQueryString, [status]);
        statustype = status;
      }
      if (allAccounts.rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: allAccounts.rows,
        });
      }
      // return error if no acccount has been created
      return res.status(404).json({
        status: 404,
        error: `no ${statustype} account has been created`,
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  // get a specific bank account
  static async getAccountDb(req, res) {
    try {
      const { accountNumber } = req.params;
      const accountQueryString = `select accounts.id, accounts."accountNumber", accounts."createdOn",
     accounts.status, accounts.type, accounts.balance,users.email
      from accounts LEFT JOIN users ON accounts.owner = users.id WHERE  
      accounts."accountNumber" = $1`;
      const accounts = await DB.query(accountQueryString, [accountNumber]);
      if (accounts.rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: accounts.rows,
        });
      }
      // return error if no acccount has been created
      return res.status(404).json({
        status: 404,
        error: 'account number doesn\'t exist',
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }


  // get a specific account transactions history
  static async getAccountTransactions(req, res) {
    try {
      const { accountNumber } = req.params;
      const rows = await selectFromDb('*','accounts','"accountNumber"',accountNumber)
      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'account number doesn\'t exist',
        });
      }
      const _rows = await selectFromDb(`id, "accountNumber","createdOn", type,amount, "oldBalance",
      "newBalance"`,'transactions','"accountNumber"',accountNumber)
      if (_rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: _rows,
        });
      }
      // return error if no transaction made
      return res.status(404).json({
        status: 404,
        error: 'no transaction exist for this account',
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  // get a specific bank account
  static async getSpecificUserAccount(req, res) {
    const { email } = req.params;
    try {
      const accountQueryString = `select accounts.id, accounts."accountNumber", accounts."createdOn",
     accounts.status, accounts.type, accounts.balance from accounts LEFT JOIN users ON accounts.owner = users.id WHERE  
      users.email = $1`;
      const accounts = await DB.query(accountQueryString, [email]);
      if (accounts.rows.length > 0) {
        return res.status(200).json({
          status: 200,
          accounts: accounts.rows,
        });
      }
      // return error if no acccount has been created
      return res.status(404).json({
        status: 404,
        error: 'no account found with given email address',
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }


  // Activate or deactivate a user account status
  static async changeStatusDb(req, res) {
    try {
      const { accountNumber } = req.params;
      const { status } = req.body;
      const rows = await selectFromDb('*','accounts','"accountNumber"',accountNumber)
      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'account number doesn\'t exist',
        });
      }
      const _rows = await updateDb('accounts','status','"accountNumber"',[status,accountNumber])
      return res.status(200).json({
        status: 200,
        data: {
          accountNumber: _rows[0].accountNumber,
          status: _rows[0].status,
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  static async deleteBankAccountDb(req, res) {
    try {
      const { accountNumber } = req.params;
      const rows = await selectFromDb('*','accounts','"accountNumber"',accountNumber)
      if (rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'account number doesn\'t exist',
        });
      }
      const deleteAccountQueryString = 'DELETE FROM accounts WHERE "accountNumber" = $1 returning *';
      await DB.query(deleteAccountQueryString, [accountNumber]);
      return res.status(200).json({
        status: 200,
        message: 'Account successfully deleted',
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }
}

export default accountController;

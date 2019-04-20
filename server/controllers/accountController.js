import accountData from '../data/accounts';
import userData from '../data/users';
import helper from '../helper/helper';
import validateAccountInput from '../validation/account';
import validateUpdateStatus from '../validation/updatestatus';
import DB from '../db/index';


const {
  saveDataToFile,
  findUserByID,
  findAccountByOwner,
  generateId,
  generateAccountNumber,
  findByAccountNumber,
  updateData,
} = helper;


class accountController {
    /**
   *create a message
   * @param {*} req
   * @param {*} res
   */
  static async createBankAccountdb(req, res) {
    try {
      const { id } = req.user;
      // check if user pass valid and required data
      const { errors, isValid } = validateAccountInput(req.body);
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors,
        });
      }
      const { type, balance } = req.body;
      const queryString = 'SELECT * FROM users WHERE id = $1';
      const user = await DB.query(queryString, [id]);
      if (user) {
        // check if user already has a bank account
        const queryString = 'SELECT * FROM accounts WHERE owner = $1';
        const account = await DB.query(queryString, [id]);
        if (account.rows.length !== 0) {
          return res.status(400).json({
            status: 400,
            error: `user already have an account  - ${account.rows[0].accountnumber}`,
          });
        }

        //Generate new account data
        const accountNoQueryString = 'SELECT accountnumber FROM accounts ORDER BY id DESC LIMIT 1';
        const LastaccountNoRow = await DB.query(accountNoQueryString, []);
        //change this to a function that checks if account exists
        const newAccountNo = LastaccountNoRow.rows[0].accountnumber + 100;
        const values =[newAccountNo,id,'draft',type,balance ]
        
        const accountqueryString = 'INSERT INTO accounts(accountNumber, owner, status, type, balance) VALUES($1, $2, $3, $4, $5) returning *';
        const { rows } = await DB.query(accountqueryString, values);
        return res.status(201).json({
          status: 201,
          data: {
            accountNumber: rows[0].accountnumber,
            firstName: user.rows[0].firstname,
            lastName: user.rows[0].lastname,
            email: user.rows[0].email,
            type: rows[0].type,
            openingBalance: rows[0].balance,
          },
        });
      }
      //return error if requesting user does not exist
      return res.status(404).json({
        status: 404,
        error: 'User not found',
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  static async fetchAllAccountsDb(req, res) {
    const allAccountQueryString = `select accounts.id, accounts.accountnumber, accounts.createdon,
     accounts.status, accounts.type, accounts.balance,users.firstname,users.lastname,
      users.email from accounts LEFT JOIN users ON accounts.owner = users.id`;
    const allAccounts = await DB.query(allAccountQueryString, []);
    if (allAccounts.rows.length > 0) {
      return res.status(200).json({
        status: 200,
        data: allAccounts.rows,
      });
    }
    //return error if no acccount has been created 
    return res.status(404).json({
      status: 404,
      error: 'no account has been created',
    });
  }

  //get a specific bank account
  static async getAccountDb(req, res) {
    const { accountNumber } = req.params;
    try {
      const accountQueryString = `select accounts.id, accounts.accountnumber, accounts.createdon,
     accounts.status, accounts.type, accounts.balance,users.firstname,users.lastname,
      users.email from accounts LEFT JOIN users ON accounts.owner = users.id WHERE  
      accounts.accountnumber = $1`;
    const accounts = await DB.query(accountQueryString, [accountNumber]);
    if (accounts.rows.length > 0) {
      return res.status(200).json({
        status: 200,
        data: accounts.rows,
      });
    }
    //return error if no acccount has been created 
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

  //Activate or deactivate a user account status
  static changeStatus(req, res) {
    try {
      const { accountNumber } = req.params;
      const { errors, isValid } = validateUpdateStatus(req.body);
      // check if user inputs are valid
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors,
        });
      }
      const { status } = req.body;
      const foundAccount = findByAccountNumber(accountData, Number(accountNumber));
      if (foundAccount) {
        foundAccount.status = status;
        const filePath = 'server/data/accounts.json';
        updateData(filePath, accountData);
        return res.status(200).json({
          status: 200,
          data: {
            accountNumber: foundAccount.accountNumber,
            status,
          },
        });
      }
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

//delete a specified user account
  static deleteBankAccount(req, res) {
    try {
      const { accountNumber } = req.params;
      const foundAccount = findByAccountNumber(accountData, Number(accountNumber));
      if (foundAccount) {
        const index = accountData.indexOf(foundAccount);
        accountData.splice(index, 1);
        const filePath = 'server/data/accounts.json';
        updateData(filePath, accountData);
        return res.status(200).json({
          status: 200,
          message: 'Account successfully deleted',
        });
      }
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
}

export default accountController;

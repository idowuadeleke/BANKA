import accountData from '../data/accounts';
import userData from '../data/users';
import helper from '../helper/helper';
import validateAccountInput from '../validation/account';
import validateUpdateStatus from '../validation/updatestatus';


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
  static createBankAccount(req, res) {
    try {
      const { id } = req.user;

      // check if user pass valid and required data
      const { errors, isValid } = validateAccountInput(req.body);

      // // check if user inputs are valid
      if (!isValid) {
        return res.status(422).json({
          status: 422,
          errors,
        });
      }
      const { type, balance } = req.body;
      const user = findUserByID(userData, id);
     
      
      if (user) {
        // check if user already has a bank account
        
        const account = findAccountByOwner(accountData, id);
        // console.log(account);
        if (account) {
          return res.status(400).json({
            status: 400,
            error: `user already have an account  - ${account.accountNumber}`,
          });
        }
        // console.log('llllllllllllllllllllvalues');

        const values = {
          id: generateId(accountData, 0),
          accountNumber: generateAccountNumber(accountData),
          createdOn: new Date().toUTCString(),
          owner: id,
          status: 'dormant',
          type,
          balance,
        };
        // console.log(values);
        const filePath = 'server/data/accounts.json';
        const newAccount = saveDataToFile(filePath, accountData, values);
        return res.status(201).json({
          status: 201,
          data: {
            accountNumber: newAccount.accountNumber,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            type,
            balance,
          },
        });
      }

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

  static fetchAllAccounts(req, res) {
    const accounts = accountData.map((account) => {
                      const { owner, ...data } = account;
                      const user = findUserByID(userData,owner);
                      
                      return {
                        ...data,
                        firstName: user.firstname,
                        lastName: user.lastname,
                        email: user.email,
                      };
                    });
    if (accounts.length > 0) {
      return res.status(200).json({
        status: 200,
        data: {accounts},
      });
    } else {
      return res.status(404).json({
        status: 404,
        error: 'no account has been created',
      });
    }
  }

  static getAccount(req, res) {
    const { accountNumber } = req.params;
    try {
      const foundAccount = findByAccountNumber(accountData, Number(accountNumber));
    
        if (foundAccount) {
         
          const { owner, ...data } = foundAccount;
    
          const user = findUserByID(userData,owner);
    
          const userAccount = {
                ...data,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
              };
          return res.status(200).json({
            status: 200,
            data: userAccount,
          }); 
        }
        return res.status(404).json({
          status: 404,
          error: 'account number doesn\'t exist',
        }); 
    }
    catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

  static changeStatus(req, res) {
    try {
      const { accountNumber } = req.params;
      const { errors, isValid } = validateUpdateStatus(req.body);

      // check if user inputs are valid
      if (!isValid) {
        return res.status(422).json({
          status: 422,
          errors,
        });
      }

      const {status} = req.body;
      const foundAccount = findByAccountNumber(accountData, Number(accountNumber));
      if (foundAccount) {
        foundAccount.status = status;
        // accountData.push(foundAccount);
        const filePath = 'server/data/accounts.json';
        updateData(filePath, accountData);
        return res.status(200).json({
        status: 200,
        data:{
          accountNumber: foundAccount.accountNumber,
          status : status
        }
      }); 
      }
      return res.status(404).json({
        status: 404,
        error: 'account number doesn\'t exist',
      }); 
    }
    catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }

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
        message:"Account successfully deleted"
      }); 
      }
      return res.status(404).json({
        status: 404,
        error: 'account number doesn\'t exist',
      }); 
    }
    catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }
}

export default accountController;


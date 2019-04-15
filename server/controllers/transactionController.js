import accountData from '../data/accounts';
import transactionData from '../data/transactions';
import helper from '../helper/helper';
import validateCashierInput from '../validation/cashierInput';

const {
  findByAccountNumber,
  updateData,
  generateId,
  saveDataToFile,
} = helper;


class transactionController {
 //debit user account
  static debitUserAccount(req, res) {
    try {
      const { id } = req.user;
      const { accountNumber } = req.params;
      // check if user pass valid and required data
      const { errors, isValid } = validateCashierInput(req.body);
      // check if user inputs are valid
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors,
        });
      }
      const { amount } = req.body;
      const foundAccount = findByAccountNumber(accountData, Number(accountNumber));
      if (foundAccount) {
        if (foundAccount.balance > amount) {
          const newBalance = foundAccount.balance - amount;
          foundAccount.balance = newBalance;
          const filePath = 'server/data/accounts.json';
          // update balance in account data
          updateData(filePath, accountData);
          const transactionfilepath = 'server/data/transactions.json';
          const value = {
            id: generateId(transactionData, 0),
            createdOn: new Date().toUTCString(),
            type: 'debit',
            accountNumber,
            cashier: id,
            amount,
            oldBalance: foundAccount.balance,
            newBalance,
          };
          //save transaction into transaction data
          const newAccount = saveDataToFile(transactionfilepath, transactionData, value);
          return res.status(200).json({
            status: 200,
            data: {
              transactionId: newAccount.id,
              accountNumber: newAccount.accountNumber,
              amount: newAccount.amount,
              cashier: newAccount.cashier,
              transactionType: newAccount.type,
              accountBalance: newAccount.newBalance,
            },
          });
        }
        return res.status(400).json({
          status: 400,
          error: 'account balance is not sufficient',
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'account number doesn\'t exist',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }
  
  // Credit a user account
  static creditUserAccount(req, res) {
    try {
      const { id } = req.user;
      const { accountNumber } = req.params;
      // check if user pass valid and required data
      const { errors, isValid } = validateCashierInput(req.body);
      // check if user inputs are valid
      if (!isValid) {
        return res.status(400).json({
          status: 400,
          errors,
        });
      }
      const { amount } = req.body;
      const foundAccount = findByAccountNumber(accountData, Number(accountNumber));
      if (foundAccount) {
        const newBalance = foundAccount.balance + amount;
        foundAccount.balance = newBalance;
        const accountfilePath = 'server/data/accounts.json';
        //update balance in account data
        updateData(accountfilePath, accountData);
        const transactionfilepath = 'server/data/transactions.json';
        const value = {
          id: generateId(transactionData, 0),
          createdOn: new Date().toUTCString(),
          type: 'credit',
          accountNumber,
          cashier: id,
          amount,
          oldBalance: foundAccount.balance,
          newBalance,
        };
        //save data to transation data
        const newAccount = saveDataToFile(transactionfilepath, transactionData, value);
        return res.status(200).json({
          status: 200,
          data: {
            transactionId: newAccount.id,
            accountNumber: newAccount.accountNumber,
            amount: newAccount.amount,
            cashier: newAccount.cashier,
            transactionType: newAccount.type,
            accountBalance: newAccount.newBalance,
          },
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'account number doesn\'t exist',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
      });
    }
  }
}
export default transactionController;

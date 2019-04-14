import accountData from '../data/accounts';
import helper from '../helper/helper';
import validateCashierInput from '../validation/cashierInput';

const {
    findByAccountNumber,
    updateData,
    generateId,
  } = helper;
  

class transactionController {


    static debitUserAccount(req, res) {
        try {
            const { id } = req.user;
            const { accountNumber } = req.params;

            // check if user pass valid and required data
            const { errors, isValid } = validateCashierInput(req.body);

            // check if user inputs are valid
            if (!isValid) {
                return res.status(422).json({
                status: 422,
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
                    updateData(filePath, accountData);
                    return res.status(200).json({
                    status: 200,
                    data:{
                      transactionId: generateId(accountData, 0),
                      accountNumber: foundAccount.accountNumber,
                      amount,
                      cashier: id,
                      transactionType: 'debit',
                      accountBalance: newBalance.toFixed(2),
                    }
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
          } 
          
          catch (error) {
            return res.status(500).json({
                status: 500,
                error: 'Sorry, something went wrong, try again',
              });
          }  
    }


}
export default transactionController;
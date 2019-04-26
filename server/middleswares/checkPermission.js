import DB from '../db/index';
import helper from '../helper/helper';

const {selectFromDb} = helper;


class checkPermissions {
  // check and give reqired permmision to diffent users
  static async permissionMiddleWareDb(req, res, next) {
    const { id } = req.user;
    const { accountNumber, transactionId, email } = req.params;
    const user = await selectFromDb('*','users','id',id)
    const { type, isAdmin } = user[0];
    const route = req.route.path;
    const method = req.method.toLowerCase();
    if ((route === '/accounts') && method === 'get' && type !== 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'only a staff has the permission to get all bank accounts',
      });
    }
    // check if it is my account
    if ((route === '/user/:email/accounts') && method === 'get' && type !== 'staff') {
      const rows = await selectFromDb('id','users','email',email)
      if (rows.length !== 0) {
        // check if user wants to access his own or another client account
        if (rows[0].id !== Number(id)) {
          return res.status(401).json({
            status: 401,
            error: 'only a staff has the permission to get other user\'s account',
          });
        }
      }
    }

    if ((route === '/accounts/:accountNumber/transactions') && method === 'get' && type !== 'staff') {
      const rows = await selectFromDb('owner','accounts','"accountNumber"',accountNumber)
      if (rows.length !== 0) {
        // check if user wants to access his own or another client account
        if (rows[0].owner !== Number(id)) {
          return res.status(401).json({
            status: 401,
            error: 'only a staff has the permission to get other users transaction details',
          });
        }
      }
    }

    // check if it is my account
    if ((route === '/transactions/:transactionId') && method === 'get' && type !== 'staff') {
      const foundTransactionQueryString = `select accounts.owner from accounts LEFT JOIN transactions
       ON accounts."accountNumber" = transactions."accountNumber" WHERE  transactions.id= $1`;
      const { rows } = await DB.query(foundTransactionQueryString, [transactionId]);
      if (rows.length !== 0) {
        // check if user wants to access his own or another client account
        if (rows[0].owner !== Number(id)) {
          return res.status(401).json({
            status: 401,
            error: 'only a staff has the permission to get other users transaction details',
          });
        }
      }
    }

    if ((route === '/accounts/:accountNumber') && method === 'get' && type !== 'staff') {
      const rows = await selectFromDb('owner','accounts','"accountNumber"',accountNumber)
      if (rows.length !== 0) {
        // check if user wants to access his own or another client account
        if (rows[0].owner !== Number(id)) {
          return res.status(401).json({
            status: 401,
            error: 'only a staff has the permission to get other user\'s account',
          });
        }
      }
    }

    if (route === '/accounts/:accountNumber' && method === 'patch' && type !== 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'only a admin has the permission to change account status',
      });
    }

    if (route === '/accounts/:accountNumber' && method === 'delete' && type !== 'staff') {
      return res.status(401).json({
        status: 401,
        error: 'only a staffs can delete an account',
      });
    }
    if (route === '/transactions/:accountNumber/credit' && method === 'post' && (type !== 'staff' || isAdmin)) {
      return res.status(401).json({
        status: 401,
        error: 'only cashier can credit account',
      });
    }

    if (route === '/transactions/:accountNumber/debit' && method === 'post' && (type !== 'staff' || isAdmin)) {
      return res.status(401).json({
        status: 401,
        error: 'only cashier can debit account',
      });
    }

    if (route === '/transactions/:accountNumber/credit' && method === 'post' && (type !== 'staff' || isAdmin)) {
      return res.status(401).json({
        status: 401,
        error: 'only cashier can credit account',
      });
    }

    if (route === '/user' && method === 'post' && (type !== 'staff' || !isAdmin)) {
      return res.status(401).json({
        status: 401,
        error: 'only admin can create staff or admin account',
      });
    }
    // fire next middleware
    return next();
  }
}

// expose checkPermissions
export default checkPermissions;

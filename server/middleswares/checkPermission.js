import DB from '../db/index';


class checkPermissions {
  //check and give reqired permmision to diffent users
  static async permissionMiddleWareDb(req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized!, you have to signin',
      });
    }
    const { id } = req.user;
    const { accountNumber } = req.params;
    const queryString = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await DB.query(queryString, [id]);
    const { type, isadmin } = rows[0];
    const route = req.route.path;
    const method = req.method.toLowerCase();
    if ((route === '/accounts') && method === 'get' && type !== 'staff') {
      return res.status(403).json({
        status: 403,
        error: 'only a staff has the permission to get all bank accounts',
      });
    }
    if ((route === '/accounts/:accountNumber') && method === 'get' && type !== 'staff') {
      const foundAccountQueryString = 'SELECT * FROM accounts WHERE accountnumber = $1';
      const foundAccount= await DB.query(foundAccountQueryString, [accountNumber]);
      if (foundAccount.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'account number doesn\'t exist',
        });
      }
      //check if user wants to access his own or another client account
      if (foundAccount.rows[0].owner !== Number(id)) {
        return res.status(403).json({
          status: 403,
          error: 'only a staff has the permission to get other user\'s account',
        });
      }
    }

    if (route === '/accounts/:accountNumber' && method === 'patch' && type !== 'staff') {
      return res.status(403).json({
        status: 403,
        error: 'only a admin has the permission to change account status',
      });
    }

    if (route === '/accounts/:accountNumber' && method === 'delete' && type !== 'staff') {
      return res.status(403).json({
        status: 403,
        error: 'only a staffs can delete an account',
      });
    }
    if (route === '/transactions/:accountNumber/credit' && method === 'post' && (type !== 'staff' || isadmin)) {
      return res.status(403).json({
        status: 403,
        error: 'only cashier can credit account',
      });
    }

    if (route === '/transactions/:accountNumber/debit' && method === 'post' && (type !== 'staff' || isadmin)) {
      return res.status(403).json({
        status: 403,
        error: 'only cashier can debit account',
      });
    }

    if (route === '/transactions/:accountNumber/credit' && method === 'post' && (type !== 'staff' || isadmin)) {
      return res.status(403).json({
        status: 403,
        error: 'only cashier can credit account',
      });
    }
    // fire next middleware
    return next();
  }
}

// expose checkPermissions
export default checkPermissions;

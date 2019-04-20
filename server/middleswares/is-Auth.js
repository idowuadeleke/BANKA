import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import DB from '../db/index';

dotenv.config();

class Auth {
  /**
   *create a token
   * @param {*} email
   * @param {*} id
   * @param {*} isAdmin
   */
  static createToken(email, id) {
    const token = jwt.sign(
      {
        email,
        id,
      },
      process.env.SECRET,
      { expiresIn: '24h' },
    );
    return token;
  }

  static async verifyTokendb(req, res, next) {
    const { token } = req.headers;

    // check if token was provided
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'Unauthorized!, you have to signin',
      });
    }

    try {
      // verify user provided token against existing token
      const decoded = jwt.verify(token, process.env.SECRET);

      const queryString = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await DB.query(queryString, [decoded.id]);

      // check for valid app users
      if (!rows[0]) {
        return res.status(401).json({
          status: 401,
          error: 'The token you provided is invalid',
        });
      }

      // get user id, email and isAdmin
      req.user = decoded;

      // fire next middleware
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        errors: [error],
      });
    }
  }
}

// expose auth
export default Auth;

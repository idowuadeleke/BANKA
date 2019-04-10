import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import helper from '../helper/helper';
import userData from '../data/users';
// import DB from '../db/index';

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

  /**
   *verify token provided by user
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static verifyToken(req, res, next) {
    const { token } = req.headers;

    // check if token was provided
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'Unauthorized!, you have to login',
      });
    }

    try {
      // verify user provided token against existing token
      const decoded = jwt.verify(token, process.env.SECRET);

      // check if user already exists
      const userExists = helper.findUserByEmail(userData, decoded.email);
      // check for valid user
      if (!userExists) {
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

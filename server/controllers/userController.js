import bcrypt from 'bcryptjs';
import Auth from '../middleswares/is-Auth';
import DB from '../db/index';

const { genSaltSync, hashSync, compareSync } = bcrypt;

const { createToken } = Auth;

class UserController {
  /**
   *sign up (postgresql)
   * @param {*} req
   * @param {*} res
   */

  static async createAccountDb(req, res) {
    // check if user pass valid and required data
    const { body } = req;
    const salt = genSaltSync(10);
    const hash = hashSync(body.password, salt);
    const values = [body.firstname, body.lastname, body.email, body.type, hash, body.isAdmin];

    try {
      const queryString = 'INSERT INTO users(firstname, lastname, email, type, password, isAdmin) VALUES($1, $2, $3, $4, $5,$6) returning *';
      const { rows } = await DB.query(queryString, values);

      // create token
      const token = createToken(rows[0].email, rows[0].id);

      const { isAdmin, password, ...data } = rows[0];

      return res.status(201).json({
        status: 201,
        data: {
          token,
          ...data,
        },
      });
    } catch (error) {
      // check if user exist
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 409,
          error: 'User already exist',
        });
      }
      return res.status(400).json({
        status: 400,
        errors: error,
      });
    }
  }

  /**
   * db signin controller
   * @param {*} req
   * @param {*} res
   */
  static async signinDb(req, res) {
    const { email, password } = req.body;
    const queryString = 'SELECT * FROM users WHERE email = $1';
    try {
      // Select all user record where email is equal db email
      const { rows } = await DB.query(queryString, [email]);

      // check if user exist in database
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'User does not exist',
        });
      }

      // check if user provided password matches user's hashed password in database
      if (!compareSync(password, rows[0].password)) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid Email/Password',
        });
      }

      // generate token
      const token = createToken(rows[0].email, rows[0].id);

      // return success message
      return res.status(200).json({
        status: 200,
        data: {
          token,
          firstname: rows[0].firstname,
          lastname: rows[0].lastname,
          email: rows[0].email,
          type: rows[0].type,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong, try again',
      });
    }
  }

  static async resetPassword(req, res) {
    // check if user pass valid and required data
    const { id } = req.user;
    const { body } = req;
    const salt = genSaltSync(10);
    const hash = hashSync(body.password, salt);
    const values = [hash, id];

    try {
      const queryString = 'UPDATE users SET password = $1 WHERE id = $2';
      await DB.query(queryString, values);

      return res.status(200).json({
        status: 200,
        data: {
          newPassword: body.password,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        errors: error,
      });
    }
  }
}

export default UserController;

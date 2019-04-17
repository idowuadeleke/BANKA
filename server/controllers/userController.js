import bcrypt from 'bcryptjs';
import validateSignUpInput from '../validation/signup';
import userData from '../data/users';
import helper from '../helper/helper';
import validateLoginInput from '../validation/login';
import Auth from '../middleswares/is-Auth';
import DB from '../db/index';

const { genSaltSync, hashSync, compareSync } = bcrypt;
const { saveDataToFile, generateId, findUserByEmail } = helper;

const { createToken } = Auth;

class UserController {
  /**
   *sign up (postgresql)
   * @param {*} req
   * @param {*} res
   */

  static async createAccountDb(req, res) {
    // check if user pass valid and required data
    const { errors, isValid } = validateSignUpInput(req.body);
    // check if user inputs are valid
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }

    const { body } = req;
    const salt = genSaltSync(10);
    const hash = hashSync(body.password, salt);
    const values = [body.firstname, body.lastname, body.email, body.type, hash, body.isAdmin];

    try {
      const queryString = 'INSERT INTO users(firstname, lastname, email, type, password, isAdmin) VALUES($1, $2, $3, $4, $5,$6) returning *';
      const { rows } = await DB.query(queryString, values);

      // create token
      const token = createToken(rows[0].email, rows[0].id);

      const {isAdmin, password, ...data} = rows[0];

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
   * login a user
   * @param {*} req
   * @param {*} res
   */
  static login(req, res) {
    // check if user pass valid and required data
    const { errors, isValid } = validateLoginInput(req.body);
    const { email, password } = req.body;
    // check if user inputs are valid
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
    // find user by email
    const UserExists = findUserByEmail(userData, email);
    // check if user exists in our data structure
    if (!UserExists) {
      return res.status(404).json({
        status: 404,
        error: 'User does not exist',
      });
    }
    // check if user provided password matches user's hashed password in data structure
    if (!compareSync(password, UserExists.password)) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid Email/Password',
      });
    }
    // create token
    const token = createToken(UserExists.email, UserExists.id);
    return res.status(200).json({
      status: 200,
      data: {
        token,
        id: UserExists.id,
        firstname: UserExists.firstname,
        lastname: UserExists.lastname,
        email: UserExists.email,
        type: UserExists.type,
      },
    });
  }
}

export default UserController;

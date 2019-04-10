import bcrypt from 'bcryptjs';
import validateSignUpInput from '../validation/signup';
import userData from '../data/users';
// import contactData from '../data/contacts';
import helper from '../helper/helper';
import validateLoginInput from '../validation/login';
import Auth from '../middleswares/is-Auth';
// import DB from '../db/index';

const { genSaltSync, hashSync, compareSync } = bcrypt;
const { saveDataToFile, generateId, findUserByEmail } = helper;

const { createToken } = Auth;

class UserController {
  /**
   * Create a user account
   *
   * @param {*} req
   * @param {*} res
   */

  static createAccount(req, res) {
    // check if user pass valid and required data
    const { errors, isValid } = validateSignUpInput(req.body);

    // check if user inputs are valid
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }

    try {
      // check if user already exists
      const emailExists = findUserByEmail(userData, req.body.email);

      if (emailExists) {
        return res.status(409).json({
          status: 409,
          error: 'user already exists',
        });
      }

      const { body } = req;

      const salt = genSaltSync(10);
      const hash = hashSync(body.password, salt);

      const values = {
        id: generateId(userData, 0),
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        type: 'client',
        password: hash,
        isAdmin: false,
      };
      
      const filePath = 'server/data/users.json';
      const savedData = saveDataToFile(filePath, userData, values);

      // create token
      const token = createToken(values.email, values.id);
     
      return res.status(201).json({
        status: 201,
        data: {
          username: savedData.lastname,
          token: token,
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: 'Sorry, something went wrong, try again',
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
      },
    });
  }   

}

export default UserController;
import bcrypt from 'bcryptjs';
import validateSignUpInput from '../validation/signup';
import userData from '../data/users';
// import contactData from '../data/contacts';
import helper from '../helper/helper';
// import validateLoginInput from '../validation/login';
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
        number: body.number,
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

}

export default UserController;

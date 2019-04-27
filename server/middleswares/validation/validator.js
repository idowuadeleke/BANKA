import validator from 'validator';
import isEmpty from './is_empty';
import { stringify } from 'querystring';

class validateInput {
  static async validateParam(req, res, next) {
    const errors = {};
    let { accountNumber } = req.params;

    // accountNumber = !isEmpty(accountNumber) ? accountNumber : '';
    //convert to boolean for chai test scenerio
    if (accountNumber === "true"){
      accountNumber = true
    }
   
    if ((typeof(accountNumber) === "boolean")) {
      errors.type = 'account number must be an integer';
    } else if (Number.isNaN(Number(accountNumber))){
      errors.type = 'account number must be an integer';
    }

    if (!isEmpty(errors)) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
    // fire next middleware
    return next();
  }

  static async validateTransParam(req, res, next) {
    const errors = {};
    let { transactionId } = req.params;

    // transactionId = !isEmpty(transactionId) ? transactionId : '';

   if (typeof(transactionId) === "boolean" || Number.isNaN(Number(transactionId))) {
      errors.type = 'transaction id must be an integer';
    }

    if (!isEmpty(errors)) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
    // fire next middleware
    return next();
  }

  static async validateSignUpInput(req, res, next) {
    const errors = {};
    let {
      email, firstname, lastname, password, type, isAdmin,
    } = req.body;
   
    email = !isEmpty(email) ? email : '';
    firstname = !isEmpty(firstname) ? firstname : '';
    lastname = !isEmpty(lastname) ? lastname : '';
    password = !isEmpty(password) ? password : '';
    type = !isEmpty(type) ? type : '';
    isAdmin = !isEmpty(isAdmin) ? isAdmin : '';

    if ((type === 'client') && (isAdmin === true)) {
      errors.clientAdmin = 'Client cannot be admin';
    }

    if (typeof(firstname)!== "string"){
      errors.firstname = 'Firstname field must be a string'
    }else if (validator.isEmpty(firstname)) {
      errors.firstname = 'First Name field is required';
    }else if (!/^[a-zA-Z ]+$/.test(firstname)) {
      errors.firstname = 'First Name field cannot contain numbers and symbols';
    } else if (!validator.isLength(firstname, { min: 2, max: 30 })) {
      errors.firstname = 'First Name must be between 2 and 30 characters';
    }

    if (typeof(lastname)!== "string"){
      errors.lastname = 'Lastname field must be a string';
    }else if (validator.isEmpty(lastname)) {
      errors.lastname = 'Last Name field is required';
    }else if (!/^[a-zA-Z ]+$/.test(lastname)) {
      errors.firstname = 'Last Name field cannot contain numbers and symbols';
    } else if (!validator.isLength(lastname, { min: 2, max: 30 })) {
      errors.lastname = 'Last Name must be between 2 and 30 characters';
    }

    if (typeof(email)!== "string"){
      errors.email = 'Email is invalid';}
    else if (validator.isEmpty(email)) {
      errors.email = 'Email field is required';
    } else if (!validator.isEmail(email)) {
      errors.email = 'Email is invalid';
    }

    if (typeof(password)!== "string"){
      errors.password = 'password field must be a string';
    }else if (validator.isEmpty(password)) {
      errors.password = 'Password field is required';
    } else if (!validator.isLength(password, { min: 6, max: 30 })) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (typeof(type)!== "string"){
      errors.type = 'type field must be a string';
    } else if (validator.isEmpty(type)) {
      errors.type = 'Type field is required';
    } else if (!(['client', 'staff'].includes(type.toLowerCase()))) {
      errors.type = 'Type must either be client or staff';
    }

    if (typeof(isAdmin)!== "boolean" || validator.isEmpty(isAdmin.toString())){
      errors.isAdmin = 'isAdmin field must be a boolean value and is required';
    }
    if (!isEmpty(errors)) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
    // fire next middleware
    return next();
  }

  static async validatesignInInput(req, res, next) {
    const errors = {};
    let { email, password } = req.body;

    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';

    if (typeof(email)!== "string"){
      errors.email = 'Email is invalid';}
    else if (validator.isEmpty(email)) {
      errors.email = 'Email field is required';
    } else if (!validator.isEmail(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (typeof(password)!== "string"){
      errors.password = 'password field must be a string';
    }else if (validator.isEmpty(password)) {
      errors.password = 'Password field is required';
    }
    if (!isEmpty(errors)) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
    // fire next middleware
    return next();
  }

  static async validateAccountInput(req, res, next) {
    const errors = {};
    let { balance, type } = req.body;

    type = !isEmpty(type) ? type : '';
    balance = !isEmpty(balance) ? balance : '';

    if (typeof(type)!== "string"){
      errors.type = 'type field must be a string';
    } else if (validator.isEmpty(type)) {
      errors.type = 'Type field is required';
    } else if (!(['savings', 'current'].includes(type.toLowerCase()))) {
      errors.type = 'Type must be one of [savings, current]';
    }
    if (validator.isEmpty(balance.toString())) {
      errors.balance = 'balance field is required';
    } else if (typeof(balance)!== "number" || Number.isNaN(Number(balance))) {
      errors.balance = 'balance field is must be a number';
    }

    if (!isEmpty(errors)) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
    // fire next middleware
    return next();
  }

  static async validateCashierInput(req, res, next) {
    const errors = {};
    let { amount } = req.body;

    amount = !isEmpty(amount) ? amount : '';

    if (typeof(amount)!== "number" ||Number.isNaN(Number(amount))) {
      errors.amount = 'amount field is must be a number';
    }
    //  else if (validator.isEmpty(amount.toString())) {
    //   errors.amount = 'amount field is required';
    // }
    if (!isEmpty(errors)) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
    // fire next middleware
    return next();
  }

  static async validateUpdateStatus(req, res, next) {
    const errors = {};
    let { status } = req.body;

    status = !isEmpty(status) ? status : '';
    
    if (typeof(status)!== "string"){
      errors.updatestatus = 'status field must be a string';
    } else if (validator.isEmpty(status)) {
      errors.updatestatus = 'Status field is required';
    } else if (!(['active', 'dormant'].includes(status.toLowerCase()))) {
      errors.updatestatus = 'status must be one of [dormant, active]';
    }
    if (!isEmpty(errors)) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
    // fire next middleware
    return next();
  }

  static async validateAccountStatusInput(req, res, next) {
    const errors = {};
    let { status } = req.query;

    status = !isEmpty(status) ? status : '';
   
   
    if (req.query.status !== undefined) { 
      if (validator.isEmpty(status)) {
        errors.status = 'status query field cannot be empty';
      } else if (!(['active', 'dormant'].includes(status.toLowerCase()))) {
        errors.status = 'status must be one of [dormant, active]';
      }
    }
    if (!isEmpty(errors)) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
    // fire next middleware
    return next();
  }

  static async validateEmail(req, res, next) {
    let { email } = req.params;

    // email = !isEmpty(email) ? email : '';
    
   if ((typeof(email)!== "string")||(!validator.isEmail(email))) {
      return res.status(400).json({
        status: 400,
        error: 'enter a valid email address',
      });
    }
    // fire next middleware
    return next();
  }

  static async validateResetPassword(req, res, next) {
    const errors = {};
    let {
      password, confirmPassword,
    } = req.body;

    password = !isEmpty(password) ? password : '';
    confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : '';
 
    if (typeof(password)!== "string"){
      errors.password = 'password field must be a string';
    }else if (validator.isEmpty(password)) {
      errors.password = 'Password field is required';
    } else if (!validator.isLength(password, { min: 6, max: 30 })) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (typeof(confirmPassword)!== "string"){
      errors.confirmPassword = 'confirm password field must be a string';
    }else if (validator.isEmpty(confirmPassword)) {
      errors.confirmPassword = 'Confirm Password field is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'password and confirm password must be the same';
    }

    if (!isEmpty(errors)) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }
    // fire next middleware
    return next();
  }
}

// expose checkPermissions
export default validateInput;

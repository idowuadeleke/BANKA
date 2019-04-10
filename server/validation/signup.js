import validator from 'validator';
import isEmpty from './is_empty';


const validateSignUpInput = (data) => {
  const errors = {};
  const body = data;

  body.email = !isEmpty(body.email) ? body.email : '';
  body.firstname = !isEmpty(body.firstname) ? body.firstname : '';
  body.lastname = !isEmpty(body.lastname) ? body.lastname : '';
  //   body.number = !isEmpty(body.number) ? body.number : '';
  body.password = !isEmpty(body.password) ? body.password : '';
  // body.type = !isEmpty(body.type) ? body.type : '';
  //   body.isAdmin = !isEmpty(body.type) ? body.type : '';


  if (!validator.isLength(body.firstname, { min: 2, max: 30 })) {
    errors.firstname = 'First Name must be between 2 and 30 characters';
  }

  if (!validator.isLength(body.lastname, { min: 2, max: 30 })) {
    errors.lastname = 'Last Name must be between 2 and 30 characters';
  }

  if (validator.isEmpty(body.firstname)) {
    errors.firstname = 'First Name field is required';
  }

  if (validator.isEmpty(body.lastname)) {
    errors.lastname = 'Last Name field is required';
  }

  if (!/^[a-zA-Z ]+$/.test(body.firstname)) {
    errors.firstname = 'First Name field cannot contain numbers and symbols';
  }

  if (!/^[a-zA-Z ]+$/.test(body.lastname)) {
    errors.firstname = 'Last Name field cannot contain numbers and symbols';
  }

  // if (validator.isEmpty(body.number)) {
  //   errors.type = 'Phone Number field is required';
  // }

  if (validator.isEmpty(body.email)) {
    errors.email = 'Email field is required';
  }

  if (!validator.isEmail(body.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(body.password)) {
    errors.password = 'Password field is required';
  }

  if (!validator.isLength(body.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSignUpInput;

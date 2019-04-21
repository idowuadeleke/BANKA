import validator from 'validator';
import isEmpty from './is_empty';

// validate signup input
const validateSignUpInput = (data) => {
  const errors = {};
  const body = data;

  body.email = !isEmpty(body.email) ? body.email : '';
  body.firstname = !isEmpty(body.firstname) ? body.firstname : '';
  body.lastname = !isEmpty(body.lastname) ? body.lastname : '';
  body.password = !isEmpty(body.password) ? body.password : '';
  body.type = !isEmpty(body.type) ? body.type : '';
  body.isAdmin = !isEmpty(body.isAdmin) ? body.isAdmin : '';

  if ((body.type === 'client') && (body.isAdmin === true)) {
    errors.clientAdmin = 'Client cannot be admin';
  }

  if (validator.isEmpty(body.firstname)) {
    errors.firstname = 'First Name field is required';
  } else if (!/^[a-zA-Z ]+$/.test(body.firstname)) {
    errors.firstname = 'First Name field cannot contain numbers and symbols';
  } else if (!validator.isLength(body.firstname, { min: 2, max: 30 })) {
    errors.firstname = 'First Name must be between 2 and 30 characters';
  }

  if (validator.isEmpty(body.lastname)) {
    errors.lastname = 'Last Name field is required';
  } else if (!/^[a-zA-Z ]+$/.test(body.lastname)) {
    errors.firstname = 'Last Name field cannot contain numbers and symbols';
  } else if (!validator.isLength(body.lastname, { min: 2, max: 30 })) {
    errors.lastname = 'Last Name must be between 2 and 30 characters';
  }

  if (validator.isEmpty(body.email)) {
    errors.email = 'Email field is required';
  } else if (!validator.isEmail(body.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(body.password)) {
    errors.password = 'Password field is required';
  } else if (!validator.isLength(body.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (validator.isEmpty(body.type)) {
    errors.type = 'Type field is required';
  } else if (!(['client', 'staff'].includes(body.type))) {
    errors.type = 'Type must either be client or staff';
  }


  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSignUpInput;

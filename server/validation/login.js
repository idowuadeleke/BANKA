import validator from 'validator';
import isEmpty from './is_empty';

const validateLoginInput = (data) => {
  const errors = {};
  const body = data;

  body.email = !isEmpty(body.email) ? body.email : '';
  body.password = !isEmpty(body.password) ? body.password : '';

  if (validator.isEmpty(body.email)) {
    errors.email = 'Email field is required';
  }

  if (!validator.isEmail(body.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(body.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLoginInput;

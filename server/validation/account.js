import validator from 'validator';
import isEmpty from './is_empty';

// validate input of user when creating new bank account
const validateAccountInput = (data) => {
  const errors = {};
  const body = data;

  body.type = !isEmpty(body.type) ? body.type : '';
  body.balance = !isEmpty(body.balance) ? body.balance : '';

  if (validator.isEmpty(body.type)) {
    errors.type = 'Type field is required';
  } else if (!(['savings', 'current'].includes(body.type.toLowerCase()))) {
    errors.type = 'Type must be one of [savings, current]';
  } else if (validator.isEmpty(body.balance.toString())) {
    errors.balance = 'balance field is required';
  } else if (Number.isNaN(Number(body.balance))) {
    errors.balance = 'balance field is must be a number';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAccountInput;

import validator from 'validator';
import isEmpty from './is_empty';

// validate cashier input when crediting or debiting an account
const validateCashierInput = (data) => {
  const errors = {};
  const body = data;

  body.amount = !isEmpty(body.amount) ? body.amount : '';

  if (Number.isNaN(Number(body.amount))) {
    errors.amount = 'amount field is must be a number';
  } else if (validator.isEmpty(body.amount.toString())) {
    errors.amount = 'amount field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateCashierInput;

// import validator from 'validator';
import isEmpty from './is_empty';

// validate cashier input when crediting or debiting an account
const validateCashierInput = (data) => {
  const errors = {};
  const body = data;

  body.amount = !isEmpty(body.amount) ? body.amount : '';

  if (!(typeof (body.amount) === 'number')) {
    errors.amount = 'amount field is required and must be a number';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateCashierInput;

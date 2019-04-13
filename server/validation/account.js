import validator from 'validator';
import isEmpty from './is_empty';

const validateAccountInput = (data) => {
  const errors = {};
  const body = data;

  body.type = !isEmpty(body.type) ? body.type : '';
  body.balance = !isEmpty(body.balance) ? body.balance : '';

  if (validator.isEmpty(body.type)) {
    errors.type = 'Type field is required';
  }
 else if(!(["savings", "current"].includes(body.type))) {
    errors.type = 'Type must be one of [savings, current]';
  }

 else if (validator.isEmpty(body.balance)) {
    errors.balance = 'Balance field is required';
  }
  else if(!(typeof(body.balance)=='number')) {
    errors.balance = 'Balance field must be a number';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAccountInput;


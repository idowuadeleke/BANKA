import validator from 'validator';
import isEmpty from './is_empty';

const validateCashierInput = (data) => {
  const errors = {};
  const body = data;

  body.amount = !isEmpty(body.amount) ? body.amount : '';

//   if (validator.isEmpty(body.amount)) {
//     errors.amount = 'amount field is required';
//   }
  
  if(!(typeof(body.amount)=='number') ){
    errors.amount = 'amount field must be a number';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateCashierInput;
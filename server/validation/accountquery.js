import validator from 'validator';
import isEmpty from './is_empty';

const validateAccountStatusInput = (data) => {
  const errors = {};
  const body = data;

  body.status = !isEmpty(body.status) ? body.status : '';

  if (validator.isEmpty(body.status)) {
    errors.status = 'status query field cannot be empty';
  } else if (!(['dormant', 'active'].includes(body.status))) {
    errors.status = 'status must be one of [dormant, active]';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAccountStatusInput;
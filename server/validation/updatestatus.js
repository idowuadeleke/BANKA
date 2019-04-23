import validator from 'validator';
import isEmpty from './is_empty';

const validateUpdateStatus = (data) => {
  const errors = {};
  const body = data;

  body.status = !isEmpty(body.status) ? body.status : '';

  if (validator.isEmpty(body.status)) {
    errors.updatestatus = 'Status field is required';
  } else if (!(['active', 'dormant'].includes(body.status.toLowerCase()))) {
    errors.updatestatus = 'status must be one of [dormant, active]';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateUpdateStatus;

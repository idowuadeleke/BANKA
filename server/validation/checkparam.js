import isEmpty from './is_empty';


const validateParam = (data, dataName) => {
  const errors = {};
  const body = data;

  body.accountNumber = !isEmpty(body.accountNumber) ? body.accountNumber : '';
  body.transactionId = !isEmpty(body.transactionId) ? body.transactionId : '';

  if (Number.isNaN(Number(body.accountNumber))) {
    errors.type = `${dataName} must be an integer`;
  } else if (Number.isNaN(Number(body.transactionId))) {
    errors.type = `${dataName} must be an integer`;
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateParam;

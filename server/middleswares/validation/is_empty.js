// check if value is empty
const isEmpty = val => val === undefined
  || val == null
  || val === ''
  || (typeof val === 'number' && val.toString().length === 0)
  || (typeof val === 'object' && Object.keys(val).length === 0)
  || (typeof val === 'string' && val.trim().length === 0);

export default isEmpty;

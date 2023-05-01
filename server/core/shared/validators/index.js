import { validationResult } from 'express-validator';
import constants from '../utils/constants';

// eslint-disable-next-line consistent-return
const APIValidator = (validations, type) => async (req, res, next) => {
  let validationValues = validations;
  if (type) {
    validationValues = validations(type, req);
  }
  await Promise.all(validationValues.map(validation => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(422).json({
    error_message: constants.errorMessage,
    error: errors.array(),
  });
};

export default APIValidator;

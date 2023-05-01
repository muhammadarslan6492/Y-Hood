/* eslint-disable consistent-return */
import { body } from 'express-validator';

/**
 * @name AuthValidation
 * @desc handle auth api payload validation
 * @param {string} method
 * @return {string} error[]
 */
const AuthValidation = method => {
  switch (method) {
    case 'verifyOTP': {
      return [
        body('userId').exists().notEmpty().withMessage('User Id is required'),
        body('phone').exists().notEmpty().withMessage('Phone is required'),
        body('code').exists().notEmpty().withMessage('Code is required'),
      ];
    }
    default:
      break;
  }
};

export default AuthValidation;

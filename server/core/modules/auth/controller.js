import logger, { init, responded } from '../../../config/logger';
import AuthService from './service';
import { extractError } from '../../shared/utils/error.handler';
import constants from '../../shared/utils/constants';

/**
 * @name userLogin
 * @desc handler for user social login request
 * @params {Object} req
 * @params {Obejct} res
 */
async function userLogin(req, res) {
  const { info, error } = logger('users/userLogin', (req.body || {}).provider);
  try {
    const { email, password } = req.body;
    info(init);
    const response = await AuthService.userLogin(email, password);
    res.json(response);
    info(responded);
  } catch (err) {
    error(err);
    res.status(err.status || 400).json({
      error_message: constants.errorMessage,
      error: extractError(err),
    });
  }
}

/**
 * @name userLogout
 * @desc handler for user social login request
 * @params {Object} req
 * @params {Obejct} res
 */
async function userLogout(req, res) {
  const { info, error } = logger('users/userLogout', (req.body || {}).provider);
  try {
    const { token } = req;
    const response = await AuthService.removeToken(token);
    res.json(response);
    info(responded);
  } catch (err) {
    error(err);
    res.status(err.status || 400).json({
      error_message: constants.errorMessage,
      error: extractError(err),
    });
  }
}

/**
 * @name registerUser
 * @desc register user and generate token
 * @params {Object} req
 * @params {Obejct} res
 */
async function registerUser(req, res) {
  const { info, error } = logger('users/registerUser', 'new');
  try {
    const { name, password, gender, dob, email } = req.body;
    await AuthService.userValidation({
      name,
      password,
      email,
    });
    info(init);
    const lowerCaseEmail = email.toLowerCase();
    const { response, id } = await AuthService.createUser({
      name,
      password,
      gender,
      dob,
      email: lowerCaseEmail,
    });
    info(`created: ${id}`);
    if (response) {
      res.json(response);
      info(responded);
      return;
    }
    res.json(response);
    info(responded);
  } catch (err) {
    error(err);
    res.status(err.status || 400).json({
      error_message: err.message || constants.errorMessage,
      error: extractError(err),
    });
  }
}

/**
 * @name sendOTP
 * @desc register user and generate token
 * @params {Object} req
 * @params {Obejct} res
 */
async function sendOTP(req, res) {
  const { info, error } = logger('users/sendOTP', 'new');

  try {
    const { phone } = req.body;
    info(init);
    await AuthService.sendOTP(phone, 'sms');
    res.send({
      success: true,
      message: 'OTP sent',
    });
    info(responded);
  } catch (err) {
    error(err);
    res.status(400).json({
      error_message: constants.errorMessage,
      error: 'OTP limit Exceeded',
    });
  }
}

/**
 * @name verifyOTP
 * @desc register user and generate token
 * @params {Object} req
 * @params {Obejct} res
 */
async function verifyOTP(req, res) {
  const { info, error } = logger('users/verifyOTP', 'new');

  try {
    const { userId, phone, code } = req.body;
    info(init);
    await AuthService.verifyOTP(userId, phone, code);

    res.send({
      success: true,
      message: 'OTP verified',
    });
    info(responded);
  } catch (err) {
    console.log('err.message', err.message);
    error(err);
    res.status(400).json({
      error_message: constants.errorMessage,
      error: 'Invalid OTP code',
    });
  }
}

export default {
  registerUser,
  userLogin,
  userLogout,
  sendOTP,
  verifyOTP,
};

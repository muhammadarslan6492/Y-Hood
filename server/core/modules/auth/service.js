import fetch from 'node-fetch';
import { auth } from 'google-auth-library';
import UserRepo from '../../repositories/user';
import models from '../../db/models';
import AuthenticationTokenRepo from '../../repositories/authenticationToken';
import {
  registerUserResponseNormalizer,
  successResponseNormalizer,
} from '../../shared/utils/responseNormalizer';
import authentication from '../../shared/middleware/authentication';
import utils from '../../shared/utils/index';

/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */

const facebookClientId = process.env.FACEBOOK_CLIENT_ID;
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET;
const fetchFbAccessToken = process.env.FACEBOOK_ACCESS_TOKEN_URL;
const fetchFbDebugToken = process.env.FACEBOOK_DEBUG_TOKEN_URL;
const fetchfbProfile = process.env.FACEBOOK_ME_URL;

const client = auth.fromAPIKey(process.env.GOOGLE_API_KEY);

/**
 * @name fetchUser
 * @desc fetch user on provided filter object
 * @params {object} filter
 * @params {object} options
 * @returns {Promise}
 */
async function fetchUser(filter, options = {}) {
  return UserRepo.fetchUser(filter, options);
}

/**
 * @name validation
 * @desc validate user data
 * @params {object} filter
 * @params {object} options
 * @returns {Promise}
 */
async function userValidation(user) {
  if (user.name === undefined || user.name === null) {
    throw new Error('name is required');
  } else if (user.password === undefined || user.password === null) {
    throw new Error('password is required');
  } else if (user.email === undefined || user.email === null) {
    throw new Error('email is required');
  }
}

/**
 * @name userLogin
 * @desc handle user login request
 * @params {string} accessToken
 * @params {string} provider
 * @returns {Promise}
 */
async function userLogin(email, password) {
  try {
    let user;
    const dbUser = await fetchUser({ email });
    if (!dbUser) {
      throw new Error('User not found');
    }
    const validPassword = models.user.validPassword(dbUser, password);
    if (!validPassword) {
      throw new Error('Password is incorrect');
    }
    const token = await generateTokenAndUpdateDB(dbUser);

    return registerUserResponseNormalizer(dbUser, 'Login successfully', token);
  } catch (error) {
    throw error;
  }
}

/**
 * @name createUser
 * @desc create user
 * @params {object} user
 * @returns {Promise}
 */

async function createUser(user) {
  return models.sequelize.transaction(async transaction => {
    const createdUser = await UserRepo.createUser({
      ...user,
    });
    const dbUser = await fetchUser({ id: createdUser.id }, { transaction });
    return {
      response: registerUserResponseNormalizer(dbUser, 'successfully registered', ''),
      id: createdUser.id,
    };
  });
}

async function generateTokenAndUpdateDB(dbUser, options = {}) {
  const { token, expireAt } = authentication.generateToken({
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    dob: dbUser.dob,
  });
  await AuthenticationTokenRepo.createAuthenticationToken(
    {
      userId: dbUser.id,
      value: token,
      expireAt,
    },
    options,
  );
  return token;
}

/**
 * @name fetchGoogleUser
 * @desc validate idToken and fetch user profile
 * @param {string} idToken
 */
async function fetchGoogleUser(idToken) {
  try {
    const response = await client.verifyIdToken({ idToken });

    const {
      aud: audience,
      name,
      email,
      given_name: firstName,
      family_name: lastName,
    } = response.getPayload();

    return {
      name,
      email,
      firstName,
      lastName,
    };
  } catch (error) {
    throw error;
  }
}

/**
 * @name fetchFacebookAppToken
 * @desc fetch app access token
 * @return {string} appToken
 */
async function fetchFacebookAppToken() {
  try {
    const {
      access_token: accessToken,
    } = await fetch(
      `${fetchFbAccessToken}?client_id=${facebookClientId}&client_secret=${facebookClientSecret}&grant_type=client_credentials`,
      { method: 'GET' },
    ).then(response => response.json());
    return accessToken;
  } catch (error) {
    throw error;
  }
}

/**
 * @name validateSocailAccessToken
 * @desc validate provided socail token generated from same app
 * @param {string} inputToken
 * @return {object} userId, appToken
 */
async function validateSocailAccessToken(inputToken) {
  try {
    const appToken = await fetchFacebookAppToken();
    const {
      data: { app_id: appId, is_valid: isValid, user_id: userId },
    } = await fetch(`${fetchFbDebugToken}?input_token=${inputToken}&access_token=${appToken}`, {
      method: 'GET',
    }).then(response => response.json());
    if (appId !== facebookClientId) {
      throw new Error('error while authenticating facebook user: audience mismatch');
    }
    if (!isValid) {
      throw new Error('Token is not valid');
    }
    return {
      userId,
      appToken,
    };
  } catch (error) {
    throw error;
  }
}

/**
 * @name fetchFacebookUser
 * @desc fetch facebook user details by userId and appToken
 * @params {string} accessToken
 * @returns {Object}
 */
async function fetchFacebookUser(accessToken) {
  try {
    const { userId, appToken } = await validateSocailAccessToken(accessToken);
    const { id, email, name, first_name: firstName, last_name: lastName } = await fetch(
      `${fetchfbProfile}?access_token=${accessToken}&fields=id,name,email,first_name,last_name`,
      {
        method: 'GET',
      },
    ).then(response => response.json());
    return {
      name,
      email,
      firstName,
      lastName,
    };
  } catch (error) {
    throw error;
  }
}

/**
 * @name removeToken
 * @desc remove token from authetication token and update token reference in users
 * @params {object} value
 * @returns {Promise}
 */
async function removeToken(value) {
  await AuthenticationTokenRepo.removeToken({ value });
  return successResponseNormalizer('Logout successfully', true);
}

/*
 * @name sendOTP
 * @desc send OTP on registered phone number
 * @params {string} number
 * @returns {Promise}
 */
async function sendOTP(phone, channel = 'sms') {
  try {
    const response = await utils.twilioSendOTP(phone, channel);
    return response;
  } catch (error) {
    let err = error;
    if ((error.response || {}).status === 429) {
      err = Error('OTP limit exceeded for this number. Retry after 24 hours.');
    }
    throw err;
  }
}

/**
 * @name verifyOTP
 * @desc send OTP on registered phone number
 * @params {string} number
 * @returns {Promise}
 */
async function verifyOTP(userId, phone, code) {
  try {
    const response = await utils.twilioVerifyOTP(phone, code);
    return models.sequelize.transaction(async transaction => {
      const updateUser = await UserRepo.updateUser({ id: userId }, { phone }, { transaction });
    });
  } catch (error) {
    let err = error;
    if ((error.response || {}).status === 429) {
      err = Error('OTP limit exceeded for this number. Retry after 24 hours.');
    }
    throw err;
  }
}

export default {
  createUser,
  userLogin,
  userValidation,
  fetchGoogleUser,
  fetchFacebookUser,
  removeToken,
  sendOTP,
  verifyOTP,
};

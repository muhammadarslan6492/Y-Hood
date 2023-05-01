import jwt from 'jsonwebtoken';
import utils from '../utils';
import constants from '../utils/constants';
import { extractError } from '../utils/error.handler';
import AuthenticationTokenRepo from '../../repositories/authenticationToken';
import UserRepo from '../../repositories/user';

const secertKey = process.env.SECERT_KEY;
/**
 * @name generateToken
 * @desc generate token by provided claims
 * @param {object} claims
 * @return string
 */
function generateToken(claims) {
  const expire = Date.now() + 86400000; // next 24 hours
  const token = jwt.sign(
    {
      id: claims.id,
      fullName: claims.name,
      email: utils.dataEncryption(claims.email),
      dob: claims.dob,
      expire,
    },
    secertKey,
  );
  return {
    token,
    expireAt: expire,
  };
}

/**
 * @name authenticateUser
 * @desc generate token by provided claims
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
async function authenticateUser(req, res, next) {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      error_message: constants.unauthorizedMessage,
      error: constants.unauthorizedMessage,
    });
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const tokenClaims = jwt.verify(token, secertKey);
    if (tokenClaims.expire <= Date.now()) {
      await AuthenticationTokenRepo.removeToken({ value: token });
      return res.status(401).json({
        error_message: constants.accessTokenExpireMessage,
        error: constants.accessTokenExpireMessage,
      });
    }
    // check if token exist and token userid and is same fetch user id is same
    const user = await UserRepo.fetchUser({ id: tokenClaims.id });
    if (!user) {
      return res.status(422).json({
        error_message: constants.userNotFoundMessage,
        error: constants.userNotFoundMessage,
      });
    }
    const authToken = await AuthenticationTokenRepo.fetchToken({
      value: token,
      userId: tokenClaims.id,
    });
    if (!authToken || (authToken && authToken.userId.toString() !== user.id.toString())) {
      return res.status(401).json({
        error_message: constants.invalidTokenMessage,
        error: constants.invalidTokenMessage,
      });
    }
    req.user = user;
    req.tokenClaims = tokenClaims;
    req.token = token;
    next();
    return '';
  } catch (error) {
    return res.status(401).json({
      error_message: constants.authenticationMessage,
      error: extractError(error),
    });
  }
}

export default {
  generateToken,
  authenticateUser,
};

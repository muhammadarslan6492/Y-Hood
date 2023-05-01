import CryptoJS from 'crypto-js';
import logger from '../../../config/logger';

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } = process.env;
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const secertKey = process.env.SECERT_KEY;
/**
 * @name dataEncryption
 * @desc encrypt data
 * @param {*} data
 */
function dataEncryption(data) {
  if (typeof data === 'object') {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secertKey).toString();
  }
  return CryptoJS.AES.encrypt(data, secertKey).toString();
}

function getValidPhoneNumber(phoneNumber) {
  if (phoneNumber.length < 10) {
    logger.log('Error is here');
  }
  return `+92${phoneNumber.substr(phoneNumber.length - 10)}`;
}
const isTestEnv = () => process.env.NODE_ENV === 'test';

/**
 * @name twilioSendOTP
 * @desc twilio SendOTP for phone number confirmation
 * @params {string} number
 * @returns {Promise}
 */
async function twilioSendOTP(phoneNumber, channel) {
  const verificationRequest = await twilio.verify
    .services(VERIFICATION_SID)
    .verifications.create({ to: phoneNumber, channel });
  return verificationRequest;
}

/**
 * @name twilioVerifyOTP
 * @desc twilio VerifyOTP for phone number confirmation
 * @params {string} number
 * @returns {Promise}
 */
async function twilioVerifyOTP(phoneNumber, code) {
  const verificationResult = await twilio.verify
    .services(VERIFICATION_SID)
    .verificationChecks.create({ to: phoneNumber, code });
  return verificationResult;
}

export default {
  isTestEnv,
  getValidPhoneNumber,
  dataEncryption,
  twilioSendOTP,
  twilioVerifyOTP,
};

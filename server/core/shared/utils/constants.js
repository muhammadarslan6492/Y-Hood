import { resolve } from 'path';

// twilio credentials
const twilio = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
};

// smtp send email cred
const auth = {
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
};

// push notification firebase cred
const firebase = {
  databaseURL: process.env.FIREBASE_DB_URL,
};

const ProviderType = Object.freeze({
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
});

const dialingCode = '+92';
const DoctorRole = 2;
const errorMessage = 'An error occurred';
const unauthorizedMessage = 'Unauthorized user.';
const accessTokenExpireMessage = 'Access token has been expired';
const invalidTokenMessage = 'Invalid token';
const userNotFoundMessage = 'User not found.';
const authenticationMessage = 'Error while authentication.';
const invalidPhoneNumberMessage = 'Invalid phone number';
const invalidPayloadMessage = 'Invalid payload. Payload must be in JSON format';
const citizenAccountDeactivateMessage = 'You are disabled by the admin';
const invalidRequestMessage = 'Invalid request';
const patientErrorMessage = 'Patient Id is not assigned to this doctor';
const patientNumberErrorMessage = 'Patient has not register phone number';
const otpNotVerified = 'User is not OTP verified';
const documentsNotVerified = 'User Documents are unverified';
const FileTypes = Object.freeze({
  pdf: 1,
  image: 2,
});
const FileNames = Object.freeze({
  CNICFRONT: 'cnic_front',
  CNICBACK: 'cnic_back',
  SELFIE: 'selfie',
  DEGREES: 'degrees',
  PMDCCERT: 'pmdc_cert',
});
const errorsMapping = {
  'jwt malformed': accessTokenExpireMessage,
};
const timeDifference = process.env.TIME_INTERVAL || 20; // in Minutes
const citizenBotGender = Object.freeze({
  0: 'F',
  1: 'M',
});

const captchaError = 'Invalid captcha verification, please try again.';
const recaptchaKey = process.env.RECAPTCHA_KEY || '6Ld7wOcUAAAAAIH-plOKkkTwcW15NSk5_mpADf7l';
const recaptchaSecret =
  process.env.RECAPTCHA_SECERT_KEY || '6Ld7wOcUAAAAAJtT4QqNvm3eICJvx1fmfaR8MCsJ';
const fileSystem = 's3storage';
const fileDirectory = process.env.FILE_DIRECTORY || resolve(process.cwd(), '..', 'files');
const eoceanIpAddress = process.env.EOCEAN_IP || '125.209.86.26';
const citizenBOtToken =
  process.env.INFOBIP_BOT_TOKEN ||
  'SWuY8/Q=LG{;m*CYx|^DL$|qs,ov66:~OFOEfWayI>y8+)eZ?qj9f,Eo<Q:W$!0';
const resendOtpTime = process.env.RESEND_OTP_TIME || 600000;
const eoceanIVRToken =
  process.env.EOCEAN_IVR_TOKEN || 'Ai!V8]L,gTDw?vPFB8*$WnZkU~?u(U^_f%`HQL,6z`%i$l(Er[28UWzziWe-lK%';
const allowNoResponseCount = process.env.ALLOW_NO_RESPONSE_COUNT || 2;
export default {
  ProviderType,
  errorMessage,
  errorsMapping,
  accessTokenExpireMessage,
  unauthorizedMessage,
  userNotFoundMessage,
  authenticationMessage,
  DoctorRole,
  FileTypes,
  FileNames,
  dialingCode,
  invalidPhoneNumberMessage,
  citizenAccountDeactivateMessage,
  timeDifference,
  invalidPayloadMessage,
  invalidTokenMessage,
  citizenBotGender,
  captchaError,
  recaptchaKey,
  recaptchaSecret,
  invalidRequestMessage,
  patientErrorMessage,
  patientNumberErrorMessage,
  fileSystem,
  fileDirectory,
  eoceanIpAddress,
  citizenBOtToken,
  otpNotVerified,
  documentsNotVerified,
  resendOtpTime,
  eoceanIVRToken,
  allowNoResponseCount,
  twilio,
  auth,
  firebase,
};

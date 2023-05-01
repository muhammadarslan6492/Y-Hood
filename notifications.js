import * as constants from './server/core/shared/utils/constants';

const config = {
  email: {
    smtp: {
      service: 'gmail',
      auth: {
        user: constants.auth.user,
        pass: constants.auth.pass,
      },
    },
  },
  sms: {
    twilio: {
      accountSid: constants.twilio.accountSid,
      authToken: constants.twilio.authToken,
    },
  },
  pushNotification: {
    firebase: {
      databaseURL: constants.firebase.databaseURL,
      credentialFilePath:
        './server/config/notifications/yallahood-dummy-firebase-adminsdk-k4vmc-1256de0aa5.json',
    },
  },
};
module.exports = config;

function registerUserResponseNormalizer(dbuser, message, token, otpUser = {}) {
  const response = {
    success: true,
    ...(message && { message }),
    ...(token && { token }),
    user: {
      id: dbuser.id || '',
      name: dbuser.name || '',
      email: dbuser.email || '',
      phone: dbuser.phone || '',
      otpverified: otpUser.otpVerified || false,
      dob: dbuser.dob || '',
      gender: dbuser.gender || '',
      otp_verified: dbuser.otp_verified || false,
      email_verified: dbuser.email_verified || false,
    },
  };
  return response;
}

function successResponseNormalizer(message, success, data = null) {
  return {
    message,
    success,
    ...(data && { data }),
  };
}
module.exports = {
  registerUserResponseNormalizer,
  successResponseNormalizer,
};

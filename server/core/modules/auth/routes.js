import AuthController from './controller';
import authentication from '../../shared/middleware/authentication';
import APIValidator from '../../shared/validators/index';
import AuthValidation from '../../shared/validators/authValidator';

const express = require('express');

const router = express.Router();
router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.userLogin);
router.get('/logout', authentication.authenticateUser, AuthController.userLogout);
router.post('/send-otp', AuthController.sendOTP);
router.post('/resend-otp', AuthController.sendOTP);
router.post('/verify-otp', APIValidator(AuthValidation('verifyOTP')), AuthController.verifyOTP);

module.exports = router;

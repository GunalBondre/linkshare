import express from 'express';
import authController from '../controllers/auth.js';

const router = express.Router();

router.route('/signin').post(authController.signin);
router.route('/register').post(authController.register);
router.route('/getUser').get(authController.checkUserInDb);
router.route('/sendEmail').post(authController.resetPasswordEmail);
router.route('/resetPassword').post(authController.resetPassword);
export default router;

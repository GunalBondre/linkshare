import express from 'express';
import paymentController from '../controllers/paymentController.js';

const router = express.Router();

router.route('/create-checkout-session').post(paymentController.makePayment);
router.route('/webhook').post(paymentController.manageWebhook);
export default router;

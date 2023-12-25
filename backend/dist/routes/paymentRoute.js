import express from 'express';
import paymentController from '../controllers/paymentController.js';
const router = express.Router();
router.route('/create-checkout-session').post(paymentController.makePayment);
router.route('/webhook').post(paymentController.manageWebhook);
router.route('/create-portal-session').post(paymentController.createPortal);
export default router;
//# sourceMappingURL=paymentRoute.js.map
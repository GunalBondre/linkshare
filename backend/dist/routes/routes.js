import express from 'express';
const router = express.Router();
const authController = require('../controllers/auth.js');
router.route('/signin').post(authController.signin);
router.route('/register').post(authController.register);
module.exports = router;
//# sourceMappingURL=routes.js.map
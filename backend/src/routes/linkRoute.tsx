import express from 'express';
import linkController from '../controllers/linkController.js';

const router = express.Router();

router.route('/add').post(linkController.addLink);

export default router;

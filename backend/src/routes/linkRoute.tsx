import express from 'express';
import linkController from '../controllers/linkController.js';

const router = express.Router();

router.route('/add').post(linkController.addLink);
router
	.route('/links/:id')
	.get(linkController.getAllLinks)
	.delete(linkController.deleteLink);

export default router;

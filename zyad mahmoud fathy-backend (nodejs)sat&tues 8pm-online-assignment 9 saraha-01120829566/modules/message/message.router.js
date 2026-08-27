import { Router } from 'express';
import * as messageController from './message.controller.js';
import { auth } from '../../middleware/auth.middleware.js';

const router = Router();

router.post('/:receiverId', messageController.sendMessage);

router.get('/', auth, messageController.getUserMessages);

export default router;

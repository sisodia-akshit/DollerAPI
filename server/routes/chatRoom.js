import express from 'express';
import authController from '../controllers/authController.js'
import chatRoom from '../controllers/chatRoom.js';

const router = express.Router();


router.route('/').get(authController.protect,chatRoom.getAllRooms);
router.route('/create').post(authController.protect,chatRoom.createRoom);
router.route('/:roomId').patch(authController.protect,chatRoom.postMessage);
router.route('/:roomId').get(authController.protect,chatRoom.getMessage);


export default router
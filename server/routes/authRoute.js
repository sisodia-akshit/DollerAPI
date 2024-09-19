import express from 'express';
import user from '../controllers/user.js'
const router = express.Router();

router.route('/signup').post(user.createUser);
router.route('/').post(user.loginUser)

export default router
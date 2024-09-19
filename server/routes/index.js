import express from 'express';
import authController from '../controllers/authController.js'

const router = express.Router();

router
.get('/',authController.protect, (req, res) => {
    return res.send("Hello World");

});

export default router
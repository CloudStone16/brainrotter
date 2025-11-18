import express from 'express';
import { signup, login, verify, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/verify', protect, verify);
router.get('/me', protect, getMe);

export default router;

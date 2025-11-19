import express from 'express';
import { getAllClips, getMyClips, generateClip } from '../controllers/clipController.ts';
import { protect } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.route('/').get(getAllClips);
router.route('/my-clips').get(protect, getMyClips);
router.route('/generate').post(protect, generateClip);

export default router;

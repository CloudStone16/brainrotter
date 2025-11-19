import { Router } from "express";
import { 
  register, 
  login, 
  forgotPassword, 
  resetPassword,
  updateUsername,
  updatePassword
} from "../controllers/authController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// User profile update routes
router.patch("/user/username", protect, updateUsername);
router.patch("/user/password", protect, updatePassword);

export default router;

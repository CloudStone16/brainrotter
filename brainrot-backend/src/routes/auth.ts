import { Router } from "express";
import { register, login, forgotPassword, resetPassword } from "../controllers/authController.ts";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;

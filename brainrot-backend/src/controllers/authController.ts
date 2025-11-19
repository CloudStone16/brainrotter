import type { Request, Response } from "express";
import User from "../models/User.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.ts";


// REGISTER
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });

  res.json({ message: "User created", user });
};


// LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.json({ message: "Logged in", token, user });
};


// FORGOT PASSWORD
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Email not found" });

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 10 * 60 * 1000;
  await user.save();

  const link = `http://localhost:5173/reset-password/${token}`;

  await sendEmail(user.email, "Reset Password", `
    <h2>Password Reset</h2>
    <p>Click below to reset your password:</p>
    <a href="${link}">${link}</a>
  `);

  res.json({ message: "Reset email sent!" });
};


// RESET PASSWORD
export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpire: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: "Token expired or invalid" });

  const hashed = await bcrypt.hash(password, 10);

  user.password = hashed;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;

  await user.save();

  res.json({ message: "Password updated" });
};

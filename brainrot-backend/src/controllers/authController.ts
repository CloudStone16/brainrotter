import type { Request, Response } from "express";
import User from "../models/User.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.ts";


// REGISTER
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).json({ message: "Email already in use" });

  const usernameExists = await User.findOne({ username });
  if (usernameExists) return res.status(400).json({ message: "Username already taken" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });

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

  // **FIX:** If the user is a legacy user without a username, create one.
  if (!user.username) {
    const usernameFromEmail = email.split('@')[0];
    // Check if this generated username already exists
    const existing = await User.findOne({ username: usernameFromEmail });
    // If it exists, add a random number to make it unique
    user.username = existing ? `${usernameFromEmail}${Math.floor(Math.random() * 1000)}` : usernameFromEmail;
  }

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

// UPDATE USERNAME
export const updateUsername = async (req: Request, res: Response) => {
  const { username } = req.body;
  // @ts-ignore
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if new username is already taken
    const usernameExists = await User.findOne({ username });
    if (usernameExists && usernameExists._id.toString() !== userId) {
      return res.status(400).json({ message: "Username already taken" });
    }

    user.username = username;
    await user.save();

    res.json({ message: "Username updated", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE PASSWORD
export const updatePassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  // @ts-ignore
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect current password" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });

  return res.json({ message: "User created", user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return res.json({ message: "Logged in", token, user });
};

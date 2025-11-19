import type { Request, Response } from "express";
import Clip from "../models/Clip.ts";
import axios from 'axios';

// @desc    Get all clips
// @route   GET /api/clips
// @access  Public
export const getAllClips = async (req: Request, res: Response) => {
  try {
    const clips = await Clip.find().sort({ createdAt: -1 });
    res.json(clips);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get clips for the logged-in user
// @route   GET /api/clips/my-clips
// @access  Private
export const getMyClips = async (req: Request, res: Response) => {
  try {
    // @ts-ignore (req.user is added by the auth middleware)
    const clips = await Clip.find({ 'generatedBy.userId': req.user.id }).sort({ createdAt: -1 });
    res.json(clips);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Generate a new clip
// @route   POST /api/clips/generate
// @access  Private
export const generateClip = async (req: Request, res: Response) => {
  try {
    const { topic, background_video } = req.body;
    // @ts-ignore
    const { id: userId, username } = req.user;

    // 1. Call the Python/Flask backend to generate the video
    const flaskResponse = await axios.post('http://localhost:5000/api/generate', {
      topic,
      background_video,
    });

    const { video_url } = flaskResponse.data;

    // 2. Save the clip metadata to the database
    const newClip = await Clip.create({
      videoUrl: video_url,
      generatedBy: {
        userId,
        username,
      },
    });

    res.status(201).json(newClip);

  } catch (error) {
    console.error("Error generating clip:", error);
    res.status(500).json({ message: "Server Error during clip generation" });
  }
};
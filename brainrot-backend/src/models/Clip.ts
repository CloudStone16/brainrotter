import mongoose, { Document, Schema } from "mongoose";

export interface IClip extends Document {
  videoUrl: string;
  generatedBy: {
    userId: Schema.Types.ObjectId;
    username: string;
  };
  createdAt: Date;
}

const ClipSchema = new mongoose.Schema<IClip>({
  videoUrl: { type: String, required: true },
  generatedBy: {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IClip>("Clip", ClipSchema);

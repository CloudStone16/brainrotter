import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpire?: number;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  resetToken: { type: String },
  resetTokenExpire: { type: Number },
});

export default mongoose.model<IUser>("User", UserSchema);

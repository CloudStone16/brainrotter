import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  resetToken?: string;          // <-- added
  resetTokenExpire?: number;    // <-- added
}

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Added for forgot-password
  resetToken: { type: String },
  resetTokenExpire: { type: Number },
});

export default mongoose.model<IUser>("User", UserSchema);


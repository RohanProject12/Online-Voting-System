import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "student";
  hasVoted: boolean; // ✅ Added this
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "student"], default: "student" },
  hasVoted: { type: Boolean, default: false }, // ✅ Added this
});

export default mongoose.model<IUser>("User", UserSchema);

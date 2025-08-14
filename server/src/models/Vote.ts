import mongoose, { Document, Schema } from "mongoose";

export interface IVote extends Document {
  student: mongoose.Types.ObjectId;
  candidate: mongoose.Types.ObjectId;
}

const VoteSchema: Schema = new Schema<IVote>(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IVote>("Vote", VoteSchema);

import mongoose, { Document, Schema } from "mongoose";

export interface ICandidate extends Document {
  name: string;
  position: string;
  votes: number;
}

const CandidateSchema: Schema = new Schema<ICandidate>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    votes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model<ICandidate>("Candidate", CandidateSchema);

import express, { Response } from "express";
import Candidate from "../models/Candidate";
import { protect, AuthRequest } from "../middleware/authMiddleware";
import User from "../models/User";

const router = express.Router();

// ✅ Cast a vote (Students only)
router.post("/:candidateId", protect(["student"]), async (req: AuthRequest, res: Response) => {
  try {
    const candidate = await Candidate.findById(req.params.candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const user = await User.findById(req.user.id); // ✅ Now req.user is recognized
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.hasVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    candidate.votes += 1;
    user.hasVoted = true;

    await candidate.save();
    await user.save();

    res.json({ message: "Vote cast successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;

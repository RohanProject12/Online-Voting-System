import express from "express";
import Candidate from "../models/Candidate";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// ✅ Add a candidate (Admin only)
router.post("/", protect(["admin"]), async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Candidate name required" });
    }

    const candidate = await Candidate.create({ name });
    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Get all candidates (Anyone can view)
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;

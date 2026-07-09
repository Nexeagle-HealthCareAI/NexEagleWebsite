import { Router } from "express";
import { randomUUID } from "node:crypto";
import { feedbackInputSchema } from "../lib/schemas.js";
import { saveFeedback } from "../services/store.js";

const router = Router();

// POST /api/feedback
router.post("/", async (req, res, next) => {
  try {
    const parsed = feedbackInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid feedback payload",
        details: parsed.error.flatten(),
      });
    }

    const id = randomUUID();
    await saveFeedback({
      id,
      ...parsed.data,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ id, status: "received" });
  } catch (err) {
    next(err);
  }
});

export default router;

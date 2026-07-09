import { Router } from "express";
import { randomUUID } from "node:crypto";
import { appointmentInputSchema, type OneHmsAppointment } from "../lib/schemas.js";
import { notifyOneHMS } from "../services/onehms.js";
import { saveAppointment } from "../services/store.js";

const router = Router();

// POST /api/appointments
router.post("/", async (req, res, next) => {
  try {
    const parsed = appointmentInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid appointment payload",
        details: parsed.error.flatten(),
      });
    }

    const id = randomUUID();
    const appointment: OneHmsAppointment = {
      ...parsed.data,
      source: "nexeagle-website",
      createdAt: new Date().toISOString(),
    };

    // Persist first so nothing is lost even if the 1HMS forward fails.
    await saveAppointment({ id, ...appointment });

    let forwarded = false;
    try {
      const result = await notifyOneHMS(appointment);
      forwarded = result.forwarded;
    } catch (err) {
      // A 1HMS outage must not lose the patient's booking; it's already stored.
      console.error("[appointments] 1HMS forward error:", err);
    }

    res.status(201).json({ id, status: "received", forwardedToOneHms: forwarded });
  } catch (err) {
    next(err);
  }
});

export default router;

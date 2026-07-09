import { Router } from "express";
import { config } from "../config.js";
import { doctorsSchema, type Doctor } from "../lib/schemas.js";
import { fetchDoctorsFromOneHMS } from "../services/onehms.js";
import manualDoctors from "../data/doctors.json" with { type: "json" };

const router = Router();

const manualList: Doctor[] = doctorsSchema.parse(manualDoctors);

// GET /api/doctors?location=Kolkata&specialty=Cardiology
router.get("/", async (req, res, next) => {
  try {
    const source =
      config.doctorSource === "onehms"
        ? await fetchDoctorsFromOneHMS()
        : manualList;

    const location = String(req.query.location ?? "").trim().toLowerCase();
    const specialty = String(req.query.specialty ?? "").trim().toLowerCase();

    const doctors = source.filter((d) => {
      const matchLocation = !location || d.location.toLowerCase() === location;
      const matchSpecialty = !specialty || d.specialty.toLowerCase() === specialty;
      return matchLocation && matchSpecialty;
    });

    res.json({
      source: config.doctorSource,
      count: doctors.length,
      doctors,
    });
  } catch (err) {
    next(err);
  }
});

export default router;

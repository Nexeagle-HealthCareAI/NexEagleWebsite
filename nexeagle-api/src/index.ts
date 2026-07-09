import express from "express";
import cors from "cors";
import { config } from "./config.js";
import doctorsRouter from "./routes/doctors.js";
import appointmentsRouter from "./routes/appointments.js";
import feedbackRouter from "./routes/feedback.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (curl/health checks) that send no Origin.
      if (!origin || config.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", doctorSource: config.doctorSource });
});

app.use("/api/doctors", doctorsRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/feedback", feedbackRouter);

// Centralized error handler.
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("[error]", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
);

app.listen(config.port, () => {
  console.log(
    `nexeagle-api listening on http://localhost:${config.port} ` +
      `(DOCTOR_SOURCE=${config.doctorSource})`
  );
});

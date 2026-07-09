import "dotenv/config";

export type DoctorSource = "manual" | "onehms";

const rawSource = (process.env.DOCTOR_SOURCE ?? "manual").toLowerCase();

export const config = {
  port: Number(process.env.PORT ?? 4000),
  allowedOrigins: (process.env.ALLOWED_ORIGIN ?? "http://localhost:8080")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),
  doctorSource: (rawSource === "onehms" ? "onehms" : "manual") as DoctorSource,
  oneHms: {
    apiUrl: process.env.ONEHMS_API_URL?.replace(/\/$/, "") ?? "",
    apiKey: process.env.ONEHMS_API_KEY ?? "",
  },
};

export const isOneHmsConfigured = () => Boolean(config.oneHms.apiUrl);

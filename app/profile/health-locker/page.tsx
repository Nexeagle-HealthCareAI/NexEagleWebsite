import { Metadata } from "next";
import HealthLockerClient from "./HealthLockerClient";

export const metadata: Metadata = {
  title: "Health Locker | Doctor Dekho",
  description: "Your uploaded medical documents, all in one place.",
};

export default function HealthLockerPage() {
  return <HealthLockerClient />;
}

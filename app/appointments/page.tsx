import { Metadata } from "next";
import AppointmentsClient from "./AppointmentsClient";

export const metadata: Metadata = {
  title: "My Appointments | Doctor Dekho",
  description: "View and manage your upcoming doctor appointments on NexEagle.",
};

export default function AppointmentsPage() {
  return <AppointmentsClient />;
}

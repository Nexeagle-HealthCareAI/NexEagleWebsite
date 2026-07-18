import { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "Profile | Doctor Dekho",
  description: "Manage your Doctor Dekho profile and settings.",
};

export default function ProfilePage() {
  return <ProfileClient />;
}

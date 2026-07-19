import { Metadata } from "next";
import PersonalInformationClient from "./PersonalInformationClient";

export const metadata: Metadata = {
  title: "Personal Information | Doctor Dekho",
  description: "Your details on file with NexEagle Doctor Dekho.",
};

export default function PersonalInformationPage() {
  return <PersonalInformationClient />;
}

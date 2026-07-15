import Link from "next/link";
import { UserX, ArrowRight } from "lucide-react";
import PatientTopBar from "@/components/patient/PatientTopBar";
import PatientFooter from "@/components/patient/PatientFooter";

export default function DoctorNotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800">
      <PatientTopBar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <UserX className="w-7 h-7" />
          </div>
          <h1 className="text-lg font-extrabold text-slate-900">Doctor not found</h1>
          <p className="text-sm text-slate-500 mt-2">
            This doctor may no longer be listed, or the link is out of date.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 mt-6 px-5 py-3 rounded-2xl bg-brand-teal text-white font-bold text-sm shadow-md shadow-teal-500/20 hover:bg-brand-teal/90 transition"
          >
            Browse all doctors <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
      <PatientFooter />
    </div>
  );
}

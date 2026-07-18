"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/I18nContext";

export default function PatientBottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const tabs = [
    {
      name: t("nav.home") || "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },

    {
      name: t("nav.appointments") || "Appointments",
      href: "/appointments", // Assuming this exists or will exist
      icon: Calendar,
      isActive: pathname.startsWith("/appointments"),
    },
    {
      name: t("nav.profile") || "Profile",
      href: "/profile", // Assuming this exists or will exist
      icon: User,
      isActive: pathname.startsWith("/profile"),
    },
  ];

  return (
    <>
      {/* Spacer to prevent content from hiding behind the bottom nav */}
      <div className="h-16 md:hidden" aria-hidden="true" />
      
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-16 bg-white border-t border-slate-200/60 pb-[env(safe-area-inset-bottom)] md:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.isActive;
          
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-200 tap-highlight-transparent",
                active ? "text-brand-teal" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Icon className={cn("w-6 h-6", active && "fill-brand-teal/10")} />
              <span className="text-[10px] font-semibold">{tab.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

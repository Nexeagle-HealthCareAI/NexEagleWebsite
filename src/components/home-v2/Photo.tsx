import Image from "next/image";
import { cn } from "@/lib/utils";

// Every real-life photo on the homepage, in one place.
// Free photos from Unsplash (unsplash.com/license), hotlinked from Unsplash's CDN as Unsplash asks;
// next/image fetches the 2400px original on the server and serves right-sized WebP/AVIF per device.
// `page` is the photo's Unsplash page, for credit. Empty `src` renders a labelled placeholder.
const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2400&q=80`;

export const PHOTOS = {
  reception: { src: U("photo-1578991624414-276ef23a534f"), alt: "Bright hospital reception and waiting area", want: "Hospital reception", pos: "center", page: "https://unsplash.com/photos/E7Tzh2TTS6c" },
  consult: { src: U("photo-1631217868204-db1ed6bdd224"), alt: "Doctor going through notes with a patient", want: "Doctor with patient", pos: "center", page: "https://unsplash.com/photos/6jpjF_eDvZU" },
  radiology: { src: U("photo-1666214280165-20e3d73d70bf"), alt: "Patient lying on a CT scanner table", want: "CT / MRI scanner room", pos: "center", page: "https://unsplash.com/photos/ibdJjGbrgxI" },
  lab: { src: U("photo-1579154341184-22069e4614d2"), alt: "Blood sample tubes in a laboratory rack", want: "Pathology lab samples", pos: "center", page: "https://unsplash.com/photos/egT3xtDu9DQ" },
  pharmacy: { src: U("photo-1580281657527-47f249e8f4df"), alt: "Pharmacist taking medicine from a pharmacy shelf", want: "Hospital pharmacy", pos: "30% center", page: "https://unsplash.com/photos/byGTytEGjBo" },
  corridor: { src: U("photo-1517120026326-d87759a7b63b"), alt: "Hospital staff moving equipment along a bright corridor", want: "Hospital corridor", pos: "65% center", page: "https://unsplash.com/photos/ZCO_5Y29s8k" },
} as const;

export type PhotoKey = keyof typeof PHOTOS;

export function Photo({ k, className, sizes = "100vw", priority = false }: { k: PhotoKey; className?: string; sizes?: string; priority?: boolean }) {
  const p = PHOTOS[k];
  if (!(p.src as string)) {
    return (
      <div className={cn("relative grid place-items-center overflow-hidden bg-[linear-gradient(135deg,#dfeceb,#eef4f7_55%,#e3ebf3)]", className)} role="img" aria-label={p.alt}>
        <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-slate-500">Photo: {p.want}</span>
      </div>
    );
  }
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} quality={80} className="object-cover" style={{ objectPosition: p.pos }} />
    </div>
  );
}

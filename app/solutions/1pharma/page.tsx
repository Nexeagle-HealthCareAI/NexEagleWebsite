import type { Metadata } from "next";
import { AlertTriangle, BarChart3, ScanLine, ClipboardList, PackageSearch, Receipt, ShieldCheck, Truck } from "lucide-react";
import ProductPage, { type ProductConfig } from "@/components/site/ProductPage";
import { STEPS, type Step } from "@/lib/journeySteps";
import { StockDemo } from "@/components/site/ProductDemos";

const TITLE = "Pharmacy Management & Inventory Software for Hospitals | 1Pharma by NexEagle";
const DESCRIPTION =
  "1Pharma is pharmacy management and inventory software for hospital and retail pharmacies in India: e-prescriptions from doctors, barcode dispensing, batch and expiry alerts, purchase and stock, and billing.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["pharmacy management software", "hospital pharmacy software India", "pharmacy inventory software", "medical store software", "expiry alert software", "barcode dispensing", "pharmacy billing software"],
  alternates: { canonical: "/solutions/1pharma" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/solutions/1pharma", images: [{ url: "/og/home.png", width: 1200, height: 630 }] },
};

const RESTOCK: Step = {
  agent: "1Pharma Vita",
  avatar: "/assets/vita/avatar-coffee.webp",
  title: "Stock that reorders itself and never quietly expires",
  body: "Vita watches stock levels and expiry dates every day, so the pharmacist sees what to reorder and what to use first before it becomes a problem.",
  inn: { title: "Comes in", items: ["Today's sales", "Batches and expiry dates", "Reorder levels"] },
  vita: { title: "Vita does", items: ["Spots low stock", "Flags batches near expiry", "Drafts the purchase order"] },
  out: { title: "Your team gets", items: ["A reorder list ready to send", "Older batches used first", "Less stock written off"] },
};

const c: ProductConfig = {
  slug: "1pharma",
  name: "1Pharma",
  category: "Pharmacy & inventory",
  dot: "bg-[#22a559]",
  pose: { src: "/assets/vita/vita-present.webp", w: 753, h: 760, alt: "1Pharma Vita presenting" },
  h1: "Pharmacy software that knows the prescription before the patient arrives",
  sub: "Prescriptions arrive from the doctor's desk, stock and expiry look after themselves, and every sale lands on the right bill. For hospital pharmacies and medical stores.",
  points: ["Barcode dispensing", "Expiry alerts", "Data hosted in India"],
  agentTitle: "1Pharma Vita",
  demo: <StockDemo />,
  modulesTitle: "A calmer pharmacy counter",
  modulesIntro: "No more reading handwriting, hunting for stock or discovering expired boxes at the back of the shelf.",
  modules: [
    { Icon: ClipboardList, title: "Prescriptions from doctors", body: "Signed e-prescriptions appear in the pharmacy queue, so medicines can be picked before the patient reaches the counter." },
    { Icon: ScanLine, title: "Barcode dispensing", body: "Scan to dispense the right medicine and batch, and stock updates on the spot." },
    { Icon: AlertTriangle, title: "Batch and expiry alerts", body: "Batches nearing expiry are flagged early, and older stock is used first." },
    { Icon: PackageSearch, title: "Stock and reorder levels", body: "Live stock for every item, with low-stock alerts and suggested reorders." },
    { Icon: Truck, title: "Purchases and suppliers", body: "Purchase orders, goods received and supplier records in one place." },
    { Icon: Receipt, title: "Billing", body: "Counter sales billed on the spot, or added to the patient's OPD or IPD bill in 1HMS." },
    { Icon: BarChart3, title: "Reports", body: "Daily sales, stock value, fast and slow movers, and expiry reports." },
    { Icon: ShieldCheck, title: "Secure and India-hosted", body: "Encrypted storage in India, a login for every role and a full audit trail." },
  ],
  stepsTitle: "How a prescription moves through 1Pharma",
  stepsIntro: "From the doctor's signature to the medicine in the patient's hand, with stock taken care of.",
  steps: [STEPS[4], RESTOCK],
  worksWith: [
    { name: "1HMS", href: "/solutions/1hms", line: "Prescriptions arrive as soon as the doctor signs" },
    { name: "1Lab", href: "/solutions/1lab", line: "Tests and medicines on one bill" },
    { name: "1Rad", href: "/solutions/1rad", line: "Contrast and consumables tracked with the scan" },
    { name: "Doctor Dekho", href: "https://doctordekho.nexeagle.com", line: "Patients book and arrive with their details" },
  ],
  faq: [
    { q: "Can 1Pharma run a standalone medical store?", a: "Yes. 1Pharma works on its own for a pharmacy or medical store, and connects to 1HMS when it sits inside a hospital." },
    { q: "How does 1Pharma handle expiry?", a: "Every batch is stored with its expiry date. Batches nearing expiry are flagged early, and dispensing suggests the oldest usable batch first." },
    { q: "Do prescriptions come from the doctor automatically?", a: "Yes, when the hospital uses 1HMS. Once the doctor signs the prescription, it appears in the pharmacy queue." },
    { q: "Can pharmacy sales go on the patient's hospital bill?", a: "Yes. Sales can be billed at the counter or added to the patient's OPD or IPD bill in 1HMS." },
    { q: "Do we need barcode scanners?", a: "Barcode scanning makes dispensing faster and safer, but you can start without it. We help you choose and set up scanners." },
  ],
  schema: {
    name: "NexEagle 1Pharma",
    category: "Pharmacy management and inventory software",
    description: DESCRIPTION,
  },
  analyticsTitle: "1Pharma - Pharmacy Management System | NexEagle",
};

export default function Page() {
  return <ProductPage c={c} />;
}

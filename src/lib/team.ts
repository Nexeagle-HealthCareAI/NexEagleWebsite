// The NexEagle team, shared by the homepage strip and the team pages.
export type Member = {
  name: string;
  role: string;
  credential: string;
  focus: string;
  group: "Founding team" | "Product & engineering" | "Medical & research";
  image?: string;
  linkedin?: string;
};

export const TEAM: Member[] = [
  { name: "Dr Md Taquedis Noori", role: "Co-founder, Medical Advisor", credential: "MS, MCh Urology (IPGMER & SSKM Hospital)", focus: "Checks every clinical workflow against how doctors and wards actually work, and leads clinical safety and triage.", group: "Founding team", image: "/assets/Taquedis Noori.webp", linkedin: "https://www.linkedin.com/in/md-taquedis-noori-59368525b/" },
  { name: "Md Tasquil Noori", role: "Co-founder, Tech Lead", credential: "BTech, NIT Warangal", focus: "Product architecture, the shared patient record, and connecting 1HMS, 1Rad, 1Lab and 1Pharma.", group: "Founding team", image: "/assets/Tasquil_Noori.webp", linkedin: "https://www.linkedin.com/in/md-tasquil-noori-82bb441b8/" },
  { name: "Md Aquib", role: "Co-founder, Product Manager", credential: "IIT Bombay alumnus", focus: "Product strategy, the patient journey from booking to OPD, and how hospitals adopt new software.", group: "Founding team", linkedin: "https://www.linkedin.com/in/mdaquibnoori/" },
  { name: "Dr Md Tabish Noori", role: "Healthcare Research Advisor", credential: "Research Fellow, Imperial College London", focus: "Research methods, data science and validating how AI performs on real clinical work.", group: "Medical & research", image: "/assets/Tabish Noori.webp", linkedin: "https://www.linkedin.com/in/md-tabish-noori-16a815a5/" },
  { name: "Alisha", role: "Forward Deployment Engineer", credential: "Forward Deployment Engineer", focus: "Sets up and configures NexEagle in hospitals and diagnostic centres, and makes go-live smooth on site.", group: "Product & engineering", image: "/assets/Alisha.webp" },
  { name: "Sana", role: "AI Developer", credential: "AI Developer", focus: "Builds Vita's AI agents: the scribe, workflow automation and clinical decision support.", group: "Product & engineering", image: "/assets/Sana.webp" },
];

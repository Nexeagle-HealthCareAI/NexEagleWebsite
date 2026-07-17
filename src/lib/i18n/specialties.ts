import type { Locale } from "./types";

// Medical specialty names, keyed by the same `Specialty.id` used in src/data/patient.ts.
// Kept separate from the general UI dictionaries since this is a finite, enumerable data
// list rather than free-form copy. English falls back to whatever specialties.ts already
// has (data/patient.ts), so it isn't duplicated here.
const SPECIALTY_NAMES: Record<Exclude<Locale, "en">, Record<string, string>> = {
  hi: {
    general: "सामान्य चिकित्सक",
    pediatrics: "बाल रोग विशेषज्ञ",
    cardiology: "हृदय रोग विशेषज्ञ",
    dermatology: "त्वचा रोग विशेषज्ञ",
    orthopedics: "हड्डी रोग विशेषज्ञ",
    gynecology: "स्त्री रोग विशेषज्ञ",
    dentistry: "दंत चिकित्सक",
    ent: "कान-नाक-गला विशेषज्ञ",
    ophthalmology: "नेत्र रोग विशेषज्ञ",
    neurology: "तंत्रिका रोग विशेषज्ञ",
    psychiatry: "मानसिक रोग विशेषज्ञ",
    urology: "मूत्र रोग विशेषज्ञ",
    gastroenterology: "पेट रोग विशेषज्ञ",
    endocrinology: "हार्मोन रोग विशेषज्ञ",
    pulmonology: "फेफड़ा रोग विशेषज्ञ",
    nephrology: "किडनी रोग विशेषज्ञ",
    oncology: "कैंसर रोग विशेषज्ञ",
    rheumatology: "गठिया रोग विशेषज्ञ",
    physiotherapy: "फिजियोथेरेपिस्ट",
    dietetics: "आहार विशेषज्ञ",
  },
  bn: {
    general: "সাধারণ চিকিৎসক",
    pediatrics: "শিশু রোগ বিশেষজ্ঞ",
    cardiology: "হৃদরোগ বিশেষজ্ঞ",
    dermatology: "চর্মরোগ বিশেষজ্ঞ",
    orthopedics: "হাড় রোগ বিশেষজ্ঞ",
    gynecology: "স্ত্রীরোগ বিশেষজ্ঞ",
    dentistry: "দন্ত চিকিৎসক",
    ent: "নাক-কান-গলা বিশেষজ্ঞ",
    ophthalmology: "চক্ষু বিশেষজ্ঞ",
    neurology: "স্নায়ুরোগ বিশেষজ্ঞ",
    psychiatry: "মানসিক রোগ বিশেষজ্ঞ",
    urology: "মূত্ররোগ বিশেষজ্ঞ",
    gastroenterology: "পেটের রোগ বিশেষজ্ঞ",
    endocrinology: "হরমোন রোগ বিশেষজ্ঞ",
    pulmonology: "ফুসফুস রোগ বিশেষজ্ঞ",
    nephrology: "কিডনি রোগ বিশেষজ্ঞ",
    oncology: "ক্যান্সার বিশেষজ্ঞ",
    rheumatology: "বাত রোগ বিশেষজ্ঞ",
    physiotherapy: "ফিজিওথেরাপিস্ট",
    dietetics: "পুষ্টিবিদ",
  },
  hinglish: {
    general: "General Physician",
    pediatrics: "Bacchon Ke Doctor",
    cardiology: "Dil Ke Doctor",
    dermatology: "Skin Ke Doctor",
    orthopedics: "Haddi Ke Doctor",
    gynecology: "Mahila Rog Specialist",
    dentistry: "Daant Ke Doctor",
    ent: "Kaan-Naak-Gala Specialist",
    ophthalmology: "Aankhon Ke Doctor",
    neurology: "Nerve Specialist",
    psychiatry: "Mansik Swasthya Specialist",
    urology: "Mootra Rog Specialist",
    gastroenterology: "Pet Ke Doctor",
    endocrinology: "Hormone Specialist",
    pulmonology: "Phephdon Ke Doctor",
    nephrology: "Kidney Specialist",
    oncology: "Cancer Specialist",
    rheumatology: "Jodon Ke Dard Specialist",
    physiotherapy: "Physiotherapist",
    dietetics: "Diet Specialist",
  },
};

/** Translated specialty display name, falling back to the English name (from
 * data/patient.ts) when the locale is English or the id isn't in the map. */
export function translateSpecialty(id: string, englishName: string, locale: Locale): string {
  if (locale === "en") return englishName;
  return SPECIALTY_NAMES[locale]?.[id] ?? englishName;
}

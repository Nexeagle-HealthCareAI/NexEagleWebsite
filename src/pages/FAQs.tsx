import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Sparkles,
  Zap,
  HelpCircle,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  Shield,
  Settings,
  Users,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";

const FAQs = () => {
  const faqCategories = [
    {
      id: "pilot",
      name: "OPD Pilot (10 hospitals)",
      icon: HelpCircle,
      description: "Details for the easyHMS OPD pilot cohort"
    }
  ];

  const faqs = {
    pilot: [
      {
        question: "Is this pilot really limited to 10 hospitals/clinics?",
        answer: "Yes. We are intentionally limiting the pilot cohort to 10 hospitals/clinics so we can work closely with each team, provide hands-on support, and refine easyHMS OPD based on real-world feedback before scaling.",
        tags: ["pilot", "cohort", "capacity"]
      },
      {
        question: "How long does the pilot last?",
        answer: "The pilot duration is 3 months from your go-live date. During this period, you can use the OPD module daily with your real patients and staff.",
        tags: ["pilot", "timeline", "duration"]
      },
      {
        question: "What is included in the pilot?",
        answer: "During the pilot, you get full access to the OPD module (multi-role login, appointments, e-prescriptions, follow-up reminders, analytics, patient timeline), setup and configuration of your hospital, departments, and doctors, online onboarding and training, priority support via WhatsApp/email/phone, and the ability to influence the roadmap with your feedback.",
        tags: ["pilot", "scope", "features"]
      },
      {
        question: "Is there any cost to join the pilot?",
        answer: "For this first cohort, the pilot is free of software charges. In return, we ask for active usage, regular feedback, and a testimonial/case study if you are satisfied with the results.",
        tags: ["pilot", "pricing", "feedback"]
      },
      {
        question: "What happens after the pilot ends?",
        answer: "Before the pilot ends, we will review your usage and feedback together, share proposed pricing and plan for continued use, and if you decide to continue you smoothly move to a paid plan. If you decide not to continue, we help you export your data and close the account gracefully—you are not locked in.",
        tags: ["post-pilot", "pricing", "offboarding"]
      },
      {
        question: "Which parts of the hospital does easyHMS OPD cover during the pilot?",
        answer: "The pilot focuses on OPD workflows: appointment scheduling, doctor e-prescription writing, follow-up reminders, OPD analytics and reports, and the patient medical timeline for OPD visits. IPD, billing, pharmacy, or lab modules are not in scope for this pilot.",
        tags: ["scope", "opd", "modules"]
      },
      {
        question: "What are the technical requirements to use easyHMS OPD?",
        answer: "You need a modern web browser, stable internet connection, a desktop/laptop for reception/admin, and optionally tablets or laptops for doctors. No onsite servers or heavy IT setup are needed—it’s a cloud-based web platform.",
        tags: ["requirements", "tech", "cloud"]
      },
      {
        question: "How much training will my staff need?",
        answer: "We recommend 1–2 hours for reception/front-desk and admin staff, and 30–60 minutes for each doctor to learn e-prescription, patient timeline, and analytics. We provide online sessions and short guides, and can repeat sessions during the pilot.",
        tags: ["training", "onboarding", "staff"]
      },
      {
        question: "How secure is our data?",
        answer: "Data security is core: secure cloud infrastructure (Azure), HTTPS/TLS for data in transit, role-based access per hospital, and activity logging. We can share detailed documentation if your IT/security team needs it.",
        tags: ["security", "roles", "encryption"]
      },
      {
        question: "Who owns the data entered into easyHMS OPD?",
        answer: "You do. Your hospital owns its data. easyHMS only processes and stores it on your behalf. If you leave after the pilot, we provide a way to export key data (appointments, patient information, prescriptions, etc.) within a reasonable timeframe.",
        tags: ["data-ownership", "export", "compliance"]
      },
      {
        question: "Can different roles have separate logins and permissions?",
        answer: "Yes. easyHMS OPD supports multi-role access: hospital owner/admin, doctors, reception/front-desk, and future roles. Each role sees only what’s relevant, with permission controls.",
        tags: ["roles", "access", "permissions"]
      },
      {
        question: "Can we run multiple branches in the pilot?",
        answer: "For the pilot, we recommend focusing on one primary branch per hospital/clinic to keep onboarding simple and get clear results. We can discuss multi-branch setups if it fits within the pilot capacity.",
        tags: ["branches", "pilot", "scope"]
      },
      {
        question: "How do follow-up reminders work?",
        answer: "You can define follow-up rules by visit type or doctor instructions. The system can then schedule follow-up visits and send reminders (via SMS/WhatsApp/email depending on your setup and regulations) to reduce missed follow-ups.",
        tags: ["follow-ups", "reminders", "automation"]
      },
      {
        question: "Can doctors see full patient history and timeline?",
        answer: "Yes. For every patient, easyHMS OPD can show previous visits, past e-prescriptions, complaints and diagnoses, and follow-up notes in a chronological timeline so doctors can quickly understand history before prescribing again.",
        tags: ["patient-history", "timeline", "doctors"]
      },
      {
        question: "How do we get support during the pilot?",
        answer: "Pilot partners receive priority support: WhatsApp group/support number, email support, and scheduled check-in calls (especially during the first month). We monitor usage and reach out proactively if we see drop-offs or issues.",
        tags: ["support", "pilot", "priority"]
      }
    ]
  };

  const filteredFaqs = faqs.pilot;
  const allFaqs = filteredFaqs;

  const popularFaqs = [
    "Is this pilot really limited to 10 hospitals/clinics?",
    "What is included in the pilot?",
    "What happens after the pilot ends?",
    "How secure is our data?",
    "How do we get support during the pilot?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-tech-cyan/5">
      <Navbar />
      
      {/* FAQ Content */}
      <section className="pt-24 pb-12 lg:pt-28 lg:pb-14 relative z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-6xl mx-auto pointer-events-auto">
              <Accordion
                type="single"
                collapsible
                defaultValue="item-0"
                className="grid gap-4 md:grid-cols-2 items-start"
              >
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="futuristic-card border border-gray-200 rounded-lg px-6 self-start"
                  >
                    <AccordionTrigger className="text-left font-semibold text-medical-trust hover:text-tech-cyan py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2 pb-6">
                      {faq.answer}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {faq.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Popular FAQs */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-medical-trust mb-4">
                Popular Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Here are the most commonly asked questions from our customers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularFaqs.map((question, index) => {
                const faq = allFaqs.find(f => f.question === question);
                if (!faq) return null;
                
                return (
                  <Card key={index} className="futuristic-card group hover:scale-105 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-medical-trust">
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {faq.answer.substring(0, 150)}...
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
};

export default FAQs;
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Palette, 
  Stethoscope, 
  Users, 
  TrendingUp,
  MapPin,
  Clock,
  Briefcase,
  Mail,
  ExternalLink,
  Heart,
  Zap,
  Target
} from "lucide-react";

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const jobCategories = [
    { id: "engineering", label: "Engineering", icon: Code, count: 5 },
    { id: "design", label: "Design", icon: Palette, count: 2 },
    { id: "product", label: "Product", icon: Target, count: 3 },
    { id: "healthcare", label: "Healthcare", icon: Stethoscope, count: 4 },
    { id: "sales", label: "Sales & Marketing", icon: TrendingUp, count: 3 }
  ];

  const jobs = {
    engineering: [
      {
        id: "fe-react",
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "Remote / Bangalore",
        type: "Full-time",
        experience: "3-5 years",
        skills: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
        description: "Build beautiful, responsive healthcare interfaces that doctors love to use.",
        requirements: [
          "3+ years React/TypeScript experience",
          "Experience with healthcare or SaaS applications",
          "Strong CSS/Tailwind skills",
          "API integration experience"
        ]
      },
      {
        id: "be-node",
        title: "Backend Developer",
        department: "Engineering", 
        location: "Bangalore / Remote",
        type: "Full-time",
        experience: "2-4 years",
        skills: ["Node.js", "PostgreSQL", "Redis", "AWS"],
        description: "Scale our healthcare platform to serve thousands of clinics across India.",
        requirements: [
          "2+ years Node.js/Express experience",
          "Database design and optimization",
          "Healthcare data compliance knowledge",
          "Cloud deployment experience"
        ]
      },
      {
        id: "ai-ml",
        title: "AI/ML Engineer",
        department: "Engineering",
        location: "Bangalore",
        type: "Full-time", 
        experience: "3-6 years",
        skills: ["Python", "TensorFlow", "NLP", "Healthcare AI"],
        description: "Build Doc-E, our AI assistant that helps doctors with clinical documentation.",
        requirements: [
          "3+ years ML/AI experience",
          "NLP and speech recognition expertise",
          "Healthcare domain knowledge preferred",
          "Production ML model deployment"
        ]
      },
      {
        id: "devops",
        title: "DevOps Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        experience: "2-4 years", 
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        description: "Ensure 99.9% uptime for healthcare systems that doctors depend on daily.",
        requirements: [
          "2+ years DevOps experience",
          "AWS/Azure cloud expertise",
          "Container orchestration",
          "Healthcare compliance knowledge"
        ]
      },
      {
        id: "mobile",
        title: "Mobile Developer",
        department: "Engineering",
        location: "Bangalore / Remote",
        type: "Full-time",
        experience: "2-4 years",
        skills: ["React Native", "iOS", "Android", "Healthcare APIs"],
        description: "Build mobile apps that work seamlessly across India's diverse network conditions.",
        requirements: [
          "2+ years React Native experience",
          "Native iOS/Android knowledge",
          "Offline-first app development",
          "Healthcare workflow understanding"
        ]
      }
    ],
    design: [
      {
        id: "ux-designer",
        title: "Senior UX Designer",
        department: "Design",
        location: "Bangalore / Remote",
        type: "Full-time",
        experience: "4-6 years",
        skills: ["Figma", "User Research", "Healthcare UX", "Prototyping"],
        description: "Design intuitive healthcare workflows that reduce doctor burnout and improve patient care.",
        requirements: [
          "4+ years UX design experience",
          "Healthcare or enterprise SaaS background", 
          "User research and testing expertise",
          "Strong prototyping skills"
        ]
      },
      {
        id: "ui-designer",
        title: "UI Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        experience: "2-4 years",
        skills: ["UI Design", "Design Systems", "Figma", "Branding"],
        description: "Create beautiful, accessible interfaces for our healthcare platform.",
        requirements: [
          "2+ years UI design experience",
          "Design system creation",
          "Accessibility best practices",
          "Healthcare domain interest"
        ]
      }
    ],
    product: [
      {
        id: "pm-senior",
        title: "Senior Product Manager",
        department: "Product",
        location: "Bangalore",
        type: "Full-time",
        experience: "4-7 years",
        skills: ["Product Strategy", "Healthcare", "Analytics", "Roadmapping"],
        description: "Drive product strategy for EasyHMS and shape the future of Indian healthcare technology.",
        requirements: [
          "4+ years product management experience",
          "Healthcare or B2B SaaS background",
          "Strong analytical skills",
          "Experience with Indian market"
        ]
      },
      {
        id: "apm",
        title: "Associate Product Manager",
        department: "Product",
        location: "Bangalore",
        type: "Full-time",
        experience: "1-3 years",
        skills: ["Product Analytics", "User Research", "Roadmapping", "Agile"],
        description: "Own key product features and work directly with healthcare professionals.",
        requirements: [
          "1-3 years product experience",
          "Strong analytical mindset",
          "Healthcare interest",
          "Customer-focused approach"
        ]
      },
      {
        id: "growth-pm",
        title: "Growth Product Manager", 
        department: "Product",
        location: "Remote",
        type: "Full-time",
        experience: "3-5 years",
        skills: ["Growth Hacking", "Analytics", "A/B Testing", "Conversion"],
        description: "Drive user acquisition and retention across India's healthcare market.",
        requirements: [
          "3+ years growth/product experience",
          "A/B testing and experimentation",
          "Indian market understanding",
          "Data-driven approach"
        ]
      }
    ],
    healthcare: [
      {
        id: "clinical-advisor",
        title: "Clinical Advisor",
        department: "Healthcare",
        location: "Pan India",
        type: "Full-time",
        experience: "5+ years",
        skills: ["Clinical Practice", "Healthcare Workflows", "Training", "Advisory"],
        description: "Guide product development and train healthcare professionals on NEXEAGLE solutions.",
        requirements: [
          "MBBS or equivalent medical degree",
          "5+ years clinical practice",
          "Interest in healthcare technology",
          "Training and advisory experience"
        ]
      },
      {
        id: "pharma-specialist",
        title: "Pharmacy Specialist",
        department: "Healthcare",
        location: "Mumbai / Delhi",
        type: "Full-time",
        experience: "3-5 years",
        skills: ["Pharmacy Operations", "Inventory Management", "Compliance", "Training"],
        description: "Lead development of our Pharmacy Suite and work with pharmacy partners.",
        requirements: [
          "B.Pharm or D.Pharm degree",
          "3+ years pharmacy experience",
          "Inventory management knowledge",
          "Technology adoption interest"
        ]
      },
      {
        id: "healthcare-analyst",
        title: "Healthcare Data Analyst",
        department: "Healthcare",
        location: "Bangalore / Remote",
        type: "Full-time",
        experience: "2-4 years",
        skills: ["Healthcare Analytics", "SQL", "Python", "Clinical Data"],
        description: "Analyze clinical data to improve patient outcomes and operational efficiency.",
        requirements: [
          "2+ years healthcare analytics",
          "SQL and Python proficiency",
          "Clinical data understanding",
          "Statistical analysis skills"
        ]
      },
      {
        id: "medical-writer",
        title: "Medical Content Writer",
        department: "Healthcare",
        location: "Remote",
        type: "Full-time",
        experience: "2-4 years",
        skills: ["Medical Writing", "Clinical Documentation", "Compliance", "Training"],
        description: "Create clinical content, training materials, and compliance documentation.",
        requirements: [
          "Medical background preferred",
          "2+ years medical writing",
          "Healthcare compliance knowledge",
          "Excellent English skills"
        ]
      }
    ],
    sales: [
      {
        id: "sales-manager",
        title: "Regional Sales Manager",
        department: "Sales",
        location: "Mumbai / Delhi / Bangalore",
        type: "Full-time",
        experience: "3-6 years",
        skills: ["B2B Sales", "Healthcare Sales", "Relationship Building", "Territory Management"],
        description: "Drive sales in your region and build relationships with healthcare providers.",
        requirements: [
          "3+ years B2B sales experience",
          "Healthcare or SaaS sales preferred",
          "Strong relationship building",
          "Regional market knowledge"
        ]
      },
      {
        id: "marketing-manager",
        title: "Digital Marketing Manager",
        department: "Marketing",
        location: "Bangalore / Remote",
        type: "Full-time",
        experience: "3-5 years",
        skills: ["Digital Marketing", "Healthcare Marketing", "Content", "Analytics"],
        description: "Lead digital marketing efforts to reach healthcare professionals across India.",
        requirements: [
          "3+ years digital marketing",
          "Healthcare or B2B experience",
          "Content marketing expertise",
          "Performance marketing skills"
        ]
      },
      {
        id: "business-dev",
        title: "Business Development Executive",
        department: "Sales",
        location: "Pan India",
        type: "Full-time",
        experience: "1-3 years",
        skills: ["Business Development", "Lead Generation", "Relationship Building", "Healthcare"],
        description: "Identify and develop new business opportunities in the healthcare sector.",
        requirements: [
          "1-3 years business development",
          "Healthcare industry interest",
          "Strong communication skills",
          "Entrepreneurial mindset"
        ]
      }
    ]
  };

  const companyValues = [
    {
      icon: Heart,
      title: "Patient First",
      description: "Every decision we make prioritizes better patient outcomes"
    },
    {
      icon: Zap,
      title: "Move Fast",
      description: "Healthcare can't wait - we build and iterate quickly"
    },
    {
      icon: Users,
      title: "Doctor Empathy",
      description: "We deeply understand the challenges healthcare providers face"
    },
    {
      icon: Target,
      title: "Impact Driven",
      description: "Measure success by lives improved, not just metrics"
    }
  ];

  const applyForJob = (jobId: string) => {
    // Track application start
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'job_application_start', {
        event_category: 'careers',
        event_label: jobId
      });
    }
    
    // Open email client with pre-filled subject
    const job = Object.values(jobs).flat().find(j => j.id === jobId);
    const subject = `Application for ${job?.title} position`;
    const body = `Hi NEXEAGLE Team,\n\nI'm interested in the ${job?.title} position. Please find my resume attached.\n\nBest regards,`;
    
    window.location.href = `mailto:careers@nexeagle.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="careers" className="py-20 lg:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-medical-trust mb-6">
            Join our mission
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Help us build the future of healthcare technology in India. Work with passionate professionals who are transforming how doctors and patients interact.
          </p>
        </div>

        {/* Company Values */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {companyValues.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-gradient rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-medical-trust mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Job Listings */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="engineering" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              {jobCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.entries(jobs).map(([categoryId, categoryJobs]) => (
              <TabsContent key={categoryId} value={categoryId} className="space-y-6">
                <div className="grid gap-6">
                  {categoryJobs.map((job) => (
                    <Card key={job.id} className="medical-card medical-glow-hover">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl font-bold text-medical-trust mb-2">
                              {job.title}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground mb-4">
                              {job.description}
                            </CardDescription>
                          </div>
                          <Button
                            className="bg-medical-accent hover:bg-medical-accent/90 text-white"
                            onClick={() => applyForJob(job.id)}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Apply Now
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.experience}</span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-4">
                          {/* Skills */}
                          <div>
                            <h4 className="font-semibold text-medical-trust mb-2">Key Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {job.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Requirements */}
                          <div>
                            <h4 className="font-semibold text-medical-trust mb-2">Requirements</h4>
                            <ul className="space-y-1">
                              {job.requirements.map((req, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-start">
                                  <span className="w-1 h-1 bg-medical-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Application CTA */}
        <div className="text-center mt-16 p-8 bg-medical-trust/5 rounded-2xl">
          <h3 className="text-2xl font-bold text-medical-trust mb-4">
            Don't see the right role?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for healthcare innovation. Send us your resume and tell us how you'd like to contribute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-medical-accent hover:bg-medical-accent/90 text-white"
              onClick={() => window.location.href = 'mailto:careers@nexeagle.com?subject=General Application'}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send General Application
            </Button>
            <Button
              variant="outline"
              className="border-medical-accent text-medical-accent hover:bg-medical-accent hover:text-white"
              onClick={() => window.open('https://linkedin.com/company/nexeagle', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Follow us on LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MessageCircle, Mail, Phone, MapPin, CheckCircle, Send, ExternalLink } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    clinic: "",
    city: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      toast({
        title: "Demo request submitted!",
        description: "We'll get back to you within 24 hours.",
      });

      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "demo_click", {
          event_category: "engagement",
          event_label: "contact_form",
        });
      }
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-16 lg:py-20 bg-gradient-to-b from-white via-neutral-50 to-white">
        <div className="section-shell">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-5 bg-medical-success/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-9 h-9 text-medical-success" />
            </div>
            <h2 className="text-3xl font-semibold text-medical-trust mb-3">Thanks for reaching out!</h2>
            <p className="text-base text-muted-foreground mb-8">
              We received your request. Expect a confirmation and next steps within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                className="border-medical-accent text-medical-accent hover:bg-medical-accent hover:text-white"
                onClick={() => window.open("https://wa.me/91XXXXXXXXXX", "_blank")}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
              <Button className="bg-medical-accent hover:bg-medical-accent/90 text-white" onClick={() => setIsSubmitted(false)}>
                Submit another
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 lg:py-20 bg-gradient-to-b from-white via-neutral-50 to-white">
      <div className="section-shell">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-medical-accent/80">Contact</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-medical-trust">Talk with our team</h2>
          <p className="text-base lg:text-lg text-muted-foreground">Reach us directly or drop a note. We respond within one business day.</p>
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <Card className="border border-neutral-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardHeader className="space-y-2 pb-4">
              <CardTitle className="text-xl font-semibold text-medical-trust">Quick ways to reach us</CardTitle>
              <CardDescription className="text-base text-muted-foreground">Call, message, or schedule time that works for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-medical-accent/10 flex items-center justify-center text-medical-accent">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-medical-trust">Phone</p>
                    <p className="text-muted-foreground">+91 XXXXXXXXXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-medical-accent/10 flex items-center justify-center text-medical-accent">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-medical-trust">Email</p>
                    <p className="text-muted-foreground">hello@nexeagle.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-medical-accent/10 flex items-center justify-center text-medical-accent">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-medical-trust">Location</p>
                    <p className="text-muted-foreground">India (remote friendly)</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Button
                  className="w-full bg-medical-accent hover:bg-medical-accent/90 text-white"
                  onClick={() => {
                    window.open("tel:+91XXXXXXXXXX", "_self");
                  }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call us
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-medical-accent text-medical-accent hover:bg-medical-accent hover:text-white"
                  onClick={() => {
                    window.open("https://wa.me/91XXXXXXXXXX", "_blank");
                    if (typeof window !== "undefined" && (window as any).gtag) {
                      (window as any).gtag("event", "whatsapp_click", {
                        event_category: "engagement",
                        event_label: "contact_section",
                      });
                    }
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full border-neutral-300 text-medical-trust hover:bg-neutral-100"
                onClick={() => window.open("https://calendly.com/nexeagle", "_blank")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule via Calendly
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-neutral-200 bg-white/90 backdrop-blur-sm shadow-sm">
            <CardHeader className="space-y-2 pb-4">
              <CardTitle className="text-xl font-semibold text-medical-trust">Request a demo</CardTitle>
              <CardDescription className="text-base text-muted-foreground">Tell us a bit about you. We respond within one business day.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" name="name" required value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile *</Label>
                    <Input id="mobile" name="mobile" type="tel" required value={formData.mobile} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic">Clinic/Hospital Name *</Label>
                  <Input id="clinic" name="clinic" required value={formData.clinic} onChange={handleInputChange} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" name="city" required value={formData.city} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your current challenges or what you'd like to see in the demo..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-medical-accent hover:bg-medical-accent/90 text-white py-3.5 text-base font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Request a demo
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;

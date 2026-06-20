import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, X } from "lucide-react";

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section
      const heroHeight = window.innerHeight;
      const scrolled = window.scrollY > heroHeight * 0.8;
      setIsVisible(scrolled && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="bg-white border border-border rounded-2xl shadow-hover p-4">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-muted border border-border rounded-full flex items-center justify-center"
        >
          <X className="w-3 h-3" />
        </button>
        
        <div className="flex space-x-3">
          <Button
            className="flex-1 bg-medical-accent hover:bg-medical-accent/90 text-white py-3"
            onClick={scrollToContact}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Demo
          </Button>
          
          <Button
            variant="outline"
            className="flex-1 border-medical-accent text-medical-accent hover:bg-medical-accent hover:text-white py-3"
            onClick={() => window.open('https://wa.me/91XXXXXXXXXX', '_blank')}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
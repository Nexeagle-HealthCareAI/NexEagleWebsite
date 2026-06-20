import { MessageCircle } from "lucide-react";
import { useState } from "react";

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // WhatsApp business number
  const phoneNumber = "918074906808"; // Format: country code + number (no + or spaces)
  const message = encodeURIComponent("Hi! I'm interested in learning more about NexEagle products and services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat on WhatsApp"
      >
        {/* Tooltip */}
        <div
          className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg shadow-xl transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
          }`}
        >
          Chat with us on WhatsApp
          {/* Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-slate-900"></div>
          </div>
        </div>

        {/* Button */}
        <div className="relative">
          {/* Pulse animation */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-green-500/30 blur-xl rounded-full group-hover:bg-green-500/50 transition-all duration-300"></div>
          
          {/* Main button */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-600/50 group-hover:scale-110 group-hover:shadow-green-600/70 transition-all duration-300">
            <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>

          {/* Notification badge (optional - can show unread count) */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-bounce">
            1
          </div>
        </div>
      </a>
    </>
  );
};

export default WhatsAppButton;

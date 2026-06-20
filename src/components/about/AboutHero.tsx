import { useState, useEffect } from "react";

const AboutHero = () => {
  const targetText = "NexEaglians building the future of healthcare.";
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing phase
        if (typedText.length < targetText.length) {
          setTypedText((prev) => prev + targetText.charAt(prev.length));
        } else {
          // Pause at the end before erasing
          timer = setTimeout(() => setIsDeleting(true), 3000);
        }
      } else {
        // Erasing phase
        if (typedText.length > 0) {
          setTypedText((prev) => prev.slice(0, -1));
        } else {
          // Pause briefly at the start before typing again
          timer = setTimeout(() => setIsDeleting(false), 500);
        }
      }
    };

    const speed = isDeleting ? 30 : 60;
    timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting]);

  const renderTypedContent = () => {
    if (typedText.length <= 11) {
      return (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-sky">
          {typedText}
        </span>
      );
    }
    return (
      <span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-sky">
          {typedText.slice(0, 11)}
        </span>
        {typedText.slice(11)}
      </span>
    );
  };

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white pt-32 pb-20 select-none">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10 px-6 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto text-center">
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.2] min-h-[80px] flex items-center justify-center">
            <span className="inline-flex items-center text-center">
              {renderTypedContent()}
              <span className="text-brand-sky animate-[pulse_1.2s_infinite] ml-1 font-light">|</span>
            </span>
          </h1>

        </div>
      </div>
      
    </section>
  );
};

export default AboutHero;

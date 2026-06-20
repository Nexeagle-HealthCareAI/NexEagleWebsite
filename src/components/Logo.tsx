import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  textSize?: string;
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  iconOnly = false,
  textSize = "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
  textColor = "text-foreground"
}) => {
  return (
    <div className={`flex items-center gap-0.5 sm:gap-1 ${className}`}>
      <img 
        src="/assets/logo.webp" 
        alt="NEXEAGLE Logo" 
        className="w-24 h-24 sm:w-28 sm:h-28 object-contain select-none -mr-4 sm:-mr-6" 
        fetchPriority="high"
        decoding="async"
      />
      
      {!iconOnly && (
        <span className={`${textSize} ${textColor} font-extrabold tracking-tight font-display select-none`}>
          NEXEAGLE
        </span>
      )}
    </div>
  );
};

export default Logo;

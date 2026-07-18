import React from 'react';
import Image from 'next/image';

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
      <Image
        src="/assets/logo.webp"
        alt="NexEagle Logo"
        width={80}
        height={80}
        className="w-16 h-16 sm:w-20 sm:h-20 max-h-full object-contain select-none -mr-2.5 sm:-mr-4"
        priority
      />
      
      {!iconOnly && (
        <div className="flex flex-col justify-center select-none">
          <span className={`${textSize} ${textColor} font-extrabold tracking-tight font-display leading-[0.9]`}>
            NexEagle
          </span>
          <span className="text-[7px] sm:text-[9px] md:text-[10px] tracking-[0.14em] font-bold text-brand-sky uppercase mt-1 leading-[0.9]">
            Healthcare Excellence
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;

import React from 'react';
import { cn } from '@/lib/utils';
import './LiquidButton.css';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'lg' | 'sm';
}

const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ children, className, variant = 'primary', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'liquid-button',
          `liquid-button-${variant}`,
          `liquid-button-${size}`,
          className
        )}
        {...props}
      >
        <span className="liquid-content">{children}</span>
        <div className="liquid-container">
          <svg className="liquid-svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
          <div className="liquid-blob"></div>
        </div>
      </button>
    );
  }
);

LiquidButton.displayName = 'LiquidButton';

export { LiquidButton };

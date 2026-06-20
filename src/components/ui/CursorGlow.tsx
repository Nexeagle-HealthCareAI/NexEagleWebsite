import { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glowEl = glowRef.current;
    if (!glowEl) return;

    // Set initial values to prevent flickering
    glowEl.style.setProperty('--mouse-x', '-999px');
    glowEl.style.setProperty('--mouse-y', '-999px');
    glowEl.style.setProperty('--opacity', '0.08');

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isPointer = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button';

      glowEl.style.setProperty('--mouse-x', `${e.clientX}px`);
      glowEl.style.setProperty('--mouse-y', `${e.clientY}px`);
      glowEl.style.setProperty('--opacity', isPointer ? '0.15' : '0.08');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(20, 184, 166, var(--opacity, 0.08)), transparent 40%)`,
      }}
    />
  );
};

export default CursorGlow;

import React, { useEffect, useRef, ReactElement } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactElement;
}

export default function Magnetic({ children }: MagneticProps) {
  // We type the ref as generic HTMLElement
  const magnetic = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = magnetic.current;
    if (!element) return;

    // GSAP QuickTo is much faster than standard .to() for mouse movement
    const xTo = gsap.quickTo(element, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
    const yTo = gsap.quickTo(element, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      
      // Calculate distance from center
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Move the element 
      // 0.35 is the "strength" - higher = more movement, lower = stiffer
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      // Snap back to center
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Clone the child element to attach the ref directly to it
  // This avoids adding an extra <div> wrapper which could break layout
  return React.cloneElement(children, { ref: magnetic });
}
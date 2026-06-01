import { useEffect, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const circleRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isAnimating = useRef(false);

  useEffect(() => {
    const isTouchDevice = typeof window !== 'undefined' && 
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (isTouchDevice) return; // Exit cleanly inside the effect on touch screens

    // Dynamically apply cursor hide styling only once cursor JS is ready
    document.documentElement.classList.add('custom-cursor-active');

    let animId;
    
    function animate() {
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;

      // Trailing inertia physics calculation for smooth follow delay
      pos.current.x += dx * 0.15;
      pos.current.y += dy * 0.15;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      // Check if trailing circle has fully caught up (within 0.05 pixel threshold)
      if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
        pos.current.x = target.current.x;
        pos.current.y = target.current.y;
        if (circleRef.current) {
          circleRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
        }
        isAnimating.current = false;
        return; // Put loop to sleep!
      }

      animId = requestAnimationFrame(animate);
    }

    const handleMove = (e) => {
      // Instant positioning and visibility for the leading dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate3d(-50%, -50%, 0)`;
        if (dotRef.current.style.opacity !== '1' && !dotRef.current.classList.contains('cursor-hover')) {
          dotRef.current.style.opacity = '1';
        }
      }
      // Target position for trailing physics circle
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (circleRef.current && circleRef.current.style.opacity !== '1') {
        circleRef.current.style.opacity = '1';
      }

      // Dynamic Wake-up: Only request next frame if loop is currently asleep
      if (!isAnimating.current) {
        isAnimating.current = true;
        animate();
      }
    };

    const handleLeave = () => {
      if (circleRef.current) circleRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const handleEnter = () => {
      if (circleRef.current) circleRef.current.style.opacity = '1';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    // High-performance Event Delegation for mouse hovers on interactive components
    const handleOver = (e) => {
      const isInteractive = e.target.closest('a, button, [role="button"], .venture-card, .expertise-card, .collab-chip, .role-tag, .contact-link, .theme-toggle-minimal, .orbit-node');
      if (isInteractive) {
        circleRef.current?.classList.add('cursor-hover');
        dotRef.current?.classList.add('cursor-hover');
      } else {
        circleRef.current?.classList.remove('cursor-hover');
        dotRef.current?.classList.remove('cursor-hover');
      }
    };

    document.addEventListener('mouseover', handleOver);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      document.documentElement.classList.remove('custom-cursor-active');
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseover', handleOver);
    };
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (isTouchDevice) return null; // Safe to return null below hook calls!

  return (
    <>
      <div className="custom-cursor-dot" ref={dotRef} />
      <div className="custom-cursor-circle" ref={circleRef}>
        <span className="cursor-dollar">$</span>
      </div>
    </>
  );
}

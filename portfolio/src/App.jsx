import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gitex from './components/Gitex';
import Gallery from './components/Gallery';
import HuddleGallery from './components/HuddleGallery';
import MentoringGallery from './components/MentoringGallery';
import Ventures from './components/Ventures';
import Expertise from './components/Expertise';
import Education from './components/Education';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ParticleCanvas from './components/ParticleCanvas';
import CustomCursor from './components/CustomCursor';
import SaasModels from './components/SaasModels';
import DottedPath from './components/DottedPath';
import LaunchScreen from './components/LaunchScreen';
import AdminDashboard from './components/AdminDashboard';
import { ThemeProvider } from './ThemeContext';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin');

  // Listen for private routing trigger hashchanges
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Disable browser default scroll restoration on reload
    if ('history' in window) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top instantly on initial mount/refresh if not visiting operations
    if (window.location.hash !== '#admin') {
      window.scrollTo(0, 0);
    }

    // Clear navigation hashes on initial load so reload doesn't jump, except for operational console
    if (window.location.hash && window.location.hash !== '#admin') {
      window.history.replaceState(null, null, ' ');
    }

    // Initialize Lenis hyper-smooth kinetic scroll (lag-free, hardware accelerated)
    // Only initialize if we are on the public facing pages (not the dashboard console)
    if (window.location.hash !== '#admin') {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // smooth cubic easeOutExpo
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        syncTouch: false, // Let touchscreens use native scroll momentum for 0-lag responsiveness
        touchInertia: 0.8,
        infinite: false,
      });

      window.lenis = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
        window.lenis = null;
      };
    }
  }, [isAdmin]);

  return (
    <ThemeProvider>
      <CustomCursor />
      {isAdmin ? (
        <AdminDashboard />
      ) : (
        <>
          <LaunchScreen />
          <Navbar />
          <div className="app-main-container" style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
            <ParticleCanvas />
            <SaasModels />
            <DottedPath />
            <Hero />
            <About />
            <Gitex />
            <Gallery />
            <MentoringGallery />
            <HuddleGallery />
            <Ventures />
            <Expertise />
            <Education />
            <Testimonials />
            <Contact />
          </div>
        </>
      )}
      <Analytics />
    </ThemeProvider>
  );
}


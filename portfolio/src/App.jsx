import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gitex from './components/Gitex';
import Gallery from './components/Gallery';
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
import { ThemeProvider } from './ThemeContext';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  useEffect(() => {
    // Disable browser default scroll restoration on reload
    if ('history' in window) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top instantly on initial mount/refresh
    window.scrollTo(0, 0);

    // Clear hash (e.g. #ventures) so reload doesn't jump away from Hero
    if (window.location.hash) {
      window.history.replaceState(null, null, ' ');
    }

    // Initialize Lenis hyper-smooth kinetic scroll (lag-free, hardware accelerated)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // springy cubic easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
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
  }, []);

  return (
    <ThemeProvider>
      <LaunchScreen />
      <CustomCursor />
      <div className="app-main-container" style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
        <ParticleCanvas />
        <SaasModels />
        <DottedPath />
        <Navbar />
        <Hero />
        <About />
        <Gitex />
        <Gallery />
        <Ventures />
        <Expertise />
        <Education />
        <Testimonials />
        <Contact />
      </div>
      <Analytics />
    </ThemeProvider>
  );
}

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
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
  return (
    <ThemeProvider>
      <LaunchScreen />
      <CustomCursor />
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
        <ParticleCanvas />
        <SaasModels />
        <DottedPath />
        <Navbar />
        <Hero />
        <About />
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

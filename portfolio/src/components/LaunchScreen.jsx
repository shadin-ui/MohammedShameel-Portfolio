import { useEffect, useState } from 'react';
import './LaunchScreen.css';

export default function LaunchScreen() {
  const [percent, setPercent] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Elegant frame-by-frame progress charging simulation
    const startTime = Date.now();
    const duration = 1800; // 1.8s load cycle

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setPercent(progress);

      if (progress >= 100) {
        clearInterval(interval);
        // Trigger smooth slide out & blur transition
        setTimeout(() => {
          setIsFading(true);
          document.body.classList.add('loaded');
          // Unmount cleanly from DOM after animation completes
          setTimeout(() => {
            setShouldRender(false);
          }, 800);
        }, 300);
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`launch-screen-overlay ${isFading ? 'slide-up-fade' : ''}`}>
      <div className="launch-glow" />
      <div className="launch-noise" />

      <div className="launch-content">


        {/* Text Details */}
        <h1 className="launch-title">MOHAMMED SHAMEEL</h1>
        <p className="launch-subtitle">Venture Operator · System Builder</p>

        {/* Sleek Charging Progress Bar */}
        <div className="launch-progress-container">
          <div className="launch-progress-bar" style={{ width: `${percent}%` }} />
        </div>

        <div className="launch-status-row">
          <span className="launch-status-text">
            {percent < 100 ? 'INITIALIZING ECOSYSTEM OPERATIONS...' : 'SYSTEM READY'}
          </span>
          <span className="launch-percent">{percent}%</span>
        </div>
      </div>
    </div>
  );
}

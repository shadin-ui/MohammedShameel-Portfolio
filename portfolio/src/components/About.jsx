import { useScrollReveal } from '../hooks';
import lynqIcon from '../assets/icon lynq.png';
import './About.css';

const ROLES = [
  'Venture Operator',
  'Ecosystem Builder',
  'CSO / Strategy Lead',
  'Partnerships Strategist',
  'Venture Growth Strategist',
  'Strategic Advisor',
  'Market Expansion Strategist',
  'Founder’s Office'
];

export default function About() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [textRef, textVisible] = useScrollReveal();
  const [visualRef, visualVisible] = useScrollReveal();

  return (
    <section className="about" id="about">
      <div className="container">
        <div
          className={`about-header reveal ${headerVisible ? 'visible' : ''}`}
          ref={headerRef}
        >
          <span className="section-tag">Who I Am</span>
          <h2>
            System Builder<br />
            <span className="text-gradient">Inside Ecosystems</span>
          </h2>
        </div>

        <div className="about-grid">
          <div
            className={`about-text reveal ${textVisible ? 'visible' : ''}`}
            ref={textRef}
          >
            <p className="about-lead">
              I don't just focus on a single product or startup. Instead, I design and run the broader systems that allow whole ecosystems of startups to thrive. I love helping founders find clarity amidst chaos, put standard structures in place, and tap into networks that truly move the needle.
            </p>
            <p>
              Operating under <strong>LYNQ Capital</strong>, I sit right at the intersection of founders, investors, and active operators. I don't just offer high-level advice; I build structured operational engines that carry startups from their earliest stages straight through to successful, repeatable execution.
            </p>
            <p>
              Rather than working as a single-specialty vertical expert, my strength lies in <em>orchestration—bridging gaps, streamlining workflows, and creating high-leverage growth networks</em>.
            </p>

            <div className="role-tags">
              {ROLES.map((role) => (
                <span className="role-tag" key={role}>{role}</span>
              ))}
            </div>
          </div>

          <div
            className={`about-visual reveal ${visualVisible ? 'visible' : ''}`}
            ref={visualRef}
          >
            <div className="orbit-system">
              <div className="orbit-center">
                <img src={lynqIcon} className="orbit-center-logo" alt="LYNQ" />
              </div>
              <div className="orbit-ring orbit-ring-1">
                {["Strategy", "Operations", "GTM & Market Expansion", "Venture Scaling", "Founders"].map((node, i, arr) => {
                  const angle = (i / arr.length) * 360;
                  const rad = (angle - 90) * (Math.PI / 180);
                  const left = 50 + 50 * Math.cos(rad);
                  const top = 50 + 50 * Math.sin(rad);
                  return (
                    <span key={node} className="orbit-node node-ring-1" style={{ left: `${left}%`, top: `${top}%` }}>
                      {node}
                    </span>
                  );
                })}
              </div>
              <div className="orbit-ring orbit-ring-2">
                {["Investors", "Partners", "Networks", "Process Architecture", "Supply Chain & Infrastructure", "Technology Integration", "Deal Flow"].map((node, i, arr) => {
                  const angle = (i / arr.length) * 360;
                  const rad = (angle - 90) * (Math.PI / 180);
                  const left = 50 + 50 * Math.cos(rad);
                  const top = 50 + 50 * Math.sin(rad);
                  return (
                    <span key={node} className="orbit-node node-ring-2" style={{ left: `${left}%`, top: `${top}%` }}>
                      {node}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

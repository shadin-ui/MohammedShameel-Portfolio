import { useScrollReveal } from '../hooks';
import lynqIcon from '../assets/icon lynq.png';
import './About.css';

const ROLES = ['CSO', 'Venture Operator', 'Ecosystem Builder', 'Strategic Advisor'];

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
              I'm not focused on a single startup or product. I operate as a{' '}
              <strong>system builder inside ecosystems</strong>, helping startups
              gain clarity, structure, visibility, and access to networks that
              accelerate growth.
            </p>
            <p>
              Working at the intersection of startups, investors, and execution
              systems. I operate under <strong>LYNQ Capital</strong>, focusing
              on building structured support systems for early-stage founders.
              My approach combines strategy, operations, and network activation
              to help startups move from idea to execution.
            </p>
            <p>
              My core strength lies in{' '}
              <em>connecting people, structuring operations, and building growth
                systems</em>{' '}
              rather than execution in a single vertical.
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
                <span className="orbit-node">Strategy</span>
                <span className="orbit-node">Operations</span>
              </div>
              <div className="orbit-ring orbit-ring-2">
                <span className="orbit-node">Founders</span>
                <span className="orbit-node">Investors</span>
                <span className="orbit-node">Partners</span>
                <span className="orbit-node">Networks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

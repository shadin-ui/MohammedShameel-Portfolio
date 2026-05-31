import { useScrollReveal } from '../hooks';
import './Expertise.css';

const ITEMS = [
  {
    title: 'Startup Ecosystem Building',
    desc: 'Creating interconnected networks of founders, investors, mentors, and resources that compound value across the entire ecosystem.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  },
  {
    title: 'Founder–Investor Connections',
    desc: 'Building systematic bridges between early-stage founders and the right investors, creating high-signal deal flow for both sides.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    title: 'Operations Structuring',
    desc: 'Designing execution systems and operational frameworks that bring order, clarity, and scalability to growing ventures.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>,
  },
  {
    title: 'Strategic Partnerships',
    desc: 'Crafting high-impact sponsorship operations and strategic alliances that open doors to new markets and capital.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  },
  {
    title: 'Early-Stage Advisory',
    desc: 'Hands-on incubation support and strategic guidance for startups navigating from idea to product-market fit.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  },
  {
    title: 'Multi-Venture Coordination',
    desc: 'Portfolio-level thinking — managing across multiple ventures, creating synergies between portfolio companies.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  },
  {
    title: 'Media & Reach',
    desc: 'Represented Kerala\'s startup ecosystem on global stages like GITEX Dubai — driving media presence, thought leadership, and cross-border narrative building.',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
    gitex: true,
  },
];

export default function Expertise() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="expertise" id="expertise">
      <div className="container">
        <div
          className={`expertise-header reveal ${headerVisible ? 'visible' : ''}`}
          ref={headerRef}
        >
          <span className="section-tag">Core Expertise</span>
          <h2>
            What I <span className="text-gradient">Bring to the Table</span>
          </h2>
        </div>

        <div className="expertise-grid">
          {ITEMS.map((item, i) => (
            <ExpertiseCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseCard({ item, index }) {
  const [ref, visible] = useScrollReveal();
  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={ref}
      className={`expertise-card reveal reveal-delay-${Math.min(index + 1, 5)} ${visible ? 'visible' : ''}`}
    >
      <span className="expertise-number">{num}</span>
      <div className="expertise-icon">{item.icon}</div>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
    </div>
  );
}

import { useState, useEffect } from 'react';

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 6);
    }, 4500); // Rotate automatically every 4.5 seconds
    return () => clearInterval(interval);
  }, [isHovered]);

  const servicesList = [
    {
      title: 'Web Experiences',
      desc: 'Modern websites designed for performance and responsiveness.',
      glow: 'rgba(6, 182, 212, 0.15)', // Cyan glow
      tags: ['HTML5/CSS3', 'Modern JS', 'Vite', 'SEO'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    },
    {
      title: 'Digital Solutions',
      desc: 'Applications that solve real problems with clean functionality.',
      glow: 'rgba(168, 85, 247, 0.15)', // Purple glow
      tags: ['React 19', 'State API', 'REST JSON', 'Logical Flow'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      )
    },
    {
      title: 'Interactive Interfaces',
      desc: 'User experiences focused on design and usability.',
      glow: 'rgba(236, 72, 153, 0.15)', // Pink glow
      tags: ['GSAP FX', 'Framer Motion', 'Micro-FX', 'UI/UX Design'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.02105 19.1625 5.0931 19.3908 5.04505 19.6172L4.8 20.8C4.71818 21.1856 5.01439 21.5 5.4 21.5H12Z" />
          <circle cx="7.5" cy="10.5" r="1.5" fill="var(--accent-pink)" />
          <circle cx="11.5" cy="7.5" r="1.5" fill="var(--accent-pink)" />
          <circle cx="16.5" cy="9.5" r="1.5" fill="var(--accent-pink)" />
          <circle cx="15.5" cy="14.5" r="1.5" fill="var(--accent-pink)" />
        </svg>
      )
    },
    {
      title: 'Scalable Systems',
      desc: 'Backend architectures built for growth and performance.',
      glow: 'rgba(99, 102, 241, 0.15)', // Indigo glow
      tags: ['Node.js', 'Express API', 'SQL/NoSQL', 'Scale Architecture'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-indigo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    },
    {
      title: 'Modern Applications',
      desc: 'Full stack products using current technologies.',
      glow: 'rgba(168, 85, 247, 0.15)', // Purple glow
      tags: ['MERN Stack', 'Next.js SDK', 'Firebase Dev', 'Redux Store'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    },
    {
      title: 'Responsive Platforms',
      desc: 'Experiences optimized for every screen size.',
      glow: 'rgba(6, 182, 212, 0.15)', // Cyan glow
      tags: ['Flex/Grid', 'Fluid Layouts', 'Mobile-First', 'Screen Adaptive'],
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + servicesList.length) % servicesList.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % servicesList.length);
  };

  return (
    <section className="services-section" id="services">
      <div className="section-header">
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> What I Create
        </div>
        <h2 className="section-title">
          My <span className="text-gradient">Offerings</span>
        </h2>
        <p className="section-desc">
          Building state-of-the-art digital assets designed for ultimate engagement and growth.
        </p>
      </div>

      <div 
        className="services-carousel-view"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="services-carousel-container">
          {servicesList.map((service, idx) => {
            const count = servicesList.length;
            let offset = idx - activeIndex;

            // Handle circular wrapping for a continuous infinite loop
            if (offset < -count / 2) offset += count;
            if (offset > count / 2) offset -= count;

            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            // Compute precise 3D transforms based on relative offset
            const translate3d = `translate3d(
              calc(-50% + ${offset} * var(--carousel-spacing)), 
              -50%, 
              ${-absOffset * 110}px
            )`;
            const rotateY = `rotateY(${offset * -28}deg)`;
            const scale = `scale(${1 - absOffset * 0.08})`;

            const inlineStyle = {
              transform: `${translate3d} ${rotateY} ${scale}`,
              opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.35,
              zIndex: 10 - absOffset,
              pointerEvents: isActive ? 'auto' : (absOffset === 1 ? 'auto' : 'none'),
              '--card-glow-color': service.glow
            };

            return (
              <div
                key={idx}
                className={`glass-panel service-carousel-card ${isActive ? 'active-card' : ''}`}
                style={inlineStyle}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="service-icon-bg">
                  {service.icon}
                </div>
                
                <h3 className="service-title">{service.title}</h3>
                <p className="service-card-desc" style={{ marginBottom: '16px' }}>{service.desc}</p>

                {/* Styled Technical Badges/Tags for added detail */}
                <div className="service-tags">
                  {service.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="service-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="carousel-controls">
          <button className="carousel-btn" onClick={handlePrev} aria-label="Previous service">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          <div className="carousel-dots">
            {servicesList.map((_, idx) => (
              <div
                key={idx}
                className={`carousel-dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>

          <button className="carousel-btn" onClick={handleNext} aria-label="Next service">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;

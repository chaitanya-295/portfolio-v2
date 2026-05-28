import React, { useState, useEffect } from 'react';
import projectsList from '../data/projects';

// ==========================================
// 1. HERO COMPONENT (Default Export)
// ==========================================
const Hero = () => {
  const phrases = [
    "Full Stack Developer",
    "Creative Problem Solver",
    "UI/UX Designer",
    "Creative Developer"
  ];
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(80);
      }

      if (!isDeleting && currentText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(400);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <div className="hero-tagline">
          <span className="pulse-dot"></span>
          <span>👋 Hello, I'm</span>
        </div>

        <h1 className="hero-title">
          <span className="text-gradient">Chaitanya</span>
        </h1>

        <h2 style={{ fontSize: '24px', color: 'var(--accent-cyan)', fontWeight: '600', marginBottom: '24px', letterSpacing: '-0.5px', minHeight: '36px', display: 'flex', alignItems: 'center' }}>
          <span>{currentText}</span>
          <span className="typewriter-cursor">|</span>
        </h2>

        <p className="hero-desc">
          Full Stack Developer & Creative Problem Solver focused on building responsive websites, modern interfaces, and digital experiences.
        </p>

        <div className="hero-actions" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#resume" className="btn-secondary">
            Download Resume
          </a>
          <a href="#footer" className="btn-secondary">
            Contact Me
          </a>
        </div>
        <div className="social-icons">
          {/* GitHub */}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>

          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          {/* Email */}
          <a href="mailto:chaitanyakamble2005@gmail.com" className="social-icon-btn" aria-label="Email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="galaxy-container">
          {/* Glowing Galaxy Core */}
          <div className="core-glow"></div>

          {/* Orbiting Ring Systems */}
          <div className="cosmic-ring-1"></div>
          <div className="cosmic-ring-2"></div>
          <div className="cosmic-ring-3"></div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 2. ABOUT COMPONENT
// ==========================================
export const About = () => {
  const stats = [
    { value: '3+', label: 'Years of Coding' },
    { value: '20+', label: 'Projects Built' },
    { value: '100%', label: 'Devoted to Code' },
  ];

  return (
    <section className="about-section" id="about">
      <div className="section-header reveal-on-scroll reveal-fade-up">
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> Biography
        </div>
        <h2 className="section-title">
          The Person <span className="text-gradient">Behind The Screen</span>
        </h2>
        <p className="section-desc">
          Bridging Innovation & User Experience
        </p>
      </div>

      <div className="about-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
        {/* Philosophy/Bio Panel */}
        <div className="about-bio-panel glass-panel reveal-on-scroll reveal-fade-left delay-100" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div className="bio-glow-effect"></div>
          <p className="bio-text" style={{ fontSize: '20px', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '32px', fontWeight: '400' }}>
            I create modern digital solutions by combining thoughtful design, clean development practices, and creative problem solving.
          </p>

          <a
            href="#/about-detail"
            className="btn-secondary"
            style={{ display: 'inline-flex', padding: '12px 28px', fontSize: '15px', textDecoration: 'none' }}
          >
            Explore My Story
          </a>
        </div>
        <div className="stats-container reveal-on-scroll reveal-fade-right delay-200">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 3. SERVICES COMPONENT
// ==========================================
export const Services = () => {
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
      <div className="section-header reveal-on-scroll reveal-fade-up">
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
        className="services-carousel-view reveal-on-scroll reveal-fade-left delay-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="services-carousel-container">
          {servicesList.map((service, idx) => {
            const count = servicesList.length;
            let offset = idx - activeIndex;

            if (offset < -count / 2) offset += count;
            if (offset > count / 2) offset -= count;

            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            const translate3d = `translate3d(
              calc(-50% + ${offset} * var(--carousel-spacing)), 
              -50%, 
              ${-absOffset * 110}px
            )`;
            const rotateY = `rotateY(${offset * -28}deg)`;
            const scale = `scale(${1 - absOffset * 0.08})`;

            const inlineStyle = {
              transform: `${translate3d} ${rotateY} ${scale}`,
              opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.2,
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

// ==========================================
// 4. PROJECTS COMPONENT
// ==========================================
export const Projects = () => {
  const displayedProjects = projectsList.slice(0, 3);

  return (
    <section className="projects-section" id="projects">
      <div className="section-header reveal-on-scroll reveal-fade-up">
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> Projects
        </div>
        <h2 className="section-title">
          Things I've <span className="text-gradient">Built</span>
        </h2>
        <p className="section-desc">
          A showcase of interactive web systems, spatial physics engines, and custom telemetry interfaces.
        </p>
      </div>

      <div className="projects-grid">
        {displayedProjects.map((project, idx) => (
          <a
            href={`#/project-detail/${project.id}`}
            key={idx}
            className={`glass-panel project-card reveal-on-scroll ${idx % 3 === 0 ? 'reveal-fade-left' : idx % 3 === 2 ? 'reveal-fade-right' : 'reveal-fade-up'} delay-${((idx % 3) + 1) * 100}`}
            style={{ 
              '--project-glow': project.glow,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            {project.image && (
              <div className="project-image-wrapper" style={{ width: '100%', height: '170px', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', position: 'relative' }}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                  className="project-card-image"
                />
              </div>
            )}

            <div style={{ width: '100%' }}>
              <span className="project-category" style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-cyan)', fontWeight: '600' }}>
                {project.category}
              </span>
              <h3 className="project-title" style={{ fontSize: '18px', marginTop: '6px', marginBottom: '8px' }}>
                {project.title}
              </h3>
              <p className="project-desc-text" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px', minHeight: '58px' }}>
                {project.desc}
              </p>
            </div>

            <div className="project-tags-list" style={{ marginBottom: '16px' }}>
              {project.tags.map((tag, tagIdx) => (
                <span key={tagIdx} className="project-tag-item" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '2px 8px', borderRadius: '8px', fontSize: '10px' }}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="project-footer" style={{ width: '100%', marginTop: 'auto' }}>
              <span className="project-link-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                Explore Project
                <svg className="project-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease', opacity: 0.8 }}>
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="projects-actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
        <a
          href="#/projects"
          className="btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '12px 28px', fontSize: '15px' }}
        >
          View All Projects
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
    </section>
  );
};

// ==========================================
// 5. TESTIMONIALS COMPONENT
// ==========================================
export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonialsList = [
    {
      name: 'Sarah Connor',
      role: 'CTO',
      company: 'CyberTech Systems',
      text: "Chaitanya's WebGL planetary simulator exceeded our expectations. The orbital physics details, high-performance shading, and visual fidelity were absolutely top-notch.",
      rating: 5,
      avatar: 'SC',
      glow: 'rgba(6, 182, 212, 0.15)' // Cyan glow
    },
    {
      name: 'David Miller',
      role: 'Product Lead',
      company: 'StellarAnalytics',
      text: 'The cosmic telemetry dashboard he built was stunning. Our real-time data flow integrates perfectly, and the user interaction is exceptionally smooth. Exceptional work!',
      rating: 5,
      avatar: 'DM',
      glow: 'rgba(236, 72, 153, 0.15)' // Pink glow
    },
    {
      name: 'Elena Rostova',
      role: 'Co-Founder',
      company: 'Nebula Web3',
      text: 'An outstanding full-stack developer. Chaitanya integrated our Ethereum smart contracts and custom GLSL shaders seamlessly, launching our minting portal ahead of schedule.',
      rating: 5,
      avatar: 'ER',
      glow: 'rgba(168, 85, 247, 0.15)' // Purple glow
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsList.length);
  };

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-header reveal-on-scroll reveal-fade-up">
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> Testimonials
        </div>
        <h2 className="section-title">
          What Clients <span className="text-gradient">Say</span>
        </h2>
        <p className="section-desc">
          Real feedback from product teams, startup founders, and technical directors.
        </p>
      </div>

      <div className="testimonials-carousel-view reveal-on-scroll reveal-fade-right delay-100">
        <div className="testimonials-carousel-container">
          {testimonialsList.map((item, idx) => {
            const count = testimonialsList.length;
            let offset = idx - activeIndex;

            if (offset < -count / 2) offset += count;
            if (offset > count / 2) offset -= count;

            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            const translate = `translate(calc(-50% + ${offset} * var(--t-carousel-spacing)), -50%)`;
            const scale = `scale(${1 - absOffset * 0.1})`;

            const inlineStyle = {
              transform: `${translate} ${scale}`,
              opacity: absOffset > 1 ? 0 : 1 - absOffset * 0.2,
              zIndex: 10 - absOffset,
              pointerEvents: isActive ? 'auto' : 'none',
              '--testimonial-glow': item.glow
            };

            return (
              <div
                key={idx}
                className={`glass-panel testimonial-carousel-card ${isActive ? 'active-card' : ''}`}
                style={inlineStyle}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="testimonial-rating">
                  {[...Array(item.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="star-icon"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                <p className="testimonial-quote">“{item.text}”</p>

                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ '--avatar-glow': item.glow }}>
                    {item.avatar}
                  </div>
                  <div className="testimonial-meta">
                    <h4 className="testimonial-name">{item.name}</h4>
                    <p className="testimonial-role">
                      {item.role} @ <span className="text-gradient-purple">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="carousel-controls">
          <button className="carousel-btn" onClick={handlePrev} aria-label="Previous testimonial">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          <div className="carousel-dots">
            {testimonialsList.map((_, idx) => (
              <div
                key={idx}
                className={`carousel-dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>

          <button className="carousel-btn" onClick={handleNext} aria-label="Next testimonial">
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

// ==========================================
// 6. CTA COMPONENT
// ==========================================
export const Cta = () => {
  return (
    <section className="cta-section">
      <div className="glass-panel cta-banner reveal-on-scroll reveal-scale">
        <div className="cta-glow-effect"></div>
        <div className="cta-content">
          <h2 className="cta-title">
            Want to <br />
            <span className="text-gradient">Take Your Business Online?</span>
          </h2>
          <p className="cta-desc">
            Build a strong digital presence with modern design and smart solutions.
          </p>
          <div className="cta-actions">
            <a href="#services" className="btn-primary">
              Start Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#footer" className="btn-secondary">
              Let's Talk
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

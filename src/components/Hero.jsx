import { useState, useEffect } from 'react';

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

export default Hero;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <a href="#" className="footer-logo text-gradient">
            Chaitanya.
          </a>
          <p className="footer-tagline">
            Creating immersive digital experiences, interactive 3D graphics, and modern web application interfaces.
          </p>
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

        <div className="footer-nav">
          <h4 className="footer-title">Explore</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#/about-detail">About</a></li>
            <li><a href="#/projects">Projects</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#blogs">Blogs</a></li>
          </ul>
        </div>

        <div className="footer-nav">
          <h4 className="footer-title">Services</h4>
          <ul className="footer-links">
            <li><a href="#services">Web Experiences</a></li>
            <li><a href="#services">Digital Solutions</a></li>
            <li><a href="#services">Interactive Interfaces</a></li>
            <li><a href="#services">Scalable Systems</a></li>
          </ul>
        </div>

        <div className="footer-nav">
          <h4 className="footer-title">Contact</h4>
          <ul className="footer-links">
            <li style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href="mailto:chaitanyakamble2005@gmail.com" style={{ paddingLeft: 0, fontWeight: '600', color: 'white', fontSize: '17px' }}>Email Me</a>
              </div>
              <span style={{ fontSize: '15px', color: 'var(--text-secondary)', paddingLeft: '26px' }}>chaitanyakamble2005@gmail.com</span>
            </li>
            <li style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <a href="https://wa.me/919730593429" target="_blank" rel="noopener noreferrer" style={{ paddingLeft: 0, fontWeight: '600', color: 'white', fontSize: '17px' }}>WhatsApp</a>
              </div>
              <span style={{ fontSize: '15px', color: 'var(--text-secondary)', paddingLeft: '26px' }}>+91 97305 93429</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Chaitanya. All rights reserved.</p>
        <div className="footer-bottom-links" style={{ display: 'flex', gap: '16px', fontSize: '13.5px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <a href="#privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Privacy Policy</a>
          <span style={{ color: 'rgba(255, 255, 255, 0.1)' }}>|</span>
          <a href="#terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Terms of Service</a>
          <span style={{ color: 'rgba(255, 255, 255, 0.1)' }}>|</span>
          <button onClick={scrollToTop} className="back-to-top" aria-label="Back to top" style={{ fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            Back to Top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

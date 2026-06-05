import { useProfile } from '../data/profile';

const Footer = () => {
  const { profile } = useProfile();

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
            {profile.githubUrl && (
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            )}

            {/* LinkedIn */}
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            )}

            {/* Instagram */}
            {profile.instagramUrl && (
              <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            )}

            {/* WhatsApp */}
            <a href="https://wa.me/919730593429?text=Hi%20Chaitanya%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you%21" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.897 0c3.183.001 6.177 1.24 8.428 3.493 2.25 2.253 3.487 5.25 3.484 8.435-.005 6.573-5.33 11.897-11.9 11.897-1.998-.001-3.957-.502-5.707-1.458L0 24zm6.549-3.722c1.652.98 3.516 1.5 5.434 1.5 5.498 0 9.972-4.475 9.976-9.974.001-2.664-1.034-5.17-2.915-7.054C17.26 2.863 14.76 1.828 12.09 1.828 6.596 1.828 2.12 6.304 2.116 11.804c-.001 1.944.506 3.844 1.47 5.514l-.995 3.637 3.73-.977zm11.367-7.56c-.32-.16-1.89-.93-2.185-1.04-.294-.11-.51-.16-.723.16-.214.32-.828 1.04-1.014 1.25-.187.21-.374.24-.694.08-.32-.16-1.353-.5-2.578-1.593-.952-.85-1.594-1.9-1.782-2.22-.187-.32-.02-.49.14-.65.144-.144.32-.37.48-.56.16-.18.214-.3.32-.5.11-.2.05-.37-.03-.53-.08-.16-.723-1.74-.99-2.388-.26-.625-.526-.54-.723-.55-.186-.01-.4-.01-.613-.01-.214 0-.56.08-.854.4-.294.32-1.123 1.1-1.123 2.68 0 1.58 1.15 3.11 1.31 3.33.16.22 2.264 3.457 5.485 4.85.766.33 1.363.528 1.83.676.77.244 1.47.21 2.025.128.619-.092 1.89-.77 2.152-1.48.26-.71.26-1.32.18-1.45-.08-.13-.3-.21-.62-.37z"/>
              </svg>
            </a>

            {/* Email */}
            {profile.email && (
              <a href={`mailto:${profile.email}?subject=Project%20Inquiry&body=Hi%20Chaitanya%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you%21`} className="social-icon-btn" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            )}
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
            <li><a href="#/admin">Admin Panel</a></li>
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
                <a href={`mailto:${profile.email || 'chaitanyakamble2005@gmail.com'}?subject=Project%20Inquiry&body=Hi%20Chaitanya%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you%21`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span style={{ fontWeight: '600', color: 'white', fontSize: '17px' }}>Email Me</span>
                </a>
              </div>
              <a href={`mailto:${profile.email || 'chaitanyakamble2005@gmail.com'}?subject=Project%20Inquiry&body=Hi%20Chaitanya%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you%21`} style={{ fontSize: '15px', color: 'var(--text-secondary)', paddingLeft: '26px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                {profile.email || 'chaitanyakamble2005@gmail.com'}
              </a>
            </li>
            <li style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <a href="https://wa.me/919730593429?text=Hi%20Chaitanya%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you%21" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-purple)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  <span style={{ fontWeight: '600', color: 'white', fontSize: '17px' }}>WhatsApp</span>
                </a>
              </div>
              <a href="https://wa.me/919730593429?text=Hi%20Chaitanya%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you%21" target="_blank" rel="noopener noreferrer" style={{ fontSize: '15px', color: 'var(--text-secondary)', paddingLeft: '26px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'white'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                +91 97305 93429
              </a>
            </li>
            <li style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span style={{ fontWeight: '600', color: 'white', fontSize: '17px' }}>Location</span>
              </div>
              <span style={{ fontSize: '15px', color: 'var(--text-secondary)', paddingLeft: '26px' }}>Pune, Maharashtra, India</span>
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

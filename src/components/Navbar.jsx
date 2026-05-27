import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar glass-panel">
      <a href="#" className="nav-logo text-gradient">
        Chaitanya.
      </a>
      <ul className={`nav-links ${isOpen ? 'mobile-active' : ''}`}>
        <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
        <li><a href="#/about-detail" onClick={() => setIsOpen(false)}>About</a></li>
        <li><a href="#projects" onClick={() => setIsOpen(false)}>Projects</a></li>
        <li><a href="#services" onClick={() => setIsOpen(false)}>Services</a></li>
        <li><a href="#blogs" onClick={() => setIsOpen(false)}>Blogs</a></li>
        <li><a href="#footer" onClick={() => setIsOpen(false)}>Contacts</a></li>
        <li className="mobile-only-cta" style={{ width: '100%', marginTop: '8px' }}>
          <a 
            href="#footer" 
            className="btn-secondary" 
            onClick={() => setIsOpen(false)} 
            style={{ padding: '10px 24px', fontSize: '14px', width: '100%', justifyContent: 'center', display: 'inline-flex' }}
          >
            Let's Talk
          </a>
        </li>
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="nav-cta desktop-only-cta">
          <a href="#footer" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '14px' }}>
            Let's Talk
          </a>
        </div>
        <button 
          className={`nav-toggle-btn ${isOpen ? 'open' : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

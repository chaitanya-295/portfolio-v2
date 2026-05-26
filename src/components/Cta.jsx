const Cta = () => {
  return (
    <section className="cta-section">
      <div className="glass-panel cta-banner">
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

export default Cta;

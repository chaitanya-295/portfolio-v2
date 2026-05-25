const About = () => {
  const stats = [
    { value: '3+', label: 'Years of Coding' },
    { value: '20+', label: 'Projects Built' },
    { value: '100%', label: 'Devoted to Code' },
  ];

  return (
    <section className="about-section" id="about">
      <div className="section-header">
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
        <div className="about-bio-panel glass-panel" style={{ textAlign: 'center', padding: '48px 32px' }}>
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
        <div className="stats-container">
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

export default About;

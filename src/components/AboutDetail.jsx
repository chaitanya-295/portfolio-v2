const AboutDetail = () => {
  const stats = [
    { value: '3+', label: 'Years of Coding' },
    { value: '20+', label: 'Projects Built' },
    { value: '100%', label: 'Devoted to Code' },
  ];

  const skills = [
    { name: 'Frontend Development', level: 95, color: 'var(--accent-cyan)' },
    { name: 'Backend & API Engineering', level: 88, color: 'var(--accent-purple)' },
    { name: 'Database & Systems', level: 85, color: 'var(--accent-pink)' },
    { name: 'Performance & Optimization', level: 90, color: 'var(--accent-indigo)' },
  ];

  return (
    <section className="about-section" id="about-detail" style={{ paddingTop: '140px', minHeight: '85vh' }}>
      <div className="section-header">
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> Full Story
        </div>
        <h2 className="section-title">
          Chaitanya <span className="text-gradient">Kamble</span>
        </h2>
        <p className="section-desc">
          A deep dive into my journey, technology stack, and philosophy.
        </p>
      </div>

      <div className="about-grid">
        {/* Left Column: Biography Details & Stats */}
        <div className="about-bio-panel glass-panel">
          <div className="bio-glow-effect"></div>
          <h3 className="bio-title">My Journey & Philosophy</h3>
          <p className="bio-text">
            I am a passionate Full Stack Developer and Creative Problem Solver. I specialize in designing and engineering high-performance web applications that merge stunning visuals with robust backend architectures. By combining interactive React frontends, smooth animations, and optimized server systems, I create digital experiences that are both beautiful and efficient.
          </p>
          <p className="bio-text">
            My focus is on writing clean, maintainable code, crafting pixel-perfect responsive layouts, and establishing reliable system architectures. Whether it's building interactive user interfaces or crafting complex API connections, I strive to turn ideas into seamless, cosmic-grade digital products.
          </p>
          <p className="bio-text">
            I don't just write code; I architect solutions that scale. I aim to bridge the gap between human intuition and technical execution to build interfaces that feel responsive and alive.
          </p>

          <div className="stats-container">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Skill Progress meters & Badges */}
        <div className="about-skills-panel glass-panel">
          <h3 className="skills-panel-title">Technical Skillset</h3>
          
          <div className="skills-list">
            {skills.map((skill, idx) => (
              <div key={idx} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${skill.color}, var(--accent-indigo))`,
                      boxShadow: `0 0 12px ${skill.color}`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <h4 className="skills-panel-title" style={{ fontSize: '16px', marginTop: '36px', marginBottom: '16px' }}>
            Technologies & Tools
          </h4>
          <div className="skills-badge-list" style={{ borderTop: 'none', paddingTop: 0 }}>
            <span className="skill-badge-item">JavaScript</span>
            <span className="skill-badge-item">Node.js</span>
            <span className="skill-badge-item">React 19</span>
            <span className="skill-badge-item">MongoDB</span>
            <span className="skill-badge-item">MySQL</span>
            <span className="skill-badge-item">Firebase</span>
            <span className="skill-badge-item">Git & GitHub</span>
            <span className="skill-badge-item">Vite</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
        <a 
          href="#/" 
          className="btn-primary" 
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </a>
      </div>
    </section>
  );
};

export default AboutDetail;

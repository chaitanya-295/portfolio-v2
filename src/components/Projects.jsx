const Projects = () => {
  const projectsList = [
    {
      title: '3D Solar System',
      category: 'Creative Dev / WebGL',
      desc: 'An interactive, physically accurate Three.js simulation of planetary orbits, gravitational gravity wells, and custom stellar materials.',
      tags: ['Three.js', 'WebGL', 'Physics Engine', 'React'],
      glow: 'rgba(6, 182, 212, 0.15)', // Cyan glow
      link: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      title: 'Cosmic Analytics',
      category: 'Data Science / Frontend',
      desc: 'Next-gen telemetry visualization dashboard plotting real-time dark matter streams, cosmic ray impacts, and system health graphs.',
      tags: ['React', 'Chart.js', 'WebSockets', 'Tailwind'],
      glow: 'rgba(236, 72, 153, 0.15)', // Pink glow
      link: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      title: 'Nebula Portal',
      category: 'Full-Stack / Web3',
      desc: 'A decentralized spatial portal enabling users to mint unique generative star systems and trade ownership via smart contracts.',
      tags: ['Solidity', 'Ethers.js', 'Node.js', 'GLSL Shaders'],
      glow: 'rgba(168, 85, 247, 0.15)', // Purple glow
      link: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      )
    }
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> Portfolio
        </div>
        <h2 className="section-title">
          Galactic <span className="text-gradient">Creations</span>
        </h2>
        <p className="section-desc">
          A showcase of interactive web systems, spatial physics engines, and custom telemetry interfaces.
        </p>
      </div>

      <div className="projects-grid">
        {projectsList.map((project, idx) => (
          <div
            key={idx}
            className="glass-panel project-card"
            style={{ '--project-glow': project.glow }}
          >
            <div className="project-header">
              <span className="project-category">{project.category}</span>
              <div className="project-icon-wrapper">{project.icon}</div>
            </div>

            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc-text">{project.desc}</p>

            <div className="project-tags-list">
              {project.tags.map((tag, tagIdx) => (
                <span key={tagIdx} className="project-tag-item">
                  {tag}
                </span>
              ))}
            </div>

            <div className="project-footer">
              <a href={project.link} className="project-link-btn">
                Launch Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

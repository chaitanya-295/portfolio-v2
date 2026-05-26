import { useState } from 'react';

const Projects = () => {
  const [showAll, setShowAll] = useState(false);

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
    },
    {
      title: 'Star Map Explorer',
      category: 'Astronomy / Data Vis',
      desc: 'Interactive 3D starmap rendering nearby stars and constellations using custom astronomical databases.',
      tags: ['Three.js', 'D3.js', 'Canvas', 'Astronomy API'],
      glow: 'rgba(99, 102, 241, 0.15)', // Indigo glow
      link: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-indigo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      )
    },
    {
      title: 'Event Horizon Raytracer',
      category: 'WebGL / Physics Shaders',
      desc: 'A real-time black hole raytracer demonstrating gravitational lensing effects on background starlight.',
      tags: ['GLSL', 'Shaders', 'React Three Fiber', 'Math.js'],
      glow: 'rgba(236, 72, 153, 0.15)', // Pink glow
      link: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10" />
          <path d="M12 6a6 6 0 1 0 6 6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      )
    },
    {
      title: 'Quantum Orbital Modeler',
      category: 'Rust / WebAssembly',
      desc: 'An electron orbital visualization modeling quantum probability clouds in real-time with WebAssembly.',
      tags: ['WebGL', 'WebAssembly', 'Rust', 'React'],
      glow: 'rgba(6, 182, 212, 0.15)', // Cyan glow
      link: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" transform="rotate(30 12 5)" />
          <ellipse cx="12" cy="5" rx="9" ry="3" transform="rotate(-30 12 5)" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    }
  ];

  const displayedProjects = showAll ? projectsList : projectsList.slice(0, 3);

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
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
                Explore Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="projects-actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
        <button
          className="btn-secondary"
          onClick={() => setShowAll(!showAll)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          {showAll ? 'See Less' : 'See More'}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: showAll ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s ease'
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Projects;

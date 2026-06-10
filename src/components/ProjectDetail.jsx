import React, { useState, useEffect } from 'react';
import projectsList, { useProjects } from '../data/projects';

const getEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) {
    return url;
  }
  let videoId = '';
  try {
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split(/[?#]/)[0];
    } else if (url.includes('youtube.com/watch')) {
      const urlParts = url.split('?');
      if (urlParts.length > 1) {
        const urlParams = new URLSearchParams(urlParts[1]);
        videoId = urlParams.get('v');
      }
    } else if (url.includes('youtube.com/v/')) {
      videoId = url.split('youtube.com/v/')[1].split(/[?#]/)[0];
    } else {
      videoId = url.trim();
    }
  } catch (e) {
    console.error('Failed to parse YouTube URL:', url, e);
    videoId = url;
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : '';
};

const ProjectDetail = () => {
  const { projects, loading } = useProjects();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (loading || projects.length === 0) return;

    const handleHashChange = () => {
      const hash = window.location.hash;
      // Parse the ID from hash like #/project-detail/0
      const parts = hash.split('/');
      const idStr = parts[parts.length - 1];
      const parsedId = parseInt(idStr, 10);

      const selectedProject = projects.find(p => p.id === parsedId);
      if (selectedProject) {
        setProject(selectedProject);
      } else {
        // Fallback to first project
        setProject(projects[0]);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on initial render

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [projects, loading]);

  if (loading || !project) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '90vh', paddingTop: '140px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderTopColor: 'var(--accent-purple)',
            animation: 'spin-slow 2s linear infinite'
          }}
        />
        <span style={{ marginTop: '16px', fontSize: '15px', color: 'var(--text-secondary)' }}>
          Loading project details...
        </span>
      </div>
    );
  }

  return (
    <section className="about-section project-detail-section" id="project-detail" style={{ paddingTop: '140px', minHeight: '90vh' }}>
      {/* Decorative dynamic ambient glow */}
      <div
        className="project-ambient-glow"
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${project.glow} 0%, rgba(0, 0, 0, 0) 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      ></div>

      <div className="section-header reveal-on-scroll reveal-fade-up visible" style={{ zIndex: 2 }}>
        <div className="services-badge" style={{ borderColor: project.color, color: project.color, background: project.glow }}>
          <span className="sparkle-spark">✦</span> {project.category}
        </div>
        <h2 className="section-title" style={{ fontSize: '56px', letterSpacing: '-1.5px', marginBottom: '8px' }}>
          {project.title}
        </h2>
        <p className="section-desc" style={{ fontSize: '18px', maxWidth: '700px' }}>
          {project.desc}
        </p>
      </div>

      {/* YouTube Video Walkthrough Panel */}
      {project.youtubeUrl && getEmbedUrl(project.youtubeUrl) && (
        <div className="glass-panel project-video-panel fade-in-up" style={{
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '1500px',
          margin: '0 auto 40px auto',
          zIndex: 2
        }}>
          <div
            className="bio-glow-effect"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${project.glow} 0%, rgba(0, 0, 0, 0) 70%)`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              zIndex: 1
            }}
          ></div>
          <div style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
            height: 0,
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: `0 15px 35px -5px ${project.glow || 'rgba(0, 0, 0, 0.4)'}`,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: '#040209',
            zIndex: 2
          }}>
            <iframe
              src={getEmbedUrl(project.youtubeUrl)}
              title={`${project.title} Video Demo`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
            ></iframe>
          </div>
        </div>
      )}

      <div className="project-detail-grid fade-in-up" style={{ zIndex: 2, position: 'relative' }}>

        {/* Left Column: Detailed Project Content (Overview) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

          {/* Detailed Biography Overview */}
          <div className="glass-panel about-bio-panel" style={{ padding: '48px' }}>
            <h3 className="bio-title">Project Overview</h3>
            <p className="bio-text" style={{ fontSize: '16.5px', lineHeight: '1.8' }}>
              {project.fullDesc}
            </p>

            <h3 className="bio-title" style={{ marginTop: '40px', marginBottom: '20px' }}>Key Features</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {project.features.map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  <span style={{ color: project.color, marginTop: '3px', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>        {/* Right Column: Visual Icon, Meta Data & Project Actions (Showcase/Meta) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>

          {/* Project Details / Metadata Card */}
          <div className="glass-panel project-meta-panel" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '24px' }}>Project Information</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>Role</span>
                <span style={{ fontSize: '14.5px', color: 'white', fontWeight: '600' }}>{project.role}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>Timeline</span>
                <span style={{ fontSize: '14.5px', color: 'white', fontWeight: '600' }}>{project.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px' }}>
                <span style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>Status</span>
                <span style={{ fontSize: '14.5px', color: project.color, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: project.color, boxShadow: `0 0 8px ${project.color}`, display: 'inline-block' }}></span>
                  Completed
                </span>
              </div>
            </div>

            <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href={project.liveUrl}
                className="btn-primary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '14px' }}
              >
                Launch Live Site
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
              <a
                href={project.githubUrl}
                className="btn-secondary"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', padding: '14px' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                Source Code
              </a>
            </div>
          </div>

          {/* Visual Showcase Panel */}
          <div className="glass-panel project-showcase-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 32px', position: 'relative', overflow: 'hidden' }}>
            <div className="bio-glow-effect" style={{ background: `radial-gradient(circle, ${project.glow} 0%, rgba(0, 0, 0, 0) 75%)` }}></div>

            <div className="project-detail-icon-wrapper" style={{
              width: '120px',
              height: '120px',
              borderRadius: '30px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: `1px solid ${project.color}`,
              boxShadow: `0 0 30px ${project.glow}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '32px',
              position: 'relative'
            }}>
              {/* Giant icon */}
              {React.cloneElement(project.icon, { width: 56, height: 56 })}
            </div>

            <div style={{ width: '100%' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', fontWeight: '700', textAlign: 'center' }}>
                Technical Stack
              </h4>
              <div className="skills-badge-list" style={{ borderTop: 'none', paddingTop: 0, justifyContent: 'center' }}>
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="skill-badge-item" style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Footer Navigation */}
      <div style={{ marginTop: '64px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <a
          href="#/projects"
          className="btn-primary"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Projects
        </a>
      </div>
    </section>
  );
};

export default ProjectDetail;

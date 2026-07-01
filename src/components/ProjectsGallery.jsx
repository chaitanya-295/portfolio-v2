import React, { useState, useEffect, useLayoutEffect } from 'react';
import projectsList, { useProjects } from '../data/projects';
import { useSkills } from '../data/skills';
import { useCertifications } from '../data/certifications';

const ProjectsGallery = () => {
  const { projects, loading } = useProjects();
  const { skills, loading: skillsLoading } = useSkills();
  const { certifications, loading: certsLoading } = useCertifications();
  const [activeTab, setActiveTab] = useState('projects');
  const [techSubTab, setTechSubTab] = useState('All');
  const [mainIndicatorStyle, setMainIndicatorStyle] = useState({ opacity: 0 });
  const [subIndicatorStyle, setSubIndicatorStyle] = useState({ opacity: 0 });
  const [isMainInit, setIsMainInit] = useState(false);
  const [isSubInit, setIsSubInit] = useState(false);

  useLayoutEffect(() => {
    const updateMain = () => {
      const container = document.querySelector('#main-tabs');
      if (!container) return;
      const activeBtn = container.querySelector('.tab-btn.active');
      if (activeBtn) {
        setMainIndicatorStyle({
          top: `${activeBtn.offsetTop}px`,
          left: `${activeBtn.offsetLeft}px`,
          width: `${activeBtn.offsetWidth}px`,
          height: `${activeBtn.offsetHeight}px`,
          opacity: 1
        });
        setTimeout(() => setIsMainInit(true), 50);
      }
    };
    updateMain();
    const tId = setTimeout(updateMain, 60);
    window.addEventListener('resize', updateMain);
    return () => {
      clearTimeout(tId);
      window.removeEventListener('resize', updateMain);
    };
  }, [activeTab]);

  useLayoutEffect(() => {
    if (activeTab !== 'tech-stack') {
      setIsSubInit(false);
      return;
    }
    const updateSub = () => {
      const container = document.querySelector('#tech-tabs');
      if (!container) return;
      const activeBtn = container.querySelector('.tab-btn.active');
      if (activeBtn) {
        setSubIndicatorStyle({
          top: `${activeBtn.offsetTop}px`,
          left: `${activeBtn.offsetLeft}px`,
          width: `${activeBtn.offsetWidth}px`,
          height: `${activeBtn.offsetHeight}px`,
          opacity: 1
        });
        setTimeout(() => setIsSubInit(true), 50);
      }
    };
    updateSub();
    const tId = setTimeout(updateSub, 60);
    window.addEventListener('resize', updateSub);
    return () => {
      clearTimeout(tId);
      window.removeEventListener('resize', updateSub);
    };
  }, [techSubTab, activeTab]);

  return (
    <section
      className="projects-section"
      id="projects-gallery"
      style={{
        paddingTop: '140px',
        minHeight: '85vh',
        maxWidth: '1450px',
        width: '100%'
      }}
    >
      <div className="section-header reveal-on-scroll reveal-fade-up visible">
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> Portfolio Archive
        </div>
        <h2 className="section-title">
          Things I've <span className="text-gradient">Built</span>
        </h2>
        <p className="section-desc" style={{ maxWidth: '650px' }}>
          Explore all of my applications, WebGL simulators, decentralised systems, and scientific tools.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="tabs-container has-indicator" id="main-tabs" style={{ marginBottom: '48px' }}>
        <div className={`tab-indicator ${isMainInit ? 'initialized' : ''}`} style={mainIndicatorStyle} />
        <button
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('certifications')}
        >
          Certifications
        </button>
        <button
          className={`tab-btn ${activeTab === 'tech-stack' ? 'active' : ''}`}
          onClick={() => setActiveTab('tech-stack')}
        >
          Tech Stack
        </button>
      </div>

      {/* Tab Content rendering */}
      {activeTab === 'projects' && (
        <div className="tab-content-wrapper fade-in-up">
          {/* Grid view of projects */}
          <div className="projects-grid" style={{ maxWidth: '100%', width: '100%', margin: '0 auto' }}>
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="glass-panel project-card"
                  style={{
                    minHeight: '380px',
                    opacity: 0.6,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
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
                  <span style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Loading database...
                  </span>
                </div>
              ))
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <a
                  href={`#/project-detail/${project.id}`}
                  key={project.id}
                  className="glass-panel project-card reveal-on-scroll reveal-fade-up visible"
                  style={{
                    '--project-glow': project.glow,
                    opacity: 1,
                    transform: 'none',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  {project.image && (
                    <div className="project-image-wrapper" style={{ width: '100%', height: '120px', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', position: 'relative' }}>
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        className="project-card-image"
                      />
                    </div>
                  )}

                  <div style={{ width: '100%' }}>
                    <span className="project-category" style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-cyan)', fontWeight: '600' }}>
                      {project.category}
                    </span>
                    <h3 className="project-title" style={{ fontSize: '18px', marginTop: '6px', marginBottom: '8px' }}>
                      {project.title}
                    </h3>
                    <p className="project-desc-text" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px', minHeight: '58px' }}>
                      {project.desc}
                    </p>
                  </div>

                  <div className="project-tags-list" style={{ marginBottom: '16px' }}>
                    {project.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="project-tag-item" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '2px 8px', borderRadius: '8px', fontSize: '10px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-footer" style={{ width: '100%', marginTop: 'auto' }}>
                    <span className="project-link-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'white', fontSize: '14px', fontWeight: '600' }}>
                      Explore Project
                      <svg className="project-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease', opacity: 0.8 }}>
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '64px 0' }}>
                <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '12px' }}>No projects found</h3>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'certifications' && (
        <div className="tab-content-wrapper fade-in-up">
          <div className="certifications-view" style={{ maxWidth: '100%', margin: '0 auto', width: '100%' }}>
            <div className="certifications-grid">
              {certsLoading ? (
                <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderTopColor: 'var(--accent-purple)',
                    animation: 'spin-slow 2s linear infinite'
                  }} />
                  <span style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>Loading certifications...</span>
                </div>
              ) : certifications.length > 0 ? (
                certifications.map((cert, idx) => (
                  <div key={idx} className="glass-panel certification-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
                    <div className="cert-glow" style={{ position: 'absolute', top: '-10%', right: '-10%', width: '100px', height: '100px', background: `radial-gradient(circle, ${cert.glow} 0%, rgba(0, 0, 0, 0) 70%)`, filter: 'blur(15px)', pointerEvents: 'none' }}></div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                        <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: cert.color, fontWeight: '700' }}>{cert.issuer}</span>
                        <div style={{ color: cert.color }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                        </div>
                      </div>
                      <h4 style={{ fontSize: '20px', fontWeight: '600', color: 'white', marginBottom: '10px', lineHeight: '1.4' }}>{cert.title}</h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Issued: {cert.date}</p>
                    </div>
                    <div style={{ marginTop: '24px' }}>
                      <button
                        onClick={() => {
                          if (!cert.link) return;
                          if (cert.link.startsWith('data:')) {
                            try {
                              const base64 = cert.link;
                              const parts = base64.split(',');
                              const mimeType = parts[0].match(/:(.*?);/)[1];
                              const byteCharacters = atob(parts[1]);
                              const byteNumbers = new Array(byteCharacters.length);
                              for (let i = 0; i < byteCharacters.length; i++) {
                                byteNumbers[i] = byteCharacters.charCodeAt(i);
                              }
                              const byteArray = new Uint8Array(byteNumbers);
                              const blob = new Blob([byteArray], { type: mimeType });
                              const blobUrl = URL.createObjectURL(blob);
                              window.open(blobUrl, '_blank');
                            } catch (err) {
                              console.error("Failed to open base64 PDF:", err);
                              // Fallback in case browser blocks or fails
                              const newWindow = window.open();
                              if (newWindow) {
                                newWindow.document.write(`<iframe src="${cert.link}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                              }
                            }
                          } else {
                            window.open(cert.link, '_blank');
                          }
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          fontSize: '14.5px',
                          color: 'white',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'color 0.2s'
                        }}
                        className="cert-link"
                      >
                        Verify Credential
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 0' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>No certifications found.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tech-stack' && (
        <div className="tab-content-wrapper fade-in-up">
          {/* Tech Stack Sub-Tabs */}
          <div className="tabs-container has-indicator" id="tech-tabs" style={{ marginBottom: '32px', gap: '8px', padding: '6px', borderRadius: '30px', maxWidth: 'fit-content', position: 'relative' }}>
            <div className={`tab-indicator ${isSubInit ? 'initialized' : ''}`} style={subIndicatorStyle} />
            {['All', 'Programming Languages', 'Frontend', 'Backend', 'Database & Cloud', 'Tools'].map((subTab) => (
              <button
                key={subTab}
                onClick={() => setTechSubTab(subTab)}
                className={`tab-btn ${techSubTab === subTab ? 'active' : ''}`}
                style={{ padding: '6px 16px', fontSize: '13px', zIndex: 1 }}
              >
                {subTab}
              </button>
            ))}
          </div>

          <div
            className="projects-grid"
            style={{
              maxWidth: techSubTab === 'All' ? '100%' : '600px',
              margin: '0 auto',
              gridTemplateColumns: techSubTab === 'All' ? undefined : '1fr'
            }}
          >
            {skillsLoading ? (
              <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderTopColor: 'var(--accent-purple)',
                  animation: 'spin-slow 2s linear infinite'
                }} />
                <span style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>Loading tech stack...</span>
              </div>
            ) : skills.length > 0 ? (
              skills
                .filter(category => {
                  const type = (category.type || '').toLowerCase();
                  if (techSubTab === 'All') return true;
                  if (techSubTab === 'Programming Languages') return type === 'languages' || type === 'language' || type === 'programming_languages';
                  if (techSubTab === 'Frontend') return type === 'frontend';
                  if (techSubTab === 'Backend') return type === 'backend';
                  if (techSubTab === 'Database & Cloud') return type === 'database_cloud' || type === 'database' || type === 'cloud';
                  if (techSubTab === 'Tools') return type === 'tools';
                  return true;
                })
                .map((category, idx) => (
                  <div
                    key={idx}
                    className="about-skills-panel glass-panel"
                    style={{
                      minHeight: 'auto',
                      padding: '40px 48px',
                      display: 'flex',
                      flexDirection: 'column',
                      maxWidth: '100%',
                      width: '100%',
                      margin: '0 auto'
                    }}
                  >
                    <div className="bio-glow-effect" style={{ background: `radial-gradient(circle at 50% 0%, ${category.glow} 0%, rgba(0, 0, 0, 0) 70%)` }}></div>

                    {/* Category Title & Logo Row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: `1px solid rgba(255, 255, 255, 0.08)`, paddingBottom: '20px', marginBottom: '28px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: `rgba(${
                          category.type === 'frontend' ? '6, 182, 212' : 
                          category.type === 'backend' ? '168, 85, 247' : 
                          category.type === 'database_cloud' || category.type === 'database' || category.type === 'cloud' ? '236, 72, 153' : 
                          category.type === 'languages' || category.type === 'language' || category.type === 'programming_languages' ? '6, 182, 212' : 
                          '99, 102, 241'
                        }, 0.12)`,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {category.icon}
                      </div>
                      <h3 style={{ color: '#ffffff', margin: 0, fontSize: '22px', fontWeight: '700', letterSpacing: '-0.3px' }}>
                        {category.title}
                      </h3>
                    </div>

                    {/* Languages and Logo List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {category.languages.map((lang, lIdx) => (
                        <div
                          key={lIdx}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                          }}
                        >
                          {/* Row 1: Logo, Name & Percentage */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <div style={{ width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {lang.logo}
                              </div>
                              <span style={{ fontSize: '16px', fontWeight: '700', color: 'white' }}>{lang.name}</span>
                            </div>
                          </div>

                          {/* Row 2: Full Width Progress Bar */}
                          <div style={{
                            width: '100%',
                            height: '7px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            position: 'relative'
                          }}>
                            <div style={{
                              width: `${lang.percentage}%`,
                              height: '100%',
                              background: category.color,
                              borderRadius: '4px'
                            }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 0' }}>
                <span style={{ color: 'var(--text-secondary)' }}>No skills found.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div style={{ marginTop: '64px', display: 'flex', justifyContent: 'center' }}>
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

export default ProjectsGallery;

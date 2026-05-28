import React, { useState } from 'react';
import projectsList from '../data/projects';

const ProjectsGallery = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [techSubTab, setTechSubTab] = useState('All');

  const certifications = [
    {
      title: "Full Stack Web Development Bootcamp",
      issuer: "Udemy",
      date: "Dec 2024",
      color: "var(--accent-cyan)",
      glow: "rgba(6, 182, 212, 0.1)",
      link: "#"
    },
    {
      title: "Advanced React & Redux Architecture",
      issuer: "Meta (Coursera)",
      date: "Aug 2025",
      color: "var(--accent-purple)",
      glow: "rgba(168, 85, 247, 0.1)",
      link: "#"
    },
    {
      title: "Google Cloud Digital Leader Certified",
      issuer: "Google Cloud",
      date: "Mar 2026",
      color: "var(--accent-pink)",
      glow: "rgba(236, 72, 153, 0.1)",
      link: "#"
    }
  ];

  const techCategories = [
    {
      title: "Frontend",
      type: "frontend",
      color: "var(--accent-cyan)",
      glow: "rgba(6, 182, 212, 0.1)",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      languages: [
        {
          name: "React",
          level: "Framework",
          percentage: 90,
          logo: (
            <svg width="22" height="22" viewBox="-11.5 -10.23 23 20.47" fill="none" stroke="#61DAFB" strokeWidth="1.2">
              <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
              <g stroke="#61DAFB">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          )
        },
        {
          name: "React Native",
          level: "Framework",
          percentage: 80,
          logo: (
            <svg width="22" height="22" viewBox="-11.5 -10.23 23 20.47" fill="none" stroke="#61DAFB" strokeWidth="1.2">
              <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
              <g stroke="#61DAFB">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          )
        },
        {
          name: "Tailwind CSS",
          level: "Styling Framework",
          percentage: 90,
          logo: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#38BDF8">
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6 4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6 4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
            </svg>
          )
        },
        {
          name: "JavaScript",
          level: "Language",
          percentage: 85,
          logo: (
            <div style={{ width: '24px', height: '24px', background: '#1c1e2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8f94a6', fontSize: '11px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>JS</div>
          )
        },
        {
          name: "TypeScript",
          level: "Language",
          percentage: 70,
          logo: (
            <div style={{ width: '24px', height: '24px', background: '#1c1e2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8f94a6', fontSize: '11px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>TS</div>
          )
        }
      ]
    },
    {
      title: "Backend",
      type: "backend",
      color: "var(--accent-purple)",
      glow: "rgba(168, 85, 247, 0.1)",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      ),
      languages: [
        {
          name: "Node.js",
          level: "Runtime Environment",
          percentage: 90,
          logo: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#339933">
              <path d="M12 0L2.8 5.3v10.6L12 21.2l9.2-5.3V5.3zm.9 3.5c1.4.2 2.7.9 3.5 1.9l-1.4 1.4c-.6-.7-1.4-1.1-2.3-1.2V3.5zm-1.8 0v2.1c-.9.1-1.7.5-2.3 1.2L7.4 5.4c.8-1 2.1-1.7 3.5-1.9zm-4.3 4.2l1.4 1.4c-.3.5-.4 1.1-.4 1.7v1.8c0 .6.1 1.2.4 1.7L6.8 15c-.6-1-1-2.1-1-3.3v-1.8c0-1.2.4-2.3 1-3.2zm10.4 0c.6 1 1 2.1 1 3.2v1.8c0 1.2-.4 2.3-1 3.3l-1.4-1.4c.3-.5.4-1.1.4-1.7v-1.8c0-.6-.1-1.2-.4-1.7l1.4-1.4zm-7 5v1.8c0 1 .4 1.9 1 2.6l-1.4 1.4c-1.2-1.2-1.8-2.8-1.8-4.5V11.2h2.2v1.5zm6 0h2.2v1.5c0 1.7-.6 3.3-1.8 4.5l-1.4-1.4c.6-.7 1-1.6 1-2.6v-1.8z" />
            </svg>
          )
        },
        {
          name: "Express.js",
          level: "Web Framework",
          percentage: 85,
          logo: (
            <div style={{ width: '24px', height: '24px', background: '#1c1e2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8f94a6', fontSize: '9px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>EX</div>
          )
        },
        {
          name: "Python",
          level: "Language",
          percentage: 80,
          logo: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 0C5.4 0 5.4 2.8 5.4 2.8V6h6.6V7H5.4s-5.4 0-5.4 5.4c0 5.4 4.8 5.4 4.8 5.4h2.9v-4.1c0-3 2.4-5.4 5.4-5.4h4.1V2.8S18.6 0 12 0z" fill="#3776AB" />
              <path d="M12 24c6.6 0 6.6-2.8 6.6-2.8V18H12v-1h6.6s5.4 0 5.4-5.4C24 6.2 19.2 6.2 19.2 6.2h-2.9v4.1c0 3-2.4 5.4-5.4 5.4H6.8V21.2S5.4 24 12 24z" fill="#FFE873" />
            </svg>
          )
        },
        {
          name: "Django",
          level: "Web Framework",
          percentage: 75,
          logo: (
            <div style={{ width: '24px', height: '24px', background: '#092e20', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 'bold', fontFamily: 'serif' }}>dj</div>
          )
        },
        {
          name: "SQL & Databases",
          level: "Relational Database",
          percentage: 85,
          logo: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#4169E1">
              <path d="M12 1C6 1 2 3.2 2 6v12c0 2.8 4 5 10 5s10-2.2 10-5V6c0-2.8-4-5-10-5zm8 5c0 1.2-3.6 3-8 3S4 7.2 4 6s3.6-3 8-3 8 1.8 8 3zm0 6c0 1.2-3.6 3-8 3S4 13.2 4 12V8.2c1.7 1.1 4.7 1.8 8 1.8s6.3-.7 8-1.8V12zm0 6c0 1.2-3.6 3-8 3s-8-1.8-8-3v-3.8c1.7 1.1 4.7 1.8 8 1.8s6.3-.7 8-1.8V18z" />
            </svg>
          )
        }
      ]
    },
    {
      title: "Tools",
      type: "tools",
      color: "var(--accent-indigo)",
      glow: "rgba(99, 102, 241, 0.1)",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-indigo)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      ),
      languages: [
        {
          name: "Git & GitHub",
          level: "Version Control",
          percentage: 95,
          logo: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#F05032">
              <path d="M23.3 11.2L12.8.7a2.5 2.5 0 0 0-3.6 0L1.2 8.7a2.5 2.5 0 0 0 0 3.6l10.5 10.5a2.5 2.5 0 0 0 3.6 0l8-8a2.5 2.5 0 0 0 0-3.6zM12 18.2a2 2 0 0 1-2.8 0 2 2 0 0 1 0-2.8l1.6-1.6v-3.4a2 2 0 0 1-1.3-1.9 2 2 0 1 1 3.4 1.4v3.9l-1 1a2 2 0 0 1 .1 3.3z" />
            </svg>
          )
        },
        {
          name: "Docker",
          level: "Containerization",
          percentage: 80,
          logo: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#2496ED">
              <path d="M13.9 10.6h2.2v2.2h-2.2zm-2.8 0h2.2v2.2h-2.2zm-2.8 0h2.2v2.2h-2.2zm-2.8 0h2.2v2.2H8.3zm-2.8 0h2.2v2.2H5.5zm8.4-2.8h2.2V10h-2.2zm-2.8 0h2.2V10h-2.2zm-2.8 0h2.2V10H8.3zm8.4-2.8h2.2v2.2h-2.2zm-14.7 7c-.2.7-.3 1.5-.3 2.2 0 4.6 3.8 8.3 8.3 8.3s8.3-3.7 8.3-8.3h-1.1c0 3.9-3.2 7.2-7.2 7.2S5.7 18.9 5.7 15h1.1l2.2-2.2H3.6v.1z" />
            </svg>
          )
        },
        {
          name: "Linux / Terminal",
          level: "DevOps & OS",
          percentage: 85,
          logo: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FCC624">
              <path d="M12 .5C8 .5 6.6 4.3 6.6 5.8c0 1.2.6 1.7.6 1.7s-1.8.8-2.6 2.3c-.8 1.5-.5 3.3.3 3.9.8.6.6.6.6.6s-.9.8-1.1 2.3c-.2 1.5 1.1 2.2 1.1 2.2s.3 1.3 1.9 1.7c1.6.4 3 0 3 0s1.4.8 4 0c2.6-.8 1.9-3.2 1.9-3.2s1.4-1.3 1-3.2c-.4-1.9-2.2-2.5-2.2-2.5s.4-1 .4-2.2c0-1.2-1-6.1-5-6.1zm0 3c2.2 0 2.2 2 2.2 3s-1 1.7-2.2 1.7-2.2-.7-2.2-1.7 1-3 2.2-3z" />
            </svg>
          )
        },
        {
          name: "VS Code",
          level: "Code Editor",
          percentage: 90,
          logo: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#007ACC">
              <path d="M23.9 6.5l-2.7-2.7c-.1-.1-.3-.1-.4 0L12.5 10l-4.7-4.2c-.1-.1-.3-.1-.4 0L.3 8.3c-.4.4-.4 1 0 1.4l5.3 4.8L.3 19.3c-.4.4-.4 1 0 1.4l7.1 2.5c.1 0 .3 0 .4-.1l4.7-4.2 8.3 6.2c.1.1.3.1.4 0l2.7-2.7c.3-.3.3-.9 0-1.2L15.5 15l8.4-7.3c.3-.3.3-.9 0-1.2z" />
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <section 
      className="projects-section" 
      id="projects-gallery" 
      style={{ 
        paddingTop: '140px', 
        minHeight: '85vh',
        maxWidth: '1600px'
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
      <div className="tabs-container" style={{ marginBottom: '48px' }}>
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
          <div className="projects-grid" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
            {projectsList.length > 0 ? (
              projectsList.map((project) => (
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
                    <div className="project-image-wrapper" style={{ width: '100%', height: '170px', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', position: 'relative' }}>
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
          <div className="certifications-view" style={{ maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
            <div className="certifications-grid">
              {certifications.map((cert, idx) => (
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
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14.5px', color: 'white', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }} className="cert-link">
                      Verify Credential
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tech-stack' && (
        <div className="tab-content-wrapper fade-in-up">
          {/* Tech Stack Sub-Tabs */}
          <div className="tabs-container" style={{ marginBottom: '32px', gap: '8px', padding: '6px', borderRadius: '30px', maxWidth: 'fit-content' }}>
            {['All', 'Frontend', 'Backend', 'Tools'].map((subTab) => (
              <button
                key={subTab}
                onClick={() => setTechSubTab(subTab)}
                className={`tab-btn ${techSubTab === subTab ? 'active' : ''}`}
                style={{ padding: '6px 16px', fontSize: '13px' }}
              >
                {subTab}
              </button>
            ))}
          </div>

          <div
            className="projects-grid"
            style={{
              maxWidth: techSubTab === 'All' ? '1550px' : '900px',
              margin: '0 auto',
              gridTemplateColumns: techSubTab === 'All' ? undefined : '1fr'
            }}
          >
            {techCategories
              .filter(category => {
                if (techSubTab === 'All') return true;
                if (techSubTab === 'Frontend') return category.type === 'frontend';
                if (techSubTab === 'Backend') return category.type === 'backend';
                if (techSubTab === 'Tools') return category.type === 'tools';
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
                      background: `rgba(${category.type === 'frontend' ? '6, 182, 212' : category.type === 'backend' ? '168, 85, 247' : '99, 102, 241'}, 0.12)`,
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
                          <span style={{
                            fontSize: '13.5px',
                            fontWeight: '600',
                            color: 'rgba(255, 255, 255, 0.4)',
                            fontFamily: 'monospace'
                          }}>
                            {lang.percentage}%
                          </span>
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
              ))}
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

import { useState, useEffect, useLayoutEffect } from 'react';
import { useProfile } from '../data/profile';
import developerAvatar from '../assets/developer_avatar.png';

const AboutDetail = () => {
  const { profile, loading: profileLoading } = useProfile();

  const phrases = profile.phrases || [
    "Full Stack Developer",
    "UI/UX Designer",
    "Creative Developer",
    "Creative Problem Solver",
    "Frontend Developer"
  ];
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const phrasesStr = JSON.stringify(phrases);

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const parsedPhrases = JSON.parse(phrasesStr);
      if (parsedPhrases.length === 0) return;
      const i = loopNum % parsedPhrases.length;
      const fullText = parsedPhrases[i];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(80);
      }

      if (!isDeleting && currentText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(400);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, typingSpeed, phrasesStr]);

  const [activeTab, setActiveTab] = useState('about');
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0 });
  const [isInitialized, setIsInitialized] = useState(false);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const container = document.querySelector('#about-tabs');
      if (!container) return;
      const activeBtn = container.querySelector('.tab-btn.active');
      if (activeBtn) {
        setIndicatorStyle({
          top: `${activeBtn.offsetTop}px`,
          left: `${activeBtn.offsetLeft}px`,
          width: `${activeBtn.offsetWidth}px`,
          height: `${activeBtn.offsetHeight}px`,
          opacity: 1
        });
        setTimeout(() => setIsInitialized(true), 50);
      }
    };

    updateIndicator();
    const tId = setTimeout(updateIndicator, 60);
    window.addEventListener('resize', updateIndicator);

    return () => {
      clearTimeout(tId);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeTab, profileLoading]);

  if (profileLoading) {
    return (
      <section className="about-section" id="about-detail" style={{ paddingTop: '140px', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid rgba(255, 255, 255, 0.1)', borderTopColor: 'var(--accent-cyan)', animation: 'spin-slow 2s linear infinite' }} />
          <span style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>Loading biography detail...</span>
        </div>
      </section>
    );
  }

  const experiences = profile.experiences || [];
  const stats = profile.stats || [];
  const skills = profile.skillsList || [];
  const education = profile.education || [];

  const avatarSrc = (profile.avatar && profile.avatar.startsWith('data:image')) ? profile.avatar : developerAvatar;

  const handleOpenResume = (e) => {
    e.preventDefault();
    const url = profile.resumeUrl || '#resume';
    if (url.startsWith('data:')) {
      try {
        const parts = url.split(',');
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
        console.error("Failed to open base64 resume:", err);
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`<iframe src="${url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
        }
      }
    } else {
      window.open(url, '_blank');
    }
  };

  const handleOpenCertificate = (e, url) => {
    e.preventDefault();
    if (!url) return;
    if (url.startsWith('data:')) {
      try {
        const parts = url.split(',');
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
        console.error("Failed to open base64 certificate:", err);
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`<iframe src="${url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
        }
      }
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <section className="about-section" id="about-detail" style={{ paddingTop: '140px', minHeight: '85vh' }}>
      <div className="section-header">
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> Full Story
        </div>
        <div className="about-avatar-container">
          <div className="about-avatar-wrapper">
            <img src={avatarSrc} alt={profile.name} className="about-avatar-img" />
          </div>
        </div>
        <h2 className="section-title">
          {profile.name}
        </h2>
        <h2 style={{ fontSize: '24px', color: 'var(--accent-cyan)', fontWeight: '600', marginBottom: '12px', letterSpacing: '-0.5px', minHeight: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>{currentText}</span>
          <span className="typewriter-cursor">|</span>
        </h2>
      </div>

      {/* Tab Switcher */}
      <div className="tabs-container has-indicator" id="about-tabs">
        <div className={`tab-indicator ${isInitialized ? 'initialized' : ''}`} style={indicatorStyle} />
        <button
          className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
        <button
          className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          Education
        </button>
        <button
          className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          Experience
        </button>
      </div>

      {activeTab === 'about' && (
        <div className="tab-content-wrapper fade-in-up">
          <div className="about-grid">
            {/* Left Column: Biography Details & Stats */}
            <div className="about-bio-panel glass-panel">
              <div className="bio-glow-effect"></div>
              <h3 className="bio-title">My Journey & Philosophy</h3>
              {(profile.longBio || []).map((para, idx) => (
                <p className="bio-text" key={idx}>
                  {para}
                </p>
              ))}
              <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                <a
                  href={profile.resumeUrl || "#resume"}
                  onClick={handleOpenResume}
                  className="btn-primary"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download CV
                </a>
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

              {profile.skillsBadges && profile.skillsBadges.length > 0 && (
                <>
                  <h4 className="skills-panel-title" style={{ fontSize: '16px', marginTop: '36px', marginBottom: '16px' }}>
                    Technologies & Tools
                  </h4>
                  <div className="skills-badge-list" style={{ borderTop: 'none', paddingTop: 0 }}>
                    {profile.skillsBadges.map((badge, idx) => (
                      <span className="skill-badge-item" key={idx}>{badge}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats container at the bottom of About tab */}
          <div className="stats-container" style={{ maxWidth: '800px', margin: '48px auto 0', width: '100%' }}>
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'education' && (
        <div className="education-timeline glass-panel fade-in-up">
          <div className="timeline-glow" style={{ position: 'absolute', top: '10%', left: '10%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, rgba(0, 0, 0, 0) 70%)', filter: 'blur(20px)', pointerEvents: 'none' }}></div>
          <h3 className="timeline-title" style={{ fontSize: '24px', fontWeight: '600', color: 'white', marginBottom: '32px', textAlign: 'center' }}>Academic Qualifications</h3>

          <div className="timeline-items" style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', paddingLeft: '24px', borderLeft: '2px solid rgba(255, 255, 255, 0.08)' }}>
            {education.map((edu, idx) => (
              <div key={idx} className="timeline-item" style={{ position: 'relative' }}>
                <div className="timeline-dot" style={{ position: 'absolute', left: '-31px', top: '6px', width: '12px', height: '12px', borderRadius: '50%', background: edu.color || 'var(--accent-cyan)', boxShadow: `0 0 8px ${edu.color || 'var(--accent-cyan)'}` }}></div>
                <div className="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>{edu.degree}</h4>
                  <span style={{ fontSize: '13px', color: edu.color || 'var(--accent-cyan)', fontWeight: '600', background: 'rgba(255,255,255,0.05)', border: `1px solid ${edu.color || 'var(--accent-cyan)'}`, padding: '2px 10px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{edu.duration}</span>
                </div>
                <h5 style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <span>{edu.school}</span>
                  {edu.grade && (
                    <span style={{ fontSize: '13px', color: edu.color || 'var(--accent-cyan)', fontWeight: '600', padding: '2px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      Grade: {edu.grade}
                    </span>
                  )}
                </h5>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'experience' && (
        <div className="education-timeline glass-panel fade-in-up">
          <div className="timeline-glow" style={{ position: 'absolute', top: '10%', left: '10%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, rgba(0, 0, 0, 0) 70%)', filter: 'blur(20px)', pointerEvents: 'none' }}></div>
          <h3 className="timeline-title" style={{ fontSize: '24px', fontWeight: '600', color: 'white', marginBottom: '32px', textAlign: 'center' }}>Professional Experience</h3>

          <div className="timeline-items" style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', paddingLeft: '24px', borderLeft: '2px solid rgba(255, 255, 255, 0.08)' }}>
            {experiences.map((exp, idx) => {
              const hasCertificate = !!exp.certificate;
              return (
                <div
                  key={idx}
                  className="timeline-item"
                  onClick={hasCertificate ? (e) => handleOpenCertificate(e, exp.certificate) : undefined}
                  style={{
                    position: 'relative',
                    cursor: hasCertificate ? 'pointer' : 'default',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    borderRadius: '12px',
                    padding: hasCertificate ? '16px 20px' : '0',
                    background: 'transparent',
                    border: '1px solid transparent',
                    display: 'block'
                  }}
                  onMouseEnter={hasCertificate ? (e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.boxShadow = `0 10px 25px -10px rgba(0,0,0,0.5), 0 0 15px ${exp.glow || 'rgba(168, 85, 247, 0.06)'}`;
                    e.currentTarget.style.transform = 'translateX(6px)';
                  } : undefined}
                  onMouseLeave={hasCertificate ? (e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'none';
                  } : undefined}
                >
                  <div className="timeline-dot" style={{ position: 'absolute', left: hasCertificate ? '-15px' : '-31px', top: hasCertificate ? '22px' : '6px', width: '12px', height: '12px', borderRadius: '50%', background: exp.color || 'var(--accent-purple)', boxShadow: `0 0 8px ${exp.color || 'var(--accent-purple)'}`, transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}></div>
                  <div className="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>{exp.role}</h4>
                    <span style={{ fontSize: '13px', color: exp.color || 'var(--accent-purple)', fontWeight: '600', background: exp.glow || 'rgba(168, 85, 247, 0.05)', border: `1px solid ${exp.color || 'var(--accent-purple)'}`, padding: '2px 10px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{exp.duration}</span>
                  </div>
                  <h5 style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: '500' }}>{exp.company}</h5>
                  <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: hasCertificate ? '16px' : '0' }}>
                    {exp.description}
                  </p>
                  {exp.certificate && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCertificate(e, exp.certificate);
                        }}
                        style={{
                          fontSize: '12px',
                          color: exp.color || 'var(--accent-purple)',
                          fontWeight: '600',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          padding: '3px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          zIndex: 5
                        }}
                        className="btn-cert"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                        Certificate
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

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

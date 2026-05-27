import { useState, useEffect } from 'react';
import developerAvatar from '../assets/developer_avatar.png';

const AboutDetail = () => {
  const phrases = [
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

  useEffect(() => {
    let timer;
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

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
  }, [currentText, isDeleting, loopNum, typingSpeed]);

  const [activeTab, setActiveTab] = useState('about');

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
        <div className="about-avatar-container">
          <div className="about-avatar-wrapper">
            <img src={developerAvatar} alt="Chaitanya Kamble" className="about-avatar-img" />
          </div>
        </div>
        <h2 className="section-title">
          Chaitanya <span className="text-gradient">Kamble</span>
        </h2>
        <h2 style={{ fontSize: '24px', color: 'var(--accent-cyan)', fontWeight: '600', marginBottom: '24px', letterSpacing: '-0.5px', minHeight: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>{currentText}</span>
          <span className="typewriter-cursor">|</span>
        </h2>
      </div>

      {/* Tab Switcher */}
      <div className="tabs-container">
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
          className={`tab-btn ${activeTab === 'certification' ? 'active' : ''}`}
          onClick={() => setActiveTab('certification')}
        >
          Certifications
        </button>
      </div>

      {activeTab === 'about' && (
        <>
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
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
              <a
                href="#resume"
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
              <span className="skill-badge-item">Vercel</span>
              <span className="skill-badge-item">Netlify</span>
              <span className="skill-badge-item">Postman</span>
            </div>
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
        </>
      )}

      {activeTab === 'education' && (
        <div className="education-timeline glass-panel">
          <div className="timeline-glow" style={{ position: 'absolute', top: '10%', left: '10%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, rgba(0, 0, 0, 0) 70%)', filter: 'blur(20px)', pointerEvents: 'none' }}></div>
          <h3 className="timeline-title" style={{ fontSize: '24px', fontWeight: '600', color: 'white', marginBottom: '32px', textAlign: 'center' }}>Academic Qualifications</h3>

          <div className="timeline-items" style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', paddingLeft: '24px', borderLeft: '2px solid rgba(255, 255, 255, 0.08)' }}>
            <div className="timeline-item" style={{ position: 'relative' }}>
              <div className="timeline-dot" style={{ position: 'absolute', left: '-31px', top: '6px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 8px var(--accent-cyan)' }}></div>
              <div className="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>Bachelor of Engineering in Computer Science</h4>
                <span style={{ fontSize: '13px', color: 'var(--accent-cyan)', fontWeight: '600', background: 'rgba(6, 182, 212, 0.1)', padding: '2px 10px', borderRadius: '20px' }}>2022 - 2026</span>
              </div>
              <h5 style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: '500' }}>Pune University</h5>
              <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Specializing in Software Engineering and Distributed Systems. Core coursework includes Design and Analysis of Algorithms, Object-Oriented Programming, Operating Systems, Database Management Systems, and Web Application Development.
              </p>
            </div>

            <div className="timeline-item" style={{ position: 'relative' }}>
              <div className="timeline-dot" style={{ position: 'absolute', left: '-31px', top: '6px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-purple)', boxShadow: '0 0 8px var(--accent-purple)' }}></div>
              <div className="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>Higher Secondary Certificate (HSC)</h4>
                <span style={{ fontSize: '13px', color: 'var(--accent-purple)', fontWeight: '600', background: 'rgba(168, 85, 247, 0.1)', padding: '2px 10px', borderRadius: '20px' }}>2020 - 2022</span>
              </div>
              <h5 style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: '500' }}>S.M. College</h5>
              <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Completed science stream with a major focus on Physics, Chemistry, Mathematics, and Computer Science. Built a strong analytical and programming foundation.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'certification' && (
        <div className="certifications-view" style={{ maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: 'white', marginBottom: '32px', textAlign: 'center' }}>Professional Licenses & Certifications</h3>

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

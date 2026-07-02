import React, { useState, useEffect } from 'react';
import projectsList, { useProjects } from '../data/projects';
import { useServices } from '../data/services';
import { useProfile } from '../data/profile';
import { useTestimonials, submitTestimonial } from '../data/testimonials';

// ==========================================
// 1. HERO COMPONENT (Default Export)
// ==========================================
const Hero = () => {
  const { profile, loading: profileLoading } = useProfile();

  const phrases = profile.phrases || [
    "Full Stack Developer",
    "Creative Problem Solver",
    "UI/UX Designer",
    "Creative Developer"
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

  if (profileLoading) {
    return (
      <section className="hero-section" id="home" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid rgba(255, 255, 255, 0.1)', borderTopColor: 'var(--accent-cyan)', animation: 'spin-slow 2s linear infinite' }} />
          <span style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>Loading developer profile...</span>
        </div>
      </section>
    );
  }

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

  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <div className="hero-tagline">
          <span className="pulse-dot"></span>
          <span>👋 Hello, I'm</span>
        </div>

        <h1 className="hero-title">
          <span className="text-gradient">{profile.name || "Chaitanya"}</span>
        </h1>

        <h2 style={{ fontSize: '24px', color: 'var(--accent-cyan)', fontWeight: '600', marginBottom: '24px', letterSpacing: '-0.5px', minHeight: '36px', display: 'flex', alignItems: 'center' }}>
          <span>{currentText}</span>
          <span className="typewriter-cursor">|</span>
        </h2>

        <p className="hero-desc">
          {profile.shortBio}
        </p>

        <div className="hero-actions" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <a href="#/projects" className="btn-primary">
            View Projects
          </a>
          <a href={profile.resumeUrl || "#resume"} onClick={handleOpenResume} className="btn-secondary">
            Download Resume
          </a>
          <a href="#/contacts" className="btn-secondary">
            Contact Me
          </a>
        </div>
        <div className="social-icons">
          {/* GitHub */}
          {profile.githubUrl && (
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          )}

          {/* LinkedIn */}
          {profile.linkedinUrl && (
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          )}

          {/* Instagram */}
          {profile.instagramUrl && (
            <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          )}

          {/* WhatsApp */}
          <a href="https://wa.me/919730593429?text=Hi%20Chaitanya%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you%21" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.897 0c3.183.001 6.177 1.24 8.428 3.493 2.25 2.253 3.487 5.25 3.484 8.435-.005 6.573-5.33 11.897-11.9 11.897-1.998-.001-3.957-.502-5.707-1.458L0 24zm6.549-3.722c1.652.98 3.516 1.5 5.434 1.5 5.498 0 9.972-4.475 9.976-9.974.001-2.664-1.034-5.17-2.915-7.054C17.26 2.863 14.76 1.828 12.09 1.828 6.596 1.828 2.12 6.304 2.116 11.804c-.001 1.944.506 3.844 1.47 5.514l-.995 3.637 3.73-.977zm11.367-7.56c-.32-.16-1.89-.93-2.185-1.04-.294-.11-.51-.16-.723.16-.214.32-.828 1.04-1.014 1.25-.187.21-.374.24-.694.08-.32-.16-1.353-.5-2.578-1.593-.952-.85-1.594-1.9-1.782-2.22-.187-.32-.02-.49.14-.65.144-.144.32-.37.48-.56.16-.18.214-.3.32-.5.11-.2.05-.37-.03-.53-.08-.16-.723-1.74-.99-2.388-.26-.625-.526-.54-.723-.55-.186-.01-.4-.01-.613-.01-.214 0-.56.08-.854.4-.294.32-1.123 1.1-1.123 2.68 0 1.58 1.15 3.11 1.31 3.33.16.22 2.264 3.457 5.485 4.85.766.33 1.363.528 1.83.676.77.244 1.47.21 2.025.128.619-.092 1.89-.77 2.152-1.48.26-.71.26-1.32.18-1.45-.08-.13-.3-.21-.62-.37z" />
            </svg>
          </a>

          {/* Email */}
          {profile.email && (
            <a href={`mailto:${profile.email}?subject=Project%20Inquiry&body=Hi%20Chaitanya%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you%21`} className="social-icon-btn" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          )}
        </div>
      </div>

      <div className="hero-visual">
        <div className="galaxy-container">
          {/* Glowing Galaxy Core */}
          <div className="core-glow"></div>

          {/* Orbiting Ring Systems */}
          <div className="cosmic-ring-1"></div>
          <div className="cosmic-ring-2"></div>
          <div className="cosmic-ring-3"></div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 2. ABOUT COMPONENT
// ==========================================
export const About = () => {
  const { profile } = useProfile();

  const stats = profile.stats || [
    { value: '3+', label: 'Years of Coding' },
    { value: '20+', label: 'Projects Built' },
    { value: '100%', label: 'Devoted to Code' },
  ];

  const firstPara = profile.homeBio || (profile.longBio && profile.longBio.length > 0
    ? profile.longBio[0]
    : "I create modern digital solutions by combining thoughtful design, clean development practices, and creative problem solving.");

  return (
    <section className="about-section" id="about">
      <div className="section-header reveal-on-scroll reveal-fade-up">
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

      <div className="about-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Philosophy/Bio Panel */}
        <div className="about-bio-panel glass-panel reveal-on-scroll reveal-fade-left delay-100" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div className="bio-glow-effect"></div>
          <p className="bio-text" style={{ fontSize: '20px', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '32px', fontWeight: '400' }}>
            {firstPara}
          </p>

          <a
            href="#/about-detail"
            className="btn-secondary"
            style={{ display: 'inline-flex', padding: '12px 28px', fontSize: '15px', textDecoration: 'none' }}
          >
            Explore My Story
          </a>
        </div>
        <div className="stats-container reveal-on-scroll reveal-fade-right delay-200">
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

// ==========================================
// 3. SERVICES COMPONENT
// ==========================================
export const Services = () => {
  const { services, loading } = useServices();

  // Trigger IntersectionObserver once loading completes to animate elements
  useEffect(() => {
    if (loading || services.length === 0) return;
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
      );
      const elements = document.querySelectorAll('#services .reveal-on-scroll');
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [loading, services]);

  return (
    <section className="services-section" id="services">
      <div className="section-header reveal-on-scroll reveal-fade-up">
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> What I Create
        </div>
        <h2 className="section-title">
          My <span className="text-gradient">Offerings</span>
        </h2>
        <p className="section-desc">
          Building state-of-the-art digital assets designed for ultimate engagement and growth.
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '350px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderTopColor: 'var(--accent-purple)',
            animation: 'spin-slow 2s linear infinite'
          }} />
          <span style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Loading offerings...
          </span>
        </div>
      ) : services.length > 0 ? (
        <div className="services-marquee-container">
          <div className="services-marquee-track">
            {/* First Group */}
            <div className="services-marquee-group">
              {services.map((service, idx) => (
                <div
                  key={`service-g1-${idx}`}
                  className="glass-panel service-marquee-card"
                  style={{
                    '--card-glow-color': service.glow
                  }}
                >
                  <div className="service-icon-bg">
                    {service.icon}
                  </div>

                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-card-desc">{service.desc}</p>

                  <div className="service-tags">
                    {service.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="service-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Second Group for infinite loop */}
            <div className="services-marquee-group">
              {services.map((service, idx) => (
                <div
                  key={`service-g2-${idx}`}
                  className="glass-panel service-marquee-card"
                  style={{
                    '--card-glow-color': service.glow
                  }}
                >
                  <div className="service-icon-bg">
                    {service.icon}
                  </div>

                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-card-desc">{service.desc}</p>

                  <div className="service-tags">
                    {service.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="service-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px 0' }}>
          <span style={{ color: 'var(--text-secondary)' }}>No offerings found.</span>
        </div>
      )}
    </section>
  );
};

// ==========================================
// 4. PROJECTS COMPONENT
// ==========================================
export const Projects = () => {
  const { projects, loading } = useProjects();
  const displayedProjects = projects.slice(0, 3);

  // Trigger IntersectionObserver once loading completes to animate elements
  useEffect(() => {
    if (loading || projects.length === 0) return;
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
      );
      const elements = document.querySelectorAll('#projects .reveal-on-scroll');
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [loading, projects]);

  return (
    <section className="projects-section" id="projects">
      <div className="section-header reveal-on-scroll reveal-fade-up">
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
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
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
        ) : displayedProjects.length > 0 ? (
          displayedProjects.map((project, idx) => (
            <a
              href={`#/project-detail/${project.id}`}
              key={idx}
              className={`glass-panel project-card reveal-on-scroll ${idx % 3 === 0 ? 'reveal-fade-left' : idx % 3 === 2 ? 'reveal-fade-right' : 'reveal-fade-up'} delay-${((idx % 3) + 1) * 100}`}
              style={{
                '--project-glow': project.glow,
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              {project.image && (
                <div className="project-image-wrapper" style={{ 
                  width: 'calc(100% + 48px)', 
                  height: '200px', 
                  marginTop: '-24px', 
                  marginLeft: '-24px', 
                  marginRight: '-24px', 
                  marginBottom: '20px', 
                  borderTopLeftRadius: '24px', 
                  borderTopRightRadius: '24px', 
                  borderBottomLeftRadius: '0px',
                  borderBottomRightRadius: '0px',
                  overflow: 'hidden', 
                  position: 'relative' 
                }}>
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

              <div className="project-tags-list" style={{ marginBottom: '16px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.tags.slice(0, 4).map((tag, tagIdx) => (
                  <span key={tagIdx} className="project-tag-item" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', padding: '4px 10px', borderRadius: '8px', fontSize: '10.5px', color: 'var(--text-secondary)' }}>
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="project-tag-item" style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.15)', padding: '4px 10px', borderRadius: '8px', fontSize: '10.5px', color: 'var(--accent-purple)', fontWeight: '500' }}>
                    +{project.tags.length - 4} more
                  </span>
                )}
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
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '32px 0' }}>
            <span style={{ color: 'var(--text-secondary)' }}>No projects found.</span>
          </div>
        )}
      </div>

      <div className="projects-actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
        <a
          href="#/projects"
          className="btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '12px 28px', fontSize: '15px' }}
        >
          View All Projects
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
    </section>
  );
};

// ==========================================
// 5. TESTIMONIALS COMPONENT
// ==========================================
const TESTIMONIAL_GLOW_PRESETS = [
  { name: 'Cyan', glow: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' },
  { name: 'Purple', glow: 'rgba(168, 85, 247, 0.15)', color: 'var(--accent-purple)' },
  { name: 'Pink', glow: 'rgba(236, 72, 153, 0.15)', color: 'var(--accent-pink)' },
  { name: 'Indigo', glow: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-indigo)' }
];

export const Testimonials = () => {
  const { testimonials: testimonialsList, loading: testimonialsLoading } = useTestimonials();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    role: '',
    company: '',
    text: '',
    rating: 5,
    glow: 'rgba(6, 182, 212, 0.15)'
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handlePrev = () => {
    if (testimonialsList.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  const handleNext = () => {
    if (testimonialsList.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % testimonialsList.length);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitSuccess(false);

    if (!reviewForm.name.trim() || !reviewForm.role.trim() || !reviewForm.company.trim() || !reviewForm.text.trim()) {
      setFormError('All fields are required.');
      return;
    }

    if (reviewForm.text.trim().length < 10) {
      setFormError('Review text should be at least 10 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitTestimonial(reviewForm);
      setSubmitSuccess(true);
      setReviewForm({
        name: '',
        role: '',
        company: '',
        text: '',
        rating: 5,
        glow: 'rgba(6, 182, 212, 0.15)'
      });
      setTimeout(() => {
        setShowReviewModal(false);
        setSubmitSuccess(false);
      }, 1500);
    } catch (err) {
      console.error('Submission failed:', err);
      setFormError('Failed to publish review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="testimonials-section" id="testimonials">
        <div className="section-header reveal-on-scroll reveal-fade-up">
          <div className="services-badge">
            <span className="sparkle-spark">✦</span> Testimonials
          </div>
          <h2 className="section-title">
            What Clients <span className="text-gradient">Say</span>
          </h2>
          <p className="section-desc">
            Real feedback from product teams, startup founders, and technical directors.
          </p>
          <button
            onClick={() => setShowReviewModal(true)}
            className="btn-primary"
            style={{ marginTop: '20px', padding: '10px 24px', fontSize: '14.5px', gap: '8px', zIndex: 10 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Write a Review
          </button>
        </div>

        {testimonialsLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '350px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderTopColor: 'var(--accent-purple)',
              animation: 'spin-slow 2s linear infinite'
            }} />
            <span style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              Loading testimonials...
            </span>
          </div>
        ) : testimonialsList.length > 0 ? (
          <div className="testimonials-carousel-view reveal-on-scroll reveal-fade-right delay-100">
            <div className="testimonials-carousel-container">
              {testimonialsList.map((item, idx) => {
                const count = testimonialsList.length;
                let offset = idx - activeIndex;

                if (offset < -count / 2) offset += count;
                if (offset > count / 2) offset -= count;

                const absOffset = Math.abs(offset);
                const isActive = offset === 0;

                const translate = `translate(calc(-50% + ${offset} * var(--t-carousel-spacing)), -50%)`;
                const scale = `scale(${1 - absOffset * 0.1})`;

                const inlineStyle = {
                  transform: `${translate} ${scale}`,
                  opacity: absOffset > 1 ? 0 : 1 - absOffset * 0.2,
                  zIndex: 10 - absOffset,
                  pointerEvents: isActive ? 'auto' : 'none',
                  '--testimonial-glow': item.glow
                };

                return (
                  <div
                    key={idx}
                    className={`glass-panel testimonial-carousel-card ${isActive ? 'active-card' : ''}`}
                    style={inlineStyle}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <div className="testimonial-rating">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <svg
                          key={i}
                          className="star-icon"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>

                    <p className="testimonial-quote">“{item.text}”</p>

                    <div className="testimonial-author">
                      <div className="testimonial-avatar" style={{ '--avatar-glow': item.glow }}>
                        {item.avatar || 'AN'}
                      </div>
                      <div className="testimonial-meta">
                        <h4 className="testimonial-name">{item.name}</h4>
                        <p className="testimonial-role">
                          {item.role} @ <span className="text-gradient-purple">{item.company}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="carousel-controls">
              <button className="carousel-btn" onClick={handlePrev} aria-label="Previous testimonial">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>

              <div className="carousel-dots">
                {testimonialsList.map((_, idx) => (
                  <div
                    key={idx}
                    className={`carousel-dot ${idx === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                  />
                ))}
              </div>

              <button className="carousel-btn" onClick={handleNext} aria-label="Next testimonial">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <span style={{ color: 'var(--text-secondary)' }}>No reviews found.</span>
          </div>
        )}
      </section>

      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="review-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowReviewModal(false)} aria-label="Close modal">
              ✕
            </button>
            <h3 style={{ fontSize: '22px', fontWeight: '850', color: 'white', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
              Share Your Experience
            </h3>
            <p style={{ fontSize: '14px', color: '#9ca3af', margin: '0 0 24px 0', lineHeight: '1.5' }}>
              Your feedback is highly appreciated! Fill out the form below to post your testimonial card.
            </p>

            <form onSubmit={handleReviewSubmit}>
              <div className="contact-form-group">
                <label className="contact-label">Full Name</label>
                <input
                  type="text"
                  className="contact-input"
                  placeholder="e.g. John Doe"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '16px 0' }}>
                <div className="contact-form-group">
                  <label className="contact-label">Role / Job Title</label>
                  <input
                    type="text"
                    className="contact-input"
                    placeholder="e.g. CEO"
                    value={reviewForm.role}
                    onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                    required
                  />
                </div>
                <div className="contact-form-group">
                  <label className="contact-label">Company Name</label>
                  <input
                    type="text"
                    className="contact-input"
                    placeholder="e.g. ACME Corp"
                    value={reviewForm.company}
                    onChange={(e) => setReviewForm({ ...reviewForm, company: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="contact-form-group" style={{ margin: '16px 0' }}>
                <label className="contact-label">Star Rating</label>
                <div className="rating-select-container">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`rating-star-btn ${star <= reviewForm.rating ? 'active' : ''}`}
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div className="contact-form-group" style={{ margin: '16px 0' }}>
                <label className="contact-label">Review Description</label>
                <textarea
                  className="contact-input"
                  rows="4"
                  placeholder="Describe your working experience..."
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                  style={{ resize: 'none' }}
                  required
                />
              </div>

              <div className="contact-form-group" style={{ margin: '16px 0 28px 0' }}>
                <label className="contact-label">Card Glow Theme</label>
                <div className="glow-selection-row">
                  {TESTIMONIAL_GLOW_PRESETS.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      className={`glow-preset-btn ${reviewForm.glow === p.glow ? 'selected' : ''}`}
                      style={{ background: p.glow, color: p.color }}
                      onClick={() => setReviewForm({ ...reviewForm, glow: p.glow })}
                      title={`${p.name} Glow`}
                    />
                  ))}
                </div>
              </div>

              {formError && (
                <div style={{ fontSize: '13.5px', color: '#f87171', marginBottom: '16px', fontWeight: '500' }}>
                  ⚠ {formError}
                </div>
              )}

              {submitSuccess && (
                <div style={{ fontSize: '13.5px', color: '#34d399', marginBottom: '16px', fontWeight: '500' }}>
                  ✓ Review submitted successfully!
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', height: '46px', borderRadius: '10px' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Posting Review...' : 'Publish Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// ==========================================
// 6. CTA COMPONENT
// ==========================================
export const Cta = () => {
  return (
    <section className="cta-section">
      <div className="glass-panel cta-banner reveal-on-scroll reveal-scale">
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
            <a href="#/services" className="btn-primary">
              Start Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#/contacts" className="btn-secondary">
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

export const Pricing = () => {
  const plans = [
    {
      name: "Starter Website",
      price: "₹4,999",
      desc: "Perfect for personal portfolios, resumes, and landing pages.",
      features: [
        "1-Page Responsive Website",
        "Modern UI Design",
        "Contact Form",
        "Mobile Friendly",
        "Basic SEO Setup",
        "Free Deployment Assistance"
      ],
      glow: "rgba(6, 182, 212, 0.15)", // Cyan
      actionText: "Get Started"
    },
    {
      name: "Business Website",
      price: "₹9,999",
      desc: "Ideal for businesses, startups, and service providers.",
      features: [
        "4-6 Responsive Pages",
        "Modern Design",
        "WhatsApp Integration",
        "Contact Forms",
        "Google Maps Integration",
        "SEO Optimization",
        "Fast Performance"
      ],
      glow: "rgba(168, 85, 247, 0.15)", // Purple
      popular: true,
      actionText: "Choose Business"
    },
    {
      name: "Premium Web Solution",
      price: "₹14,999+",
      desc: "For businesses requiring advanced functionality.",
      features: [
        "Custom Design",
        "Dynamic Pages",
        "Admin Dashboard",
        "Database Integration",
        "Authentication System",
        "API Integration",
        "Advanced Animations",
        "1 Month Support"
      ],
      glow: "rgba(236, 72, 153, 0.15)", // Pink
      actionText: "Choose Premium"
    },
    {
      name: "Custom Development",
      price: "Custom Quote",
      desc: "Need something unique?",
      features: [
        "Full Stack Applications",
        "CRM Systems",
        "Booking Platforms",
        "E-commerce Websites",
        "Custom Dashboards",
        "API Development"
      ],
      glow: "rgba(99, 102, 241, 0.15)", // Indigo
      actionText: "Request Quote"
    }
  ];

  const whyChooseMe = [
    {
      icon: "⚡",
      title: "Fast Delivery",
      desc: "Quick turnaround times without compromising on code quality or standard design practices."
    },
    {
      icon: "🎨",
      title: "Modern & Professional Design",
      desc: "Stunning, customized visuals tailored to make your brand stand out."
    },
    {
      icon: "📱",
      title: "Fully Responsive Development",
      desc: "Optimized display and functionality across all mobile screens and desktop monitors."
    },
    {
      icon: "🔒",
      title: "Secure & Scalable Solutions",
      desc: "Solid architectures designed to grow alongside your expanding client demands."
    },
    {
      icon: "🚀",
      title: "Performance Optimized",
      desc: "Fast load speeds, search engine accessibility, and performance optimization."
    },
    {
      icon: "💬",
      title: "Ongoing Support",
      desc: "Assistance and scaling guidance post-launch to keep your app running smoothly."
    }
  ];

  return (
    <section className="pricing-section" id="pricing">
      <div className="section-header reveal-on-scroll reveal-fade-up">
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> Services & Pricing
        </div>
        <h2 className="section-title">
          Transparent <span className="text-gradient">Pricing</span>. Quality <span className="text-gradient">Solutions</span>.
        </h2>
        <p className="section-desc">
          Choose the package that best fits your needs. Every project is built with performance, responsiveness, and modern design in mind.
        </p>
      </div>

      <div className="pricing-grid reveal-on-scroll reveal-fade-up delay-100" style={{ marginBottom: '80px' }}>
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`glass-panel pricing-card ${plan.popular ? 'popular-card' : ''}`}
            style={{ '--tier-glow': plan.glow }}
          >
            {plan.popular && (
              <span className="popular-badge">
                <span className="sparkle-spark" style={{ marginRight: '4px' }}>✦</span> Most Popular
              </span>
            )}
            <h3 className="tier-name" style={{ marginTop: plan.popular ? '20px' : '0' }}>{plan.name}</h3>
            <div className="price-container">
              <span className="price-value" style={{ fontSize: plan.price.length > 8 ? '32px' : '44px' }}>{plan.price}</span>
            </div>
            <p className="tier-desc">{plan.desc}</p>
            <div className="divider"></div>
            <ul className="tier-features-list">
              {plan.features.map((feat, fIdx) => (
                <li key={fIdx} className="feature-item">
                  <svg className="feature-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 'auto', width: '100%' }}>
              <a
                href={`#/contacts?subject=${encodeURIComponent(plan.name + ' Plan Inquiry')}&message=${encodeURIComponent('Hi Chaitanya, I am interested in the ' + plan.name + ' package. Let\'s connect and discuss this!')}`}
                className={plan.popular ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', justifyContent: 'center', display: 'flex', textDecoration: 'none' }}
              >
                {plan.actionText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* WHY CHOOSE ME SECTION */}
      <div className="section-header reveal-on-scroll reveal-fade-up" style={{ marginTop: '40px' }}>
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> Core Values
        </div>
        <h2 className="section-title">
          Why Choose <span className="text-gradient">Me</span>?
        </h2>
        <p className="section-desc">
          I bridge the gap between creative visual designs and high-performance server architectures to ship production-ready applications.
        </p>
      </div>

      <div className="values-grid reveal-on-scroll reveal-fade-up delay-100">
        {whyChooseMe.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              transition: 'all 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.boxShadow = '0 10px 25px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(6, 182, 212, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              {item.icon}
            </div>
            <h3 style={{ fontSize: '17px', color: 'white', fontWeight: '600', margin: 0 }}>{item.title}</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;

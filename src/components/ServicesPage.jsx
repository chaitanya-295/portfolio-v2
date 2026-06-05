import { useEffect } from 'react';
import { useServicesPage } from '../data/servicesPage';

const ServicesPage = () => {
  const { config } = useServicesPage();
  const plans = config.plans || [];
  const whyHireMe = config.whyHireMe || [];

  // Run reveal-on-scroll animations on mount
  useEffect(() => {
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
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div style={{ minHeight: '100vh', paddingTop: '230px', paddingBottom: '60px' }}>

      {/* ─── Page Hero Banner ─── */}
      <div className="reveal-on-scroll reveal-fade-up" style={{ textAlign: 'center', marginBottom: '70px', padding: '0 24px' }}>
        <div className="pricing-badge-pill">
          {config.heroBadge || "Services & Pricing"}
        </div>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.4rem)',
          fontWeight: '850',
          color: 'white',
          margin: '0 0 24px 0',
          lineHeight: '1.15',
          letterSpacing: '-1.5px'
        }}>
          {config.heroTitle || "Transparent Pricing."}<br />
          <span className="text-gradient-pricing">{config.heroSubtitle || "Quality Solutions."}</span>
        </h1>
        <p style={{
          fontSize: '17px',
          color: '#9ca3af',
          maxWidth: '650px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          {config.heroDesc || "Choose the perfect package for your business. Whether you need a simple landing page or a full-scale CMS, we have you covered."}
        </p>
      </div>

      {/* ─── Pricing Cards ─── */}
      <div className="pricing-grid reveal-on-scroll reveal-fade-up delay-100"
        style={{ maxWidth: '1200px', margin: '0 auto 90px auto', padding: '0 24px' }}>
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`glass-panel pricing-card ${plan.popular ? 'popular-card' : ''}`}
            style={{ '--tier-glow': plan.glow, '--accent-color': plan.accentColor }}
          >
            {plan.popular && (
              <span className="popular-badge">
                MOST POPULAR
              </span>
            )}

            {/* Card Header Content - Centered */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: '16px' }}>
              <h3 className="tier-name" style={{ color: 'white', fontSize: '20px', fontWeight: '600', margin: plan.popular ? '15px 0 10px 0' : '0 0 10px 0' }}>
                {plan.name}
              </h3>
              <div className="price-container" style={{ margin: '0 0 12px 0' }}>
                <span className="price-value" style={{ fontSize: '40px', fontWeight: '750', color: 'white' }}>
                  {plan.price}
                </span>
              </div>
              <p className="tier-desc" style={{ color: '#9ca3af', fontSize: '13.5px', lineHeight: '1.5', margin: '0', minHeight: '40px' }}>
                {plan.desc}
              </p>
            </div>

            <div className="divider" style={{ borderColor: plan.accentColor + '30', width: '100%' }} />

            <ul className="tier-features-list">
              {(plan.features || []).map((feat, fIdx) => (
                <li key={fIdx} className="feature-item">
                  <svg className="feature-check" width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke={plan.accentColor} strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round">
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
      {/* ─── Why Hire Me Section ─── */}
      <div className="reveal-on-scroll reveal-fade-up delay-100" style={{ maxWidth: '1200px', margin: '0 auto 60px auto', padding: '0 24px' }}>
        <div className="why-hire-me-container">
          {/* Left Column */}
          <div className="why-hire-me-info">
            <h2 className="why-hire-me-title">Why hire me?</h2>
            
            <div className="why-hire-me-list">
              {whyHireMe.map((item, idx) => (
                <div key={idx} className="why-hire-me-item">
                  <div className="why-hire-me-icon-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="why-hire-me-item-title">{item.title}</h4>
                    <p className="why-hire-me-item-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="why-hire-me-status">
            <div className="project-status-card">
              <div className="project-status-header">
                <div className="status-globe-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <div className="status-header-text">
                  <span className="status-label">Project Status</span>
                  <span className="status-value">
                    <span className="status-dot"></span>{config.statusText || "Live & Healthy"}
                  </span>
                </div>
              </div>
              
              <div className="status-progress-container">
                <div className="status-progress-track">
                  <div className="status-progress-fill" style={{ width: `${config.statusProgress || 98}%` }}></div>
                </div>
              </div>
              
              <div className="status-metrics-row">
                <span className="metric-label">Performance Score</span>
                <span className="metric-value">{config.performanceScore || "98/100"}</span>
              </div>
              
              <div className="status-metrics-divider"></div>
              
              <div className="status-sub-metrics">
                <div className="sub-metric-item">
                  <span className="sub-metric-label">Speed Index</span>
                  <span className="sub-metric-value text-glow-cyan">{config.speedIndex || "0.3s"}</span>
                </div>
                <div className="sub-metric-item">
                  <span className="sub-metric-label">SEO Score</span>
                  <span className="sub-metric-value text-glow-green">{config.seoScore || "100/100"}</span>
                </div>
                <div className="sub-metric-item">
                  <span className="sub-metric-label">Security</span>
                  <span className="sub-metric-value text-glow-purple">{config.securityScore || "SSL A+"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CTA Section ─── */}
      <div className="reveal-on-scroll reveal-fade-up delay-100" style={{ maxWidth: '1200px', margin: '60px auto 40px auto', padding: '0 24px' }}>
        <div className="services-cta-panel">
          <div className="services-cta-content">
            <h2 className="services-cta-title">{config.ctaTitle || "Need Help Choosing a Plan?"}</h2>
            <p className="services-cta-desc">
              {config.ctaDesc || "Let's discuss your project requirements and find the perfect solution for your goals and budget."}
            </p>
          </div>
          <div className="services-cta-actions">
            <a href={`#/contacts?subject=Free%20Consultation&message=${encodeURIComponent("Hi Chaitanya, I would like to schedule a free consultation to discuss my project.")}`} className="btn-primary cta-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Get a Free Consultation
            </a>
            <a href={config.whatsappLink || "https://wa.me/919730593429?text=Hi%20Chaitanya%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you%21"} target="_blank" rel="noopener noreferrer" className="btn-secondary cta-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.897 0c3.183.001 6.177 1.24 8.428 3.493 2.25 2.253 3.487 5.25 3.484 8.435-.005 6.573-5.33 11.897-11.9 11.897-1.998-.001-3.957-.502-5.707-1.458L0 24zm6.549-3.722c1.652.98 3.516 1.5 5.434 1.5 5.498 0 9.972-4.475 9.976-9.974.001-2.664-1.034-5.17-2.915-7.054C17.26 2.863 14.76 1.828 12.09 1.828 6.596 1.828 2.12 6.304 2.116 11.804c-.001 1.944.506 3.844 1.47 5.514l-.995 3.637 3.73-.977zm11.367-7.56c-.32-.16-1.89-.93-2.185-1.04-.294-.11-.51-.16-.723.16-.214.32-.828 1.04-1.014 1.25-.187.21-.374.24-.694.08-.32-.16-1.353-.5-2.578-1.593-.952-.85-1.594-1.9-1.782-2.22-.187-.32-.02-.49.14-.65.144-.144.32-.37.48-.56.16-.18.214-.3.32-.5.11-.2.05-.37-.03-.53-.08-.16-.723-1.74-.99-2.388-.26-.625-.526-.54-.723-.55-.186-.01-.4-.01-.613-.01-.214 0-.56.08-.854.4-.294.32-1.123 1.1-1.123 2.68 0 1.58 1.15 3.11 1.31 3.33.16.22 2.264 3.457 5.485 4.85.766.33 1.363.528 1.83.676.77.244 1.47.21 2.025.128.619-.092 1.89-.77 2.152-1.48.26-.71.26-1.32.18-1.45-.08-.13-.3-.21-.62-.37z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ServicesPage;

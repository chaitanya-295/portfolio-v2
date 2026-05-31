import { useEffect } from 'react';

const ServicesPage = () => {
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
      glow: "rgba(6, 182, 212, 0.18)",
      accentColor: "#06b6d4",
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
      glow: "rgba(168, 85, 247, 0.18)",
      accentColor: "#a855f7",
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
      glow: "rgba(236, 72, 153, 0.18)",
      accentColor: "#ec4899",
      actionText: "Choose Premium"
    },
    {
      name: "Custom Development",
      price: "Custom Quote",
      desc: "Need something unique? Let's build it together.",
      features: [
        "Full Stack Applications",
        "CRM Systems",
        "Booking Platforms",
        "E-commerce Websites",
        "Custom Dashboards",
        "API Development"
      ],
      glow: "rgba(99, 102, 241, 0.18)",
      accentColor: "#6366f1",
      actionText: "Request Quote"
    }
  ];

  const whyChooseMe = [
    {
      icon: "⚡",
      title: "Fast Delivery",
      desc: "Quick turnaround times without compromising on code quality or standard design practices.",
      color: "#f59e0b"
    },
    {
      icon: "🎨",
      title: "Modern & Professional Design",
      desc: "Stunning, customized visuals tailored to make your brand stand out.",
      color: "#ec4899"
    },
    {
      icon: "📱",
      title: "Fully Responsive Development",
      desc: "Optimized display and functionality across all mobile screens and desktop monitors.",
      color: "#06b6d4"
    },
    {
      icon: "🔒",
      title: "Secure & Scalable Solutions",
      desc: "Solid architectures designed to grow alongside your expanding client demands.",
      color: "#10b981"
    },
    {
      icon: "🚀",
      title: "Performance Optimized",
      desc: "Fast load speeds, search engine accessibility, and performance optimization.",
      color: "#a855f7"
    },
    {
      icon: "💬",
      title: "Ongoing Support",
      desc: "Assistance and scaling guidance post-launch to keep your app running smoothly.",
      color: "#6366f1"
    }
  ];

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
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px' }}>

      {/* ─── Page Hero Banner ─── */}
      <div className="reveal-on-scroll reveal-fade-up" style={{ textAlign: 'center', marginBottom: '70px', padding: '0 24px' }}>
        <div className="services-badge" style={{ display: 'inline-flex', marginBottom: '18px' }}>
          <span className="sparkle-spark">✦</span> Services &amp; Pricing
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.4rem)',
          fontWeight: '800',
          color: 'white',
          margin: '0 0 18px 0',
          lineHeight: '1.15'
        }}>
          Transparent <span className="text-gradient">Pricing</span>.{' '}
          Quality <span className="text-gradient">Solutions</span>.
        </h1>
        <p style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: '1.7'
        }}>
          Choose the package that best fits your needs. Every project is built
          with performance, responsiveness, and modern design in mind.
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
                <span className="sparkle-spark" style={{ marginRight: '4px' }}>✦</span>
                Most Popular
              </span>
            )}
            <h3 className="tier-name" style={{ marginTop: plan.popular ? '20px' : '0', color: plan.accentColor }}>
              {plan.name}
            </h3>
            <div className="price-container">
              <span className="price-value" style={{ fontSize: plan.price.length > 8 ? '32px' : '44px' }}>
                {plan.price}
              </span>
            </div>
            <p className="tier-desc">{plan.desc}</p>
            <div className="divider" style={{ borderColor: plan.accentColor + '30' }} />
            <ul className="tier-features-list">
              {plan.features.map((feat, fIdx) => (
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
                href="#footer"
                className={plan.popular ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', justifyContent: 'center', display: 'flex', textDecoration: 'none' }}
              >
                {plan.actionText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Why Choose Me ─── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div className="section-header reveal-on-scroll reveal-fade-up" style={{ marginBottom: '48px' }}>
          <div className="services-badge" style={{ display: 'inline-flex' }}>
            <span className="sparkle-spark">✦</span> Core Values
          </div>
          <h2 className="section-title">
            Why Choose <span className="text-gradient">Me</span>?
          </h2>
          <p className="section-desc">
            I bridge the gap between creative visual designs and high-performance server
            architectures to ship production-ready applications.
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
                cursor: 'default',
                borderTop: `2px solid ${item.color}30`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderTopColor = item.color + '80';
                e.currentTarget.style.boxShadow = `0 12px 30px -10px rgba(0,0,0,0.5), 0 0 20px ${item.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderTopColor = item.color + '30';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: `${item.color}15`,
                border: `1px solid ${item.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px'
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '17px', color: 'white', fontWeight: '600', margin: 0 }}>{item.title}</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ServicesPage;

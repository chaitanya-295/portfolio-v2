import { useState, useEffect } from 'react';
import { useBlogPosts } from '../data/blogPosts';

const BlogPage = () => {
  const { blogPosts, loading } = useBlogPosts();
  const [animate, setAnimate] = useState(false);

  // Run reveal animations on mount or after loading completes
  useEffect(() => {
    if (loading) return;
    const timeoutId = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [loading]);

  if (loading) {
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
        <span style={{ marginTop: '16px', fontSize: '15px', color: '#9ca3af' }}>
          Loading articles...
        </span>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* ─── Page Hero Banner ─── */}
      <div className={`section-header reveal-on-scroll reveal-fade-up ${animate ? 'visible' : ''}`} style={{ marginBottom: '60px', padding: '0 24px' }}>
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> Beyond The Code
        </div>
        <h1 className="section-title">
          Insights, Experiences <span className="text-gradient">&amp; Continuous Learning</span>
        </h1>
        <p className="section-desc" style={{ maxWidth: '650px' }}>
          A collection of thoughts, tutorials, and project stories that reflect my passion for technology, problem-solving, and modern development.
        </p>
      </div>

      {/* ─── Articles Grid ─── */}
      <div
        className={`reveal-on-scroll reveal-fade-up delay-100 ${animate ? 'visible' : ''}`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 360px))',
          justifyContent: 'center',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          width: '100%'
        }}
      >
        {blogPosts.map((post, idx) => {
          const accentColor = post.accentColor || 'var(--accent-purple)';
          const glow = post.glow || 'rgba(168, 85, 247, 0.15)';
          return (
            <div
              key={post.id}
              className="glass-panel"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                background: 'rgba(13, 9, 29, 0.5)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                borderRadius: '20px',
                height: '100%'
              }}
              onClick={() => {
                window.location.hash = `#/blog-detail/${post.id}`;
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.boxShadow = `0 20px 40px -15px ${glow}, 0 0 20px -5px ${accentColor}33`;
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.background = 'rgba(20, 15, 41, 0.7)';
                const arrow = e.currentTarget.querySelector('.blog-arrow');
                if (arrow) arrow.style.transform = 'translateX(4px)';
                const img = e.currentTarget.querySelector('.blog-card-image');
                if (img) img.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(13, 9, 29, 0.5)';
                const arrow = e.currentTarget.querySelector('.blog-arrow');
                if (arrow) arrow.style.transform = 'translateX(0)';
                const img = e.currentTarget.querySelector('.blog-card-image');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              {/* Ambient Background Glow Effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '140px',
                height: '140px',
                background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
                pointerEvents: 'none',
                zIndex: 1
              }} />

              {/* Post Thumbnail Image */}
              {post.image && (
                <div style={{
                  width: '100%',
                  height: '180px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  zIndex: 2,
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="blog-card-image"
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(4, 2, 9, 0.4) 100%)',
                    pointerEvents: 'none',
                    zIndex: 3
                  }} />
                </div>
              )}

              {/* Meta Tags */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2, marginTop: '4px' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '100px',
                  background: glow,
                  border: `1px solid ${accentColor}26`,
                  color: accentColor,
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px'
                }}>
                  {post.category}
                </span>
                <span style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'white',
                lineHeight: '1.4',
                margin: '4px 0 0 0',
                zIndex: 2,
                transition: 'color 0.3s ease',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {post.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '13.5px',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                margin: 0,
                flexGrow: 1,
                zIndex: 2,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {post.desc}
              </p>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))',
                margin: '8px 0',
                zIndex: 2
              }} />

              {/* Footer Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  {post.date}
                </span>
                <div
                  className="blog-arrow"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease' }}>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default BlogPage;


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
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '30px',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 16px'
        }}
      >
        {blogPosts.map((post, idx) => (
          <div
            key={post.id}
            className="glass-panel"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              background: 'rgba(255, 255, 255, 0.01)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onClick={() => {
              window.location.hash = `#/blog-detail/${post.id}`;
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = post.accentColor;
              e.currentTarget.style.boxShadow = `0 10px 30px -10px ${post.glow}, 0 0 20px ${post.glow}`;
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.querySelector('.blog-arrow').style.transform = 'translateX(4px)';
              const img = e.currentTarget.querySelector('.blog-card-image');
              if (img) img.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.querySelector('.blog-arrow').style.transform = 'translateX(0)';
              const img = e.currentTarget.querySelector('.blog-card-image');
              if (img) img.style.transform = 'scale(1)';
            }}
          >
            {/* Ambient Background Glow Effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '120px',
              height: '120px',
              background: `radial-gradient(circle, ${post.glow} 0%, transparent 70%)`,
              pointerEvents: 'none',
              zIndex: 1
            }} />

            {/* Post Thumbnail Image */}
            {post.image && (
              <div style={{
                width: '100%',
                height: '180px',
                borderRadius: '6px',
                overflow: 'hidden',
                position: 'relative',
                zIndex: 2,
                border: '1px solid rgba(255, 255, 255, 0.04)'
              }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  className="blog-card-image"
                />
              </div>
            )}

            {/* Meta Tags */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2, marginTop: '4px' }}>
              <span style={{
                color: post.accentColor,
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {post.category}
              </span>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: '19px',
              fontWeight: '600',
              color: 'white',
              lineHeight: '1.4',
              margin: '0',
              zIndex: 2
            }}>
              {post.title}
            </h3>

            {/* Description */}
            <p style={{
              fontSize: '14px',
              color: '#9ca3af',
              lineHeight: '1.6',
              margin: 0,
              flexGrow: 1,
              zIndex: 2
            }}>
              {post.desc}
            </p>

            {/* Divider */}
            <div style={{
              height: '1px',
              background: 'rgba(255, 255, 255, 0.06)',
              margin: '4px 0'
            }} />

            {/* Footer Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>
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
                  transition: 'transform 0.3s ease'
                }}
              >
                Read Article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BlogPage;


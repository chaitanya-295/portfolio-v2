import { useState, useEffect } from 'react';
import { useBlogPosts } from '../data/blogPosts';

// Helper to parse paragraph text and dynamically render markdown-style lists (bullets/numbers)
const renderParagraphContent = (text) => {
  if (!text) return null;
  
  const lines = text.split('\n');
  const elements = [];
  
  let currentParagraphLines = [];
  let currentList = [];
  let isOrdered = false;

  const flushParagraph = (key) => {
    if (currentParagraphLines.length > 0) {
      elements.push(
        <p 
          key={`p-${key}`} 
          className="blog-paragraph" 
          style={{ margin: 0 }}
        >
          {currentParagraphLines.map((line, idx) => (
            <span key={idx}>
              {line}
              {idx < currentParagraphLines.length - 1 && <br />}
            </span>
          ))}
        </p>
      );
      currentParagraphLines = [];
    }
  };

  const flushList = (key) => {
    if (currentList.length > 0) {
      const ListTag = isOrdered ? 'ol' : 'ul';
      elements.push(
        <ListTag 
          key={`list-${key}`} 
          style={{
            margin: 0,
            paddingLeft: '24px',
            color: '#d1d5db',
            lineHeight: '1.8',
            fontSize: '17px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {currentList.map((item, idx) => (
            <li key={idx} style={{ color: '#d1d5db' }}>
              {item}
            </li>
          ))}
        </ListTag>
      );
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph(idx);
      flushList(idx);
      return;
    }

    // Check if line matches standard list bullet: e.g. "- item", "* item", "• item", or "1. item"
    const bulletMatch = line.match(/^\s*([-\*•]|\d+\.)\s+(.*)/);
    if (bulletMatch) {
      flushParagraph(idx);
      
      const marker = bulletMatch[1];
      const content = bulletMatch[2];
      const lineIsOrdered = /^\d+\./.test(marker);

      if (currentList.length > 0 && isOrdered !== lineIsOrdered) {
        flushList(idx);
      }

      isOrdered = lineIsOrdered;
      currentList.push(content);
    } else {
      flushList(idx);
      currentParagraphLines.push(line);
    }
  });

  flushParagraph(lines.length);
  flushList(lines.length);
  
  return elements;
};

const BlogDetail = () => {
  const { blogPosts, loading } = useBlogPosts();
  const [post, setPost] = useState(null);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (loading || !blogPosts || blogPosts.length === 0) return;

    const handleHashChange = () => {
      const hash = window.location.hash;
      const parts = hash.split('/');
      const idStr = parts[parts.length - 1];
      
      const selectedPost = blogPosts.find(p => p.id === idStr);
      if (selectedPost) {
        setPost(selectedPost);
      } else {
        // Fallback to first post if invalid ID
        setPost(blogPosts[0]);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check hash initially

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [loading, blogPosts]);

  // Track page scroll percentage for progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Setup animations on mount or post change
  useEffect(() => {
    if (!post) return;
    const timeoutId = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [post]);

  if (!post) {
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
          Loading article...
        </span>
      </div>
    );
  }



  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="about-section blog-detail-section" id="blog-detail" style={{ minHeight: '90vh', position: 'relative' }}>
      
      {/* Reading Progress Scroll Indicator Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '4px',
        background: `linear-gradient(to right, ${post.accentColor}, #8b5cf6)`,
        zIndex: 1000,
        transition: 'width 0.1s ease-out'
      }} />

      {/* Decorative dynamic ambient glow */}
      <div
        className="project-ambient-glow"
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${post.glow} 0%, rgba(0, 0, 0, 0) 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div className={`section-header reveal-on-scroll reveal-fade-up ${animate ? 'visible' : ''}`} style={{ zIndex: 2, marginBottom: '40px' }}>
        <div className="services-badge" style={{ borderColor: post.accentColor, color: post.accentColor, background: post.glow }}>
          <span className="sparkle-spark">✦</span> {post.category}
        </div>
        <h1 className="section-title blog-detail-title">
          {post.title}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', color: '#9ca3af', fontSize: '14px', flexWrap: 'wrap' }}>
          <span>Published on {post.date}</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.3)' }} />
          <span>{post.readTime}</span>
        </div>
      </div>

      <div className={`reveal-on-scroll reveal-fade-up delay-100 blog-detail-container ${animate ? 'visible' : ''}`} style={{ maxWidth: '850px', margin: '0 auto', zIndex: 2, position: 'relative' }}>
        
        {/* Massive Blog Header Hero Image */}
        {post.image && (
          <div className="glass-panel blog-image-panel" style={{
            boxShadow: `0 15px 35px -10px ${post.glow}`
          }}>
            <div className="blog-image-wrapper">
              <img
                src={post.image}
                alt={post.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        )}

        {/* Content Layout */}
        <div className="glass-panel blog-content-card" style={{ border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          {post.content.map((block, idx) => {
            if (block.type === 'paragraph') {
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {renderParagraphContent(block.text)}
                </div>
              );
            }
            if (block.type === 'heading') {
              return (
                <h2 key={idx} className="blog-heading" style={{ marginTop: '20px', marginBottom: '4px' }}>
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'code') {
              return (
                <div key={idx} style={{ position: 'relative', margin: '12px 0' }}>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '16px',
                    zIndex: 10
                  }}>
                    <button
                      onClick={(e) => {
                        navigator.clipboard.writeText(block.code);
                        const btn = e.currentTarget;
                        btn.innerHTML = 'Copied!';
                        setTimeout(() => btn.innerHTML = 'Copy', 2000);
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: 'white',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="blog-code-block" style={{ margin: 0 }}>
                    <code>{block.code}</code>
                  </pre>
                </div>
              );
            }
            return null;
          })}

          {/* Share & Article Actions Panel */}
          <div className="blog-actions-panel" style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {/* Tags */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {post.tags.map((tag, idx) => (
                <span key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#9ca3af'
                }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '8px 20px',
                borderRadius: '30px',
                fontSize: '13px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = post.accentColor;
                e.currentTarget.style.background = post.glow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              {copied ? 'Link Copied!' : 'Share Article'}
            </button>
          </div>
        </div>



        {/* Back Button */}
        <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center' }}>
          <a
            href="#/blog"
            className="btn-primary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Blog
          </a>
        </div>

      </div>
    </section>
  );
};

export default BlogDetail;

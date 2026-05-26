import { useState } from 'react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonialsList = [
    {
      name: 'Sarah Connor',
      role: 'CTO',
      company: 'CyberTech Systems',
      text: "Chaitanya's WebGL planetary simulator exceeded our expectations. The orbital physics details, high-performance shading, and visual fidelity were absolutely top-notch.",
      rating: 5,
      avatar: 'SC',
      glow: 'rgba(6, 182, 212, 0.15)' // Cyan glow
    },
    {
      name: 'David Miller',
      role: 'Product Lead',
      company: 'StellarAnalytics',
      text: 'The cosmic telemetry dashboard he built was stunning. Our real-time data flow integrates perfectly, and the user interaction is exceptionally smooth. Exceptional work!',
      rating: 5,
      avatar: 'DM',
      glow: 'rgba(236, 72, 153, 0.15)' // Pink glow
    },
    {
      name: 'Elena Rostova',
      role: 'Co-Founder',
      company: 'Nebula Web3',
      text: 'An outstanding full-stack developer. Chaitanya integrated our Ethereum smart contracts and custom GLSL shaders seamlessly, launching our minting portal ahead of schedule.',
      rating: 5,
      avatar: 'ER',
      glow: 'rgba(168, 85, 247, 0.15)' // Purple glow
    }
  ];



  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsList.length);
  };

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-header">
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> Testimonials
        </div>
        <h2 className="section-title">
          What Clients <span className="text-gradient">Say</span>
        </h2>
        <p className="section-desc">
          Real feedback from product teams, startup founders, and technical directors.
        </p>
      </div>

      <div className="testimonials-carousel-view">
        <div className="testimonials-carousel-container">
          {testimonialsList.map((item, idx) => {
            const count = testimonialsList.length;
            let offset = idx - activeIndex;

            // Handle circular wrapping for a continuous infinite loop
            if (offset < -count / 2) offset += count;
            if (offset > count / 2) offset -= count;

            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            // Compute flat transitions based on relative offset
            const translate = `translate(calc(-50% + ${offset} * var(--t-carousel-spacing)), -50%)`;
            const scale = `scale(${1 - absOffset * 0.1})`;

            const inlineStyle = {
              transform: `${translate} ${scale}`,
              opacity: absOffset > 1 ? 0 : 1 - absOffset * 0.4,
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
                  {[...Array(item.rating)].map((_, i) => (
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
                    {item.avatar}
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

        {/* Navigation Controls */}
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
    </section>
  );
};

export default Testimonials;

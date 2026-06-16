import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down more than 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
      aria-label="Scroll to top"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <polyline points="5 11 12 4 19 11"></polyline>
      </svg>
    </button>
  );
};

export default ScrollToTop;

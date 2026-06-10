import { useState, useEffect } from 'react';

const ScrollToTop = ({ currentRoute }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

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

  useEffect(() => {
    // Reset footer visibility state on route changes
    setIsFooterVisible(false);

    // Give a short timeout for the DOM to settle after route change
    const timeoutId = setTimeout(() => {
      const footerElement = document.getElementById('footer');
      if (!footerElement) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsFooterVisible(entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0,
        }
      );

      observer.observe(footerElement);

      return () => {
        observer.disconnect();
      };
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [currentRoute]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Only display the floating scroll-to-top button if page is scrolled down
  // AND the footer is not currently visible in the viewport.
  const shouldShow = isVisible && !isFooterVisible;

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-btn ${shouldShow ? 'visible' : ''}`}
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

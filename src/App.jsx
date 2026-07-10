import { useState, useEffect } from 'react';
import GalaxyBackground from './components/GalaxyBackground';
import Navbar from './components/Navbar';
import Hero, { About, Services, Projects, Testimonials, Cta } from './components/Hero';
import ServicesPage from './components/ServicesPage';
import AboutDetail from './components/AboutDetail';
import ProjectDetail from './components/ProjectDetail';
import ProjectsGallery from './components/ProjectsGallery';
import AdminPanel from './components/AdminPanel';
import BlogPage from './components/BlogPage';
import BlogDetail from './components/BlogDetail';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import { useProfile } from './data/profile';
import './App.css';

function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const { profile, loading: profileLoading } = useProfile();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/about-detail' || hash === '#about-detail' || hash.includes('about-detail')) {
        setCurrentRoute('about-detail');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash.includes('project-detail')) {
        setCurrentRoute('project-detail');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/projects') {
        setCurrentRoute('projects');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/services') {
        setCurrentRoute('services');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash.includes('blog-detail')) {
        setCurrentRoute('blog-detail');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/blog' || hash === '#blog' || hash.includes('blog')) {
        setCurrentRoute('blog');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/admin' || hash === '#admin' || hash.includes('admin')) {
        setCurrentRoute('admin');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '#/contacts' || hash === '#contacts' || hash.includes('contacts')) {
        setCurrentRoute('contacts');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check current hash on initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentRoute !== 'home' && currentRoute !== 'services') return;

    // Timeout allows DOM nodes to fully mount before querySelecting
    const timeoutId = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.08,
      };

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, observerOptions);

      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      revealElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [currentRoute, profileLoading]);

  if (profileLoading) {
    return (
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#03000a' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid rgba(255, 255, 255, 0.1)', borderTopColor: 'var(--accent-cyan)', animation: 'spin-slow 2s linear infinite' }} />
          <span style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>Loading portfolio...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Dynamic Interactive HTML5 Canvas Galaxy Background */}
      <GalaxyBackground />

      {/* Floating Glassmorphic Header Navigation */}
      <Navbar currentRoute={currentRoute} />

      <div className="app-entrance-reveal">

        {currentRoute === 'about-detail' && profile.showAbout !== false ? (
          <AboutDetail />
        ) : currentRoute === 'project-detail' && profile.showProjects !== false ? (
          <ProjectDetail />
        ) : currentRoute === 'projects' && profile.showProjects !== false ? (
          <ProjectsGallery />
        ) : currentRoute === 'services' && profile.showServices !== false ? (
          <ServicesPage />
        ) : currentRoute === 'blog' && profile.showBlog !== false ? (
          <BlogPage />
        ) : currentRoute === 'blog-detail' && profile.showBlog !== false ? (
          <BlogDetail />
        ) : currentRoute === 'admin' ? (
          <AdminPanel />
        ) : currentRoute === 'contacts' ? (
          <ContactPage />
        ) : (
          <>
            {/* Central Cosmic Ring Section */}
            <Hero />
            <div className="section-divider" />

            {/* The Person Behind The Screen Section */}
            {profile.showAbout !== false && (
              <>
                <About />
                <div className="section-divider" />
              </>
            )}

            {/* What I Create (Services) Section */}
            {profile.showServices !== false && (
              <>
                <Services />
                <div className="section-divider" />
              </>
            )}

            {/* Things I've Built (Projects) Section */}
            {profile.showProjects !== false && (
              <>
                <Projects />
                <div className="section-divider" />
              </>
            )}

            {/* What Clients Say (Testimonials) Section (Temporarily Removed) */}
            {/* <Testimonials /> */}
            {/* <div className="section-divider" /> */}

            {/* Business Online (CTA) Section */}
            <Cta />
            <div className="section-divider" />
          </>
        )}

        {/* Footer Section */}
        <Footer />
      </div>

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default App;

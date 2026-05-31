import { useState, useEffect } from 'react';
import GalaxyBackground from './components/GalaxyBackground';
import Navbar from './components/Navbar';
import Hero, { About, Services, Projects, Testimonials, Cta } from './components/Hero';
import ServicesPage from './components/ServicesPage';
import AboutDetail from './components/AboutDetail';
import ProjectDetail from './components/ProjectDetail';
import ProjectsGallery from './components/ProjectsGallery';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentRoute, setCurrentRoute] = useState('home');

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
      } else if (hash === '#/admin' || hash === '#admin' || hash.includes('admin')) {
        setCurrentRoute('admin');
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
  }, [currentRoute]);

  return (
    <div className="app-container">
      {/* Dynamic Interactive HTML5 Canvas Galaxy Background */}
      <GalaxyBackground />

      {/* Floating Glassmorphic Header Navigation */}
      <Navbar />

      {currentRoute === 'about-detail' ? (
        <AboutDetail />
      ) : currentRoute === 'project-detail' ? (
        <ProjectDetail />
      ) : currentRoute === 'projects' ? (
        <ProjectsGallery />
      ) : currentRoute === 'services' ? (
        <ServicesPage />
      ) : currentRoute === 'admin' ? (
        <AdminPanel />
      ) : (
        <>
          {/* Central Cosmic Ring Section */}
          <Hero />
          <div className="section-divider" />

          {/* The Person Behind The Screen Section */}
          <About />
          <div className="section-divider" />

          {/* What I Create (Services) Section */}
          <Services />
          <div className="section-divider" />

          {/* Things I've Built (Projects) Section */}
          <Projects />
          <div className="section-divider" />

          {/* What Clients Say (Testimonials) Section */}
          <Testimonials />
          <div className="section-divider" />

          {/* Business Online (CTA) Section */}
          <Cta />
          <div className="section-divider" />
        </>
      )}

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;

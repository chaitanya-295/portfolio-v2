import { useState, useEffect } from 'react';
import GalaxyBackground from './components/GalaxyBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AboutDetail from './components/AboutDetail';
import Services from './components/Services';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import Cta from './components/Cta';
import './App.css';

function App() {
  const [currentRoute, setCurrentRoute] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/about-detail' || hash === '#about-detail' || hash.includes('about-detail')) {
        setCurrentRoute('about-detail');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check current hash on initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="app-container">
      {/* Dynamic Interactive HTML5 Canvas Galaxy Background */}
      <GalaxyBackground />

      {/* Floating Glassmorphic Header Navigation */}
      <Navbar />

      {currentRoute === 'about-detail' ? (
        <AboutDetail />
      ) : (
        <>
          {/* Central Cosmic Ring Section */}
          <Hero />

          {/* The Person Behind The Screen Section */}
          <About />

          {/* What I Create (Services) Section */}
          <Services />

          {/* Things I've Built (Projects) Section */}
          <Projects />

          {/* What Clients Say (Testimonials) Section */}
          <Testimonials />

          {/* Business Online (CTA) Section */}
          <Cta />
        </>
      )}

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;

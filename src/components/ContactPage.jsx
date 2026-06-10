import { useState, useEffect } from 'react';
import { useProfile } from '../data/profile';
import { submitContactMessage } from '../data/contacts';
import './ContactPage.css';

const ContactPage = () => {
  const { profile, loading: profileLoading } = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [animate, setAnimate] = useState(false);

  // Parse query parameters to prefill Subject and Message
  useEffect(() => {
    const hash = window.location.hash;
    const searchPart = hash.split('?')[1];
    if (searchPart) {
      const params = new URLSearchParams(searchPart);
      const subject = params.get('subject') || '';
      const message = params.get('message') || '';
      setFormData((prev) => ({
        ...prev,
        subject: prev.subject || subject,
        message: prev.message || message
      }));
    }
  }, []);

  // Run reveal animations on mount or after profile loaded
  useEffect(() => {
    if (profileLoading) return;
    const timeoutId = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [profileLoading]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Full Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific error as they type
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await submitContactMessage(formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitError('Something went wrong. Please try again or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      {/* ─── Page Hero Banner ─── */}
      <div className={`section-header reveal-on-scroll reveal-fade-up ${animate ? 'visible' : ''}`} style={{ margin: '0 auto 40px auto', padding: '0 24px' }}>
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> Get In Touch
        </div>
        <h1 className="section-title">
          Let's Build Something <span className="text-gradient">Amazing Together</span>
        </h1>
        <p className="section-desc" style={{ maxWidth: '650px' }}>
          Have an idea, project, or just want to connect? Drop me a message below, and I will get back to you as soon as possible.
        </p>
      </div>

      {/* ─── Contact Info and Form Grid ─── */}
      <div className={`contact-grid reveal-on-scroll reveal-fade-up delay-100 ${animate ? 'visible' : ''}`}>
        
        {/* Left Column: Direct Info Card */}
        <div className="glass-panel contact-info-card">
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'white', margin: '0 0 10px 0' }}>
              Contact Information
            </h3>
            <p style={{ fontSize: '14.5px', color: '#9ca3af', lineHeight: '1.6', margin: 0 }}>
              Reach out directly via email, check out my socials, or send a prompt message using the form.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Email Contact Item */}
            <div className="contact-item">
              <a href={`mailto:${profile.email || 'chaitanyakamble2005@gmail.com'}?subject=Project%20Inquiry&body=Hi%20Chaitanya%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you%21`} className="contact-item-link" style={{ display: 'inline-block' }}>
                <div className="contact-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
              </a>
              <div>
                <h4 className="contact-item-title">Direct Email</h4>
                <p className="contact-item-value">
                  <a href={`mailto:${profile.email || 'chaitanyakamble2005@gmail.com'}?subject=Project%20Inquiry&body=Hi%20Chaitanya%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you%21`} className="contact-item-link">
                    {profile.email || 'chaitanyakamble2005@gmail.com'}
                  </a>
                </p>
              </div>
            </div>

            {/* WhatsApp Contact Item */}
            <div className="contact-item">
              <a href="https://wa.me/919730593429?text=Hi%20Chaitanya%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you%21" target="_blank" rel="noopener noreferrer" className="contact-item-link" style={{ display: 'inline-block' }}>
                <div className="contact-icon-wrapper" style={{ color: '#25D366', borderColor: 'rgba(37, 211, 102, 0.2)', background: 'rgba(37, 211, 102, 0.1)', boxShadow: '0 0 15px rgba(37, 211, 102, 0.1)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.897 0c3.183.001 6.177 1.24 8.428 3.493 2.25 2.253 3.487 5.25 3.484 8.435-.005 6.573-5.33 11.897-11.9 11.897-1.998-.001-3.957-.502-5.707-1.458L0 24zm6.549-3.722c1.652.98 3.516 1.5 5.434 1.5 5.498 0 9.972-4.475 9.976-9.974.001-2.664-1.034-5.17-2.915-7.054C17.26 2.863 14.76 1.828 12.09 1.828 6.596 1.828 2.12 6.304 2.116 11.804c-.001 1.944.506 3.844 1.47 5.514l-.995 3.637 3.73-.977zm11.367-7.56c-.32-.16-1.89-.93-2.185-1.04-.294-.11-.51-.16-.723.16-.214.32-.828 1.04-1.014 1.25-.187.21-.374.24-.694.08-.32-.16-1.353-.5-2.578-1.593-.952-.85-1.594-1.9-1.782-2.22-.187-.32-.02-.49.14-.65.144-.144.32-.37.48-.56.16-.18.214-.3.32-.5.11-.2.05-.37-.03-.53-.08-.16-.723-1.74-.99-2.388-.26-.625-.526-.54-.723-.55-.186-.01-.4-.01-.613-.01-.214 0-.56.08-.854.4-.294.32-1.123 1.1-1.123 2.68 0 1.58 1.15 3.11 1.31 3.33.16.22 2.264 3.457 5.485 4.85.766.33 1.363.528 1.83.676.77.244 1.47.21 2.025.128.619-.092 1.89-.77 2.152-1.48.26-.71.26-1.32.18-1.45-.08-.13-.3-.21-.62-.37z"/>
                  </svg>
                </div>
              </a>
              <div>
                <h4 className="contact-item-title">WhatsApp</h4>
                <p className="contact-item-value">
                  <a href="https://wa.me/919730593429?text=Hi%20Chaitanya%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you%21" target="_blank" rel="noopener noreferrer" className="contact-item-link">
                    +91 97305 93429
                  </a>
                </p>
              </div>
            </div>

            {/* Location (Constant / Static or Dynamic) */}
            <div className="contact-item">
              <div className="contact-icon-wrapper" style={{ color: 'var(--accent-purple)', borderColor: 'rgba(168, 85, 247, 0.2)', background: 'rgba(168, 85, 247, 0.1)', boxShadow: '0 0 15px rgba(168, 85, 247, 0.1)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h4 className="contact-item-title">Location</h4>
                <p className="contact-item-value">Pune, Maharashtra, India</p>
              </div>
            </div>

            {/* Resume / Document Download */}
            {profile.resumeUrl && profile.resumeUrl !== '#resume' && (
              <div className="contact-item">
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="contact-item-link" download="Chaitanya_Kamble_Resume.pdf" style={{ display: 'inline-block' }}>
                  <div className="contact-icon-wrapper" style={{ color: 'var(--accent-pink)', borderColor: 'rgba(236, 72, 153, 0.2)', background: 'rgba(236, 72, 153, 0.1)', boxShadow: '0 0 15px rgba(236, 72, 153, 0.1)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                </a>
                <div>
                  <h4 className="contact-item-title">Curriculum Vitae</h4>
                  <p className="contact-item-value">
                    <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="contact-item-link" download="Chaitanya_Kamble_Resume.pdf">
                      Download CV PDF
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Social Profiles Row */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '24px' }}>
            <h4 className="contact-item-title" style={{ marginBottom: '14px' }}>Digital Footprints</h4>
            <div className="contact-social-row">
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="GitHub Profile">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              )}
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="LinkedIn Profile">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              )}
              {profile.instagramUrl && (
                <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="Instagram Profile">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="glass-panel contact-form-card">
          <form onSubmit={handleSubmit} noValidate>
            
            {/* Form grid for Name & Email */}
            <div className="contact-form-grid">
              <div className="contact-form-group">
                <label htmlFor="name" className="contact-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="contact-input"
                  placeholder="Your name"
                  style={formErrors.name ? { borderColor: 'rgba(239, 68, 68, 0.4)', boxShadow: '0 0 10px rgba(239, 68, 68, 0.1)' } : {}}
                />
                {formErrors.name && (
                  <span style={{ fontSize: '12px', color: '#f87171', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    {formErrors.name}
                  </span>
                )}
              </div>

              <div className="contact-form-group">
                <label htmlFor="email" className="contact-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="contact-input"
                  placeholder="yourname@gmail.com"
                  style={formErrors.email ? { borderColor: 'rgba(239, 68, 68, 0.4)', boxShadow: '0 0 10px rgba(239, 68, 68, 0.1)' } : {}}
                />
                {formErrors.email && (
                  <span style={{ fontSize: '12px', color: '#f87171', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                    {formErrors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Subject Field */}
            <div className="contact-form-group">
              <label htmlFor="subject" className="contact-label">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="contact-input"
                placeholder="How can I help you?"
                style={formErrors.subject ? { borderColor: 'rgba(239, 68, 68, 0.4)', boxShadow: '0 0 10px rgba(239, 68, 68, 0.1)' } : {}}
              />
              {formErrors.subject && (
                <span style={{ fontSize: '12px', color: '#f87171', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                  {formErrors.subject}
                </span>
              )}
            </div>

            {/* Message Field */}
            <div className="contact-form-group" style={{ marginBottom: '30px' }}>
              <label htmlFor="message" className="contact-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="contact-input"
                rows="6"
                placeholder="Write your message details here..."
                style={
                  formErrors.message 
                    ? { borderColor: 'rgba(239, 68, 68, 0.4)', boxShadow: '0 0 10px rgba(239, 68, 68, 0.1)', resize: 'vertical', minHeight: '120px' } 
                    : { resize: 'vertical', minHeight: '120px' }
                }
              />
              {formErrors.message && (
                <span style={{ fontSize: '12px', color: '#f87171', marginTop: '6px', display: 'block', fontWeight: '500' }}>
                  {formErrors.message}
                </span>
              )}
            </div>

            {/* Status alerts */}
            {submitSuccess && (
              <div 
                className="status-message success-alert" 
                style={{ 
                  marginBottom: '20px', 
                  padding: '14px 20px', 
                  borderRadius: '12px', 
                  fontSize: '14.5px', 
                  fontWeight: '600', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  color: '#34d399'
                }}
              >
                <span style={{ fontSize: '16px' }}>✓</span> Message sent successfully! I'll get back to you shortly.
              </div>
            )}

            {submitError && (
              <div 
                className="status-message error-alert" 
                style={{ 
                  marginBottom: '20px', 
                  padding: '14px 20px', 
                  borderRadius: '12px', 
                  fontSize: '14.5px', 
                  fontWeight: '600', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: '#f87171'
                }}
              >
                <span style={{ fontSize: '16px' }}>⚠</span> {submitError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', height: '50px', borderRadius: '12px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderTopColor: 'white',
                    animation: 'spin-slow 1s linear infinite'
                  }}></span>
                  Launching Message...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Send Message
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </span>
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;

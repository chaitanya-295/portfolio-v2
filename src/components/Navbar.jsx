const Navbar = () => {
  return (
    <nav className="navbar glass-panel">
      <a href="#" className="nav-logo text-gradient">
        Chaitanya.
      </a>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#/about-detail">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#blogs">Blogs</a></li>
        <li><a href="#footer">Contacts</a></li>
      </ul>
      <div className="nav-cta">
        <a href="#footer" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '14px' }}>
          Let's Talk
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

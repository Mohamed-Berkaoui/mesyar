import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
  { name: 'الرئيسية', href: '#home' },
  { name: 'من نحن', href: '#about' },
  { name: 'خدماتنا', href: '#services' },
  { name: 'احجز الآن', href: '#booking' },
  { name: 'الأسئلة الشائعة', href: '#faq' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('الرئيسية');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} dir="rtl">
      {/* Right: Logo */}
      <a href="#home" className="navbar-logo">
        <img src="/logo.png" alt="المسار" className="logo-image" />
      </a>

      {/* Center: Navigation Pill */}
      <div className="navbar-menu">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`nav-link ${activeLink === link.name ? 'active' : ''}`}
            onClick={() => setActiveLink(link.name)}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Left: Placeholder to balance */}
      <div className="navbar-left"></div>

      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`mobile-nav-link ${activeLink === link.name ? 'active' : ''}`}
              onClick={() => { setActiveLink(link.name); setIsOpen(false); }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

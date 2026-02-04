import { Twitter, Linkedin, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer" dir="rtl">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo.png" alt="المساير" className="footer-logo-image" />
          </div>

          <div className="footer-socials">
             <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={20} /></a>
             <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={20} /></a>
             <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
          </div>
        </div>
        
        <div className="footer-copyright">
          © {new Date().getFullYear()} المساير. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

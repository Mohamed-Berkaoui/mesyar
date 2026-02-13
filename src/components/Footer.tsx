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
             <a href="https://x.com/almsayr" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter"><Twitter size={20} /></a>
             <a href="https://www.linkedin.com/company/%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D9%8A%D8%B1" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><Linkedin size={20} /></a>
             <a href="https://www.instagram.com/Alm.asayir/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
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

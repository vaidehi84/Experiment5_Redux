import { memo } from "react";
import "./Footer.css";

const Footer = memo(function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo">V<span style={{color:'#c084fc'}}>.</span></span>
        <span>© 2026 Vaidehi Sharma &nbsp;·&nbsp; Built with React + Redux Toolkit + Vite</span>
        <div className="footer-dots">
          <span className="fdot blue"></span>
          <span className="fdot purple"></span>
          <span className="fdot green"></span>
        </div>
      </div>
    </footer>
  );
});

export default Footer;

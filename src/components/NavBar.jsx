import { NavLink } from "react-router-dom";
import { memo, useState } from "react";
import "./NavBar.css";
import ThemeToggle from "./ThemeToggle";
import { useAppContext } from "../context/AppContext";

const NavBar = memo(function NavBar() {
  const { userProfile, layoutDense, toggleLayout } = useAppContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <NavLink to="/" className="logo" end>
          <span className="logo-avatar">{userProfile.avatar}</span>
          <span className="logo-name">Vaidehi<span className="logo-dot">.</span></span>
        </NavLink>

        {/* Desktop nav */}
        <div className="nav-links">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
          <NavLink to="/reports" className="nav-reports-link">
            Reports
            <span className="nav-new-chip">EXP 5</span>
          </NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* Right side actions */}
        <div className="nav-actions">
          <a
            href={userProfile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-linkedin-btn"
            title="LinkedIn Profile"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <button className="nav-density-btn" onClick={toggleLayout} title="Toggle layout density">
            {layoutDense ? "⊞ Dense" : "⊟ Comfort"}
          </button>
          <ThemeToggle />
          <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="mobile-drawer" onClick={() => setMobileOpen(false)}>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
          <NavLink to="/reports">Reports ✦ New</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer" className="mobile-linkedin">
            🔗 LinkedIn Profile
          </a>
        </div>
      )}
    </>
  );
});

export default NavBar;

import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Shield, Menu, X, Trophy, Gamepad2, Settings } from 'lucide-react';

export default function Navbar() {
  const { page, navigateTo, isAdminLoggedIn, logoutAdmin } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (page !== 'home') {
      navigateTo('home');
      // Delay scrolling slightly to let the page load
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-brand" onClick={() => navigateTo('home')}>
          <Gamepad2 className="logo-icon text-glow-cyan" size={26} />
          <span className="logo-text">
            NEXUS<span className="text-primary text-glow-purple">ARENA</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="nav-links">
          <li>
            <span className={`nav-item ${page === 'home' ? 'active' : ''}`} onClick={() => navigateTo('home')}>
              HOME
            </span>
          </li>
          <li>
            <span className="nav-item" onClick={() => handleNavClick('tournaments')}>
              TOURNAMENTS
            </span>
          </li>
          <li>
            <span className="nav-item" onClick={() => handleNavClick('rules')}>
              RULES & FAQ
            </span>
          </li>
          <li>
            <span className="nav-item" onClick={() => handleNavClick('hall-of-fame')}>
              HALL OF FAME
            </span>
          </li>
          <li>
            <span className="nav-item" onClick={() => handleNavClick('contact')}>
              CONTACT
            </span>
          </li>
        </ul>

        {/* Action Button */}
        <div className="nav-actions">
          {isAdminLoggedIn ? (
            <div className="admin-status-badge">
              <span className="badge-dot pulse"></span>
              <span className="admin-text" onClick={() => navigateTo('admin')}>ADMIN PANEL</span>
              <button className="btn-logout" onClick={() => { logoutAdmin(); navigateTo('home'); }}>LOGOUT</button>
            </div>
          ) : (
            <button 
              className="btn-futuristic btn-secondary nav-btn"
              onClick={() => navigateTo('admin')}
            >
              <Shield size={16} />
              <span>DASHBOARD</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? 'drawer-open' : ''}`}>
        <ul className="mobile-drawer-links">
          <li>
            <span className="mobile-item" onClick={() => { setIsOpen(false); navigateTo('home'); }}>
              HOME
            </span>
          </li>
          <li>
            <span className="mobile-item" onClick={() => handleNavClick('tournaments')}>
              TOURNAMENTS
            </span>
          </li>
          <li>
            <span className="mobile-item" onClick={() => handleNavClick('rules')}>
              RULES & FAQ
            </span>
          </li>
          <li>
            <span className="mobile-item" onClick={() => handleNavClick('hall-of-fame')}>
              HALL OF FAME
            </span>
          </li>
          <li>
            <span className="mobile-item" onClick={() => handleNavClick('contact')}>
              CONTACT
            </span>
          </li>
          <li className="mobile-drawer-action">
            {isAdminLoggedIn ? (
              <div className="mobile-admin-actions">
                <button className="btn-futuristic btn-primary w-full" onClick={() => { setIsOpen(false); navigateTo('admin'); }}>
                  ADMIN PANEL
                </button>
                <button className="btn-futuristic btn-outline w-full" onClick={() => { logoutAdmin(); setIsOpen(false); navigateTo('home'); }}>
                  LOGOUT
                </button>
              </div>
            ) : (
              <button 
                className="btn-futuristic btn-secondary w-full"
                onClick={() => { setIsOpen(false); navigateTo('admin'); }}
              >
                <Shield size={16} />
                <span>ADMIN LOGIN</span>
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

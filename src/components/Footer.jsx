import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Gamepad2, Disc, ShieldAlert } from 'lucide-react';

export default function Footer() {
  const { navigateTo } = useContext(AppContext);

  return (
    <footer className="footer glass-panel">
      <div className="gaming-container footer-container">
        
        {/* Info Column */}
        <div className="footer-info-col">
          <div className="nav-brand" onClick={() => navigateTo('home')}>
            <Gamepad2 className="logo-icon text-glow-cyan" size={24} />
            <span className="logo-text">
              NEXUS<span className="text-primary text-glow-purple">ARENA</span>
            </span>
          </div>
          <p className="footer-desc">
            The next generation of high-stakes esports tournaments. Powering local leagues and custom competitive lobbies worldwide.
          </p>
          <div className="footer-socials">
            <a href="https://discord.gg" target="_blank" rel="noreferrer" className="social-icon-btn"><Disc size={18} /></a>
            <a href="https://twitch.tv" target="_blank" rel="noreferrer" className="social-icon-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9H9V6h2v5zm4 0h-2V6h2v5z"></path></svg></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="footer-links-col">
          <h4 className="footer-section-title">PLATFORM NAVIGATION</h4>
          <ul className="footer-links-list">
            <li><span className="footer-link" onClick={() => navigateTo('home')}>HOME ARENA</span></li>
            <li><span className="footer-link" onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('tournaments')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>TOURNAMENTS</span></li>
            <li><span className="footer-link" onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('rules')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>RULES & FAQS</span></li>
            <li><span className="footer-link" onClick={() => { navigateTo('home'); setTimeout(() => document.getElementById('hall-of-fame')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>HALL OF FAME</span></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="footer-links-col">
          <h4 className="footer-section-title">LEGAL NODES</h4>
          <ul className="footer-links-list">
            <li><span className="footer-link">TERMS OF SERVICE</span></li>
            <li><span className="footer-link">PRIVACY POLICY</span></li>
            <li><span className="footer-link">REFUND DISPUTES</span></li>
            <li><span className="footer-link" onClick={() => navigateTo('admin')}>ADMINISTRATIVE ACCESS</span></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="gaming-container footer-bottom-container">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} NEXUS ARENA. ALL RIGHTS RESERVED.
          </p>
          <div className="trademark-disclaimer">
            <ShieldAlert size={12} className="text-muted" />
            <span>
              All product names, logos, and brands are property of their respective owners.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

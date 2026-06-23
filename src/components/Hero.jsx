import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Play, Disc, ArrowRight } from 'lucide-react';

export default function Hero() {
  const { homepageContent, navigateTo } = useContext(AppContext);
  const { heroTitle, heroSubtitle, heroDescription, heroBanner, discordLink } = homepageContent;

  return (
    <section className="hero-section">
      {/* Background Banner with Overlay */}
      <div 
        className="hero-banner-bg" 
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="hero-banner-overlay"></div>
      </div>

      <div className="gaming-container hero-container">
        <div className="hero-content">
          <div className="cyber-glitch-badge float-element">
            <span className="badge-line"></span>
            <span className="badge-text text-glow-cyan">{heroSubtitle}</span>
          </div>

          <h1 className="hero-title text-glow-purple">
            {heroTitle.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-secondary text-glow-cyan">{heroTitle.split(' ').slice(-1)}</span>
          </h1>

          <p className="hero-description">{heroDescription}</p>

          <div className="hero-ctas">
            <button 
              className="btn-futuristic btn-primary hero-btn pulse-glow-element"
              onClick={() => {
                const el = document.getElementById('tournaments');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>REGISTER NOW</span>
              <ArrowRight size={16} />
            </button>

            <a 
              href={discordLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-futuristic btn-secondary hero-btn"
            >
              <Disc size={16} />
              <span>JOIN DISCORD</span>
            </a>
          </div>
        </div>

        {/* Floating Futuristic Card / Mini Video Mockup */}
        <div className="hero-visual">
          <div className="glass-panel visual-card float-element" style={{ animationDelay: '1s' }}>
            <div className="card-scanline"></div>
            <div className="card-glow-edge"></div>
            <div className="visual-media-mock">
              <img 
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop" 
                alt="Esports Arena Tournament" 
                className="visual-img"
              />
              <div className="media-play-overlay">
                <div className="play-button-glow">
                  <Play size={20} fill="#06b6d4" className="text-secondary" />
                </div>
              </div>
            </div>
            <div className="visual-card-footer">
              <div className="status-live">
                <span className="live-dot"></span>
                <span>LIVE MATCH TRACKER ACTIVE</span>
              </div>
              <div className="spectators-count">
                <span className="text-secondary font-bold">14,204</span> WATCHING
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

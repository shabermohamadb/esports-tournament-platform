import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Calendar, DollarSign, Users, Award, ShieldAlert, Clock } from 'lucide-react';

export default function FeaturedTournaments() {
  const { tournaments, navigateTo } = useContext(AppContext);
  const [countdownText, setCountdownText] = useState({});

  // Countdown timer logic for tournaments
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdowns = {};
      tournaments.forEach(t => {
        const targetDate = new Date(`${t.date}T${t.time.split(' ')[0]}:00Z`).getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
          updatedCountdowns[t.id] = 'STARTED';
        } else {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          updatedCountdowns[t.id] = `${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s`;
        }
      });
      setCountdownText(updatedCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [tournaments]);

  // Map games to mock background images if banner is missing
  const getGameBanner = (game) => {
    switch (game.toLowerCase()) {
      case 'valorant':
        return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop';
      case 'apex legends':
        return 'https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=600&auto=format&fit=crop';
      case 'league of legends':
        return 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=600&auto=format&fit=crop';
      default:
        return 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop';
    }
  };

  return (
    <section className="tournaments-section" id="tournaments">
      <div className="gaming-container">
        
        {/* Section Header */}
        <div className="section-header-container">
          <div className="accent-bar-wrapper">
            <span className="accent-bar-dot"></span>
            <span className="section-tag text-glow-purple">ARENA LISTINGS</span>
          </div>
          <h2 className="section-title text-glow-cyan">FEATURED TOURNAMENTS</h2>
          <p className="section-subtitle">
            Secure your slot in our upcoming leagues. Assemble your squad or enter as solo.
          </p>
        </div>

        {/* Tournaments Grid */}
        <div className="tournaments-grid">
          {tournaments.map((t) => {
            const slotsProgress = (t.slotsRegistered / t.slotsMax) * 100;
            const banner = getGameBanner(t.game);
            const countdown = countdownText[t.id] || 'Calculating...';

            return (
              <div key={t.id} className="glass-panel tournament-card">
                
                {/* Header Image */}
                <div className="card-header-image">
                  <img src={banner} alt={t.name} className="tournament-img" />
                  <div className="card-image-overlay"></div>
                  
                  {/* Floating Tags */}
                  <span className={`tag-futuristic tag-cyan floating-mode`}>
                    {t.mode}
                  </span>
                  
                  <div className="floating-countdown-badge">
                    <Clock size={12} className="text-secondary" />
                    <span>{countdown}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="card-body">
                  <h3 className="tournament-card-title text-glow-purple">{t.name}</h3>
                  
                  {/* Meta Grid */}
                  <div className="tournament-meta-grid">
                    <div className="meta-item">
                      <Calendar size={14} className="text-secondary" />
                      <span>{t.date} | {t.time}</span>
                    </div>
                    <div className="meta-item">
                      <Award size={14} className="text-primary" />
                      <span>Prize Pool: <strong className="text-glow-pink">₹{t.prizePool}</strong></span>
                    </div>
                    <div className="meta-item">
                      <DollarSign size={14} className="text-secondary" />
                      <span>Entry Fee: <strong>₹{t.entryFee}</strong></span>
                    </div>
                  </div>

                  {/* Slots Progress bar */}
                  <div className="slots-progress-container">
                    <div className="slots-labels">
                      <span className="slots-registered">
                        <Users size={12} />
                        <span>{t.slotsRegistered} / {t.slotsMax} Slots Filled</span>
                      </span>
                      <span className="slots-percentage">{Math.round(slotsProgress)}%</span>
                    </div>
                    <div className="slots-progress-bar-bg">
                      <div 
                        className="slots-progress-bar-fill" 
                        style={{ width: `${slotsProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="card-actions">
                    <button 
                      className="btn-futuristic btn-primary w-full"
                      onClick={() => navigateTo('register', t)}
                      disabled={t.slotsRegistered >= t.slotsMax || countdown === 'STARTED'}
                    >
                      {t.slotsRegistered >= t.slotsMax 
                        ? 'SLOTS FULL' 
                        : countdown === 'STARTED' 
                          ? 'REGISTRATION CLOSED' 
                          : 'REGISTER NOW'}
                    </button>
                    
                    <button 
                      className="btn-futuristic btn-outline w-full"
                      onClick={() => {
                        const el = document.getElementById('rules');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      VIEW RULES
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

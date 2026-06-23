import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Trophy, Coins, Users, Radio } from 'lucide-react';

export default function Statistics() {
  const { homepageContent } = useContext(AppContext);
  const { stats } = homepageContent;

  // Local state for animated numbers
  const [tournaments, setTournaments] = useState(0);
  const [prizes, setPrizes] = useState(0);
  const [gamers, setGamers] = useState(0);

  useEffect(() => {
    // Parse values from stats
    const tMax = parseInt(stats.tournamentsCount) || 15;
    const pMax = parseInt(stats.prizePoolTotal.replace(/[^0-9]/g, '')) || 250000;
    const gMax = parseInt(stats.gamersCount.replace(/[^0-9]/g, '')) || 12500;

    let startTimestamp = null;
    const duration = 1500; // ms

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setTournaments(Math.floor(progress * tMax));
      setPrizes(Math.floor(progress * pMax));
      setGamers(Math.floor(progress * gMax));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [stats]);

  // Format currency
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Format integer with plus/K
  const formatInteger = (val) => {
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'K+';
    }
    return val;
  };

  return (
    <section className="stats-section">
      <div className="gaming-container stats-grid">
        {/* Stat Item 1 */}
        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper purple-glow">
            <Trophy className="stat-icon text-primary" size={28} />
          </div>
          <div className="stat-details">
            <h3 className="stat-value text-glow-purple">{tournaments}+</h3>
            <p className="stat-label">Tournaments Hosted</p>
          </div>
        </div>

        {/* Stat Item 2 */}
        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper cyan-glow">
            <Coins className="stat-icon text-secondary" size={28} />
          </div>
          <div className="stat-details">
            <h3 className="stat-value text-glow-cyan">{formatCurrency(prizes)}+</h3>
            <p className="stat-label">Prize Pools Offered</p>
          </div>
        </div>

        {/* Stat Item 3 */}
        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper pink-glow">
            <Users className="stat-icon text-accent" size={28} />
          </div>
          <div className="stat-details">
            <h3 className="stat-value text-glow-pink">{formatInteger(gamers)}</h3>
            <p className="stat-label">Active Competitors</p>
          </div>
        </div>

        {/* Stat Item 4 */}
        <div className="glass-panel stat-card">
          <div className="stat-icon-wrapper cyan-glow">
            <Radio className="stat-icon text-secondary pulse" size={28} />
          </div>
          <div className="stat-details">
            <h3 className="stat-value text-glow-cyan">{stats.liveMatches}</h3>
            <p className="stat-label">Match Broadcasts</p>
          </div>
        </div>
      </div>
    </section>
  );
}

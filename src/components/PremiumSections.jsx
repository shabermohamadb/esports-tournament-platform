import React, { useState } from 'react';
import { Shield, HelpCircle, Trophy, Image as ImageIcon, Send, MessageSquare, ExternalLink, Calendar } from 'lucide-react';

export default function PremiumSections() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const faqs = [
    {
      q: 'How does solo registration work?',
      a: 'Solo players are added to a matchmaking draft pool. Once registration closes, we group solo players together to form balanced teams, or match you with teams looking for substitutes.'
    },
    {
      q: 'How is the prize pool distributed?',
      a: 'Prizes are disbursed within 48 hours of tournament completion. Generally, 1st place receives 60%, 2nd place receives 30%, and 3rd place receives 10%, directly via bank transfer or cryptocurrency.'
    },
    {
      q: 'Can I change my team lineup after registering?',
      a: 'Yes, captains can submit lineup modifications through our Discord support channel up to 24 hours prior to the tournament start time.'
    },
    {
      q: 'What happens if a player disconnects?',
      a: 'Each team is allowed up to 10 minutes of pause time per match for technical issues. Detailed rules about server restarts and lag are available under the rules section.'
    }
  ];

  const hallOfFame = [
    {
      teamName: 'Sentinels Elite',
      game: 'Valorant',
      tournamentName: 'Nexus Showdown Winter',
      prize: '₹80,000',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop'
    },
    {
      teamName: 'Rogue Squad',
      game: 'Apex Legends',
      tournamentName: 'Apex Pro League S8',
      prize: '₹50,000',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop'
    },
    {
      teamName: 'Nexus Titans',
      game: 'League of Legends',
      tournamentName: 'Summoners Challenge',
      prize: '₹65,000',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
    }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop'
  ];

  return (
    <div className="premium-sections-wrapper">
      
      {/* Prize Pool Breakdown Section */}
      <section className="prize-pool-section" id="prize-pool">
        <div className="gaming-container">
          <div className="section-header-container text-center">
            <h2 className="section-title text-glow-pink">PRIZE POOL DISTRIBUTION</h2>
            <p className="section-subtitle">How winnings are split among top contenders</p>
          </div>

          <div className="prize-distribution-grid">
            <div className="glass-panel prize-podium silver-place">
              <Trophy size={48} className="trophy-silver" />
              <div className="place-num">2ND PLACE</div>
              <div className="place-percent text-glow-cyan">30%</div>
              <div className="place-description">Plus Runner-up Badges & Profile Accents</div>
            </div>

            <div className="glass-panel prize-podium gold-place float-element">
              <Trophy size={64} className="trophy-gold text-glow-purple" />
              <div className="place-num">1ST CHAMPION</div>
              <div className="place-percent text-glow-purple">60%</div>
              <div className="place-description">Plus Champion Trophy & Discord Role Customizer</div>
            </div>

            <div className="glass-panel prize-podium bronze-place">
              <Trophy size={40} className="trophy-bronze" />
              <div className="place-num">3RD PLACE</div>
              <div className="place-percent text-glow-pink">10%</div>
              <div className="place-description">Plus Bronze Plate Medals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="rules-section" id="rules">
        <div className="gaming-container">
          <div className="section-header-container">
            <div className="accent-bar-wrapper">
              <span className="accent-bar-dot"></span>
              <span className="section-tag text-glow-cyan">COMPETITIVE GUIDELINES</span>
            </div>
            <h2 className="section-title text-glow-purple">TOURNAMENT RULES</h2>
          </div>

          <div className="rules-grid">
            <div className="glass-panel rule-card">
              <div className="rule-num">01</div>
              <h4 className="rule-title">Fair Play & Anti-Cheat</h4>
              <p className="rule-desc">
                Any form of hacking, exploiting, scripting, or external modifications will result in an immediate lifetime ban for all team members.
              </p>
            </div>
            <div className="glass-panel rule-card">
              <div className="rule-num">02</div>
              <h4 className="rule-title">Roster Regulations</h4>
              <p className="rule-desc">
                Players must play with registered game IDs. Smurfing or playing under another player's account is strictly prohibited.
              </p>
            </div>
            <div className="glass-panel rule-card">
              <div className="rule-num">03</div>
              <h4 className="rule-title">Communication</h4>
              <p className="rule-desc">
                Captains must join the official Discord server. Check-ins occur 30 minutes prior to scheduled match times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="gaming-container">
          <div className="section-header-container text-center">
            <h2 className="section-title text-glow-cyan">FREQUENTLY ASKED QUESTIONS</h2>
            <p className="section-subtitle">Everything you need to know about the tournament system</p>
          </div>

          <div className="faq-accordion-container">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className={`glass-panel faq-item ${isOpen ? 'faq-open' : ''}`}>
                  <div className="faq-question" onClick={() => toggleFaq(index)}>
                    <span>{faq.q}</span>
                    <HelpCircle size={18} className="faq-icon" />
                  </div>
                  <div className="faq-answer-wrapper">
                    <div className="faq-answer">{faq.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Winners Hall of Fame */}
      <section className="hall-of-fame-section" id="hall-of-fame">
        <div className="gaming-container">
          <div className="section-header-container">
            <div className="accent-bar-wrapper">
              <span className="accent-bar-dot"></span>
              <span className="section-tag text-glow-pink">CHAMPIONS WALL</span>
            </div>
            <h2 className="section-title text-glow-purple">WINNERS HALL OF FAME</h2>
          </div>

          <div className="hof-grid">
            {hallOfFame.map((winner, idx) => (
              <div key={idx} className="glass-panel hof-card">
                <div className="hof-avatar-container">
                  <img src={winner.avatar} alt={winner.teamName} className="hof-avatar" />
                  <div className="hof-badge">
                    <Trophy size={14} className="trophy-gold" />
                  </div>
                </div>
                <h3 className="hof-team-name text-glow-cyan">{winner.teamName}</h3>
                <div className="hof-game-title">{winner.game}</div>
                <div className="hof-tournament">{winner.tournamentName}</div>
                <div className="hof-prize">Winnings: <span className="text-glow-pink">{winner.prize}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section" id="gallery">
        <div className="gaming-container">
          <div className="section-header-container text-center">
            <h2 className="section-title text-glow-cyan">NEXUS ARENA GALLERY</h2>
            <p className="section-subtitle">Sights and moments from our previous grand finals</p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((src, index) => (
              <div key={index} className="glass-panel gallery-card">
                <img src={src} alt={`Esports memory ${index + 1}`} className="gallery-img" />
                <div className="gallery-hover-overlay">
                  <ImageIcon size={28} className="text-secondary" />
                  <span className="gallery-view-text">VIEW SCREENSHOT</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community-section" id="community">
        <div className="gaming-container glass-panel community-banner">
          <div className="community-content">
            <h2 className="community-title text-glow-cyan">JOIN OUR ESPORTS COMMUNITY</h2>
            <p className="community-desc">
              Get matches notifications, request roster changes, chat with other teams, and watch matches live.
            </p>
            <div className="community-social-links">
              <a href="https://discord.gg" target="_blank" rel="noreferrer" className="btn-futuristic btn-secondary">
                <MessageSquare size={16} />
                <span>DISCORD</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn-futuristic btn-outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                <span>YOUTUBE</span>
              </a>
              <a href="https://twitch.tv" target="_blank" rel="noreferrer" className="btn-futuristic btn-outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9H9V6h2v5zm4 0h-2V6h2v5z"></path></svg>
                <span>TWITCH</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn-futuristic btn-outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                <span>TWITTER</span>
              </a>
            </div>
          </div>
          <div className="community-deco float-element">
            <GamepadIcon />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="gaming-container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title text-glow-purple">GET IN TOUCH</h2>
              <p className="contact-desc">
                Have questions about sponsorships, tournament rules, or payouts? Send us a message and our support team will respond within 12 hours.
              </p>
              
              <div className="contact-details-list">
                <div className="contact-item">
                  <div className="contact-item-icon"><Send size={16} /></div>
                  <div>
                    <h5 className="contact-label-title">SUPPORT EMAIL</h5>
                    <p className="contact-label-text">support@nexusarena.gg</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-icon"><Calendar size={16} /></div>
                  <div>
                    <h5 className="contact-label-title">BUSINESS HOURS</h5>
                    <p className="contact-label-text">Mon - Sun | 10:00 - 22:00 UTC</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <form onSubmit={handleContactSubmit} className="glass-panel contact-form">
                <div className="form-group">
                  <label className="label-futuristic">YOUR NAME</label>
                  <input 
                    type="text" 
                    className="input-futuristic" 
                    required 
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="label-futuristic">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    className="input-futuristic" 
                    required 
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="label-futuristic">MESSAGE</label>
                  <textarea 
                    className="input-futuristic textarea-futuristic" 
                    rows={4} 
                    required 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>
                
                <button type="submit" className="btn-futuristic btn-primary w-full" disabled={submitted}>
                  {submitted ? 'TRANSMITTING MESSAGE...' : 'SEND TRANSMISSION'}
                  <Send size={14} />
                </button>

                {submitted && (
                  <div className="contact-success-msg text-glow-cyan">
                    Transmission received! Our team will contact you shortly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// Inline custom decorative gaming icon since it's simpler
function GamepadIcon() {
  return (
    <svg width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="gamepad-deco-svg">
      <path d="M6 12h4m-2-2v4m10-2h.01M16 10h.01M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" stroke="url(#gradient-cyan-purple)" />
      <defs>
        <linearGradient id="gradient-cyan-purple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

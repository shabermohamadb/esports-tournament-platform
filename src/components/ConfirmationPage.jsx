import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CheckCircle, Clock, Disc, ArrowRight, ShieldCheck, Copy, Check } from 'lucide-react';

export default function ConfirmationPage() {
  const { activeRegistrationId, registrations, navigateTo, homepageContent } = useContext(AppContext);
  const [copied, setCopied] = React.useState(false);

  // Retrieve current registration details
  const reg = registrations.find(r => r.id === activeRegistrationId) || registrations[0];

  if (!reg) {
    return (
      <div className="confirmation-fallback text-center py-20">
        <p className="text-muted">No active registration session found.</p>
        <button className="btn-futuristic btn-primary mt-4" onClick={() => navigateTo('home')}>
          Return Home
        </button>
      </div>
    );
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(reg.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="confirmation-section">
      <div className="gaming-container max-w-lg mx-auto">
        <div className="glass-panel confirmation-panel text-center">
          
          {/* Animated Success Badge */}
          <div className="success-badge-container float-element">
            <div className="success-badge-glow"></div>
            <CheckCircle className="success-icon text-secondary" size={64} />
          </div>

          <h2 className="confirmation-title text-glow-cyan">TRANSMISSION RECEIVED</h2>
          <p className="confirmation-subtitle">
            Your enlistment entry has been queued for verification.
          </p>

          {/* Ticket ID Box */}
          <div className="ticket-id-box glass-panel">
            <span className="ticket-label">REGISTRATION ID</span>
            <div className="ticket-value-row">
              <span className="ticket-id font-mono text-glow-purple">{reg.id}</span>
              <button className="btn-copy" onClick={handleCopyCode} title="Copy Registration ID">
                {copied ? <Check size={16} className="text-secondary" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Details Summary Card */}
          <div className="confirmation-details-card glass-panel">
            <div className="summary-row">
              <span>Tournament:</span>
              <span className="font-bold text-glow-purple">{reg.tournamentName}</span>
            </div>
            <div className="summary-row">
              <span>{reg.type === 'Team' ? 'Team Name:' : 'Player Name:'}</span>
              <span className="font-bold">{reg.type === 'Team' ? reg.teamName : reg.captainName}</span>
            </div>
            <div className="summary-row">
              <span>Transaction ID:</span>
              <span className="font-mono text-secondary">{reg.paymentTxId}</span>
            </div>
            <div className="summary-row">
              <span>Enlistment Fee:</span>
              <span className="font-bold text-glow-pink">₹{reg.paymentAmount} INR</span>
            </div>
          </div>

          {/* Dynamic Registration Status Checklist */}
          <div className="status-timeline glass-panel">
            <h4 className="timeline-title text-glow-cyan">VERIFICATION CHECKPOINT</h4>
            
            <div className="timeline-items">
              {/* Checkpoint 1 */}
              <div className="timeline-item done">
                <div className="timeline-marker">
                  <Check size={12} />
                </div>
                <div className="timeline-content text-left">
                  <h5>Receipt Submitted</h5>
                  <p>Transaction ID recorded successfully.</p>
                </div>
              </div>

              {/* Checkpoint 2 */}
              <div className="timeline-item current">
                <div className="timeline-marker">
                  <span className="pulse-dot"></span>
                </div>
                <div className="timeline-content text-left">
                  <h5>Transaction Verification</h5>
                  <p>Admin checking UPI/bank database logs.</p>
                </div>
              </div>

              {/* Checkpoint 3 */}
              <div className="timeline-item pending">
                <div className="timeline-marker"></div>
                <div className="timeline-content text-left">
                  <h5>Dashboard Approval</h5>
                  <p>Approval notification sent to your email.</p>
                </div>
              </div>

              {/* Checkpoint 4 */}
              <div className="timeline-item pending">
                <div className="timeline-marker"></div>
                <div className="timeline-content text-left">
                  <h5>Discord Role Customizer</h5>
                  <p>Role authorization assigned via bot.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="confirmation-actions">
            <a 
              href={homepageContent.discordLink} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-futuristic btn-secondary w-full"
            >
              <Disc size={16} />
              <span>JOIN DISCORD CHANNEL</span>
            </a>
            
            <button 
              className="btn-futuristic btn-primary w-full text-glow-purple"
              onClick={() => navigateTo('home')}
            >
              <span>RETURN TO LOBBY</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Shield, CreditCard, ArrowLeft, CheckCircle, Disc, Users, User, QrCode } from 'lucide-react';

export default function RegistrationForm() {
  const { selectedTournament, tournaments, addRegistration, navigateTo } = useContext(AppContext);

  // Form State
  const [tournamentId, setTournamentId] = useState(selectedTournament ? selectedTournament.id : tournaments[0]?.id || '');
  const [regType, setRegType] = useState('Team'); // Team or Solo
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [captainEmail, setCaptainEmail] = useState('');
  const [discordHandle, setDiscordHandle] = useState('');
  const [members, setMembers] = useState('');
  
  // Payment step
  const [step, setStep] = useState(1); // 1 = details, 2 = payment
  const [txId, setTxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find active tournament details
  const activeT = tournaments.find(t => t.id === tournamentId);
  const entryFee = activeT ? (regType === 'Team' ? activeT.entryFee : Math.round(activeT.entryFee / 4)) : 0;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (regType === 'Team' && !teamName.trim()) {
      alert('Please enter your Team Name');
      return;
    }
    setStep(2);
  };

  const handleSubmitRegistration = (e) => {
    e.preventDefault();
    if (!txId.trim()) {
      alert('Please enter a Transaction Reference ID for verification.');
      return;
    }

    setIsSubmitting(true);

    const submissionData = {
      tournamentId,
      tournamentName: activeT ? activeT.name : 'Unknown Tournament',
      type: regType,
      teamName: regType === 'Team' ? teamName : 'N/A (Solo)',
      captainName,
      captainEmail,
      discordHandle,
      members: regType === 'Team' ? members : `${captainName} (Solo Entry)`,
      paymentTxId: txId,
      paymentAmount: entryFee
    };

    // Simulated network delay
    setTimeout(() => {
      addRegistration(submissionData);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="registration-section">
      <div className="gaming-container">
        
        {/* Back Button */}
        <button className="btn-back-home" onClick={() => navigateTo('home')}>
          <ArrowLeft size={16} />
          <span>BACK TO LOBBY</span>
        </button>

        <div className="registration-wrapper max-w-xl mx-auto">
          {/* Header */}
          <div className="section-header-container text-center">
            <h2 className="section-title text-glow-purple">ARENA ENLISTMENT</h2>
            <p className="section-subtitle">Register your squad for upcoming operations</p>
          </div>

          {/* Stepper indicator */}
          <div className="stepper-indicator">
            <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1. Details</div>
            <div className="step-line"></div>
            <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
          </div>

          <div className="glass-panel form-panel">
            
            {/* Step 1: Input details */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="details-form">
                
                {/* Select Tournament */}
                <div className="form-group">
                  <label className="label-futuristic">TARGET TOURNAMENT</label>
                  <select 
                    className="input-futuristic select-futuristic"
                    value={tournamentId}
                    onChange={(e) => setTournamentId(e.target.value)}
                  >
                    {tournaments.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.game})</option>
                    ))}
                  </select>
                </div>

                {/* Team or Solo toggle */}
                <div className="form-group">
                  <label className="label-futuristic">REGISTRATION TYPE</label>
                  <div className="toggle-group-futuristic">
                    <button 
                      type="button"
                      className={`btn-toggle-option ${regType === 'Team' ? 'active' : ''}`}
                      onClick={() => setRegType('Team')}
                    >
                      <Users size={16} />
                      <span>TEAM ENLISTMENT</span>
                    </button>
                    <button 
                      type="button"
                      className={`btn-toggle-option ${regType === 'Solo' ? 'active' : ''}`}
                      onClick={() => setRegType('Solo')}
                    >
                      <User size={16} />
                      <span>SOLO AGENT</span>
                    </button>
                  </div>
                </div>

                {/* Team Name (Conditional) */}
                {regType === 'Team' && (
                  <div className="form-group">
                    <label className="label-futuristic font-bold">TEAM NAME</label>
                    <input 
                      type="text" 
                      className="input-futuristic" 
                      placeholder="e.g. Cyber Reapers"
                      required
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>
                )}

                {/* Captain / Player Name */}
                <div className="form-group">
                  <label className="label-futuristic">
                    {regType === 'Team' ? 'CAPTAIN IN-GAME NAME' : 'AGENT IN-GAME NAME'}
                  </label>
                  <input 
                    type="text" 
                    className="input-futuristic" 
                    placeholder="e.g. ShroudV2"
                    required
                    value={captainName}
                    onChange={(e) => setCaptainName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="label-futuristic">CONTACT EMAIL</label>
                  <input 
                    type="email" 
                    className="input-futuristic" 
                    placeholder="e.g. captain@gmail.com"
                    required
                    value={captainEmail}
                    onChange={(e) => setCaptainEmail(e.target.value)}
                  />
                </div>

                {/* Discord Handle */}
                <div className="form-group">
                  <label className="label-futuristic">DISCORD HANDLE (REQUIRED)</label>
                  <input 
                    type="text" 
                    className="input-futuristic" 
                    placeholder="e.g. username#1234 or username"
                    required
                    value={discordHandle}
                    onChange={(e) => setDiscordHandle(e.target.value)}
                  />
                </div>

                {/* Team Members List (Conditional) */}
                {regType === 'Team' && (
                  <div className="form-group">
                    <label className="label-futuristic">TEAM MEMBERS IN-GAME NAMES (COMMA SEPARATED)</label>
                    <textarea 
                      className="input-futuristic textarea-futuristic"
                      placeholder="e.g. member1, member2, member3, member4, member5"
                      rows={3}
                      required
                      value={members}
                      onChange={(e) => setMembers(e.target.value)}
                    />
                    <small className="help-text">Please specify all player usernames separated by commas.</small>
                  </div>
                )}

                {/* Action button */}
                <button type="submit" className="btn-futuristic btn-primary w-full mt-4">
                  <span>PROCEED TO PAYMENT ( ₹{entryFee} INR )</span>
                </button>
              </form>
            )}

            {/* Step 2: Payment Simulator */}
            {step === 2 && (
              <form onSubmit={handleSubmitRegistration} className="payment-form">
                
                {/* Info summary */}
                <div className="payment-summary-box">
                  <h4 className="summary-title text-glow-cyan">UPI ENLISTMENT INVOICE</h4>
                  <div className="summary-row">
                    <span>Tournament:</span>
                    <strong>{activeT?.name}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Type:</span>
                    <strong>{regType} Enlistment</strong>
                  </div>
                  {regType === 'Team' && (
                    <div className="summary-row">
                      <span>Team Name:</span>
                      <strong>{teamName}</strong>
                    </div>
                  )}
                  <div className="summary-row divider">
                    <span>Amount Due:</span>
                    <strong className="text-glow-pink">₹{entryFee} INR</strong>
                  </div>
                </div>

                {/* UPI Gateway selector */}
                <div className="form-group mb-4" style={{ marginBottom: '1.5rem' }}>
                  <label className="label-futuristic">SUPPORTED UPI GATEWAYS</label>
                  <div className="toggle-group-futuristic" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                    <div className="btn-toggle-option active" style={{ fontSize: '0.65rem', padding: '0.6rem 0.2rem', borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>GPAY</div>
                    <div className="btn-toggle-option active" style={{ fontSize: '0.65rem', padding: '0.6rem 0.2rem', borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>PHONEPE</div>
                    <div className="btn-toggle-option active" style={{ fontSize: '0.65rem', padding: '0.6rem 0.2rem', borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>PAYTM</div>
                    <div className="btn-toggle-option active" style={{ fontSize: '0.65rem', padding: '0.6rem 0.2rem', borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>BHIM</div>
                  </div>
                </div>

                {/* QR Code section */}
                <div className="qr-payment-section">
                  <div className="qr-container glass-panel">
                    <QrCode size={120} className="text-secondary" />
                    {/* Simulated scanning scanline */}
                    <div className="qr-scanline"></div>
                  </div>
                  <div className="qr-instructions">
                    <h5 className="payment-inst-title">SCAN SECURE BHIM UPI QR</h5>
                    <p className="payment-inst-text" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                      Scan the QR code with any UPI app or pay directly to UPI ID: <strong className="text-glow-purple" style={{ fontFamily: 'monospace' }}>nexusarena@upi</strong> to complete the transaction of <strong>₹{entryFee} INR</strong>.
                    </p>
                  </div>
                </div>

                {/* Reference ID input */}
                <div className="form-group">
                  <label className="label-futuristic font-bold">TRANSACTION REFERENCE / UTR ID</label>
                  <input 
                    type="text" 
                    className="input-futuristic text-center text-secondary tracking-widest font-mono"
                    placeholder="e.g. TXN10294827"
                    required
                    value={txId}
                    onChange={(e) => setTxId(e.target.value)}
                  />
                  <small className="help-text text-center block mt-1">
                    Paste the transaction reference ID from your banking app receipt to verify.
                  </small>
                </div>

                {/* Form Buttons */}
                <div className="payment-actions-row">
                  <button 
                    type="button" 
                    className="btn-futuristic btn-outline w-full"
                    onClick={() => setStep(1)}
                    disabled={isSubmitting}
                  >
                    <span>GO BACK</span>
                  </button>
                  <button 
                    type="submit" 
                    className="btn-futuristic btn-primary w-full text-glow-purple"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'PROCESSING...' : 'SUBMIT SLATE'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}

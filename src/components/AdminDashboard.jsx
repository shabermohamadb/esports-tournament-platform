import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ShieldAlert, Edit3, Plus, Trash2, Check, X, Download, BarChart2,
  DollarSign, Users, Award, FileText, ArrowRight, ShieldCheck
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    isAdminLoggedIn, loginAdmin, logoutAdmin,
    homepageContent, updateHomepage,
    tournaments, addTournament, deleteTournament, updateTournament,
    registrations, updateRegistrationStatus, deleteRegistration,
    adminPasscode, changeAdminPasscode
  } = useContext(AppContext);

  // Login Form
  const [passphrase, setPassphrase] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Tab: 'registrations', 'tournaments', 'homepage', 'analytics'
  const [activeTab, setActiveTab] = useState('registrations');

  // Homepage Content Editor States
  const [editedHome, setEditedHome] = useState({ ...homepageContent });
  const [homeSaved, setHomeSaved] = useState(false);

  // Passcode Changer States
  const [currentCodeInput, setCurrentCodeInput] = useState('');
  const [newCodeInput, setNewCodeInput] = useState('');
  const [confirmNewCode, setConfirmNewCode] = useState('');
  const [passcodeMessage, setPasscodeMessage] = useState({ text: '', isError: false });

  const handleChangePasscodeSubmit = (e) => {
    e.preventDefault();
    if (currentCodeInput !== adminPasscode) {
      setPasscodeMessage({ text: 'SECURITY EXCEPTION: CURRENT CODE INCORRECT', isError: true });
      setTimeout(() => setPasscodeMessage({ text: '', isError: false }), 4000);
      return;
    }
    if (newCodeInput !== confirmNewCode) {
      setPasscodeMessage({ text: 'VALIDATION EXCEPTION: PASSCODES DO NOT MATCH', isError: true });
      setTimeout(() => setPasscodeMessage({ text: '', isError: false }), 4000);
      return;
    }
    if (newCodeInput.length < 4) {
      setPasscodeMessage({ text: 'VALIDATION EXCEPTION: CODE MUST BE AT LEAST 4 CHARACTERS', isError: true });
      setTimeout(() => setPasscodeMessage({ text: '', isError: false }), 4000);
      return;
    }
    changeAdminPasscode(newCodeInput);
    setPasscodeMessage({ text: 'SECURITY CODE RECONFIGURED SUCCESSFULLY', isError: false });
    setCurrentCodeInput('');
    setNewCodeInput('');
    setConfirmNewCode('');
    setTimeout(() => setPasscodeMessage({ text: '', isError: false }), 4000);
  };

  // Tournament Form States
  const [showAddT, setShowAddT] = useState(false);
  const [newT, setNewT] = useState({
    name: '', game: 'Valorant', mode: '5v5 Team',
    entryFee: 0, prizePool: 0, date: '', time: '',
    slotsMax: 32, rules: ''
  });

  // Filter & Search for Registrations
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const success = loginAdmin(passphrase);
    if (!success) {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 3000);
    }
  };

  // Handle Homepage Content Save
  const handleSaveHomepage = (e) => {
    e.preventDefault();
    updateHomepage(editedHome);
    setHomeSaved(true);
    setTimeout(() => setHomeSaved(false), 3000);
  };

  // Handle Add Tournament
  const handleAddTournamentSubmit = (e) => {
    e.preventDefault();
    const rulesArray = newT.rules.split('\n').filter(r => r.trim() !== '');
    addTournament({
      ...newT,
      entryFee: Number(newT.entryFee),
      prizePool: Number(newT.prizePool),
      slotsMax: Number(newT.slotsMax),
      rules: rulesArray
    });
    setNewT({
      name: '', game: 'Valorant', mode: '5v5 Team',
      entryFee: 0, prizePool: 0, date: '', time: '',
      slotsMax: 32, rules: ''
    });
    setShowAddT(false);
  };

  // CSV Export utility
  const exportToCSV = () => {
    const headers = ['ID', 'Tournament', 'Type', 'Team Name', 'Captain Name', 'Email', 'Discord', 'Members', 'Tx ID', 'Amount ($)', 'Status', 'Registered At'];
    const rows = registrations.map(r => [
      r.id,
      r.tournamentName,
      r.type,
      r.teamName,
      r.captainName,
      r.captainEmail,
      r.discordHandle,
      r.members.replace(/"/g, '""'), // escape quotes
      r.paymentTxId,
      r.paymentAmount,
      r.status,
      r.registeredAt
    ]);

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\n";
    rows.forEach(row => {
      csvContent += row.map(val => `"${val}"`).join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `esports_registrations_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Analytics Metrics
  const totalEarnings = registrations
    .filter(r => r.status === 'Approved')
    .reduce((sum, r) => sum + r.paymentAmount, 0);

  const pendingCount = registrations.filter(r => r.status === 'Pending').length;

  // Filtered Registrations
  const filteredRegs = registrations.filter(r => {
    const matchesSearch = 
      r.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.captainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.paymentTxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tournamentName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Render Login Form if not logged in
  if (!isAdminLoggedIn) {
    return (
      <section className="admin-login-section">
        <div className="gaming-container max-w-sm mx-auto">
          <div className="glass-panel login-panel text-center">
            
            <div className="login-icon-container float-element">
              <ShieldAlert className="login-icon text-primary" size={48} />
            </div>

            <h2 className="login-title text-glow-purple">COMMAND GATEWAY</h2>
            <p className="login-subtitle">Authorization credentials required</p>

            <form onSubmit={handleLoginSubmit} className="login-form">
              <div className="form-group text-left">
                <label className="label-futuristic">PASSPHRASE</label>
                <input 
                  type="password" 
                  className={`input-futuristic ${loginError ? 'input-error' : ''}`}
                  placeholder="Enter admin code"
                  required
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                />
                <span className="help-text">Default demo key is: <code className="text-secondary">admin1337</code></span>
              </div>

              {loginError && (
                <div className="login-error-msg text-glow-pink">
                  SECURITY EXCEPTION: INVALID AUTH KEY
                </div>
              )}

              <button type="submit" className="btn-futuristic btn-primary w-full mt-4">
                <span>VERIFY AUTHORIZATION</span>
                <ArrowRight size={14} />
              </button>
            </form>
            
          </div>
        </div>
      </section>
    );
  }

  // Render Dashboard
  return (
    <section className="admin-dashboard-section">
      <div className="gaming-container">
        
        {/* Top Header */}
        <div className="dashboard-header glass-panel">
          <div className="dashboard-brand">
            <ShieldCheck className="dashboard-logo-icon text-secondary" size={28} />
            <div>
              <h2 className="dashboard-title text-glow-cyan">NEXUS COMMAND CENTER</h2>
              <p className="dashboard-subtitle text-muted">Real-time administration node</p>
            </div>
          </div>
          <button className="btn-futuristic btn-outline" onClick={() => logoutAdmin()}>
            CLOSE TERMINAL
          </button>
        </div>

        {/* Dashboard Analytics Widgets */}
        <div className="dashboard-widgets-grid">
          {/* Widget 1 */}
          <div className="glass-panel widget-card">
            <div className="widget-icon-box purple-glow">
              <DollarSign className="text-primary" size={24} />
            </div>
            <div className="widget-details">
              <span className="widget-label">Total Cash Inflow</span>
              <h3 className="widget-value text-glow-purple">₹{totalEarnings}</h3>
            </div>
          </div>

          {/* Widget 2 */}
          <div className="glass-panel widget-card">
            <div className="widget-icon-box cyan-glow">
              <Users className="text-secondary" size={24} />
            </div>
            <div className="widget-details">
              <span className="widget-label">Enlisted Entries</span>
              <h3 className="widget-value text-glow-cyan">{registrations.length} Entries</h3>
            </div>
          </div>

          {/* Widget 3 */}
          <div className="glass-panel widget-card">
            <div className="widget-icon-box pink-glow">
              <ShieldAlert className="text-accent" size={24} />
            </div>
            <div className="widget-details">
              <span className="widget-label">Awaiting Verification</span>
              <h3 className={`widget-value ${pendingCount > 0 ? 'text-glow-pink pulse-text' : ''}`}>{pendingCount} Pending</h3>
            </div>
          </div>

          {/* Widget 4 */}
          <div className="glass-panel widget-card">
            <div className="widget-icon-box purple-glow">
              <Award className="text-primary" size={24} />
            </div>
            <div className="widget-details">
              <span className="widget-label">Active Leagues</span>
              <h3 className="widget-value text-glow-purple">{tournaments.length} Matches</h3>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-nav-tabs">
          <button 
            className={`tab-btn ${activeTab === 'registrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('registrations')}
          >
            <FileText size={16} />
            <span>REGISTRATIONS REVIEW</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tournaments' ? 'active' : ''}`}
            onClick={() => setActiveTab('tournaments')}
          >
            <Award size={16} />
            <span>TOURNAMENTS MANAGER</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'homepage' ? 'active' : ''}`}
            onClick={() => setActiveTab('homepage')}
          >
            <Edit3 size={16} />
            <span>HOMEPAGE EDITOR</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart2 size={16} />
            <span>METRIC ANALYTICS</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <ShieldAlert size={16} />
            <span>SYSTEM SETTINGS</span>
          </button>
        </div>

        {/* Tab 1: Registrations Review */}
        {activeTab === 'registrations' && (
          <div className="tab-pane-content glass-panel">
            <div className="pane-header-actions">
              <div className="pane-title-group">
                <h3>REGISTRATION APPLICATIONS</h3>
                <p>Approve incoming game entry fee deposits</p>
              </div>
              <button className="btn-futuristic btn-secondary" onClick={exportToCSV}>
                <Download size={14} />
                <span>EXPORT TO CSV</span>
              </button>
            </div>

            {/* Filters Row */}
            <div className="filters-row-container">
              <input 
                type="text" 
                className="input-futuristic search-input" 
                placeholder="Search team name, captain name, tx code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                className="input-futuristic status-select-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Table */}
            <div className="table-responsive-container">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Reg ID</th>
                    <th>Tournament</th>
                    <th>Type</th>
                    <th>Name/Captain</th>
                    <th>Tx Reference ID</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegs.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center text-muted py-8">
                        No registrations matching specified query criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredRegs.map(r => (
                      <tr key={r.id}>
                        <td className="font-mono text-primary text-xs">{r.id}</td>
                        <td className="font-bold">{r.tournamentName}</td>
                        <td>
                          <span className={`tag-futuristic text-xs ${r.type === 'Team' ? 'tag-cyan' : 'tag-magenta'}`}>
                            {r.type}
                          </span>
                        </td>
                        <td>
                          <div>{r.type === 'Team' ? r.teamName : r.captainName}</div>
                          <div className="text-muted text-xs font-mono">{r.discordHandle}</div>
                        </td>
                        <td className="font-mono text-secondary text-xs">{r.paymentTxId}</td>
                        <td className="font-bold text-glow-pink">₹{r.paymentAmount}</td>
                        <td>
                          <span className={`status-badge-inline ${r.status.toLowerCase()}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="actions-cell">
                          {r.status === 'Pending' && (
                            <>
                              <button 
                                className="btn-action-icon btn-approve"
                                onClick={() => updateRegistrationStatus(r.id, 'Approved')}
                                title="Approve Payment"
                              >
                                <Check size={14} />
                              </button>
                              <button 
                                className="btn-action-icon btn-reject"
                                onClick={() => updateRegistrationStatus(r.id, 'Rejected')}
                                title="Reject Payment"
                              >
                                <X size={14} />
                              </button>
                            </>
                          )}
                          <button 
                            className="btn-action-icon btn-delete"
                            onClick={() => {
                              if (confirm('Delete registration entries?')) deleteRegistration(r.id);
                            }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Tournament Manager */}
        {activeTab === 'tournaments' && (
          <div className="tab-pane-content glass-panel">
            <div className="pane-header-actions">
              <div className="pane-title-group">
                <h3>REGISTERED LEAGUE OPERATIONS</h3>
                <p>Deploy or suspend tournament lobbies</p>
              </div>
              <button 
                className="btn-futuristic btn-primary"
                onClick={() => setShowAddT(!showAddT)}
              >
                <Plus size={14} />
                <span>{showAddT ? 'CLOSE FORM' : 'ADD LEAGUE'}</span>
              </button>
            </div>

            {/* Add Tournament Form */}
            {showAddT && (
              <form onSubmit={handleAddTournamentSubmit} className="add-tournament-form glass-panel mt-4 mb-6">
                <h4 className="form-sub-title text-glow-cyan">CREATE NEW LEAGUE RUNTIME</h4>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="label-futuristic">LEAGUE NAME</label>
                    <input 
                      type="text" className="input-futuristic" required
                      value={newT.name} onChange={(e) => setNewT({ ...newT, name: e.target.value })}
                    />
                  </div>
                  <div className="form-grid-2-inner">
                    <div className="form-group">
                      <label className="label-futuristic">GAME</label>
                      <select 
                        className="input-futuristic select-futuristic"
                        value={newT.game} onChange={(e) => setNewT({ ...newT, game: e.target.value })}
                      >
                        <option value="Valorant">Valorant</option>
                        <option value="Apex Legends">Apex Legends</option>
                        <option value="League of Legends">League of Legends</option>
                        <option value="CS2">Counter Strike 2</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="label-futuristic">MODE</label>
                      <input 
                        type="text" className="input-futuristic" required placeholder="e.g. 5v5 Team"
                        value={newT.mode} onChange={(e) => setNewT({ ...newT, mode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-grid-4">
                  <div className="form-group">
                    <label className="label-futuristic">ENTRY FEE (₹)</label>
                    <input 
                      type="number" className="input-futuristic" required min="0"
                      value={newT.entryFee} onChange={(e) => setNewT({ ...newT, entryFee: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="label-futuristic">PRIZE POOL (₹)</label>
                    <input 
                      type="number" className="input-futuristic" required min="0"
                      value={newT.prizePool} onChange={(e) => setNewT({ ...newT, prizePool: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="label-futuristic">DATE</label>
                    <input 
                      type="date" className="input-futuristic" required
                      value={newT.date} onChange={(e) => setNewT({ ...newT, date: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="label-futuristic">TIME</label>
                    <input 
                      type="text" className="input-futuristic" required placeholder="e.g. 18:00 UTC"
                      value={newT.time} onChange={(e) => setNewT({ ...newT, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="label-futuristic">MAX TEAMS SLOTS</label>
                  <input 
                    type="number" className="input-futuristic" required min="2"
                    value={newT.slotsMax} onChange={(e) => setNewT({ ...newT, slotsMax: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="label-futuristic">RULES (ONE RULE PER LINE)</label>
                  <textarea 
                    className="input-futuristic textarea-futuristic" rows={3} placeholder="Paste rules list..."
                    value={newT.rules} onChange={(e) => setNewT({ ...newT, rules: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-futuristic btn-primary w-full">
                  <span>DEPLOY LEAGUE INSTANCE</span>
                </button>
              </form>
            )}

            {/* List Tournaments */}
            <div className="table-responsive-container">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Game ID</th>
                    <th>League Name</th>
                    <th>Game</th>
                    <th>Lobby Details</th>
                    <th>Fee/Prize Pool</th>
                    <th>Slots Fill</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tournaments.map(t => (
                    <tr key={t.id}>
                      <td className="font-mono text-primary text-xs">{t.id}</td>
                      <td className="font-bold">{t.name}</td>
                      <td>
                        <span className="tag-futuristic tag-cyan">{t.game}</span>
                      </td>
                      <td className="text-xs">
                        <div>Mode: {t.mode}</div>
                        <div>Date: {t.date}</div>
                        <div>Time: {t.time}</div>
                      </td>
                      <td>
                        <div>Fee: <strong>₹{t.entryFee}</strong></div>
                        <div>Prize: <strong className="text-glow-pink">₹{t.prizePool}</strong></div>
                      </td>
                      <td>
                        <div className="text-xs font-bold">{t.slotsRegistered} / {t.slotsMax} Slots</div>
                        <div className="slots-progress-bar-bg slots-progress-mini">
                          <div 
                            className="slots-progress-bar-fill" 
                            style={{ width: `${(t.slotsRegistered/t.slotsMax)*100}%` }}
                          ></div>
                        </div>
                      </td>
                      <td>
                        <button 
                          className="btn-action-icon btn-delete"
                          onClick={() => {
                            if (confirm('Delete tournament? All corresponding slots registries will remain but tournament card will disappear.')) deleteTournament(t.id);
                          }}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Homepage content editor */}
        {activeTab === 'homepage' && (
          <div className="tab-pane-content glass-panel">
            <div className="pane-header-actions">
              <div className="pane-title-group">
                <h3>HOMEPAGE CONTENT EDITOR</h3>
                <p>Customize banner paths, titles, and stats variables</p>
              </div>
            </div>

            <form onSubmit={handleSaveHomepage} className="homepage-editor-form">
              <div className="form-group">
                <label className="label-futuristic font-bold">HERO HEADER TITLE</label>
                <input 
                  type="text" className="input-futuristic" required
                  value={editedHome.heroTitle} 
                  onChange={(e) => setEditedHome({ ...editedHome, heroTitle: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="label-futuristic">HERO SUBTITLE</label>
                <input 
                  type="text" className="input-futuristic" required
                  value={editedHome.heroSubtitle} 
                  onChange={(e) => setEditedHome({ ...editedHome, heroSubtitle: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="label-futuristic">HERO DESC DESCRIPTION</label>
                <textarea 
                  className="input-futuristic textarea-futuristic" rows={3} required
                  value={editedHome.heroDescription} 
                  onChange={(e) => setEditedHome({ ...editedHome, heroDescription: e.target.value })}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="label-futuristic">HERO BACKGROUND BANNER URL</label>
                  <input 
                    type="text" className="input-futuristic font-mono text-xs" required
                    value={editedHome.heroBanner} 
                    onChange={(e) => setEditedHome({ ...editedHome, heroBanner: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="label-futuristic">DISCORD JOIN LINK</label>
                  <input 
                    type="text" className="input-futuristic font-mono text-xs" required
                    value={editedHome.discordLink} 
                    onChange={(e) => setEditedHome({ ...editedHome, discordLink: e.target.value })}
                  />
                </div>
              </div>

              <h4 className="form-sub-title text-glow-cyan mt-6 mb-2">STATISTICS OVERLAYS</h4>
              <div className="form-grid-4">
                <div className="form-group">
                  <label className="label-futuristic">TOURNAMENTS COUNT</label>
                  <input 
                    type="text" className="input-futuristic" required
                    value={editedHome.stats.tournamentsCount} 
                    onChange={(e) => setEditedHome({
                      ...editedHome, 
                      stats: { ...editedHome.stats, tournamentsCount: e.target.value }
                    })}
                  />
                </div>
                <div className="form-group">
                  <label className="label-futuristic">TOTAL PRIZE POOLS</label>
                  <input 
                    type="text" className="input-futuristic" required
                    value={editedHome.stats.prizePoolTotal} 
                    onChange={(e) => setEditedHome({
                      ...editedHome, 
                      stats: { ...editedHome.stats, prizePoolTotal: e.target.value }
                    })}
                  />
                </div>
                <div className="form-group">
                  <label className="label-futuristic">GAMERS COUNT</label>
                  <input 
                    type="text" className="input-futuristic" required
                    value={editedHome.stats.gamersCount} 
                    onChange={(e) => setEditedHome({
                      ...editedHome, 
                      stats: { ...editedHome.stats, gamersCount: e.target.value }
                    })}
                  />
                </div>
                <div className="form-group">
                  <label className="label-futuristic">BROADCAST HOURS</label>
                  <input 
                    type="text" className="input-futuristic" required
                    value={editedHome.stats.liveMatches} 
                    onChange={(e) => setEditedHome({
                      ...editedHome, 
                      stats: { ...editedHome.stats, liveMatches: e.target.value }
                    })}
                  />
                </div>
              </div>

              <button type="submit" className="btn-futuristic btn-primary w-full mt-6">
                <span>SAVE OVERLAYS AND DEPLOY</span>
              </button>

              {homeSaved && (
                <div className="editor-success-msg text-glow-cyan text-center mt-3">
                  HOMEPAGE VARIABLES FLUSHED TO DATABASE SUCCESSFULLY.
                </div>
              )}
            </form>
          </div>
        )}

        {/* Tab 4: Analytics */}
        {activeTab === 'analytics' && (
          <div className="tab-pane-content glass-panel">
            <div className="pane-header-actions">
              <div className="pane-title-group">
                <h3>METRIC ANALYTICS DASHBOARD</h3>
                <p>Simulated telemetry analytics of registrations and slot loading</p>
              </div>
            </div>

            {/* Custom stylized charts */}
            <div className="analytics-grid mt-4">
              {/* Card 1: Slot loading */}
              <div className="glass-panel chart-card">
                <h4 className="chart-card-title text-glow-purple">LEAGUE CAPACITY UTILIZATION</h4>
                <div className="bar-chart-container">
                  {tournaments.map(t => {
                    const pct = (t.slotsRegistered / t.slotsMax) * 100;
                    return (
                      <div key={t.id} className="bar-chart-row">
                        <div className="bar-row-label">
                          <span className="text-xs font-bold">{t.game}</span>
                          <span className="text-muted text-xs">({t.slotsRegistered}/{t.slotsMax})</span>
                        </div>
                        <div className="bar-outer-container">
                          <div className="bar-fill-indicator" style={{ width: `${pct}%` }}></div>
                          <span className="bar-pct-text">{Math.round(pct)}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card 2: Earnings share */}
              <div className="glass-panel chart-card">
                <h4 className="chart-card-title text-glow-cyan">REVENUE CONTRIBUTION (₹)</h4>
                <div className="bar-chart-container">
                  {tournaments.map(t => {
                    // Sum amount for approved registrations on this tournament
                    const revenue = registrations
                      .filter(r => r.tournamentId === t.id && r.status === 'Approved')
                      .reduce((sum, r) => sum + r.paymentAmount, 0);
                    
                    const pct = totalEarnings > 0 ? (revenue / totalEarnings) * 100 : 0;

                    return (
                      <div key={t.id} className="bar-chart-row">
                        <div className="bar-row-label">
                          <span className="text-xs font-bold">{t.game}</span>
                          <span className="text-secondary text-xs font-bold">₹{revenue}</span>
                        </div>
                        <div className="bar-outer-container">
                          <div className="bar-fill-indicator bg-secondary-bar" style={{ width: `${pct}%` }}></div>
                          <span className="bar-pct-text">{Math.round(pct)}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: System Settings */}
        {activeTab === 'settings' && (
          <div className="tab-pane-content glass-panel">
            <div className="pane-header-actions">
              <div className="pane-title-group">
                <h3>SYSTEM SECURITY CREDENTIALS</h3>
                <p>Reconfigure admin passphrase access code</p>
              </div>
            </div>

            <form onSubmit={handleChangePasscodeSubmit} className="passcode-changer-form" style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="label-futuristic">CURRENT PASSPHRASE</label>
                <input 
                  type="password" className="input-futuristic" required
                  placeholder="Enter current passcode"
                  value={currentCodeInput} 
                  onChange={(e) => setCurrentCodeInput(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="label-futuristic">NEW PASSPHRASE</label>
                <input 
                  type="password" className="input-futuristic" required
                  placeholder="Enter new passcode"
                  value={newCodeInput} 
                  onChange={(e) => setNewCodeInput(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="label-futuristic">CONFIRM NEW PASSPHRASE</label>
                <input 
                  type="password" className="input-futuristic" required
                  placeholder="Confirm new passcode"
                  value={confirmNewCode} 
                  onChange={(e) => setConfirmNewCode(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-futuristic btn-primary w-full mt-2">
                <span>COMMIT SECURITY RECONFIGURATION</span>
              </button>

              {passcodeMessage.text && (
                <div className={`editor-success-msg text-center mt-3 ${passcodeMessage.isError ? 'text-glow-pink' : 'text-glow-cyan'}`} style={{ color: passcodeMessage.isError ? 'var(--accent)' : 'var(--secondary)' }}>
                  {passcodeMessage.text}
                </div>
              )}
            </form>
          </div>
        )}

      </div>
    </section>
  );
}

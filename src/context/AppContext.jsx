import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const DEFAULT_TOURNAMENTS = [
  {
    id: 't-val-nexus',
    name: 'VALORANT NEXUS SHOWDOWN',
    game: 'Valorant',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    mode: '5v5 Team',
    entryFee: 500,
    prizePool: 50000,
    date: '2026-07-15',
    time: '18:00 UTC',
    slotsMax: 32,
    slotsRegistered: 12,
    rules: [
      'All matches will be played in Competitive mode.',
      'Double Elimination bracket system.',
      'Map bans will be decided via map veto on Discord.',
      'Substitutes (max 1) must be registered before the tournament starts.'
    ],
    status: 'Open'
  },
  {
    id: 't-apex-cyber',
    name: 'APEX LEGENDS CYBER-CUP',
    game: 'Apex Legends',
    banner: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=600&auto=format&fit=crop',
    mode: 'Trio (3v3)',
    entryFee: 300,
    prizePool: 35000,
    date: '2026-07-22',
    time: '17:00 UTC',
    slotsMax: 40,
    slotsRegistered: 18,
    rules: [
      'Total of 6 matches played on custom lobbies.',
      'Scoring system based on placement and kills (ALGS rules).',
      'Screenshots of match summary must be submitted by captains.',
      'Third-party software or exploits are strictly prohibited.'
    ],
    status: 'Open'
  },
  {
    id: 't-lol-rift',
    name: 'LEAGUE OF RIFTWARS',
    game: 'League of Legends',
    banner: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=600&auto=format&fit=crop',
    mode: '5v5 Team',
    entryFee: 450,
    prizePool: 45000,
    date: '2026-08-02',
    time: '15:00 UTC',
    slotsMax: 16,
    slotsRegistered: 8,
    rules: [
      'Played on Summoner\'s Rift, Tournament Draft mode.',
      'Single elimination matches; Finals will be Best-of-3.',
      'All players must have accounts in good standing on EUW/NA.',
      'Pauses are limited to 10 minutes per team per game.'
    ],
    status: 'Open'
  }
];

const DEFAULT_GALLERY = [
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop'
];

const DEFAULT_REGISTRATIONS = [
  {
    id: 'reg-001',
    tournamentId: 't-val-nexus',
    tournamentName: 'VALORANT NEXUS SHOWDOWN',
    type: 'Team',
    teamName: 'Cyber Phantoms',
    captainName: 'AeroStrike',
    captainEmail: 'aerostrike@phantoms.gg',
    discordHandle: 'aerostrike#1234',
    members: 'AeroStrike, NeonPulse, VoidWalker, CyberSlayer, ChronoShift',
    paymentTxId: 'TXN-882947192',
    paymentAmount: 500,
    status: 'Approved',
    registeredAt: '2026-06-20T14:32:00.000Z'
  },
  {
    id: 'reg-002',
    tournamentId: 't-apex-cyber',
    tournamentName: 'APEX LEGENDS CYBER-CUP',
    type: 'Team',
    teamName: 'Zero Gravity',
    captainName: 'NovaApex',
    captainEmail: 'nova@zerogravity.com',
    discordHandle: 'Nova#9981',
    members: 'NovaApex, HelixGrid, PhotonFlux',
    paymentTxId: 'TXN-910482937',
    paymentAmount: 300,
    status: 'Pending',
    registeredAt: '2026-06-22T09:15:00.000Z'
  },
  {
    id: 'reg-003',
    tournamentId: 't-val-nexus',
    tournamentName: 'VALORANT NEXUS SHOWDOWN',
    type: 'Solo',
    teamName: 'N/A (Solo)',
    captainName: 'SpecterV',
    captainEmail: 'specterv@gmail.com',
    discordHandle: 'specterv#0007',
    members: 'SpecterV (Looking for Team)',
    paymentTxId: 'TXN-382910482',
    paymentAmount: 100, // Mock entry fee for solo player
    status: 'Approved',
    registeredAt: '2026-06-21T18:44:00.000Z'
  }
];

const DEFAULT_HOMEPAGE_CONTENT = {
  heroTitle: 'THE FUTURE OF ESPORTS ARENA',
  heroSubtitle: 'ENTER THE CYBERNETIC BATTLEFIELD',
  heroDescription: 'Join high-stakes tournaments, climb the leaderboards, and compete against top-tier gaming teams globally. Enter tournaments, submit your registration, and prove your team dominates the nexus.',
  heroBanner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
  discordLink: 'https://discord.gg/esports-nexus',
  stats: {
    tournamentsCount: '15+',
    prizePoolTotal: '₹1,50,000+',
    gamersCount: '12,500+',
    liveMatches: '24/7'
  }
};


export const AppProvider = ({ children }) => {
  // Navigation: 'home', 'register', 'admin', 'confirmation'
  const [page, setPage] = useState('home');
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [activeRegistrationId, setActiveRegistrationId] = useState('');
  
  // Admin Passcode & Login State
  const [adminPasscode, setAdminPasscode] = useState(() => {
    return localStorage.getItem('esports_admin_passcode') || 'admin1337';
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('esports_admin_logged_in') === 'true';
  });

  // Database States loaded from localStorage or seeded
  const [tournaments, setTournaments] = useState(() => {
    const data = localStorage.getItem('esports_tournaments_inr');
    return data ? JSON.parse(data) : DEFAULT_TOURNAMENTS;
  });

  const [registrations, setRegistrations] = useState(() => {
    const data = localStorage.getItem('esports_registrations_inr');
    return data ? JSON.parse(data) : DEFAULT_REGISTRATIONS;
  });

  const [homepageContent, setHomepageContent] = useState(() => {
    const data = localStorage.getItem('esports_homepage_content_inr');
    return data ? JSON.parse(data) : DEFAULT_HOMEPAGE_CONTENT;
  });

  const [galleryImages, setGalleryImages] = useState(() => {
    const data = localStorage.getItem('esports_gallery_images_inr');
    return data ? JSON.parse(data) : DEFAULT_GALLERY;
  });

  // Save states to localStorage when they change
  useEffect(() => {
    localStorage.setItem('esports_tournaments_inr', JSON.stringify(tournaments));
  }, [tournaments]);

  useEffect(() => {
    localStorage.setItem('esports_registrations_inr', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('esports_homepage_content_inr', JSON.stringify(homepageContent));
  }, [homepageContent]);

  useEffect(() => {
    localStorage.setItem('esports_gallery_images_inr', JSON.stringify(galleryImages));
  }, [galleryImages]);

  // Progressive prize pool helper
  const getProgressivePrizePool = (t) => {
    if (!t) return 0;
    const { prizePool, entryFee, slotsRegistered } = t;
    const requiredSlots = Math.ceil(prizePool / entryFee);
    if (slotsRegistered > requiredSlots) {
      const extraSlots = slotsRegistered - requiredSlots;
      const extraFeesCollected = extraSlots * entryFee;
      // progressive pool: increase pool by only half the extra entry fees collected
      return prizePool + Math.round(extraFeesCollected * 0.5);
    }
    return prizePool;
  };

  // Admin Methods
  const loginAdmin = (passphrase) => {
    if (passphrase === adminPasscode) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('esports_admin_logged_in', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('esports_admin_logged_in');
  };

  const changeAdminPasscode = (newCode) => {
    setAdminPasscode(newCode);
    localStorage.setItem('esports_admin_passcode', newCode);
  };

  // Tournament CRUD
  const addTournament = (newT) => {
    const createdT = {
      ...newT,
      id: `t-${Date.now()}`,
      slotsRegistered: 0,
      status: 'Open'
    };
    setTournaments(prev => [createdT, ...prev]);
  };

  const deleteTournament = (id) => {
    setTournaments(prev => prev.filter(t => t.id !== id));
  };

  const updateTournament = (id, updatedT) => {
    setTournaments(prev => prev.map(t => t.id === id ? { ...t, ...updatedT } : t));
  };

  // Registration CRUD
  const addRegistration = (newReg) => {
    const regId = `reg-${Date.now()}`;
    const registration = {
      id: regId,
      ...newReg,
      status: 'Pending',
      registeredAt: new Date().toISOString()
    };
    setRegistrations(prev => [registration, ...prev]);
    
    // Update Registered Slots in Tournament
    setTournaments(prev => prev.map(t => {
      if (t.id === newReg.tournamentId) {
        return {
          ...t,
          slotsRegistered: Math.min(t.slotsMax, t.slotsRegistered + 1)
        };
      }
      return t;
    }));

    setActiveRegistrationId(regId);
    setPage('confirmation');
    return regId;
  };

  const updateRegistrationStatus = (id, status) => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteRegistration = (id) => {
    // Find registration to adjust slots in tournament
    const reg = registrations.find(r => r.id === id);
    if (reg) {
      setTournaments(prev => prev.map(t => {
        if (t.id === reg.tournamentId) {
          return {
            ...t,
            slotsRegistered: Math.max(0, t.slotsRegistered - 1)
          };
        }
        return t;
      }));
    }
    setRegistrations(prev => prev.filter(r => r.id !== id));
  };

  const updateHomepage = (newContent) => {
    setHomepageContent(newContent);
  };

  // Navigation Helper
  const navigateTo = (targetPage, tournament = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(targetPage);
    if (tournament) {
      setSelectedTournament(tournament);
    }
  };

  return (
    <AppContext.Provider value={{
      page,
      navigateTo,
      selectedTournament,
      setSelectedTournament,
      activeRegistrationId,
      setActiveRegistrationId,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      tournaments,
      addTournament,
      deleteTournament,
      updateTournament,
      registrations,
      addRegistration,
      updateRegistrationStatus,
      deleteRegistration,
      homepageContent,
      updateHomepage,
      adminPasscode,
      changeAdminPasscode,
      galleryImages,
      setGalleryImages,
      getProgressivePrizePool
    }}>
      {children}
    </AppContext.Provider>
  );
};

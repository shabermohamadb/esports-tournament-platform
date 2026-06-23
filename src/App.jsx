import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import FeaturedTournaments from './components/FeaturedTournaments';
import RegistrationForm from './components/RegistrationForm';
import ConfirmationPage from './components/ConfirmationPage';
import AdminDashboard from './components/AdminDashboard';
import PremiumSections from './components/PremiumSections';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

function MainAppContent() {
  const { page } = useContext(AppContext);

  return (
    <div className="app-viewport">
      {/* Background aesthetics */}
      <div className="grid-overlay"></div>
      <div className="radial-glow"></div>
      <div className="scanline-effect"></div>
      
      {/* Interactive Background */}
      <ParticleBackground />

      {/* Main Layout */}
      <Navbar />
      
      {/* Active Page View Switcher with animations */}
      <main className="main-content-layout">
        {page === 'home' && (
          <div className="page-fade-in">
            <Hero />
            <Statistics />
            <FeaturedTournaments />
            <PremiumSections />
          </div>
        )}

        {page === 'register' && (
          <div className="page-fade-in">
            <RegistrationForm />
          </div>
        )}

        {page === 'confirmation' && (
          <div className="page-fade-in">
            <ConfirmationPage />
          </div>
        )}

        {page === 'admin' && (
          <div className="page-fade-in">
            <AdminDashboard />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CountdownSection } from './components/CountdownSection';
import { GameplaySection } from './components/GameplaySection';
import { GallerySection } from './components/GallerySection';
import { FounderSpotlight } from './components/FounderSpotlight';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { SITE_CONFIG } from './config/siteConfig';

export const App: React.FC = () => {
  const [remainingText, setRemainingText] = useState('10-Day Event Live');

  useEffect(() => {
    const updateHeaderTimer = () => {
      const endMs = new Date(SITE_CONFIG.event.endDate).getTime();
      const diffMs = endMs - Date.now();
      if (diffMs <= 0) {
        setRemainingText('Event Concluded');
      } else {
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        setRemainingText(`${days}d ${hours}h Remaining`);
      }
    };

    updateHeaderTimer();
    const timer = setInterval(updateHeaderTimer, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Dynamic Background Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-purple-900/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-[35%] -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-[65%] -right-48 w-96 h-96 bg-purple-600/10 rounded-full blur-[160px]" />
      </div>

      {/* Floating Island Navigation */}
      <Navbar />

      {/* Main Content Stream */}
      <main>
        {/* A & B. Hero Section */}
        <Hero remainingTimeText={remainingText} />

        {/* E. 10-Day Central Countdown Section */}
        <CountdownSection />

        {/* C. Gameplay & Features Bento Grid + Interactive Mini Clicker */}
        <GameplaySection />

        {/* D. Visual Media Gallery */}
        <GallerySection />

        {/* Creator / Studio Spotlight */}
        <FounderSpotlight />

        {/* F. Final Call to Action */}
        <FinalCta />
      </main>

      {/* G. Comprehensive Footer */}
      <Footer />
    </div>
  );
};

export default App;

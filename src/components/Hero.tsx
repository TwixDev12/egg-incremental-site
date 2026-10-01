import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { trackPlayNowClick } from '../utils/analytics';
import { Play, ChevronDown, Sparkles, Trophy, Users, ShieldCheck, Flame, Box } from 'lucide-react';
import { asset } from '../utils/assets';

interface HeroProps {
  remainingTimeText?: string;
}

export const Hero: React.FC<HeroProps> = ({ remainingTimeText = '10 Days Event Live' }) => {
  const [viewMode, setViewMode] = useState<'3d-render' | 'live-game'>('3d-render');

  const handlePlayNow = () => {
    trackPlayNowClick('hero_cta');
    window.open(SITE_CONFIG.game.playUrl, '_blank', 'noopener,noreferrer');
  };

  const scrollToOverview = () => {
    const section = document.getElementById('features');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 flex items-center justify-center overflow-hidden"
    >
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-gradient-to-tr from-purple-600/25 via-amber-500/20 to-pink-600/20 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start z-10">
            {/* Eyebrow Pill (Double-Bezel Tag) */}
            <div className="p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-5 shadow-sm inline-flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-900/60 to-amber-900/40 border border-purple-400/20 text-xs font-bold text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{SITE_CONFIG.game.badge}</span>
              </div>
              <a
                href="#countdown"
                className="hidden sm:inline-flex items-center gap-1.5 pr-3 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>{remainingTimeText}</span>
              </a>
            </div>

            {/* Main Game Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08] mb-4">
              Egg Incremental <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(245,158,11,0.4)]">
                Simulator
              </span>
            </h1>

            {/* Punchy Subtitle / Hook */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-medium max-w-xl mb-7 leading-relaxed">
              {SITE_CONFIG.game.tagline}{' '}
              <span className="text-slate-100 font-semibold">
                Tap to harvest, hatch celestial companions, forge mythic hammers, and conquer the legendary Bitcoin Chest!
              </span>
            </p>

            {/* Primary & Secondary Action Buttons (Above the Fold) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
              {/* PLAY NOW CTA */}
              <button
                onClick={handlePlayNow}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 pl-7 pr-2 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 font-black text-base sm:text-lg tracking-wider uppercase shadow-[0_10px_35px_rgba(245,158,11,0.45)] hover:shadow-[0_12px_45px_rgba(245,158,11,0.7)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden border border-amber-300/40"
              >
                <span className="font-extrabold tracking-wide">PLAY NOW</span>
                <div className="w-10 h-10 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:bg-slate-900 transition-all duration-300">
                  <Play className="w-4 h-4 fill-current ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              {/* DISCOVER THE GAME CTA */}
              <button
                onClick={scrollToOverview}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-bold text-sm tracking-wide border border-white/10 hover:border-white/25 backdrop-blur-md transition-all duration-200 cursor-pointer"
              >
                <span>DISCOVER THE GAME</span>
                <ChevronDown className="w-4 h-4 text-slate-400 animate-bounce" />
              </button>
            </div>

            {/* Verified Community Highlights */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-5 border-t border-white/10 w-full max-w-lg">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-amber-400 font-black text-lg sm:text-xl">
                  <Trophy className="w-4 h-4" />
                  <span>100%</span>
                </div>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Free to Play</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-purple-400 font-black text-lg sm:text-xl">
                  <Users className="w-4 h-4" />
                  <span>QLF INC</span>
                </div>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Official Studio</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-emerald-400 font-black text-lg sm:text-xl">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Cross-Platform</span>
                </div>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium">PC & Mobile</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Visual (Double-Bezel Game Window) */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full">
            {/* Outer Machine Bezel */}
            <div className="relative w-full max-w-md sm:max-w-lg p-2.5 sm:p-3 rounded-[2.5rem] bg-gradient-to-b from-purple-500/20 via-white/5 to-amber-500/20 border border-white/15 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] group">
              {/* Inner Core Container */}
              <div className="relative rounded-[2rem] overflow-hidden bg-[#0c091d] border border-white/10 aspect-4/3 flex items-center justify-center">
                {/* Dynamic Image View */}
                <img
                  src={
                    viewMode === '3d-render'
                      ? asset('/assets/images/thumbnail_roblox_16x9.jpg')
                      : asset('/assets/images/capture_guardians_chest.png')
                  }
                  alt="Egg Incremental Simulator Showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                />

                {/* View Switcher Controls (Top Left) */}
                <div className="absolute top-3 left-3 flex items-center gap-1 p-1 rounded-full bg-black/75 border border-white/20 backdrop-blur-md z-10 shadow-lg">
                  <button
                    onClick={() => setViewMode('3d-render')}
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                      viewMode === '3d-render'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Box className="w-3 h-3" />
                    <span>3D Render</span>
                  </button>
                  <button
                    onClick={() => setViewMode('live-game')}
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      viewMode === 'live-game'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Live Game
                  </button>
                </div>

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0718] via-transparent to-black/30 pointer-events-none" />

                {/* Floating Tag In Image */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                      <img
                        src={asset('/assets/images/bitcoin_coin.png')}
                        alt="Bitcoin"
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white">
                        {viewMode === '3d-render' ? 'Official 3D Game Miniature' : 'The Bitcoin Guardian Chest'}
                      </h4>
                      <p className="text-[10px] text-amber-300/90 font-medium">
                        {viewMode === '3d-render' ? 'Cinematic 16:9 Showcase' : 'Real in-game experience'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Live Server
                  </span>
                </div>
              </div>

              {/* Floating Official Game Icon (Top Right) */}
              <div className="absolute -top-6 -right-6 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 p-1.5 shadow-2xl shadow-amber-500/40 border-2 border-white/40 backdrop-blur-xl animate-float hidden sm:flex items-center justify-center pointer-events-none overflow-hidden">
                <img
                  src={asset('/assets/images/official_game_icon.png')}
                  alt="Official Egg Incremental Icon"
                  className="w-full h-full object-cover rounded-2xl filter drop-shadow-md"
                />
              </div>

              {/* Floating Golden Coin Prop (Bottom Left) */}
              <div className="absolute -bottom-5 -left-5 p-2 rounded-2xl bg-gradient-to-br from-amber-500/80 to-yellow-600/80 shadow-2xl shadow-amber-500/40 border border-white/20 backdrop-blur-xl animate-float-reverse hidden sm:flex items-center justify-center pointer-events-none">
                <img
                  src={asset('/assets/images/gold_coin.png')}
                  alt="Gold Coin"
                  className="w-10 h-10 object-contain filter drop-shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

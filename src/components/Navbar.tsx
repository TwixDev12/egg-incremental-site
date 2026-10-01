import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { trackPlayNowClick } from '../utils/analytics';
import { ExternalLink, Menu, X, Sparkles, Gamepad2, Clock, Image as ImageIcon, Flame } from 'lucide-react';
import { asset } from '../utils/assets';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePlayClick = () => {
    trackPlayNowClick('navbar');
    window.open(SITE_CONFIG.game.playUrl, '_blank', 'noopener,noreferrer');
  };

  const navLinks = [
    { name: 'Overview', href: '#hero', icon: Sparkles },
    { name: 'Features', href: '#features', icon: Flame },
    { name: 'Demo Clicker', href: '#demo-clicker', icon: Gamepad2 },
    { name: 'Countdown', href: '#countdown', icon: Clock },
    { name: 'Gallery', href: '#gallery', icon: ImageIcon },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Floating Island Outer Shell */}
        <div
          className={`pointer-events-auto w-full flex items-center justify-between p-1.5 sm:p-2 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? 'bg-[#0d091e]/90 border-purple-500/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] ring-1 ring-white/10'
              : 'bg-[#120d2a]/75 border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          }`}
        >
          {/* Brand Identity / Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 pl-3 sm:pl-4 pr-3 py-1.5 rounded-full hover:bg-white/5 transition-colors group"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md shadow-amber-500/20 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img
                src={asset('/assets/images/official_game_icon.png')}
                alt="Egg Incremental Icon"
                className="w-full h-full object-cover filter drop-shadow rounded-lg group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  NEW
                </span>
                <span className="font-extrabold text-sm sm:text-base text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  Egg Incremental
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 px-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Play Now CTA (Nested Double-Bezel Button) */}
            <button
              onClick={handlePlayClick}
              className="group relative inline-flex items-center gap-2.5 pl-4 sm:pl-5 pr-1.5 sm:pr-2 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_28px_rgba(245,158,11,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden"
              title="Play Egg Incremental Simulator on Roblox"
            >
              <span className="relative z-10 font-black">PLAY NOW</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950/20 flex items-center justify-center text-slate-950 group-hover:bg-slate-950/30 transition-colors">
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="pointer-events-auto md:hidden mt-3 max-w-6xl mx-auto">
          <div className="p-4 rounded-3xl bg-[#0e0921]/95 border border-purple-500/30 backdrop-blur-2xl shadow-2xl flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-200 hover:text-amber-400 hover:bg-white/5 transition-all"
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  {link.name}
                </a>
              );
            })}

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  handlePlayClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25"
              >
                PLAY ON ROBLOX
                <ExternalLink className="w-4 h-4" />
              </button>

              <a
                href={SITE_CONFIG.game.groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-white/5 text-slate-300 font-bold text-xs hover:bg-white/10 transition-colors"
              >
                Join {SITE_CONFIG.game.groupName} Roblox Group
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

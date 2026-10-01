import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { ExternalLink, ShieldAlert, Heart, Gamepad2 } from 'lucide-react';
import { asset } from '../utils/assets';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/10 bg-[#070513] text-slate-400 py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 mb-12">
          {/* Brand info */}
          <div className="md:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 flex items-center justify-center shadow-lg overflow-hidden">
                <img
                  src={asset('/assets/images/official_game_icon.png')}
                  alt="Egg Logo"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <span className="font-extrabold text-white text-base sm:text-lg block tracking-tight">
                  {SITE_CONFIG.game.name}
                </span>
                <span className="text-[11px] text-amber-400 font-semibold">
                  Official Community Showcase
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mb-4">
              {SITE_CONFIG.game.shortDescription}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
              <span>for the Roblox community by {SITE_CONFIG.game.groupName}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-black uppercase text-white tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-amber-400 transition-colors">
                  Gameplay & Mechanics
                </a>
              </li>
              <li>
                <a href="#demo-clicker" className="hover:text-amber-400 transition-colors">
                  Egg Clicker Demo
                </a>
              </li>
              <li>
                <a href="#countdown" className="hover:text-amber-400 transition-colors">
                  10-Day Launch Event
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  Visual Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Official Roblox Experience Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-black uppercase text-white tracking-widest mb-4">
              Roblox Links
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <a
                  href={SITE_CONFIG.game.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Play Experience</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.game.groupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Official Group: {SITE_CONFIG.game.groupName}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="pt-2 text-[11px] text-slate-400 font-mono">
                Place ID: {SITE_CONFIG.game.placeId}
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Compliance */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-2 text-center sm:text-left max-w-2xl">
            <ShieldAlert className="w-4 h-4 shrink-0 text-slate-400" />
            <span>
              Disclaimer: Egg Incremental Simulator is an independent game created by {SITE_CONFIG.game.groupName}. This website is not affiliated with, endorsed, sponsored, or specifically approved by Roblox Corporation. Roblox, its logos and related marks are trademarks of Roblox Corporation.
            </span>
          </div>

          <div className="shrink-0 text-slate-400">
            © {new Date().getFullYear()} {SITE_CONFIG.game.groupName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

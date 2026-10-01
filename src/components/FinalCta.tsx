import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { trackPlayNowClick } from '../utils/analytics';
import { ExternalLink, Copy, Check, Sparkles, Gamepad2 } from 'lucide-react';

export const FinalCta: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handlePlayNow = () => {
    trackPlayNowClick('final_cta');
    window.open(SITE_CONFIG.game.playUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyPlaceId = () => {
    navigator.clipboard.writeText(SITE_CONFIG.game.placeId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 overflow-hidden">
      {/* Huge Backing Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-amber-500/20 via-purple-600/25 to-pink-500/20 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Double-Bezel Grand Shell */}
        <div className="p-2 sm:p-4 rounded-[3rem] bg-gradient-to-b from-amber-500/25 via-white/10 to-purple-500/20 border border-white/20 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.7)]">
          <div className="rounded-[2.5rem] bg-[#0c081e]/95 p-8 sm:p-14 md:p-16 border border-white/10 relative overflow-hidden">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available Now on Roblox</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-5">
              YOUR NEXT ADVENTURE <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                STARTS HERE
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands of Roblox players. Hatch unique companions, amass billions of coins, and build the most legendary empire in {SITE_CONFIG.game.name}.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              {/* PLAY ON ROBLOX Button */}
              <button
                onClick={handlePlayNow}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 pl-8 pr-2.5 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 font-black text-base sm:text-lg tracking-wider uppercase shadow-[0_12px_40px_rgba(245,158,11,0.55)] hover:shadow-[0_16px_55px_rgba(245,158,11,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden border border-amber-200/60"
              >
                <Gamepad2 className="w-5 h-5 text-slate-950" />
                <span>PLAY ON ROBLOX</span>
                <div className="w-10 h-10 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>

              {/* Copy Place ID Button */}
              <button
                onClick={handleCopyPlaceId}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-white/25 transition-all duration-200 cursor-pointer"
                title="Copy Roblox Place ID to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Place ID Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Place ID: {SITE_CONFIG.game.placeId}</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[11px] text-slate-400">
              Compatible with PC, Mobile (iOS / Android), Tablet, and Console • No Download Required outside Roblox
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

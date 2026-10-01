import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Users, Crown, ExternalLink } from 'lucide-react';

export const FounderSpotlight: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="p-1.5 sm:p-2 rounded-[2.5rem] bg-gradient-to-r from-purple-500/20 via-white/5 to-amber-500/20 border border-white/10 backdrop-blur-md">
          <div className="rounded-[calc(2.5rem-0.375rem)] bg-[#0d0920] p-6 sm:p-10 border border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Info Column */}
              <div className="max-w-xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>The Studio & Developers</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  Crafted by {SITE_CONFIG.game.groupName}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Founded and maintained by passionate Roblox developers. Join our official community group on Roblox to receive developer update logs, member badges, and exclusive group gifts.
                </p>

                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  {SITE_CONFIG.creators.map((creator) => (
                    <div
                      key={creator.name}
                      className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center font-black text-xs text-amber-300">
                        👑
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-white block">{creator.name}</span>
                        <span className="text-[10px] text-amber-400 font-semibold">{creator.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Column */}
              <div className="flex flex-col items-center gap-3">
                <a
                  href={SITE_CONFIG.game.groupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-extrabold text-sm tracking-wider uppercase border border-white/20 hover:border-amber-400/50 transition-all duration-300 shadow-lg group"
                >
                  <Users className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Join Official Group</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                </a>

                <span className="text-[11px] text-slate-400">
                  Group ID: 1004997125 • QLF INC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

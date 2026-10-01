import React, { useState } from 'react';
import { ThreeEggCanvas } from './ThreeEggCanvas';
import { SITE_CONFIG } from '../config/siteConfig';
import { trackPlayNowClick } from '../utils/analytics';
import { sounds } from '../utils/soundEffects';
import { Sparkles, Gamepad2, Hammer, Zap, Trophy, ExternalLink } from 'lucide-react';

export const ThreeDShowcaseSection: React.FC = () => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [upgradesBought, setUpgradesBought] = useState(0);

  const handleScoreGained = (baseScore: number) => {
    setTotalCoins((prev) => prev + baseScore * multiplier);
  };

  const handleUpgrade = () => {
    const cost = 100 * (upgradesBought + 1);
    if (totalCoins >= cost) {
      setTotalCoins((prev) => prev - cost);
      setMultiplier((prev) => prev + 1);
      setUpgradesBought((prev) => prev + 1);
      sounds.playUpgradeSound();
    }
  };

  const handlePlayNow = () => {
    trackPlayNowClick('3d_arena');
    window.open(SITE_CONFIG.game.playUrl, '_blank', 'noopener,noreferrer');
  };

  const nextUpgradeCost = 100 * (upgradesBought + 1);

  return (
    <section id="3d-arena" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-r from-purple-600/20 via-amber-500/15 to-cyan-500/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-400/30 text-amber-300 text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive 3D WebGL Arena</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            Touch The 3D Universe <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
              Before Stepping Into Roblox
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Drag to rotate the 3D Egg in full 360°, tap to trigger real-time physics wobble, listen to custom audio feedback, and test the incremental mechanics right here in your browser!
          </p>
        </div>

        {/* Grand Double-Bezel 3D Chamber Container */}
        <div className="relative p-2.5 sm:p-4 rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-b from-white/15 via-white/5 to-white/10 border border-white/20 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
          <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-[#0c081e]/95 p-4 sm:p-8 md:p-10 border border-white/10 shadow-inner relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: 3D Canvas */}
              <div className="lg:col-span-8 flex flex-col items-center">
                <ThreeEggCanvas onScoreGained={handleScoreGained} />
              </div>

              {/* Right Column: Incremental Dashboard & Upgrades */}
              <div className="lg:col-span-4 flex flex-col gap-5">
                {/* Stats Card (Double-Bezel) */}
                <div className="p-1.5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="p-5 rounded-2xl bg-[#140f2e] border border-white/5 flex flex-col gap-3">
                    <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                      <Trophy className="w-4 h-4" />
                      Live Arena Wealth
                    </span>

                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-black text-white font-mono">
                        {totalCoins.toLocaleString()}
                      </span>
                      <span className="text-xs font-bold text-amber-300">💰 COINS</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
                      <span>Click Potency</span>
                      <span className="font-mono text-purple-400 font-bold">{multiplier}x Power</span>
                    </div>
                  </div>
                </div>

                {/* Upgrade Button */}
                <div className="p-1.5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="p-5 rounded-2xl bg-[#140f2e] border border-white/5 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Hammer className="w-4 h-4 text-amber-400" />
                        Forge Hammer (+1x)
                      </span>
                      <span className="text-amber-400 font-mono">{nextUpgradeCost} Coins</span>
                    </div>

                    <button
                      onClick={handleUpgrade}
                      disabled={totalCoins < nextUpgradeCost}
                      className={`w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                        totalCoins >= nextUpgradeCost
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg shadow-amber-400/30 cursor-pointer active:scale-95'
                          : 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                      <span>{totalCoins >= nextUpgradeCost ? 'Forge Upgrade' : 'Need More Coins'}</span>
                    </button>
                  </div>
                </div>

                {/* Big Roblox Experience Redirect CTA */}
                <div className="p-1.5 rounded-3xl bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-400/30">
                  <div className="p-5 rounded-2xl bg-[#140f2e] border border-white/5 flex flex-col gap-3 text-center">
                    <h4 className="text-sm font-black text-white">Want Billions of Coins & Rare Pets?</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      This is just a 3D web preview. The full experience on Roblox features multiplayer servers, massive worlds, and hundreds of pets!
                    </p>

                    <button
                      onClick={handlePlayNow}
                      className="group w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      <span>PLAY ON ROBLOX</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

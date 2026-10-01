import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Sparkles, Layers, Zap, Hammer, MousePointerClick } from 'lucide-react';
import confetti from 'canvas-confetti';
import { asset } from '../utils/assets';

export const GameplaySection: React.FC = () => {
  // Mini Egg Clicker Interactive Demo State
  const [clickCount, setClickCount] = useState(0);
  const [coins, setCoins] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [eggLevel, setEggLevel] = useState(1);
  const [hatchedPet, setHatchedPet] = useState<string | null>(null);
  const [isHatching, setIsHatching] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  const handleEggClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const gained = 10 * clickMultiplier;
    setCoins((prev) => prev + gained);
    setClickCount((prev) => prev + 1);

    // Add floating text effect
    const newId = Date.now() + Math.random();
    setFloatingTexts((prev) => [...prev.slice(-8), { id: newId, text: `+${gained} 💰`, x, y }]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== newId));
    }, 900);

    // Milestone check: Hatch egg at 25 clicks
    if (clickCount + 1 >= 25 && !isHatching) {
      triggerHatch();
    }
  };

  const triggerHatch = () => {
    setIsHatching(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setHatchedPet('✨ Mythic Celestial Hatchling (+5x Multiplier)');
      setIsHatching(false);
      setEggLevel((prev) => prev + 1);
      setClickMultiplier((prev) => prev + 2);
    }, 800);
  };

  const buyHammerUpgrade = () => {
    if (coins >= 50) {
      setCoins((prev) => prev - 50);
      setClickMultiplier((prev) => prev + 1);
    }
  };

  return (
    <section id="features" className="relative py-24 sm:py-32 px-4 sm:px-6">
      {/* Background Accent */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-widest mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Verified Game Mechanics</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Built for Pure Incremental Thrills
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every system in <span className="text-amber-400 font-bold">{SITE_CONFIG.game.name}</span> is tuned for satisfying feedback, exponential multipliers, and rich cooperative gameplay.
          </p>
        </div>

        {/* Feature Bento Grid (Asymmetric & Double-Bezel) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {SITE_CONFIG.features.map((feature, idx) => (
            <div
              key={feature.id}
              className={`p-1.5 sm:p-2 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1 ${
                idx === 0 || idx === 2 ? 'md:col-span-2' : 'col-span-1'
              }`}
            >
              {/* Inner Card Core */}
              <div className="h-full rounded-[calc(2rem-0.375rem)] bg-[#100c26]/90 p-6 sm:p-7 flex flex-col justify-between border border-white/5 relative overflow-hidden shadow-inner">
                {/* Subtle Gradient Backing */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity`}
                />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    {/* Feature Real Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-white/10 p-2 border border-white/15 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={feature.iconImage}
                        alt={feature.title}
                        className="w-full h-full object-contain filter drop-shadow"
                      />
                    </div>

                    {feature.badge && (
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-white/10 text-slate-200 border border-white/10">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span className="text-amber-400/90">{feature.category}</span>
                  <span className="text-[11px] text-slate-400 group-hover:text-white transition-colors">
                    In-Game Feature →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Clicker Mini-Simulator (Section Hook) */}
        <div
          id="demo-clicker"
          className="relative p-2.5 sm:p-4 rounded-[2.5rem] bg-gradient-to-r from-purple-500/20 via-amber-500/20 to-pink-500/20 border border-white/15 backdrop-blur-xl shadow-2xl"
        >
          <div className="rounded-[2rem] bg-[#0c081e] p-6 sm:p-10 border border-white/10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Demo Intro Column */}
              <div className="lg:col-span-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Hands-On Interactive Demo</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                  Taste the Increment Before Playing
                </h3>

                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  Click the cosmic egg below! Collect gold coins, purchase a hammer upgrade, and hit 25 clicks to test our egg-hatching mechanics directly in your browser.
                </p>

                {/* Demo Stats Bar */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <span className="text-xs text-slate-400 font-medium block">Coins</span>
                    <span className="text-lg font-black text-amber-400 font-mono">
                      {coins.toLocaleString()} 💰
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <span className="text-xs text-slate-400 font-medium block">Power</span>
                    <span className="text-lg font-black text-purple-400 font-mono">
                      {clickMultiplier}x 🔨
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <span className="text-xs text-slate-400 font-medium block">Clicks</span>
                    <span className="text-lg font-black text-emerald-400 font-mono">
                      {clickCount}/25
                    </span>
                  </div>
                </div>

                {/* Upgrade Button */}
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <button
                    onClick={buyHammerUpgrade}
                    disabled={coins < 50}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      coins >= 50
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/30 cursor-pointer active:scale-95'
                        : 'bg-white/10 text-slate-500 cursor-not-allowed border border-white/5'
                    }`}
                  >
                    <Hammer className="w-4 h-4" />
                    Forge Hammer (+1x Multiplier - 50 Coins)
                  </button>

                  {hatchedPet && (
                    <div className="text-xs text-amber-300 font-bold flex items-center gap-1.5 py-1 px-3 rounded-full bg-amber-500/10 border border-amber-500/20 animate-bounce">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Unlocked: {hatchedPet}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Clickable Egg Column */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center">
                <div
                  onClick={handleEggClick}
                  className="relative cursor-pointer select-none group flex flex-col items-center"
                  title="Click to harvest coins!"
                >
                  {/* Floating Click Numbers */}
                  {floatingTexts.map((item) => (
                    <span
                      key={item.id}
                      className="absolute text-sm font-black text-amber-300 pointer-events-none animate-float drop-shadow"
                      style={{ top: item.y - 20, left: item.x - 10 }}
                    >
                      {item.text}
                    </span>
                  ))}

                  {/* Egg Glow Pod */}
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-purple-600/30 via-pink-500/20 to-amber-500/30 p-4 border border-white/20 shadow-[0_0_50px_rgba(168,85,247,0.4)] flex items-center justify-center active:scale-90 transition-transform duration-150">
                    <img
                      src={asset('/assets/images/cosmic_egg.png')}
                      alt="Clickable Cosmic Egg"
                      className={`w-36 h-36 sm:w-48 sm:h-48 object-contain filter drop-shadow-2xl transition-transform duration-100 ${
                        isHatching ? 'animate-spin-slow scale-110' : 'group-hover:scale-105'
                      }`}
                    />
                  </div>

                  {/* Click instructions */}
                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-300 bg-white/10 px-4 py-1.5 rounded-full border border-white/10 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <MousePointerClick className="w-3.5 h-3.5" />
                    <span>TAP ME TO HARVEST! (Level {eggLevel})</span>
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

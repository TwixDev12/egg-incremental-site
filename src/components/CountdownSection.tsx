import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { trackPlayNowClick } from '../utils/analytics';
import { Clock, Sparkles, ExternalLink, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

interface TimeLeft {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  progressPercent: number;
}

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    totalMs: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    progressPercent: 0,
  });

  const [userTimeZone, setUserTimeZone] = useState<string>('');

  useEffect(() => {
    // Detect user's local timezone for user transparency
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimeZone(tz);
    } catch {
      setUserTimeZone('UTC');
    }

    const calculateTime = () => {
      const startMs = new Date(SITE_CONFIG.event.startDate).getTime();
      const endMs = new Date(SITE_CONFIG.event.endDate).getTime();
      const nowMs = Date.now();

      const remainingMs = endMs - nowMs;
      const totalDuration = endMs - startMs;

      if (remainingMs <= 0) {
        setTimeLeft({
          totalMs: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
          progressPercent: 100,
        });
        return;
      }

      const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingMs / 1000 / 60) % 60);
      const seconds = Math.floor((remainingMs / 1000) % 60);

      const elapsed = nowMs - startMs;
      const progress = totalDuration > 0 ? Math.min(100, Math.max(0, (elapsed / totalDuration) * 100)) : 0;

      setTimeLeft({
        totalMs: remainingMs,
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
        progressPercent: progress,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayNow = () => {
    trackPlayNowClick('countdown_section');
    window.open(SITE_CONFIG.game.playUrl, '_blank', 'noopener,noreferrer');
  };

  const formattedEndDate = new Date(SITE_CONFIG.event.endDate).toUTCString();

  return (
    <section
      id="countdown"
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background glow and subtle mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-amber-600/15 via-purple-600/20 to-orange-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Outer Enclosure (Double-Bezel Agency Pattern) */}
        <div className="relative p-2.5 sm:p-4 rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-b from-amber-500/20 via-purple-500/10 to-amber-500/15 border border-amber-500/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          {/* Inner Core Container */}
          <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-[#0f0b24]/95 p-6 sm:p-10 md:p-12 border border-white/10 shadow-inner relative overflow-hidden">
            {/* Header / Eyebrow */}
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-4">
                <Clock className="w-3.5 h-3.5 animate-spin-slow" />
                <span>{SITE_CONFIG.event.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                {SITE_CONFIG.event.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {SITE_CONFIG.event.description}
              </p>
            </div>

            {/* Timer Display or Expired State */}
            {!timeLeft.isExpired ? (
              <div>
                {/* 4 Time Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-10 max-w-3xl mx-auto">
                  {/* Days */}
                  <div className="p-1.5 sm:p-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="rounded-2xl bg-[#171233] p-4 sm:p-6 text-center border border-white/5 shadow-inner flex flex-col items-center">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-black text-amber-400 font-mono tracking-tight drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]">
                        {String(timeLeft.days).padStart(2, '0')}
                      </span>
                      <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-400 mt-2">
                        Days
                      </span>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="p-1.5 sm:p-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="rounded-2xl bg-[#171233] p-4 sm:p-6 text-center border border-white/5 shadow-inner flex flex-col items-center">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-black text-amber-400 font-mono tracking-tight drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </span>
                      <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-400 mt-2">
                        Hours
                      </span>
                    </div>
                  </div>

                  {/* Minutes */}
                  <div className="p-1.5 sm:p-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="rounded-2xl bg-[#171233] p-4 sm:p-6 text-center border border-white/5 shadow-inner flex flex-col items-center">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-black text-amber-400 font-mono tracking-tight drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-400 mt-2">
                        Minutes
                      </span>
                    </div>
                  </div>

                  {/* Seconds */}
                  <div className="p-1.5 sm:p-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="rounded-2xl bg-[#171233] p-4 sm:p-6 text-center border border-white/5 shadow-inner flex flex-col items-center">
                      <span className="text-4xl sm:text-5xl md:text-6xl font-black text-amber-300 font-mono tracking-tight drop-shadow-[0_2px_12px_rgba(252,211,77,0.4)]">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                      <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-300/80 mt-2">
                        Seconds
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Campaign Timeline Progress Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-2">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      Campaign Live Progress
                    </span>
                    <span className="text-amber-400 font-mono">{timeLeft.progressPercent.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/10 p-0.5 border border-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-300 transition-all duration-1000 shadow-sm"
                      style={{ width: `${timeLeft.progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
                    <span>Deadline: {formattedEndDate}</span>
                    <span>Your Timezone: {userTimeZone || 'Detected Local'}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Expired State Display */
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center max-w-2xl mx-auto mb-8">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-3">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white mb-2">Launch Event Concluded</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {SITE_CONFIG.event.endedMessage}
                </p>
              </div>
            )}

            {/* Exclusive Perks Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10">
              {SITE_CONFIG.event.rewardsSummary.map((reward, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">{reward}</span>
                </div>
              ))}
            </div>

            {/* Call to Action Button */}
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={handlePlayNow}
                className="group relative inline-flex items-center justify-center gap-3 pl-6 sm:pl-8 pr-2.5 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 font-black text-sm sm:text-base tracking-wider uppercase shadow-[0_10px_35px_rgba(245,158,11,0.5)] hover:shadow-[0_15px_45px_rgba(245,158,11,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden border border-amber-200/50"
              >
                <span>PLAY BEFORE THE COUNTDOWN ENDS</span>
                <div className="w-9 h-9 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>
              <p className="text-xs text-slate-400 font-medium mt-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Direct link to official Roblox experience • Free & Instant
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

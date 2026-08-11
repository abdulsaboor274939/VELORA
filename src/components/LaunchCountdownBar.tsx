import React, { useState, useEffect } from 'react';
import { Clock, Bell, Sparkles, Check } from 'lucide-react';
import { getWhatsAppUrl } from './WhatsAppFloatingButton';

export const LaunchCountdownBar: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  const [phoneInput, setPhoneInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput) return;
    setSubscribed(true);

    const msg = `Hi! I want to register my phone (${phoneInput}) for launch day alert for Velora Femme Couture!`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="bg-[#1F1918] text-[#FAF5F0] py-3 px-4 border-b border-[#362A28] font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Left: Banner Announcement */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <span className="bg-[#D9989F] text-[#1F1918] text-[10px] font-serif font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#1F1918]" />
            <span>Grand Reveal</span>
          </span>
          <p className="font-serif text-stone-200">
            <strong>Velora Femme Couture</strong> — 16 Exclusive Preview Articles Launching Soon!
          </p>
        </div>

        {/* Center: Live Countdown Timer */}
        <div className="flex items-center gap-3 bg-[#2A2220] px-3.5 py-1.5 rounded-xl border border-[#362A28]">
          <Clock className="w-3.5 h-3.5 text-[#D9989F] animate-pulse" />
          <div className="flex items-center gap-2 font-mono font-bold text-amber-200 text-xs">
            <div className="text-center">
              <span>{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-[9px] text-stone-400 block font-sans font-normal">D</span>
            </div>
            <span>:</span>
            <div className="text-center">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[9px] text-stone-400 block font-sans font-normal">H</span>
            </div>
            <span>:</span>
            <div className="text-center">
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[9px] text-stone-400 block font-sans font-normal">M</span>
            </div>
            <span>:</span>
            <div className="text-center text-[#D9989F]">
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[9px] text-stone-400 block font-sans font-normal">S</span>
            </div>
          </div>
        </div>

        {/* Right: Instant WhatsApp Notification Register */}
        <div className="flex items-center gap-2">
          {subscribed ? (
            <span className="text-emerald-400 font-serif text-xs font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Registered on WhatsApp!</span>
            </span>
          ) : (
            <form onSubmit={handleNotifyMe} className="flex items-center gap-1.5">
              <input
                type="text"
                placeholder="Enter WhatsApp No..."
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="bg-[#2A2220] border border-[#362A28] focus:border-[#D9989F] rounded-lg px-2.5 py-1 text-xs text-white placeholder-stone-500 focus:outline-none w-36"
              />
              <button
                type="submit"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-1 rounded-lg font-serif font-bold text-xs uppercase tracking-wider transition flex items-center gap-1"
              >
                <Bell className="w-3 h-3" />
                <span>Notify</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

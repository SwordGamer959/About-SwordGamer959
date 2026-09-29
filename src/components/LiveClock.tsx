import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface LiveClockProps {
  compact?: boolean;
}

export const LiveClock: React.FC<LiveClockProps> = ({ compact = false }) => {
  const [time, setTime] = useState<Date>(new Date());
  const [timeZone, setTimeZone] = useState<string>('');

  useEffect(() => {
    // Detect browser's local timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimeZone(tz);
    } catch {
      setTimeZone('Local Time');
    }

    // Tick every 1000ms with cleanup
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  if (compact) {
    return (
      <div 
        className="flex items-center gap-1.5 text-xs text-slate-400 font-mono-numbers px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]"
        title={`Your Local Time (${timeZone})`}
      >
        <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
        <span>{hours}:{minutes}:{seconds}</span>
      </div>
    );
  }

  return (
    <div 
      className="inline-flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm text-xs text-slate-300"
      aria-label="Visitor Local Clock"
    >
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <Clock className="w-3.5 h-3.5 text-purple-400" />
      </div>
      <div className="flex items-center gap-2 font-mono-numbers">
        <span className="font-semibold text-white tracking-wider">
          {hours}:{minutes}:{seconds}
        </span>
        <span className="text-slate-500">·</span>
        <span className="text-slate-400 hidden sm:inline">{formattedDate}</span>
        <span className="text-slate-500 hidden sm:inline">·</span>
        <span className="text-slate-400 text-[11px] truncate max-w-[120px]" title={timeZone}>
          {timeZone.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
};

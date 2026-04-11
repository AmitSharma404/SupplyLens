import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Login } from "./Authentication/Login";

const LAUNCH_DATE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

function useCountdown(target) {
  function calculate() {
    const diff = Math.max(0, target - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  const [time, setTime] = useState(calculate);

  useEffect(() => {
    const interval = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-xl">
        <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tabular-nums tracking-tight">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-indigo-300 uppercase">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white/25 pb-7 select-none">
      :
    </span>
  );
}

export default function App() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState("idle"); // idle | error | success

  function handleSubmit(e) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setFormState("error");
      return;
    }
    setFormState("success");
    setEmail("");
  }

  return (
   
    <div className="relative min-h-screen w-full bg-[#070514] flex items-center justify-center overflow-hidden">
      {/* ── Animated gradient blobs ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full bg-violet-700/50 blur-[140px] animate-pulse" />
        <div className="absolute top-1/2 -translate-y-1/2 -right-48 w-[420px] h-[420px] rounded-full bg-indigo-600/40 blur-[120px] animate-pulse [animation-delay:1s]" />
        <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[460px] h-[460px] rounded-full bg-pink-600/30 blur-[130px] animate-pulse [animation-delay:0.5s]" />
      </div>

      {/* ── Dot-grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Top vignette ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#070514] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070514] to-transparent" />

      {/* ══════════════════════════════
              Main Content Card
         ══════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 w-full max-w-3xl mx-auto">
        {/* Live badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-bold tracking-[0.18em] text-indigo-200/80 uppercase">
            Launching Soon
          </span>
        </div>
        <button className="text-white bg-sky-300/10 border border-sky-400/20 rounded-full px-5 py-1 font-bold">
        <Link to={'/login'}>Login</Link>
        </button>

        {/* Logo / Name */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-none tracking-tighter text-white mb-4">
          Supply
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Lens
          </span>
        </h1>

        {/* Tag line */}
        <p className="mt-4 text-base sm:text-lg md:text-xl text-indigo-200/70 max-w-lg leading-relaxed font-light">
          End-to-end supply chain visibility — powered by real-time data and AI.
          <br />
          We&apos;re putting the finishing touches on something extraordinary.
        </p>

        {/* ── Divider ── */}
        <div className="my-10 flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
          <span className="text-indigo-400/40 text-xs font-bold tracking-widest uppercase">
            countdown
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        </div>

        {/* ── Countdown ── */}
        <div className="flex items-end gap-3 sm:gap-5">
          <TimeBlock value={days} label="Days" />
          <Separator />
          <TimeBlock value={hours} label="Hours" />
          <Separator />
          <TimeBlock value={minutes} label="Minutes" />
          <Separator />
          <TimeBlock value={seconds} label="Seconds" />
        </div>

        {/* ── Divider ── */}
        <div className="my-10 flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
          <span className="text-indigo-400/40 text-xs font-bold tracking-widest uppercase">
            notify me
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        </div>

        {/* ── Email form ── */}
        {formState === "success" ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-emerald-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-emerald-300 font-semibold text-lg">
              You&apos;re on the list!
            </p>
            <p className="text-indigo-300/60 text-sm">
              We&apos;ll send you a heads-up the moment we go live.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full max-w-md flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formState === "error") setFormState("idle");
                }}
                placeholder="you@example.com"
                className={[
                  "w-full px-5 py-3.5 rounded-xl text-sm text-white placeholder-indigo-300/40",
                  "bg-white/8 backdrop-blur-sm outline-none transition-all duration-200",
                  "border focus:ring-2",
                  formState === "error"
                    ? "border-pink-500/70 ring-2 ring-pink-500/30"
                    : "border-white/15 hover:border-white/30 focus:border-indigo-400/60 focus:ring-indigo-500/20",
                ].join(" ")}
              />
              {formState === "error" && (
                <p className="absolute -bottom-5 left-1 text-xs text-pink-400 font-medium">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-white whitespace-nowrap cursor-pointer
                         bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600
                         hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-500
                         active:scale-95 transition-all duration-200
                         shadow-lg shadow-fuchsia-700/30"
            >
              Notify Me
            </button>
          </form>
        )}

        {/* ── Features strip ── */}
        <div className="mt-16 grid grid-cols-3 gap-4 w-full max-w-lg">
          {[
            { emoji: "⚡", text: "Real-time tracking" },
            { emoji: "🤖", text: "AI-powered insights" },
            { emoji: "🔒", text: "Enterprise security" },
          ].map(({ emoji, text }) => (
            <div
              key={text}
              className="flex flex-col items-center gap-1.5 px-3 py-4 rounded-xl bg-white/5 border border-white/10"
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-[11px] sm:text-xs font-semibold text-indigo-200/70 leading-snug">
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* ── Social icons ── */}
        <div className="mt-10 flex items-center gap-4">
          {[
            {
              label: "Twitter / X",
              href: "#",
              path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.918l4.243 5.624L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z",
            },
            {
              label: "LinkedIn",
              href: "#",
              path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-6a2 2 0 110 4 2 2 0 010-4z",
            },
            {
              label: "GitHub",
              href: "#",
              path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
            },
          ].map(({ label, href, path }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-10 h-10 flex items-center justify-center rounded-full
                         bg-white/8 border border-white/15 text-indigo-300
                         hover:text-white hover:bg-white/15 hover:border-white/30
                         transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d={path} />
              </svg>
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-indigo-400/30 tracking-widest uppercase">
          &copy; {new Date().getFullYear()} SupplyLens &nbsp;&mdash;&nbsp; All
          rights reserved
        </p>
      </div>
    </div>
  );
}

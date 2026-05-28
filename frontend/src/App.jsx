import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Activity, 
  Shield, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Globe,
  CornerDownRight
} from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#111A16] font-sans antialiased selection:bg-[#1F7A4D] selection:text-white">
      {/* ─── STICKY HEADER ─── */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#F8FAF8]/85 border-b border-gray-100/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1F7A4D] to-[#2DA96A] flex items-center justify-center shadow-sm shadow-[#1F7A4D]/25 transition-transform group-hover:scale-105">
              <span className="text-white font-black text-lg tracking-tight">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#111A16] group-hover:text-[#1F7A4D] transition-colors">
              Supply <span className="text-[#1F7A4D]">Lens</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[14px] font-semibold text-gray-500">
            <a href="#product" className="hover:text-[#1F7A4D] transition-colors">Product</a>
            <a href="#features" className="hover:text-[#1F7A4D] transition-colors">Features</a>
            <a href="#solutions" className="hover:text-[#1F7A4D] transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-[#1F7A4D] transition-colors">Pricing</a>
            <a href="#demo" className="hover:text-[#1F7A4D] transition-colors">Demo</a>
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-[14px] font-bold text-gray-600 hover:text-[#1F7A4D] px-4 py-2 rounded-lg transition-colors"
            >
              Log In
            </Link>
            <Link 
              to="/register" 
              className="text-[14px] font-bold text-white bg-[#111A16] hover:bg-[#1F7A4D] px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-98"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* ─── HERO SECTION ─── */}
      <section className="relative overflow-hidden pt-12 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          
          {/* Hero text */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F7A4D]/8 border border-[#1F7A4D]/15 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F7A4D] animate-ping" />
              <span className="text-[11px] font-extrabold tracking-[0.15em] text-[#1F7A4D] uppercase">
                OPERATING LOGISTICS 2.0
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black leading-[1.08] tracking-tight mb-6">
              Logistics <br />Intelligence <span className="text-[#1F7A4D] italic font-serif font-semibold">Made Simple</span> <br />with Supply Lens.
            </h1>
            
            <p className="text-gray-500 text-lg sm:text-xl font-medium leading-relaxed max-w-xl mb-8">
              From disruption monitoring to reorder optimization, predict and resolve chain issues seamlessly on one powerful dashboard.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center gap-2 text-[15px] font-bold text-white bg-[#1F7A4D] hover:bg-[#19633E] px-7 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#1F7A4D]/15 hover:shadow-xl hover:shadow-[#1F7A4D]/25 active:scale-97"
              >
                Request Demo
                <ArrowRight size={16} />
              </Link>
              <a 
                href="#features" 
                className="inline-flex items-center justify-center text-[15px] font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-7 py-4 rounded-xl transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Hero Dashboard Graphic Mockup */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#1F7A4D]/5 to-emerald-400/10 blur-3xl opacity-60 rounded-3xl" />
            
            <div className="relative bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_24px_60px_-15px_rgba(25,35,45,0.08)] transform hover:scale-102 transition-transform duration-300">
              
              {/* Snapshot header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                <span className="text-[12px] font-bold text-[#111A16] uppercase tracking-wider">Inventory Snapshot</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#1F7A4D]" />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#F8FAF8] border border-gray-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Total SKUs</p>
                  <p className="text-3xl font-black text-[#111A16] mt-1">4,829</p>
                  <div className="w-full bg-[#1F7A4D]/20 h-1 rounded-full mt-3 overflow-hidden">
                    <div className="bg-[#1F7A4D] h-full w-[78%]" />
                  </div>
                </div>
                
                <div className="bg-[#F8FAF8] border border-gray-50 p-4 rounded-2xl">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Low Stock</p>
                  <p className="text-3xl font-black text-[#EF4444] mt-1">12</p>
                  <div className="w-full bg-[#EF4444]/20 h-1 rounded-full mt-3 overflow-hidden">
                    <div className="bg-[#EF4444] h-full w-[24%]" />
                  </div>
                </div>
              </div>

              {/* Mini chart card */}
              <div className="bg-[#111A16] text-[#F8FAF8] p-5 rounded-2xl shadow-inner">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400">Logistics Dashboard</p>
                  <span className="text-xs font-semibold text-[#2DA96A] bg-[#2DA96A]/10 px-2 py-0.5 rounded-full">+32%</span>
                </div>
                
                {/* SVG Graph bars */}
                <div className="h-32 flex items-end gap-2.5 pt-2">
                  {[28, 48, 38, 58, 42, 68, 85, 62, 75, 92, 58, 80].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div 
                        className={`w-full rounded-t-sm transition-all duration-500 bg-gradient-to-t ${idx === 9 ? 'from-[#2DA96A] to-[#39CF83]' : 'from-indigo-600 to-indigo-400'}`}
                        style={{ height: `${val}%` }}
                      />
                      <span className="text-[8px] font-bold text-gray-500">{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating efficiency badge */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-tr from-[#1F7A4D] to-[#2DA96A] text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider opacity-80 leading-none">OPERATIONS</p>
                  <p className="text-[14px] font-extrabold mt-0.5">+24% Efficiency</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ─── PARTNERS SECTION ─── */}
      <section className="bg-white border-y border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[11px] font-extrabold tracking-[0.2em] text-gray-400 uppercase mb-8">
            OVER 5K+ LOGISTICS TEAMS OPTIMIZE WITH SUPPLY LENS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-35 grayscale">
            {["Logistics Co", "DirectLink", "FastFreight", "Oceanic", "ExpressLine"].map((p, i) => (
              <span key={i} className="text-xl font-black tracking-tight text-gray-900">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section id="features" className="py-24 px-6 bg-[#F8FAF8]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-4">
            Visibility at every waypoint.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed font-semibold">
            Leverage real-time data to navigate global disruptions before they impact your bottom line.
          </p>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Global Disruption Hub */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1F7A4D]/10 flex items-center justify-center text-[#1F7A4D] mb-6">
                <Globe size={18} />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Disruption Hub</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">
                Track port congestion, weather patterns, and geopolitical events in real-time with automated rerouting suggestions.
              </p>
            </div>
            
            {/* Dark Styled Map Placeholder Graphic */}
            <div className="relative rounded-2xl bg-[#111A16] p-6 h-56 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-15" style={{
                backgroundImage: `radial-gradient(#FFF 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }} />
              
              <div className="relative text-center">
                <div className="inline-flex items-center gap-2 bg-[#EF4444]/15 border border-[#EF4444]/25 px-3.5 py-1.5 rounded-full mb-3 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                  <span className="text-[10px] font-bold text-[#EF4444] uppercase tracking-wider">Shanghai Port Delayed</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                  Active monitoring finds rerouting options via Ningbo. Impact: minimal delay.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: AI Predictive Analytics */}
          <div className="bg-[#1F7A4D] text-[#F8FAF8] rounded-3xl p-8 flex flex-col justify-between shadow-xs relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl transform translate-x-20 -translate-y-20 pointer-events-none" />
            
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-6">
                <Sparkles size={18} />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Predictive Analytics</h3>
              <p className="text-emerald-100/80 font-medium text-sm leading-relaxed mb-10">
                Anticipate inventory stockouts 14 days in advance using our proprietary deep learning models.
              </p>
            </div>

            {/* Giant Stat Mockup */}
            <div className="mt-auto border-t border-white/10 pt-8 flex items-baseline justify-between">
              <div>
                <p className="text-5xl font-black tracking-tighter">98.4%</p>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#2DA96A] bg-white px-2 py-0.5 rounded-full inline-block mt-2 font-mono">
                  FORECAST ACCURACY
                </p>
              </div>
              <Activity size={36} className="opacity-30 stroke-2" />
            </div>
          </div>

          {/* Card 3: Multi-modal Tracking */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1F7A4D]/10 flex items-center justify-center text-[#1F7A4D] mb-6">
                <Activity size={18} />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-modal Tracking</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">
                Air, ocean, rail, and road. Every leg of the journey, unified in a single feed.
              </p>
            </div>

            {/* Tag Pills */}
            <div className="flex gap-3">
              {["OCEAN", "AIR", "LAST-MILE"].map((mode, i) => (
                <span key={i} className="text-[10px] font-extrabold tracking-widest bg-gray-100 text-[#111A16] px-4 py-2.5 rounded-xl uppercase">
                  {mode}
                </span>
              ))}
            </div>
          </div>

          {/* Card 4: Automated Resolutions */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1F7A4D]/10 flex items-center justify-center text-[#1F7A4D] mb-6">
                <CheckCircle2 size={18} />
              </div>
              <h3 className="text-xl font-bold mb-3">Automated Resolutions</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">
                Don't just see the problems. Supply Lens automatically suggests the best carrier for re-routing shipments at the lowest cost delta.
              </p>
            </div>

            {/* Simulated listing */}
            <div className="space-y-3 bg-[#F8FAF8] border border-gray-50 p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                  <span className="text-[11px] font-bold text-gray-700">Delay: Port of Long Beach</span>
                </div>
                <span className="text-[9px] font-extrabold text-[#EF4444] bg-[#EF4444]/10 px-2 py-0.5 rounded-full">High Alert</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                <div className="flex items-center gap-2 text-[#1F7A4D]">
                  <CornerDownRight size={12} />
                  <span className="text-[11px] font-bold">Suggested Action: Air Freight Shift</span>
                </div>
                <CheckCircle2 size={14} className="text-[#1F7A4D]" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── READY TO GET STARTED SECTION ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto rounded-[32px] bg-[#111A16] text-[#F8FAF8] p-12 sm:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#1F7A4D]/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl text-left">
            <h2 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-6">
              Ready to see your chain <br />in high definition?
            </h2>
            <p className="text-gray-400 font-medium text-lg mb-10 leading-relaxed">
              Join thousands of shippers using Supply Lens to turn logistics from a cost center into a competitive advantage.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center gap-2 text-[15px] font-bold text-[#111A16] bg-[#2DA96A] hover:bg-[#39CF83] px-7 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-[#2DA96A]/20 hover:scale-102 active:scale-98"
              >
                Start Free Trial
              </Link>
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center text-[15px] font-bold text-[#F8FAF8] bg-transparent border border-white/20 hover:bg-white/5 px-7 py-4 rounded-xl transition-colors"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 pb-16 border-b border-gray-100">
          
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#1F7A4D] to-[#2DA96A] flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-sm">S</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-[#111A16]">
                Supply <span className="text-[#1F7A4D]">Lens</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium max-w-xs">
              Intelligence for the modern supply chain. Predict, resolve, and optimize with one platform.
            </p>
          </div>

          {/* Product Col */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#111A16] mb-6">Product</h4>
            <ul className="space-y-4 text-sm font-semibold text-gray-500">
              <li><a href="#features" className="hover:text-[#1F7A4D] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#1F7A4D] transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-[#1F7A4D] transition-colors">Enterprise</a></li>
              <li><a href="#pricing" className="hover:text-[#1F7A4D] transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Resources Col */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#111A16] mb-6">Resources</h4>
            <ul className="space-y-4 text-sm font-semibold text-gray-500">
              <li><a href="#" className="hover:text-[#1F7A4D] transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-[#1F7A4D] transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-[#1F7A4D] transition-colors">Logistics Blog</a></li>
              <li><a href="#" className="hover:text-[#1F7A4D] transition-colors">Case Studies</a></li>
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#111A16] mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-semibold text-gray-500">
              <li><a href="#" className="hover:text-[#1F7A4D] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#1F7A4D] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#1F7A4D] transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-[#1F7A4D] transition-colors">Contact</a></li>
            </ul>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 pt-10">
          <p className="text-xs text-gray-400 font-medium">
            &copy; {new Date().getFullYear()} Supply Lens Intelligence. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-semibold text-gray-400">
            <a href="#" className="hover:text-[#1F7A4D] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#1F7A4D] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#1F7A4D] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

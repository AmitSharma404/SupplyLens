

import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [input,setInput] = useState({
        email: "",
        password:""
    }); 
    const HandleInput = (e) => {
       const {name,value} = e.target;
       console.log(name,value);
       setInput(prev => ({...prev,[name]: value}))
    }

    return (
        <main className="login-shell relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 sm:py-12">
            <div className="pointer-events-none absolute inset-0">
                <div className="login-blob login-blob-one" />
                <div className="login-blob login-blob-two" />
                <div className="login-grid" />
            </div>

            <section className="login-card relative z-10 mx-auto grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-[0_20px_80px_-30px_rgba(25,35,45,0.45)] backdrop-blur-sm md:grid-cols-[1.1fr_1fr]">
                <aside className="hidden md:flex flex-col justify-between bg-[#102a43] p-10 text-[#fefdf8]">
                    <div className="login-reveal" style={{ animationDelay: "80ms" }}>
                        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase">
                            SupplyLens
                            <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        </p>
                        <h1 className="text-4xl font-black leading-tight">
                            Welcome back to
                            <span className="block text-[#f6c453]">command center.</span>
                        </h1>
                        <p className="mt-5 max-w-sm text-sm leading-7 text-[#d9e2ec]">
                            Track inventory flow, shipment health, and supplier risks from one
                            place with live operational insights.
                        </p>
                    </div>

                    <div className="login-reveal" style={{ animationDelay: "220ms" }}>
                        <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
                            <p className="text-xs uppercase tracking-[0.16em] text-[#9fb3c8]">
                                Daily snapshot
                            </p>
                            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                                <div>
                                    <p className="text-2xl font-black">98.4%</p>
                                    <p className="text-[11px] uppercase tracking-wider text-[#bcccdc]">
                                        On-Time
                                    </p>
                                </div>
                                <div>
                                    <p className="text-2xl font-black">42</p>
                                    <p className="text-[11px] uppercase tracking-wider text-[#bcccdc]">
                                        Alerts
                                    </p>
                                </div>
                                <div>
                                    <p className="text-2xl font-black">17</p>
                                    <p className="text-[11px] uppercase tracking-wider text-[#bcccdc]">
                                        Regions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="bg-[#fffaf1] p-7 sm:p-10">
                    <div className="login-reveal mb-8 flex items-center justify-between" style={{ animationDelay: "40ms" }}>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#486581]">
                            Secure Login
                        </p>
                        <Link
                            to="/"
                            className="rounded-full border border-[#bcccdc] px-4 py-1.5 text-xs font-semibold text-[#334e68] transition hover:border-[#486581] hover:text-[#102a43]"
                        >
                            Back Home
                        </Link>
                    </div>

                    <div className="login-reveal" style={{ animationDelay: "120ms" }}>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#102a43]">
                            Sign in
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-[#486581]">
                            Use your work credentials to access your operations dashboard.
                        </p>
                    </div>

                    <form className="mt-8 space-y-5 login-reveal" style={{ animationDelay: "180ms" }}>
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-[#334e68]"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                onChange={HandleInput}
                                value={input.email}
                                placeholder="name@company.com"
                                className="w-full rounded-xl border border-[#d9e2ec] bg-white px-4 py-3 text-sm text-[#102a43] outline-none transition placeholder:text-[#9fb3c8] focus:border-[#f6ad55] focus:ring-4 focus:ring-[#f7d7a8]/60"
                            />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-bold uppercase tracking-[0.14em] text-[#334e68]"
                                >
                                    Password
                                </label>
                                <button
                                    type="button"
                                    className="text-xs font-semibold text-[#486581] transition hover:text-[#102a43]"
                                >
                                    Forgot?
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={input.password}
                                    onChange={HandleInput}
                                    placeholder="Enter your password"
                                    className="w-full rounded-xl border border-[#d9e2ec] bg-white px-4 py-3 pr-20 text-sm text-[#102a43] outline-none transition placeholder:text-[#9fb3c8] focus:border-[#f6ad55] focus:ring-4 focus:ring-[#f7d7a8]/60"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-2 my-auto h-9 rounded-lg px-3 text-xs font-bold uppercase tracking-wide text-[#486581] transition hover:bg-[#f0f4f8] hover:text-[#102a43]"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 pt-1">
                            <label className="flex items-center gap-2 text-sm text-[#334e68]">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-[#9fb3c8] text-[#f08c2e] focus:ring-[#f7d7a8]"
                                />
                                Remember me
                            </label>
                            <p className="text-xs text-[#627d98]">Encrypted session</p>
                        </div>

                        <button
                            type="submit"
                            className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f08c2e] px-4 py-3 text-sm font-black uppercase tracking-[0.12em] text-[#102a43] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f6ad55] active:translate-y-0"
                        >
                            Log In
                            <span className="transition group-hover:translate-x-1">→</span>
                        </button>
                    </form>

                    <p className="login-reveal mt-7 text-center text-sm text-[#486581]" style={{ animationDelay: "260ms" }}>
                        New to SupplyLens?{" "}
                        <a href="#" className="font-bold text-[#102a43] underline decoration-[#f6c453] underline-offset-4">
                            Request access
                        </a>
                    </p>
                </div>
            </section>
        </main>
    );
};
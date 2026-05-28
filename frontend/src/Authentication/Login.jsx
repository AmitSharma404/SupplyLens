import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, loginUser } from "../redux/slices/authSlice";
import { Shield, Sparkles, User, Key, Eye, EyeOff, Loader2 } from "lucide-react";

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState({
        email: "",
        password: ""
    }); 

    const HandleInput = (e) => {
       const { name, value } = e.target;
       if (error) {
        dispatch(clearAuthError());
       }
       setInput(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(clearAuthError());

        try {
            await dispatch(loginUser(input)).unwrap();
            toast.success('Welcome back to SupplyLens!');
            navigate('/dashboard', { replace: true });
        } catch (err) {
            const message = typeof err === 'string' ? err : (err?.message || 'Invalid credentials');
            toast.error(message);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <main className="relative min-h-screen bg-[#F8FAF8] text-[#111A16] flex items-center justify-center px-4 py-12 overflow-hidden select-none">
            {/* Background elements matching landing page */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#1F7A4D]/5 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-emerald-400/5 blur-3xl" />
                <div 
                    className="absolute inset-0 opacity-15"
                    style={{
                        backgroundImage: "radial-gradient(#1F7A4D 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            {/* Login Card Grid */}
            <section className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[32px] border border-gray-100 bg-white/95 shadow-xl shadow-gray-100/50 backdrop-blur-md grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
                
                {/* Left Panel - Dark Forest Green Panel */}
                <aside className="hidden md:flex flex-col justify-between bg-[#111A16] p-12 text-[#F8FAF8] relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1F7A4D]/10 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10">
                        <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1F7A4D] to-[#2DA96A] flex items-center justify-center shadow-sm">
                                <span className="text-white font-black text-sm">S</span>
                            </div>
                            <span className="text-base font-bold tracking-tight text-white">
                                Supply <span className="text-[#2DA96A]">Lens</span>
                            </span>
                        </Link>

                        <h1 className="text-3xl font-black leading-tight tracking-tight mt-6">
                            Welcome back to <br />
                            <span className="text-[#2DA96A] italic font-serif font-semibold">SupplyLens.</span>
                        </h1>
                        <p className="mt-4 text-xs text-gray-400 font-medium leading-relaxed max-w-xs">
                            Track global inventory, optimize supply chain nodes, and coordinate shipments from a single unified workspace.
                        </p>
                    </div>

                    {/* Operational snapshot */}
                    <div className="relative z-10 bg-white/5 border border-white/10 p-5 rounded-2xl">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#2DA96A] mb-3">OPERATIONAL HIGHLIGHTS</p>
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                                <p className="text-lg font-black">98.4%</p>
                                <p className="text-[8px] uppercase tracking-widest text-gray-400 mt-1 font-bold">On-Time</p>
                            </div>
                            <div>
                                <p className="text-lg font-black">12</p>
                                <p className="text-[8px] uppercase tracking-widest text-gray-400 mt-1 font-bold">Alerts</p>
                            </div>
                            <div>
                                <p className="text-lg font-black">17</p>
                                <p className="text-[8px] uppercase tracking-widest text-gray-400 mt-1 font-bold">Hubs</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Right Panel - Form */}
                <div className="p-8 sm:p-12 flex flex-col justify-center bg-white">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Secure Access</span>
                        <Link 
                            to="/" 
                            className="text-xs font-bold text-gray-500 hover:text-[#1F7A4D] border border-gray-150 px-4 py-2 rounded-xl transition-colors bg-white hover:bg-gray-50"
                        >
                            Back Home
                        </Link>
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Sign In</h2>
                    <p className="text-xs text-gray-400 font-semibold mt-1">Enter your credentials to access your operations dashboard.</p>

                    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                        {/* Email */}
                        <div>
                            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-2">EMAIL ADDRESS</label>
                            <div className="relative">
                                <User size={14} className="absolute left-3.5 inset-y-0 my-auto text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={input.email}
                                    onChange={HandleInput}
                                    placeholder="name@company.com"
                                    className="w-full pl-9 pr-4 py-3 text-xs font-bold rounded-xl bg-gray-50 border-0 outline-none text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D]"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400">PASSWORD</label>
                                <button type="button" className="text-[10px] font-bold text-gray-400 hover:text-[#1F7A4D]">Forgot password?</button>
                            </div>
                            <div className="relative">
                                <Key size={14} className="absolute left-3.5 inset-y-0 my-auto text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    value={input.password}
                                    onChange={HandleInput}
                                    placeholder="••••••••"
                                    className="w-full pl-9 pr-12 py-3 text-xs font-bold rounded-xl bg-gray-50 border-0 outline-none text-gray-800 placeholder:text-gray-400 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 inset-y-0 my-auto text-gray-400 hover:text-gray-600 transition-colors inline-flex items-center border-0 bg-transparent cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center justify-between text-xs font-bold text-gray-500 mt-1">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-[#1F7A4D] focus:ring-[#1F7A4D]/25" 
                                />
                                Remember me
                            </label>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Secure Connection</span>
                        </div>

                        {/* Error output */}
                        {error && (
                            <p className="text-xs font-bold text-red-500">{error}</p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1F7A4D] hover:bg-[#19633E] text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 active:scale-97 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#1F7A4D]/15 border-0"
                        >
                            {loading ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                "Log In"
                            )}
                        </button>
                    </form>

                    {/* Footer redirect */}
                    <p className="mt-8 text-center text-xs font-bold text-gray-400">
                        New to SupplyLens?{" "}
                        <Link to="/register" className="text-[#1F7A4D] hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>

            </section>
        </main>
    );
};